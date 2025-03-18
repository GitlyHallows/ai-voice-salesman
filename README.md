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

## Getting Started

1. Clone the repository
2. Create a `.env` file with required environment variables:
   ```
   VITE_AGENT_ID=your_agent_id
   VITE_ELEVENLABS_API_KEY=your_api_key
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

The following environment variables are required:

- `VITE_AGENT_ID`: Your ElevenLabs agent ID
- `VITE_ELEVENLABS_API_KEY`: Your ElevenLabs API key

## Tech Stack

- React + TypeScript
- Vite
- TailwindCSS
- ElevenLabs Voice AI

## Deployment

This project can be deployed on Netlify. Make sure to configure the environment variables in your Netlify dashboard.

## License

MIT
