import React, { useContext,useEffect, useReducer } from "react";
import axios from 'axios'
import url from "../baseurl/BaseUrl";
const GlobalStateContext = React.createContext()
const GlobalStateUpdateContext = React.createContext()

export const useGlobalState = () => useContext(GlobalStateContext)
export const useGlobalStateUpdate = () => useContext(GlobalStateUpdateContext)
const reducer = (state, action) => {
  let item = action.item
  console.log(item)
  switch (action.type) {
    case "USERDATA":
      return ({
        ...state,
        userData: item
      });
    case "LOGINSTATUS":
      return ({
        ...state,
        loginStatus: item
      });
    case "ROLE":
      return ({
        ...state,
        role: item
      });
    default:
      return state;
  }
};
export function GlobalStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    loginStatus: false,
    userData: null,
    role: null
  })
  console.log(state)
  useEffect(() => {
    axios({
      method: "get",
      url: url+`/profile`,
      withCredentials: true
    })
      .then((res) => {
        console.log(res.data.profile)
        if (res.data.status === 200) {
          dispatch({ type: "USERDATA", item: res.data.profile })
          dispatch({ type: "ROLE", item: res.data.profile.role })
          dispatch({ type: "LOGINSTATUS", item: true })
        }
      })
      .catch((err) => {
        if (err) {
          dispatch({ type: "LOGINSTATUS", item: false })
        }
      });
    return () => {
      console.log("cleanup");
    };
  }, []);
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalStateUpdateContext.Provider value={dispatch}>
        {children}
      </GlobalStateUpdateContext.Provider>
    </GlobalStateContext.Provider>
  )
}