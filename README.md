# ⚡ Energy Analytics App

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-0.81.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5.0.8-FF6B6B?style=for-the-badge&logo=zustand&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-29.6.3-C21325?style=for-the-badge&logo=jest&logoColor=white)

**A modern React Native app for energy level analytics with beautiful animations and data visualization**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Testing](#-testing) • [Architecture](#-architecture)

</div>

---

## 🚀 Features

### ✨ **Core Functionality**
- 📊 **Interactive Energy Charts** - Beautiful SVG-based line charts with gradient fills
- 📅 **Smart Date Selection** - Horizontal scrollable date picker with "Today" and "Yesterday" labels
- 🎨 **Smooth Animations** - Custom animation hooks with slide, fade, and scale effects
- 📱 **Responsive Design** - Optimized for both iOS and Android devices

### 🎯 **User Experience**
- 🌈 **Gradient Backgrounds** - Customizable linear gradients throughout the app
- ⚡ **Fast Loading** - Optimized data fetching with loading states
- 🔄 **Real-time Updates** - Automatic data refresh on date selection
- 📊 **Empty States** - Friendly empty data components with emojis

### 🛠 **Developer Experience**
- 🧪 **Comprehensive Testing** - 128+ tests covering all components and utilities
- 📝 **TypeScript** - Full type safety with custom interfaces
- 🏗 **Modular Architecture** - Clean separation of concerns
- 📚 **JSDoc Documentation** - Well-documented codebase

---

## 🛠 Tech Stack

### **Frontend**
- **React Native 0.81.1** - Cross-platform mobile development
- **TypeScript 5.8.3** - Type-safe JavaScript
- **React Navigation 7** - Navigation and routing
- **React Native Reanimated 4** - High-performance animations

### **State Management**
- **Zustand 5.0.8** - Lightweight state management
- **Custom Stores** - App, dates, and energy level stores

### **UI & Styling**
- **React Native SVG 15** - Vector graphics and charts
- **Linear Gradient** - Beautiful gradient backgrounds
- **Safe Area Context** - Proper safe area handling
- **Custom Animation Hooks** - Reusable animation logic

### **Data Visualization**
- **D3 Shape 3.2.0** - Advanced SVG path generation
- **Custom Chart Components** - Line charts with gradients
- **Responsive Charts** - Adaptive to container dimensions

### **Testing**
- **Jest 29.6.3** - Testing framework
- **React Native Testing Library** - Component testing
- **Custom Mocks** - Comprehensive mocking strategy

---

## 📦 Installation

### **Prerequisites**
- Node.js >= 20
- React Native CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### **Setup**

```bash
# Clone the repository
git clone <repository-url>
cd testTaskUG

# Install dependencies
npm install

# iOS setup (macOS only)
cd ios && pod install && cd ..

# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### **Environment Setup**

```bash
# Install watchman (recommended)
brew install watchman

# Clear Metro cache if needed
npx react-native start --reset-cache
```

---

## 🧪 Testing

### **Run All Tests**
```bash
npm test
```

### **Test Coverage**
- **128 tests** across 17 test suites
- **100% passing** rate
- **Comprehensive coverage** of:
  - API functions
  - Utility functions
  - React components
  - Custom hooks
  - Zustand stores

### **Test Categories**
```bash
# API tests
npm test -- __tests__/api

# Component tests
npm test -- __tests__/components

# Hook tests
npm test -- __tests__/hooks

# Store tests
npm test -- __tests__/stores

# Utility tests
npm test -- __tests__/utils
```

---

## 🏗 Architecture

### **Project Structure**
```
src/
├── api/                 # API layer
│   ├── datesApi.ts
│   └── energyLevelApi.ts
├── components/          # UI components
│   ├── features/        # Feature components
│   └── ui/             # Reusable UI components
├── hooks/              # Custom hooks
│   ├── useFadeInAnimation.ts
│   ├── useSlideInAnimation.ts
│   └── useScaleAnimation.ts
├── stores/             # Zustand stores
│   ├── appStore.ts
│   ├── datesStore.ts
│   └── energyLevelStore.ts
├── screens/            # Screen components
│   ├── HomeScreen.tsx
│   └── SplashScreen.tsx
├── utils/              # Utility functions
│   ├── chartHelpers.ts
│   ├── delay.ts
│   └── dateSelector.ts
└── types/              # TypeScript types
```

### **Key Components**

#### **🎨 UI Components**
- `Header` - App header with title
- `Heading` - Section headings
- `Gap` - Spacing component
- `SelectorButton` - Date selection buttons
- `EmptyData` - Empty state component
- `BackgroundGradient` - Gradient backgrounds

#### **📊 Feature Components**
- `DateSelector` - Horizontal date picker
- `LineGradientChart` - SVG line chart with gradients
- `GradientChart` - Chart container with grid

#### **🔄 Custom Hooks**
- `useFadeInAnimation` - Fade-in animations
- `useSlideInAnimation` - Slide-in animations
- `useScaleAnimation` - Scale animations

#### **🏪 Stores**
- `appStore` - Global app state and initialization
- `datesStore` - Available dates and selection
- `energyLevelStore` - Energy data and loading states

---

## 🎯 Key Features Deep Dive

### **📊 Chart System**
- **SVG-based rendering** for crisp graphics
- **Gradient fills** with customizable colors
- **Responsive design** adapting to container size
- **Smooth animations** on data updates
- **Grid system** with customizable lines

### **📅 Date Selection**
- **Horizontal scrolling** with FlatList
- **Smart labeling** ("Today", "Yesterday")
- **Automatic scrolling** to selected date
- **Smooth animations** on selection
- **Loading states** during data fetch

### **🎨 Animation System**
- **Custom hooks** for reusable animations
- **Performance optimized** with Reanimated
- **Configurable delays** and durations
- **Multiple animation types** (fade, slide, scale)
- **Centralized configuration** for consistency

### **🏪 State Management**
- **Zustand stores** for lightweight state
- **Async actions** with proper error handling
- **Loading states** for better UX
- **Type-safe** with TypeScript interfaces

---

## 🚀 Performance

### **Optimizations**
- **React Native Reanimated** for 60fps animations
- **SVG rendering** for crisp graphics
- **Efficient state updates** with Zustand
- **Lazy loading** of energy data
- **Optimized FlatList** with getItemLayout

### **Bundle Size**
- **Minimal dependencies** for faster builds
- **Tree shaking** for unused code elimination
- **Efficient imports** with path aliases

---

## 🧪 Testing Strategy

### **Test Types**
- **Unit Tests** - Individual functions and utilities
- **Component Tests** - React component rendering
- **Hook Tests** - Custom hook behavior
- **Store Tests** - State management logic
- **API Tests** - Data fetching and error handling

### **Testing Tools**
- **Jest** - Test runner and assertions
- **React Native Testing Library** - Component testing
- **Custom mocks** - For external dependencies
- **TypeScript** - Type safety in tests

---

## 📱 Screenshots

<div align="center">

### **Home Screen**
![Home Screen](https://via.placeholder.com/300x600/161038/FFFFFF?text=Energy+Analytics)

### **Date Selection**
![Date Selection](https://via.placeholder.com/300x600/070709/FFFFFF?text=Date+Picker)

### **Chart View**
![Chart View](https://via.placeholder.com/300x600/161038/FFFFFF?text=Energy+Chart)

</div>

---

## 🤝 Contributing

### **Development Workflow**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### **Code Standards**
- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for code formatting
- **JSDoc** for documentation
- **Jest** for testing

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Native** team for the amazing framework
- **Zustand** for lightweight state management
- **React Native Reanimated** for smooth animations
- **D3** for powerful data visualization tools

---

<div align="center">

**Made with ❤️ and React Native**

[⬆ Back to top](#-energy-analytics-app)

</div>