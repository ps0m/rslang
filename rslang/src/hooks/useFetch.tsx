import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IFetching {
  // (): [() => void, boolean, string]
  (): Promise<void>
}

export const useFetch = (callback: (...arg: []) => Promise<void>): [() => Promise<void>, boolean, string] => {
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState('');

  const fetching: (...args: []) => Promise<void> = async (...args) => {
    try {
      setIsLoad(true)
      await callback(...args)
    } catch (e: unknown) {
      if (typeof e === "string") {
        setError(e)
      } else if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setIsLoad(false)
    }
  }

  return [fetching, isLoad, error]
}