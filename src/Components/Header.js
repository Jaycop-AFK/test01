import React from 'react'
import './styles/header.css'
import useHover from '../hooks/UseHover'

const Header = () => {
    const [hover,attrs] = useHover()
  return (
    <div className='Header'>
        

        {
            hover ? <p>main</p> : null
        }
        <img {...attrs} src='./logo192.png' alt='logo'/>
    </div>
  )
}

export default Header