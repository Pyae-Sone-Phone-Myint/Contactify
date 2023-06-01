import React from 'react'
import { SyncLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className=' w-full min-h-[75vh] flex justify-center items-center'>
        <SyncLoader color="#d6b336" />
    </div>
  )
}

export default Loading
