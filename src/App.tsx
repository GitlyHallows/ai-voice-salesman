import { useState, useEffect } from 'react'
import { SalesVoiceChat } from './components/SalesVoiceChat'
import { Settings } from 'lucide-react'

function App() {
  const [apiKeyInput, setApiKeyInput] = useState<string>('')
  const [apiKey, setApiKey] = useState<string>('')
  const [showSettings, setShowSettings] = useState(false)
  const AGENT_ID = 'X7ypXaLtc1B6WE5xL7u1'

  useEffect(() => {
    const savedApiKey = localStorage.getItem('elevenlabs_api_key')
    if (savedApiKey) {
      setApiKey(savedApiKey)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('elevenlabs_api_key', apiKeyInput)
    setApiKey(apiKeyInput)
    setShowSettings(false)
  }

  const handleChangeApiKey = () => {
    setApiKeyInput(apiKey)
    setShowSettings(true)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">StyleSync Sales Assistant</h1>
          {apiKey && (
            <button
              onClick={handleChangeApiKey}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
              title="Change API Key"
            >
              <Settings className="w-5 h-5" />
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        {(!apiKey || showSettings) && (
          <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto text-center">
            <h2 className="text-lg font-medium mb-4 text-gray-900">
              {showSettings ? 'Change Your ElevenLabs API Key' : 'Enter Your ElevenLabs API Key'}
            </h2>
            <p className="mb-4 text-gray-600 text-center">
              {!showSettings && 'To get started, you\'ll need an ElevenLabs API key. '}
              You can sign up and get your API key at{' '}
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
              <div className="flex gap-2 justify-center">
                {showSettings && (
                  <button
                    type="button"
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!apiKeyInput}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {showSettings ? 'Update API Key' : 'Start Assistant'}
                </button>
              </div>
            </form>
          </div>
        )}

        {apiKey && !showSettings && (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-lg font-medium mb-4">Instructions</h2>
            <ul className="list-none space-y-2 text-center">
              <li>The assistant is ready to listen to your questions</li>
              <li>Ask about customer preferences and get personalized recommendations</li>
              <li>Use the microphone button to pause/resume the conversation</li>
            </ul>
          </div>
        )}
      </main>

      {apiKey && !showSettings && (
        <SalesVoiceChat 
          key={apiKey} // Add key prop to force recreation when API key changes
          agentId={AGENT_ID} 
          apiKey={apiKey} 
        />
      )}
    </div>
  )
}

export default App
