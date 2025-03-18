import { useEffect, useState, useCallback } from 'react';
import { Conversation } from '@11labs/client';
import { Mic, MicOff } from 'lucide-react';

interface SalesVoiceChatProps {
  agentId: string;
}

// Global variables to persist across component renders
let globalConversation: any = null;
let globalMicStream: MediaStream | null = null;
let reconnectTimeout: number | null = null;

export function SalesVoiceChat({ agentId }: SalesVoiceChatProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Cleanup function that can be called from various places
  const cleanupResources = useCallback(() => {
    console.log('Cleaning up ElevenLabs resources');
    
    // Clear any reconnection timeouts
    if (reconnectTimeout !== null) {
      window.clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }
    
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
      
      // Configure ElevenLabs session
      const conversationOptions = {
        agentId,
        onConnect: () => {
          console.log('Connected to ElevenLabs API');
          setIsConnected(true);
          setIsListening(true);
        },
        onDisconnect: () => {
          console.log('Disconnected from ElevenLabs API');
          
          // Check if this was due to component unmounting
          if (globalConversation) {
            console.log('Unexpected disconnect, attempting to reconnect...');
            
            // Attempt to reconnect after a delay
            reconnectTimeout = window.setTimeout(() => {
              if (globalMicStream) {
                // We don't need to stop the stream here as we'll reuse it
                startConversation().catch(err => {
                  console.error('Failed to reconnect:', err);
                  cleanupResources();
                });
              } else {
                cleanupResources();
              }
            }, 1000);
          } else {
            // Normal disconnect or component unmounted
            cleanupResources();
          }
        },
        onError: (error: any) => {
          console.error('Conversation error:', error);
          // Don't disconnect immediately on error
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
  }, [agentId, cleanupResources]);
  
  // Stop conversation method
  const stopConversation = useCallback(() => {
    console.log('Manually stopping conversation');
    cleanupResources();
  }, [cleanupResources]);
  
  // Cleanup on unmount
  useEffect(() => {
    // Return cleanup function for when component unmounts
    return () => {
      console.log('Component unmounting, cleaning up...');
      cleanupResources();
    };
  }, [cleanupResources]);
  
  // Add ping to keep connection alive
  useEffect(() => {
    if (isConnected) {
      const pingInterval = setInterval(() => {
        if (globalConversation) {
          console.log('Sending ping to keep connection alive');
          // Note: if ping() doesn't exist in the API, this won't cause an error
          // but won't do anything either
          try {
            // @ts-ignore - This might not be in the type definitions
            if (typeof globalConversation.ping === 'function') {
              globalConversation.ping();
            }
          } catch (error) {
            // Ignore errors from ping attempts
          }
        }
      }, 5000);
      
      return () => {
        clearInterval(pingInterval);
      };
    }
  }, [isConnected]);
  
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