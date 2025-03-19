import { useState } from 'react'
import { SalesVoiceChat } from './components/SalesVoiceChat'

function App() {
  const [apiKeyInput, setApiKeyInput] = useState<string>('')
  const [apiKey, setApiKey] = useState<string>('')
  const AGENT_ID = 'X7ypXaLtc1B6WE5xL7u1'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setApiKey(apiKeyInput)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold text-gray-900">StyleSync Sales Assistant</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        {!apiKey && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4 text-gray-900">Enter Your ElevenLabs API Key</h2>
            <p className="mb-4 text-gray-600 whitespace-normal">
              To get started, you'll need an ElevenLabs API key. You can sign up and get your API key at{' '}
              <a 
                href="https://try.elevenlabs.io/2rk039fqhy1u" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                ElevenLabs
              </a>
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="Enter your API key"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!apiKeyInput}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Start Assistant
              </button>
            </form>
          </div>
        )}

        {apiKey && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Instructions</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Click the microphone button to start speaking with the AI assistant</li>
              <li>Ask about customer preferences and get personalized recommendations</li>
              <li>The AI will respond with relevant suggestions based on customer history</li>
            </ul>
          </div>
        )}
      </main>

      {apiKey && <SalesVoiceChat agentId={AGENT_ID} apiKey={apiKey} />}
    </div>
  )
}

export default App
