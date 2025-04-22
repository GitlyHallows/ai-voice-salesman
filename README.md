# StyleSync AI Sales Assistant

StyleSync AI is an innovative virtual sales assistant that helps customers make informed fashion choices by providing personalized recommendations based on their wardrobe and specific needs.

## Features

- 🎤 **Voice Interaction**: Natural conversation with AI using voice recognition
- 👔 **Personalized Recommendations**: Smart suggestions based on customer preferences
- 🎯 **Occasion-Specific**: Tailored advice for various events (weddings, business meetings, dates)
- 🔄 **Wardrobe Integration**: Considers existing clothing items for better recommendations

## Use Cases

- **Special Occasions**: Wedding guest outfits, party wear, formal events
- **Professional Attire**: Business meetings, interviews, work events
- **Social Events**: First dates, casual meetups, family gatherings
- **Travel Planning**: Packing suggestions, seasonal wardrobes

## Quick Access

You can try out the StyleSync AI Sales Assistant directly at: https://stylesyncai.netlify.app/

## Getting Started

To use the StyleSync AI Sales Assistant:

1. Visit the application URL
2. Get your ElevenLabs API key:
   - Sign up at [ElevenLabs](https://try.elevenlabs.io/2rk039fqhy1u)
   - Copy your API key from the dashboard
3. Enter your API key in the application
4. Click "Start Assistant" to begin
5. Use the microphone button to control the conversation:
   - Blue button: Click to start speaking
   - Red button: Click to stop the conversation

Your API key will be securely saved in your browser for future visits. You can change it anytime using the settings icon in the top-right corner.

## Running Locally

If you want to run your own instance of the assistant:

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- React + TypeScript
- Vite
- TailwindCSS
- ElevenLabs Voice AI

## Security Note

Your ElevenLabs API key is stored locally in your browser's localStorage. It's never transmitted to any server except ElevenLabs' API. The key persists across browser sessions but can be changed or removed at any time through the application's settings.

## License

MIT
