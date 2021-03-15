import React from 'react'
import {useGlobalState} from '../../context/globalState' 
function StDashboard(){
    const state = useGlobalState()
    console.log(state.userData)
    return(
        <div>
            <h1>Welcome </h1>
        </div>
    )
}
export default StDashboard