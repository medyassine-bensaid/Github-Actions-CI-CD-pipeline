import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <header>
        <h1>DevOps Challenge - React App</h1>
      </header>
      <main>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            Count is {count}
          </button>
          <p>
            Simple React app for the Converty DevOps challenge
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
