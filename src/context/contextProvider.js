// import {createContext,  useState} from "react"

// export const addData = createContext()
// export const deleteData = createContext()
// export const editData = createContext()

// const ContextProvider= ({children}) =>{

//     const [userAdd,setUserAdd] = useState('')
//     const [userEdit,setUserEdit] = useState('')
//     const [ userDelete , setUserDelete] = useState('')

//     return (
//         <addData.Provider value={{ userAdd, setUserAdd }}>
//             <editData.Provider value={{userEdit , setUserEdit }} >
//             <deleteData.Provider value={{userDelete , setUserDelete }} >
//                 {children}
//             </deleteData.Provider>
//             </editData.Provider>
//         </addData.Provider>
//     )

// }
// export default ContextProvider;


import React, { createContext, useState } from 'react'

// export const addData = createContext();
// export const updateData = createContext();
// export const dltdata = createContext();
export const addData = createContext()
export const deleteData = createContext()
export const editData = createContext()
const ContextProvider = ({ children }) => {

    // const [useradd, setUseradd] = useState("");
    // const [update, setUpdate] = useState("");
    // const [deletedata, setDLtdata] = useState("");
     const [userAdd,setUserAdd] = useState('')
     const [userEdit,setUserEdit] = useState('')
     const [ userDelete , setUserDelete] = useState('')

    return (
        <>
            <addData.Provider value={{ userAdd, setUserAdd }}>
                <editData.Provider value={{ userEdit, setUserEdit }}>
                    <deleteData.Provider value={{userDelete, setUserDelete}}>
                        {children}
                    </deleteData.Provider>
                </editData.Provider>
            </addData.Provider>
        </>
    )
}

export default ContextProvider