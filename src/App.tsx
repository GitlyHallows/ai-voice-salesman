import { useState } from 'react'
import { SalesVoiceChat } from './components/SalesVoiceChat'

function App() {
  // Get agent ID from environment variable
  const AGENT_ID = import.meta.env.VITE_AGENT_ID

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold text-gray-900">StyleSync Sales Assistant</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Instructions</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Click the microphone button to start speaking with the AI assistant</li>
            <li>Ask about customer preferences and get personalized recommendations</li>
            <li>The AI will respond with relevant suggestions based on customer history</li>
          </ul>
        </div>
      </main>

      <SalesVoiceChat agentId={AGENT_ID} />
    </div>
  )
}

export default App
