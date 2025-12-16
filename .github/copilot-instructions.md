# DevStage AI Coding Instructions

## Project Overview
DevStage is an interactive component testing and showcase platform. It's a **pnpm monorepo** using **Turborepo** with a compound component architecture powered by Zustand state management.

## Monorepo Architecture

### Package Structure
- `@devstage/core`: Type definitions, utilities, business logic (no UI dependencies)
- `@devstage/ui`: Playground components, hooks, design system (React peer dependency)
- `@devstage/web`: Next.js 14 App Router application
- `components/*`: Demo components for testing (workspace packages)

### Critical Dependency Rules
1. **Core is framework-agnostic**: `@devstage/core` exports only types and utilities - never import React components here
2. **Workspace protocol**: All internal dependencies use `workspace:*` in package.json
3. **Peer dependencies**: Both `@devstage/core` and `@devstage/ui` list React as peer dependency

## Development Workflow

### Commands (run from root)
```bash
pnpm dev          # Start all packages in watch mode (Turbo persistent task)
pnpm build        # Build with dependency graph (Turbo caches in .turbo/)
pnpm type-check   # Type check all packages
pnpm lint         # Lint all packages
pnpm clean        # Clean all build artifacts and node_modules
```

### Package Manager Requirements
- **pnpm >= 9.0.0** (enforced in package.json)
- Uses pnpm workspaces defined in `pnpm-workspace.yaml`
- Never use npm or yarn - commands will fail

## Component Configuration Pattern

### Creating Playground Components
All playground-compatible components need a `ComponentConfig`:

```typescript
import { ComponentConfig } from '@devstage/core';

const config: ComponentConfig = {
  id: 'unique-id',           // Kebab-case identifier
  name: 'Display Name',
  component: YourComponent,
  props: [
    {
      name: 'propName',
      type: 'string',        // PropType from core/types
      defaultValue: 'value',
      control: {             // Optional control config
        type: 'select',
        options: ['option1', 'option2']
      }
    }
  ],
  defaultProps: {            // Must match prop definitions
    propName: 'value'
  }
};
```

### Supported PropTypes
`string | number | boolean | select | color | date | object | array | function | node | element`

Control types: `select`, `range`, `color`, `text`, `json` (see `playground.types.ts`)

## Compound Component Pattern

### DevStage Usage
DevStage uses compound components with Context API:

```typescript
<DevStage component={config}>
  <DevStage.Toolbar />
  <DevStage.Controls />
  <DevStage.Canvas />
  <DevStage.Code />
</DevStage>
```

**Implementation pattern**:
1. Root component provides context via `DevStageContext`
2. Child components access context via `useDevStage()` hook
3. All children must be wrapped in `<DevStage>` parent
4. See `packages/ui/src/components/playground/DevStage.tsx` for reference

## State Management

### Zustand Store Pattern
Located in `packages/ui/src/hooks/usePlaygroundStore.ts`:

- Uses **factory pattern**: `createPlaygroundStore(component, initialState)`
- Middleware stack: `devtools` → `persist` → store
- State shape defined in `@devstage/core/types/playground.types.ts`
- All actions use descriptive action names for devtools: `set({...}, false, 'actionName')`

### Key Store Actions
```typescript
updateProp(name, value)      // Update single prop
updateProps(props)           // Batch update
setViewport(viewport)        // 'mobile' | 'tablet' | 'desktop' | 'fullscreen'
setTheme(theme)              // 'light' | 'dark' | 'system'
togglePanel(panel)           // Show/hide panels
logEvent(event)              // Add to event log
```

## Design System & Styling

### CSS Variable Architecture
Defined in `apps/web/app/globals.css`:
- **HSL format**: `--background-primary: 0 0% 100%` (no `hsl()` wrapper)
- **Theme switching**: `[data-theme='dark']` selector
- **Semantic naming**: background-{primary|secondary|tertiary}, foreground-*, border-*, accent-*

### Tailwind Configuration
In `apps/web/tailwind.config.js`:
- Content paths include `../../packages/ui/src/**` for monorepo support
- Extended colors reference CSS variables: `hsl(var(--background-primary))`
- **Pattern**: Always use semantic tokens (`bg-background-primary`) over raw values

### Design Tokens
Exported from `packages/ui/src/styles/tokens.ts`:
- Complete token system: colors, spacing, typography, borderRadius, shadows, animation
- Use in TypeScript: `import { designTokens } from '@devstage/ui'`

## TypeScript Conventions

### File Organization
- Types in `@devstage/core/src/types/*.types.ts`
- Exports via `packages/*/src/index.ts` barrel files
- All packages use `tsconfig.json` extending common config

### Import Patterns
```typescript
// Correct - barrel exports
import { PlaygroundState, ComponentConfig } from '@devstage/core';
import { DevStage, usePlaygroundStore } from '@devstage/ui';

// Avoid - direct deep imports bypass type boundaries
import { PlaygroundState } from '@devstage/core/src/types/playground.types';
```

## Next.js App Router Specifics

### Directory Structure
- Route: `apps/web/app/playground/page.tsx`
- Layout: `apps/web/app/playground/layout.tsx`
- Global styles: `apps/web/app/globals.css`

### Client Components
All DevStage components require `'use client'` directive:
- Zustand hooks are client-side only
- Framer Motion animations need browser APIs
- Pattern: Add directive at top of any file using `usePlaygroundStore` or `useDevStage`

## Adding New Features

### New Prop Type
1. Add to `PropType` union in `core/src/types/playground.types.ts`
2. Add control config to `ControlConfig` type
3. Implement control renderer in UI package

### New Demo Component
1. Create in `components/{ComponentName}/`
2. Export component and config
3. Add to playground page with `<DevStage component={config}>`

### New UI Component
1. Add to `packages/ui/src/components/`
2. Export via `packages/ui/src/index.ts`
3. Import in web app: `import { Component } from '@devstage/ui'`

## Common Patterns

### Event Logging
Use `generateEventId()` from `@devstage/core`:
```typescript
logEvent({
  type: 'click',
  target: 'button',
  data: { value: 'clicked' }
});
```

### Utility Class Names
Use `cn()` from `packages/ui/src/utils/cn.ts` (clsx + tailwind-merge):
```typescript
import { cn } from '@devstage/ui';
className={cn('base-class', conditional && 'active', props.className)}
```

## Gotchas & Edge Cases

1. **Build order**: Turbo handles dependency graph - `core` builds before `ui` before `web`
2. **Hot reload**: Changes in `packages/*` require Next.js to rebuild - may take 2-3 seconds
3. **Type imports**: Use `import type` for types to avoid circular dependencies
4. **Theme attribute**: Set on parent div as `data-theme={store.theme}`, not class
5. **Viewport dimensions**: Defined in `VIEWPORT_DIMENSIONS` constant - null for fullscreen

## Quick Reference

- **Monorepo tool**: Turborepo with pnpm workspaces
- **State**: Zustand with devtools + persist middleware
- **Styling**: Tailwind + CSS variables (HSL format)
- **Components**: Compound pattern with context
- **Framework**: Next.js 14 App Router
- **Type system**: Centralized in `@devstage/core`
