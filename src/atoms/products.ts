import { atom } from "jotai";

type TableView = "components" | "salesOrders";

export const tableViewAtom = atom<TableView>("components");
export const isPulsingAtom = atom(false);
export const currentProductAtom = atom("");
export const searchHistoryAtom = atom<string[]>([]);
