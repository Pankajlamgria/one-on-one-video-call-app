import React from 'react'
import videocontext from './Videocontext'
const VideoState = (props) => {
    const host="http://localhost:4000";
    // const 
  return (
    <videocontext.Provider
    value={{

    }}
    >{props.children}</videocontext.Provider>
  )
}

export default VideoState
