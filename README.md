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

You can try out the StyleSync AI Sales Assistant directly at: https://gleaming-druid-90aee5.netlify.app/

## Running Locally

If you want to run your own instance of the assistant:

1. Clone this repository
2. Create a `.env` file and add your ElevenLabs API key. The agent ID is preconfigured for the StyleSync assistant.
   ```
   VITE_AGENT_ID=X7ypXaLtc1B6WE5xL7u1
   VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key
   ```
   You can get your ElevenLabs API key from the [ElevenLabs dashboard](https://try.elevenlabs.io/2rk039fqhy1u).
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- React + TypeScript
- Vite
- TailwindCSS
- ElevenLabs Voice AI

## License

MIT
