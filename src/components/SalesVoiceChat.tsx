import { useEffect, useState, useCallback } from 'react';
import { Conversation } from '@11labs/client';
import { Mic, MicOff } from 'lucide-react';

interface SalesVoiceChatProps {
  agentId: string;
  apiKey: string;
  autoStart?: boolean;
}

// Global variables to persist across component renders
let globalConversation: any = null;
let globalMicStream: MediaStream | null = null;

export function SalesVoiceChat({ agentId, apiKey, autoStart = false }: SalesVoiceChatProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Cleanup function that can be called from various places
  const cleanupResources = useCallback(() => {
    console.log('Cleaning up ElevenLabs resources');
    
    // Stop microphone tracks if they exist
    if (globalMicStream) {
      console.log('Stopping microphone tracks');
      globalMicStream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      globalMicStream = null;
    }
    
    // End conversation session if it exists
    if (globalConversation) {
      console.log('Ending conversation session');
      try {
        globalConversation.endSession();
      } catch (error) {
        console.error('Error ending conversation:', error);
      }
      globalConversation = null;
    }
    
    // Update state
    setIsConnected(false);
    setIsListening(false);
  }, []);
  
  // Start conversation method
  const startConversation = useCallback(async () => {
    try {
      // Clean up existing resources first
      cleanupResources();
      
      console.log('Requesting microphone permission...');
      
      // Request microphone with optimized settings
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 48000,
          channelCount: 1
        }
      });
      
      globalMicStream = stream;
      console.log('Microphone permission granted, starting ElevenLabs session');
      
      // Configure ElevenLabs session with API key
      const conversationOptions = {
        agentId,
        apiKey,
        onConnect: () => {
          console.log('Connected to ElevenLabs API');
          setIsConnected(true);
          setIsListening(true);
        },
        onDisconnect: () => {
          console.log('Disconnected from ElevenLabs API');
          cleanupResources();
        },
        onError: (error: any) => {
          console.error('Conversation error:', error);
          cleanupResources();
        },
        onModeChange: (mode: { mode: string }) => {
          console.log('Mode changed:', mode);
          setIsListening(mode.mode === 'listening');
        }
      };
      
      // Start the actual session
      const conv = await Conversation.startSession(conversationOptions);
      globalConversation = conv;
      
      console.log('ElevenLabs session started successfully');
    } catch (error) {
      console.error('Failed to start conversation:', error);
      cleanupResources();
    }
  }, [agentId, apiKey, cleanupResources]);
  
  // Stop conversation method
  const stopConversation = useCallback(() => {
    console.log('Manually stopping conversation');
    cleanupResources();
  }, [cleanupResources]);
  
  // Cleanup on unmount and when API key changes
  useEffect(() => {
    return () => {
      console.log('Component unmounting or API key changed, cleaning up...');
      cleanupResources();
    };
  }, [cleanupResources, apiKey]); // Added apiKey dependency
  
  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2">
      <div className="bg-white rounded-lg shadow-lg p-4 mb-2">
        <div className="text-sm font-medium">
          Status: {isConnected ? 'Connected' : 'Disconnected'}
        </div>
        <div className="text-sm">
          {isListening ? 'Listening to sales associate...' : 'AI Agent is speaking'}
        </div>
      </div>
      
      <button
        className={`h-12 w-12 rounded-full shadow-lg flex items-center justify-center ${
          isConnected ? 'bg-red-500' : 'bg-blue-500'
        } text-white`}
        onClick={isConnected ? stopConversation : startConversation}
      >
        {isConnected ? (
          <MicOff className="h-6 w-6" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}