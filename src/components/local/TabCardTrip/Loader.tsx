import React from 'react'
import './Loader.css'
function Loader() {
  return (
    <div aria-label='Đang tải...' role='status' className='flex justify-center items-center gap-2 mt-4'>
      <svg className='icon' viewBox='0 0 256 256'>
        <line x1='128' y1='32' x2='128' y2='64' stroke-linecap='round' stroke-linejoin='round' strokeWidth='24'></line>
        <line
          x1='195.9'
          y1='60.1'
          x2='173.3'
          y2='82.7'
          stroke-linecap='round'
          stroke-linejoin='round'
          strokeWidth='24'
        ></line>
        <line
          x1='224'
          y1='128'
          x2='192'
          y2='128'
          stroke-linecap='round'
          stroke-linejoin='round'
          strokeWidth='24'
        ></line>
        <line
          x1='195.9'
          y1='195.9'
          x2='173.3'
          y2='173.3'
          stroke-linecap='round'
          stroke-linejoin='round'
          strokeWidth='24'
        ></line>
        <line
          x1='128'
          y1='224'
          x2='128'
          y2='192'
          stroke-linecap='round'
          stroke-linejoin='round'
          strokeWidth='24'
        ></line>
        <line
          x1='60.1'
          y1='195.9'
          x2='82.7'
          y2='173.3'
          stroke-linecap='round'
          stroke-linejoin='round'
          strokeWidth='24'
        ></line>
        <line x1='32' y1='128' x2='64' y2='128' stroke-linecap='round' stroke-linejoin='round' strokeWidth='24'></line>
        <line
          x1='60.1'
          y1='60.1'
          x2='82.7'
          y2='82.7'
          stroke-linecap='round'
          stroke-linejoin='round'
          strokeWidth='24'
        ></line>
      </svg>
      <span className='loading-text'>Đang tải...</span>
    </div>
  )
}

export default Loader
