 # Telegram Bot with Gemini AI

A Telegram bot powered by Google's Gemini AI that can respond to text messages. The bot includes a web interface with a glitch effect that redirects users to the Telegram bot.

## 🚀 Features

- **AI-Powered Responses**: Uses Google's Gemini 1.5 Flash model for intelligent text responses
- **Markdown Support**: Properly formats code blocks and inline code in responses
- **Web Interface**: Stylish landing page with glitch effect animation
- **Auto-redirect**: Web page automatically redirects to the Telegram bot

## 🛠️ Tech Stack

- **Backend**: Node.js with Express.js
- **AI Integration**: Google Generative AI (Gemini 1.5 Flash)
- **Bot Framework**: node-telegram-bot-api
- **Frontend**: HTML, CSS, JavaScript with custom glitch animations
- **Deployment**: Render (free plan)

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- npm or yarn package manager
- A Telegram Bot Token (from [@BotFather](https://t.me/BotFather))
- Google Gemini API Key

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/A-k-a-sh/GeminiWithTg.git
   cd telegram-bot-gemini
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   TELEGRAM_TOKEN=your_telegram_bot_token_here
   GEMINI_API_KEYY=your_gemini_api_key_here
   ```

4. **Run the application**
   ```bash
   npm start
   ```

## 🌐 Deployment

The bot is deployed on Render's free plan. You can access it via:

**🔗 [geminiwithtg.onrender.com](https://geminiwithtg.onrender.com)**

> **Note**: Due to Render's free plan limitations, the page may take up to 50 seconds to load initially.

## 📱 How to Use

### Web Interface
1. Visit [geminiwithtg.onrender.com](https://geminiwithtg.onrender.com)
2. Wait for the countdown (automatically redirects to the bot)
3. Start chatting with the bot on Telegram

### Telegram Bot Commands

- `/start` - Welcome message and bot introduction
- `/about` - Information about the bot developer
- **Send any text** - Get AI-powered responses from Gemini
- **Send images** - Bot will download and save the images

## 🎨 Features Overview

### AI Integration
- Powered by Google's Gemini 1.5 Flash model
- Handles complex queries and provides intelligent responses
- Supports markdown formatting for better readability

### Message Handling
- Automatically splits long responses (4000+ characters)
- Preserves code formatting with proper markdown
- Handles both inline code and code blocks

## 📁 Project Structure

```
├── index.html          # Web interface with glitch effect
├── server.js           # Main bot and server logic
├── package.json        # Dependencies and scripts
├── .env               # Environment variables (create this)
└── README.md          # Project documentation
```

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `TELEGRAM_TOKEN` | Your Telegram bot token from BotFather | ✅ |
| `GEMINI_API_KEYY` | Your Google Gemini API key | ✅ |

## 🚀 Getting Started with Development

1. **Get Telegram Bot Token**
   - Message [@BotFather](https://t.me/BotFather) on Telegram
   - Create a new bot with `/newbot`
   - Save the provided token

2. **Get Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Save the key securely

3. **Local Development**
   ```bash
   npm install
   npm start
   ```
   The server will run on `http://localhost:3000`

## 🎯 API Endpoints

- `GET /` - Serves the main HTML page with glitch effect

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

Created by [@list_lesss](https://t.me/list_lesss)

## 🐛 Known Issues

- Initial load time on Render free plan can be slow (up to 50 seconds)
- Large images may take time to download and process

## 🔮 Future Enhancements

- [ ] Add support for voice messages
- [ ] Implement image analysis with Gemini Vision
- [ ] Add user session management
- [ ] Implement rate limiting
- [ ] Add more interactive web features

---

**⭐ If you found this project helpful, please give it a star!**
