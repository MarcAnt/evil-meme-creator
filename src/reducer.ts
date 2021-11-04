import { TYPES } from "./types";

interface ImageUrl {
  name: string;
  url: string;
}

interface ReducerState {
  linea1: string;
  linea2: string;
  images: any[];
  imageUrl: ImageUrl;
}

export const initialState: ReducerState = {
  linea1: "",
  linea2: "",
  images: [],
  imageUrl: { name: "", url: "" },
};

type Add_Lines = {
  type: TYPES.ADD_LINES;
  field: string;
  payload: string;
};

type Clear_Lines = {
  type: TYPES.CLEAR_LINES;
};

type Add_images = {
  type: TYPES.ADD_IMAGES;
  payload: FileList | null;
};

type Add_images_url = {
  type: TYPES.ADD_IMAGE_URL;
  payload: FileList[];
};

type ReducerAction = Add_Lines | Clear_Lines | Add_images | Add_images_url;

export const reducer = (state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case TYPES.ADD_LINES:
      return { ...state, [action.field]: action.payload };
    case TYPES.CLEAR_LINES:
      return initialState;
    case TYPES.ADD_IMAGES:
      return { ...state, images: [action.payload] };
    case TYPES.ADD_IMAGE_URL:
      let newUrl: ImageUrl[] = action.payload.map((image) => ({
        name: image[0].name,
        url: URL.createObjectURL(image[0]),
      }));
      return { ...state, imageUrl: newUrl[0] };
    default:
      return state;
  }
};
