import React, { useContext,useEffect,useState } from "react";
import axios from 'axios'
import url from "../baseurl/BaseUrl";
const GlobalStateContext = React.createContext()
const GlobalStateUpdateContext = React.createContext()

export const useGlobalState = () => useContext(GlobalStateContext)
export const useGlobalStateUpdate = () => useContext(GlobalStateUpdateContext)

export function GlobalStateProvider({ children }) {
  const [data , setData] = useState({
      loginStatus: false,
      role: null,
      userData: null,    
  })
    useEffect(() => {
    axios({
      method: "get",
      url: url+`/profile`,
      withCredentials: true
    })
      .then((res) => {
        console.log(res.data.profile)
        if (res.data.status === 200) {
          setData(prev =>({
            ...prev,
            loginStatus: true,
            userData: res.data.profile,
            role: res.data.profile.role
        }))
        }
      })
      .catch((err) => {
        if (err) {
          setData(prev =>({
            ...prev,
            loginStatus: false,
        }))        }
      });
    return () => {
      console.log("cleanup");
    };
  }, []);
  return (
    <GlobalStateContext.Provider value={data}>
      <GlobalStateUpdateContext.Provider value={setData}>
        {children}
      </GlobalStateUpdateContext.Provider>
    </GlobalStateContext.Provider>
  )
}