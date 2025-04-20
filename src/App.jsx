
import { useState } from 'react'

function App() {
  const [history, setHistory] = useState('')
  const [bankroll, setBankroll] = useState('')
  const [result, setResult] = useState(null)

  const handlePredict = async () => {
    const response = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        history: history.split(',').map(Number),
        bankroll: parseFloat(bankroll)
      })
    })
    const data = await response.json()
    setResult(data)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Aviator Predictor</h1>
      <input placeholder='Past 20 crash values' value={history} onChange={e => setHistory(e.target.value)} />
      <input placeholder='Your Bankroll' value={bankroll} onChange={e => setBankroll(e.target.value)} />
      <button onClick={handlePredict}>Predict</button>

      {result && (
        <div>
          <h2>Predictions:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default App
