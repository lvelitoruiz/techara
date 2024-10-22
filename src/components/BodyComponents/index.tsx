import React from 'react'
import Slider from './Slider'

const BodyComponent = () => {
  return (
    <div className='w-full h-[calc(100vh-200px)] md:min-h-[700px] md:h-[calc(100vh-200px)] overflow-hidden'>
      <Slider />
    </div>
  )
}

export default BodyComponent
