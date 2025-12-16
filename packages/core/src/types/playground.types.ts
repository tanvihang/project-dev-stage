import { ComponentType } from 'react';

/**
 * Represents the state of a single prop in the playground
 */
export interface PropState {
  name: string;
  value: unknown;
  type: PropType;
  defaultValue?: unknown;
  description?: string;
  required?: boolean;
  options?: readonly unknown[]; // For enum/select types
}

/**
 * Supported prop types for the controls panel
 */
export type PropType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'select'
  | 'color'
  | 'date'
  | 'object'
  | 'array'
  | 'function'
  | 'node'
  | 'element';

/**
 * Configuration for a component in the playground
 */
export interface ComponentConfig<P = Record<string, unknown>> {
  id: string;
  name: string;
  component: ComponentType<P>;
  description?: string;
  category?: string;

  // Prop definitions
  props: PropDefinition[];

  // Default prop values
  defaultProps?: Partial<P>;

  // Example presets
  presets?: ComponentPreset<P>[];

  // Metadata
  tags?: string[];
  author?: string;
  version?: string;
}

/**
 * Definition of a single prop for controls generation
 */
export interface PropDefinition {
  name: string;
  type: PropType;
  defaultValue?: unknown;
  description?: string;
  required?: boolean;
  control?: ControlConfig;
}

/**
 * Control-specific configuration
 */
export type ControlConfig =
  | { type: 'select'; options: readonly unknown[] }
  | { type: 'range'; min: number; max: number; step?: number }
  | { type: 'color'; format?: 'hex' | 'rgb' | 'hsl' }
  | { type: 'text'; multiline?: boolean }
  | { type: 'json' };

/**
 * Pre-configured component state preset
 */
export interface ComponentPreset<P = Record<string, unknown>> {
  id: string;
  name: string;
  description?: string;
  props: Partial<P>;
}

/**
 * Current playground state
 */
export interface PlaygroundState {
  // Component being previewed
  componentId: string | null;

  // Current prop values
  props: Record<string, unknown>;

  // UI state
  viewport: ViewportSize;
  theme: ThemeMode;
  background: BackgroundOption;

  // Panel visibility
  panels: {
    controls: boolean;
    code: boolean;
    events: boolean;
  };

  // Panel sizes (for resizable panels)
  panelSizes: {
    controls: number;
    canvas: number;
    code: number;
  };

  // Event log
  events: PlaygroundEvent[];

  // Code view settings
  codeView: {
    language: 'tsx' | 'jsx';
    showTypes: boolean;
    showImports: boolean;
  };
}

/**
 * Viewport size options
 */
export type ViewportSize = 'mobile' | 'tablet' | 'desktop' | 'fullscreen';

export const VIEWPORT_DIMENSIONS: Record<
  ViewportSize,
  { width: number; height: number } | null
> = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
  fullscreen: null,
};

/**
 * Theme mode options
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Background options for canvas
 */
export type BackgroundOption = 'transparent' | 'white' | 'black' | 'dots' | 'grid';

/**
 * Logged playground event
 */
export interface PlaygroundEvent {
  id: string;
  timestamp: number;
  type: 'click' | 'hover' | 'focus' | 'blur' | 'change' | 'custom';
  target?: string;
  data?: Record<string, unknown>;
}

/**
 * Serialized playground state for URL sharing
 */
export interface SerializedPlaygroundState {
  c: string; // componentId
  p: string; // props (compressed JSON)
  v?: string; // viewport
  t?: string; // theme
  b?: string; // background
}

/**
 * Component metadata for registry
 */
export interface ComponentMetadata {
  id: string;
  name: string;
  description?: string;
  category?: string;
  tags?: string[];
  author?: string;
  version?: string;
  createdAt: string;
  updatedAt: string;
}
