import { atom } from "recoil";
import { DocumentData } from "@firebase/firestore";

export const movieState = atom<Movie | null | DocumentData>({
  key: "movieAtom",
  default: null,
});
