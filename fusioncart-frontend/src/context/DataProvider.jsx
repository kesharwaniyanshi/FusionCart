import { createContext, useState } from "react";
import { useContext } from "react";

export const DataContext=createContext(null);

const DataProvider=({children})=>{
    const [account,setAccount]=useState('');

    return(
        <DataContext.Provider value={{account,setAccount}}>
            {children}
        </DataContext.Provider>
    )
}


// export const useDataContext = () => {
//     const context = useContext(DataContext);
//     if (!context) {
//         throw new Error("useAuth used outside of the Provider");
//     }
//     return context;
//   };

export default DataProvider;