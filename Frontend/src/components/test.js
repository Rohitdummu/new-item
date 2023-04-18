import React from 'react'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { Store } from 'react-notifications-component';

function Alert() {
    const addnoti = ()=>{
        Store.addNotification({
            title: "Wonderful!",
            message: "teodosii@react-notifications-component",
            type: "success",
            insert: "top",
            container: "top-full",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss:{
                duration:2000
            }
          });
    }
  return (
    <div className="app-container">
      
      <h1>hello</h1>
      <button onClick={()=>{addnoti()}}>hello</button>
    </div>
  )
}

export default Alert