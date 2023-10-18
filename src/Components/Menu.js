//onmouse เมื่อเอาเมาส์ชี้รูปจะแสดงข้อความ

import React from 'react'
import useHover from '../hooks/UseHover'

const Menu = () => {
    const [hover,attrs] = useHover()

  return (
    <div>
        
        <h1>Menu</h1>{
            hover ? <p>main</p> : null
        }
        <img {...attrs} src="./logo192.png" alt="logo" />


    </div>
  )
}

export default Menu