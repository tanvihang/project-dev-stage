# DevStage - Interactive Component Testing Environment

DevStage is a modern, interactive component testing and showcase platform built with Next.js, React, and TypeScript. It provides a beautiful playground for developing, testing, and documenting your UI components.

## 🎯 Features

- **Interactive Playground**: Test and preview components in isolation with live prop editing
- **Compound Component Architecture**: Clean, composable API using React compound components
- **State Management**: Powered by Zustand with persistence and time-travel debugging
- **Design Tokens**: Comprehensive design system with light/dark theme support
- **Responsive Previews**: Test components across different viewport sizes
- **Code Generation**: Automatically generate code snippets from component state
- **Event Logging**: Track and debug component interactions

## 📁 Project Structure

```
devstage/
├── apps/
│   └── web/                    # Next.js application
├── packages/
│   ├── ui/                     # UI component library
│   ├── core/                   # Core business logic & types
│   └── config/                 # Shared configurations
└── components/                 # Demo components
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 9.0.0

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Type check
pnpm type-check

# Lint
pnpm lint
```

## 🏗️ Architecture

### Core Packages

- **@devstage/core**: Type definitions, utilities, and core business logic
- **@devstage/ui**: Playground UI components and design system
- **@devstage/web**: Next.js application

### Key Technologies

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Zustand**: Lightweight state management
- **Framer Motion**: Smooth animations and interactions
- **Tailwind CSS**: Utility-first styling
- **Turborepo**: Monorepo build system

## 🎨 Design System

DevStage includes a comprehensive design system with:

- Semantic color tokens
- Consistent spacing scales
- Typography system
- Border radius utilities
- Shadow system
- Animation tokens

Theme switching (light/dark/system) is built-in with CSS variables.

## 📖 Usage

### Creating a Component Config

```typescript
import { ComponentConfig } from '@devstage/core';

const config: ComponentConfig = {
  id: 'my-button',
  name: 'My Button',
  component: MyButton,
  props: [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Click me',
    },
  ],
  defaultProps: {
    label: 'Click me',
  },
};
```

### Using the DevStage Playground

```tsx
import { DevStage } from '@devstage/ui';

<DevStage component={config}>
  <DevStage.Toolbar />
  <DevStage.Canvas />
  <DevStage.Controls />
  <DevStage.Code />
</DevStage>
```

## 🛠️ Development

This is a monorepo managed by Turborepo and pnpm workspaces.

### Adding a New Package

1. Create a new directory under `packages/`
2. Add `package.json` with workspace dependency references
3. Update `pnpm-workspace.yaml` if needed
4. Install dependencies: `pnpm install`

### Running Tasks

```bash
# Run dev server for all packages
pnpm dev

# Build all packages
pnpm build

# Run type checking
pnpm type-check

# Clean build artifacts
pnpm clean
```

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
