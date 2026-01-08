# Edit Subscription Screen - React Native / Expo

A beautifully crafted subscription management interface built with React Native and Expo, implementing a pixel-perfect design from Figma.

## Features

- **App Selection Modal**: Searchable list of subscription apps with icons
- **Amount Input**: Custom numeric keypad with haptic feedback
- **Category Picker**: Select from Subscription, Utility, Card Payment, Loan, or Rent
- **Date Picker**: iOS-style scroll wheel date picker
- **Frequency Selector**: Weekly, Monthly, or Annually
- **Reminder Settings**: Configure when to be reminded
- **Active Toggle**: Enable/disable subscription tracking
- **Delete Functionality**: Remove subscriptions with confirmation

## Tech Stack

- **React Native** with **Expo SDK 54**
- **TypeScript** for type safety
- **Expo Haptics** for tactile feedback
- **@expo/vector-icons** for icons

## Project Structure

```
src/
├── components/
│   ├── AppIcon.tsx           # App icon component with logos
│   ├── AppSelectorModal.tsx  # Searchable app selection modal
│   ├── AmountModal.tsx       # Numeric keypad for amount entry
│   ├── CategoryModal.tsx     # Category selection modal
│   ├── DatePickerModal.tsx   # iOS-style date wheel picker
│   ├── FrequencyModal.tsx    # Frequency selection modal
│   ├── ReminderModal.tsx     # Reminder options modal
│   ├── ModalHeader.tsx       # Reusable modal header
│   └── index.ts              # Component exports
├── data/
│   ├── apps.ts               # App definitions
│   ├── categories.ts         # Category definitions
│   └── frequencies.ts        # Frequency & reminder options
├── screens/
│   └── EditSubscription.tsx  # Main screen
└── types/
    └── index.ts              # TypeScript interfaces
```

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
npm install
```

### Running the App

```bash
# Start the development server
npx expo start

# Run on iOS simulator
npx expo start --ios

# Run on Android emulator  
npx expo start --android
```

## Design Highlights

### Attention to Detail

- **Haptic Feedback**: All interactive elements provide tactile feedback
- **iOS-Native Feel**: Page sheet modals, native switch styling
- **Smooth Animations**: Modal transitions and scroll physics
- **Consistent Spacing**: 16px grid system throughout

### UX Considerations

- Form sections are visually grouped with rounded corners
- Clear visual hierarchy with proper typography
- Destructive actions (Delete) require confirmation
- Save button provides success feedback

## Screenshots

The implementation follows the Figma design with:
- Clean white form cards on gray background
- Blue accent color (#007AFF) for primary actions
- Red accent (#FF3B30) for destructive actions
- Green accent (#34C759) for active toggle

## Author

Built for the Client Engineer Hiring Test

