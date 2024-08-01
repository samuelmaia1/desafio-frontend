import { useState } from 'react'
import './App.css'
import { Heroes } from './Components/Heroes/Heroes'

function App() {
  return (
    <>
      <div className="apresentation">
        <h1 className='apresentation-title'>Bem vindo à zona de combate!</h1>
      </div>
      <Heroes/>
    </>
  )
}

export default App
