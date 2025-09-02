import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddFileUsingCloudinary from './components/AddFileUsingCloudinary'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <AddFileUsingCloudinary/>
    </>
  )
}

export default App
