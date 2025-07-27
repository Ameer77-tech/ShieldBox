import { createContext, useState } from "react";

export const CountContext = createContext(null)

export const CountContextProvider = ({children})=>{
    const [Counts, setCounts] = useState({
        
    })
}