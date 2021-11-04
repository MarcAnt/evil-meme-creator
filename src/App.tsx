import {
  useEffect,
  useRef,
  useState,
  useReducer,
  FC,
  ChangeEvent,
} from "react";
import domtoimage from "dom-to-image";

import { TYPES } from "./types";
import { initialState, reducer } from "./reducer";

import styled, { createGlobalStyle } from "styled-components";
import "./App.css";

const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { linea1, linea2, images, imageUrl } = state;

  const [fontSize, setFontSize] = useState<number>(32);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //Si no hay imagen retorna

    if (images.length < 1) return;
    //Enviar un array con la imagen
    dispatch({ type: TYPES.ADD_IMAGE_URL, payload: images });
  }, [images]);

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    //Obtener la imagen
    dispatch({ type: TYPES.CLEAR_LINES });
    dispatch({ type: TYPES.ADD_IMAGES, payload: e.target.files! });
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: TYPES.ADD_LINES,
      field: e.currentTarget.name,
      payload: e.currentTarget.value,
    });
  };

  const handleExport = () => {
    if (images.length < 1) return;

    domtoimage.toJpeg(divRef.current!, { quality: 1 }).then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = imageUrl.name;
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <>
      <GlobalStyles />
      <Wrapper className="App">
        <input type="file" accept="image/*" onChange={onImageChange} />
        <br />
        <InputWrapper>
          <input
            type="text"
            name="linea1"
            placeholder="Línea 1"
            onChange={handleInput}
            value={linea1}
            maxLength={50}
            disabled={images.length < 1 && true}
          />
          <input
            type="text"
            name="linea2"
            placeholder="Línea 2"
            onChange={handleInput}
            value={linea2}
            maxLength={100}
            disabled={images.length < 1 && true}
          />
        </InputWrapper>

        <br />

        <ButtonWrapper>
          <button onClick={handleExport}>Exportar</button>
          <button onMouseDown={() => setFontSize(fontSize + 5)}>A+</button>
          <button onMouseDown={() => setFontSize(fontSize - 5)}>A-</button>
        </ButtonWrapper>

        <div
          style={{
            position: "relative",
          }}
          ref={divRef}
          className="imageWrapper"
        >
          <span
            style={{
              top: "1rem",
              fontSize:
                linea1 && linea1.length > 15
                  ? `${fontSize}px`
                  : `${fontSize + 2}px`,
            }}
          >
            {linea1}
          </span>
          <span
            style={{
              bottom: "1rem",

              fontSize:
                linea2 && linea1.length > 15
                  ? `${fontSize}px`
                  : `${fontSize + 2}px`,
            }}
          >
            {linea2}
          </span>

          {imageUrl && (
            <img
              src={imageUrl.url}
              alt={imageUrl.name}
              style={{ filter: "invert(1)" }}
            />
          )}
        </div>
      </Wrapper>
    </>
  );
};

const GlobalStyles = createGlobalStyle`

    html {
        font-size: 16px;
        font-family: sans-serif;
    }

    html, * {
        padding: 0; 
        margin: 0;
        box-sizing: border-box;
    }

    body {
        background-color: #1d202a;
        width: 100vw;
        height: 100vh;
        overflow-x: hidden;
    }

`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 0.5rem;
  input {
    outline: none;
    border: none;
    border-radius: 0.2rem;
    padding: 0.5rem;
    background-color: #e8f0fe;
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 0.5rem;
`;

const Wrapper = styled.div`
  max-width: 1080px;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #e8f0fe;

  & input::-webkit-file-upload-button,
  & button {
    border: none;
    border-radius: 0.2rem;
    padding: 0.5rem;
    background-color: #e8f0fe;
    color: black;
    font-weight: bold;
    cursor: pointer;
  }

  button {
    text-transform: uppercase;
  }

  .imageWrapper img {
    padding: 0.5rem;
    object-fit: cover;
    border-radius: 1rem;
    width: 100%;
  }

  & span {
    position: absolute;
    padding: 0 0.5rem;
    z-index: 1;
    width: 100%;
    color: white;
    font-weight: bolder;
    text-transform: uppercase;
    -webkit-text-stroke-width: 0.5px;
    -webkit-text-stroke-color: black;
    line-break: anywhere;
  }
`;

export default App;
