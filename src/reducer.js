import { TYPES } from "./types";

export const initialState = {
  linea1: "",
  linea2: "",
  images: [],
  imageUrl: { name: "", url: "" },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case TYPES.ADD_LINES:
      return { ...state, [action.field]: action.payload };
    case TYPES.CLEAR_LINES:
      return initialState;
    case TYPES.ADD_IMAGES:
      return { ...state, images: [...action.payload] };
    case TYPES.ADD_IMAGE_URL:
      let newUrl = action.payload.map((image) => ({
        name: image.name,
        url: URL.createObjectURL(image),
      }));
      return { ...state, imageUrl: newUrl[0] };
    default:
      return state;
  }
};
