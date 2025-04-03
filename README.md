<div>
  <a href="README.md">
    <img src="https://img.shields.io/badge/README.md-purple" alt="Home">
  </a>
  <a href="TODO.md">
    <img src="https://img.shields.io/badge/TODO.md-red" alt="TODO">
  </a>
  <a href="TODO_RAW_TASK_DATA.md">
    <img src="https://img.shields.io/badge/TODO_RAW_TASK_DATA.md-orange" alt="Raw Task Data">
  </a>
  <a href="TASK_LIST.md">
    <img src="https://img.shields.io/badge/TASK_LIST.md-green" alt="Task List">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/LICENSE-lightgrey" alt="License">
  </a>
</div>

---
# GiftMate - Never Miss a Special Occasion Again

## ✨ Features

- 📅 Smart date tracking for birthdays, anniversaries, and special events
- 🎁 Personalized gift idea management
- 🔔 Customizable reminders and notifications
- 👥 Contact management with relationship tracking
- 🔒 Secure authentication with Supabase
- 🔄 Real-time sync across devices

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- Expo CLI
- Supabase account

### Installation
```bash
# Clone the repository
git clone https://github.com/your-org/giftmate-app.git
cd giftmate-app

# Install dependencies
npm install

# For iOS (if using macOS)
cd ios && pod install && cd ..
```

### Configuration
1. Create `.env` file:
```bash
cp .env.example .env
```

2. Update with your Supabase credentials:
```ini
SUPABASE_URL=your-project-url
SUPABASE_KEY=your-anon-key
```

3. Start the development server:
```bash
npm run dev
```

## 📸 Screenshots

<div align="center">
  <img src="assets/screenshots/dashboard.png" width="200" alt="Dashboard" />
  <img src="assets/screenshots/gift-list.png" width="200" alt="Gift List" />
  <img src="assets/screenshots/reminders.png" width="200" alt="Reminders" />
</div>

## 🛠 Development

### Scripts
```bash
# Start development server
npm run dev

# Run tests
npm test

# Lint code
npm run lint

# Build for production
npm run build
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### First Time Contributors
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📚 Documentation

For detailed documentation, please visit our [documentation site](https://giftmate-docs.example.com).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
_Last updated: ${new Date().toISOString().split('T')[0]}_
