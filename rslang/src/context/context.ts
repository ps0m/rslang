import { createContext } from "react";
import { IContext } from "../types/types";


export const InitialContext: IContext = {
  "isAuth": null,
  "setIsAuth": () => ""
}

export const MyContext = createContext<IContext>(InitialContext)