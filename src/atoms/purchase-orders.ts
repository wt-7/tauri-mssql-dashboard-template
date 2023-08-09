import { atom } from "jotai";

type DataView = "table" | "graph";

export const dataViewAtom = atom<DataView>("table");
