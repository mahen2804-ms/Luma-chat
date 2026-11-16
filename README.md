# Luma — AI Chat

A polished, dark-mode Expo chat screen built with React Native and TypeScript. It includes animated chat bubbles, a Reanimated typing indicator, an interactive message composer, and a simulated assistant reply. No API key or backend is required.

## Requirements

- Node.js 22.13 or newer
- npm
- Expo Go on a device, or an iOS/Android simulator

## Run the app

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `i` / `a` in the Expo terminal to open an installed simulator. You can also use `npm run ios` or `npm run android`.

To check the TypeScript project:

```bash
npm run typecheck
```

## UI dependencies

The project manifest already includes the required packages:

- `react-native-reanimated` for UI-thread animations
- `expo-linear-gradient` for the avatar, message, and accent gradients
- `lucide-react-native` and `react-native-svg` for icons
- `react-native-safe-area-context` for device insets

The microphone control is a visual demo only; it does not record audio or perform speech recognition. Assistant replies are simulated locally.
