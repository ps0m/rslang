import { createContext } from "react";

interface IContext {
  isAuth: boolean
}


const InitialContext = {
  isAuth: false
}

export const MyContext = createContext<IContext>(InitialContext)