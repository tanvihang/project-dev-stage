'use client';

import { createContext, useContext, ReactNode } from 'react';
import {
  PlaygroundState,
  ComponentConfig,
  PlaygroundEvent,
  ViewportSize,
  ThemeMode,
  BackgroundOption,
} from '@devstage/core';
import { usePlaygroundStore } from '../../hooks/usePlaygroundStore';
import { cn } from '../../utils/cn';

/**
 * Context for playground state
 */
interface DevStageContextValue {
  state: PlaygroundState;
  component: ComponentConfig | null;
  updateProp: (name: string, value: unknown) => void;
  setViewport: (viewport: ViewportSize) => void;
  setTheme: (theme: ThemeMode) => void;
  setBackground: (background: BackgroundOption) => void;
  togglePanel: (panel: keyof PlaygroundState['panels']) => void;
  logEvent: (event: Omit<PlaygroundEvent, 'id' | 'timestamp'>) => void;
  clearEvents: () => void;
}

const DevStageContext = createContext<DevStageContextValue | null>(null);

/**
 * Hook to access playground context
 */
export const useDevStage = () => {
  const context = useContext(DevStageContext);
  if (!context) {
    throw new Error('useDevStage must be used within DevStage');
  }
  return context;
};

/**
 * Root compound component
 */
interface DevStageProps {
  component: ComponentConfig;
  initialState?: Partial<PlaygroundState>;
  children: ReactNode;
  className?: string;
}

export const DevStage = ({
  component,
  initialState,
  children,
  className,
}: DevStageProps) => {
  const store = usePlaygroundStore(component, initialState);

  const contextValue: DevStageContextValue = {
    state: store,
    component,
    updateProp: store.updateProp,
    setViewport: store.setViewport,
    setTheme: store.setTheme,
    setBackground: store.setBackground,
    togglePanel: store.togglePanel,
    logEvent: store.logEvent,
    clearEvents: store.clearEvents,
  };

  return (
    <DevStageContext.Provider value={contextValue}>
      <div className={cn('devstage-root', className)} data-theme={store.theme}>
        {children}
      </div>
    </DevStageContext.Provider>
  );
};

/**
 * Canvas component - renders the component preview
 */
export const DevStageCanvas = ({ className }: { className?: string }) => {
  const { state, component } = useDevStage();
  
  if (!component) return null;
  
  const Component = component.component;
  
  return (
    <div className={cn('devstage-canvas flex-1 bg-background-primary border border-border-default rounded-lg p-8', className)}>
      <div className="flex items-center justify-center min-h-[400px]">
        <Component {...state.props} />
      </div>
    </div>
  );
};

/**
 * Controls component - renders prop controls
 */
export const DevStageControls = ({ className }: { className?: string }) => {
  const { state, component, updateProp } = useDevStage();
  
  if (!component) return null;
  
  return (
    <div className={cn('devstage-controls w-80 bg-background-secondary border border-border-default rounded-lg p-4', className)}>
      <h3 className="text-lg font-semibold mb-4 text-foreground-primary">Props</h3>
      <div className="space-y-4">
        {component.props.map((prop) => (
          <div key={prop.name} className="space-y-2">
            <label className="block text-sm font-medium text-foreground-secondary">
              {prop.name}
            </label>
            {prop.type === 'string' && (
              <input
                type="text"
                value={state.props[prop.name] as string || ''}
                onChange={(e) => updateProp(prop.name, e.target.value)}
                className="w-full px-3 py-2 bg-background-primary border border-border-default rounded-md text-foreground-primary"
              />
            )}
            {prop.type === 'number' && (
              <input
                type="number"
                value={state.props[prop.name] as number || 0}
                onChange={(e) => updateProp(prop.name, parseFloat(e.target.value))}
                className="w-full px-3 py-2 bg-background-primary border border-border-default rounded-md text-foreground-primary"
              />
            )}
            {prop.type === 'boolean' && (
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={state.props[prop.name] as boolean || false}
                  onChange={(e) => updateProp(prop.name, e.target.checked)}
                  className="rounded border-border-default"
                />
                <span className="text-sm text-foreground-secondary">Enabled</span>
              </label>
            )}
            {prop.type === 'select' && prop.control?.type === 'select' && (
              <select
                value={state.props[prop.name] as string || ''}
                onChange={(e) => updateProp(prop.name, e.target.value)}
                className="w-full px-3 py-2 bg-background-primary border border-border-default rounded-md text-foreground-primary"
              >
                {prop.control.options?.map((option) => (
                  <option key={option as string} value={option as string}>
                    {option as string}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Code component - displays generated code
 */
export const DevStageCode = ({ className }: { className?: string }) => {
  const { state, component } = useDevStage();
  
  if (!component || !state.panels.code) return null;
  
  const generateCode = () => {
    const props = Object.entries(state.props)
      .map(([key, value]) => {
        if (typeof value === 'string') return `${key}="${value}"`;
        if (typeof value === 'number') return `${key}={${value}}`;
        if (typeof value === 'boolean') return value ? key : `${key}={false}`;
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(' ');
    
    return `<${component.name} ${props} />`;
  };
  
  return (
    <div className={cn('devstage-code w-96 bg-background-tertiary border border-border-default rounded-lg p-4', className)}>
      <h3 className="text-lg font-semibold mb-4 text-foreground-primary">Code</h3>
      <pre className="bg-background-primary p-4 rounded-md overflow-x-auto">
        <code className="text-sm text-foreground-secondary">{generateCode()}</code>
      </pre>
    </div>
  );
};

/**
 * Toolbar component - viewport and theme controls
 */
export const DevStageToolbar = ({ className }: { className?: string }) => {
  const { state, setViewport, setTheme, togglePanel } = useDevStage();
  
  const viewports: ViewportSize[] = ['mobile', 'tablet', 'desktop', 'fullscreen'];
  const themes: ThemeMode[] = ['light', 'dark', 'system'];
  
  return (
    <div className={cn('devstage-toolbar flex items-center justify-between p-4 bg-background-secondary border border-border-default rounded-lg', className)}>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground-secondary">Viewport:</span>
          {viewports.map((viewport) => (
            <button
              key={viewport}
              onClick={() => setViewport(viewport)}
              className={cn(
                'px-3 py-1 text-sm rounded-md transition-colors',
                state.viewport === viewport
                  ? 'bg-accent-primary text-white'
                  : 'bg-background-primary text-foreground-primary hover:bg-background-tertiary'
              )}
            >
              {viewport}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground-secondary">Theme:</span>
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => setTheme(theme)}
              className={cn(
                'px-3 py-1 text-sm rounded-md transition-colors',
                state.theme === theme
                  ? 'bg-accent-primary text-white'
                  : 'bg-background-primary text-foreground-primary hover:bg-background-tertiary'
              )}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => togglePanel('code')}
          className={cn(
            'px-3 py-1 text-sm rounded-md transition-colors',
            state.panels.code
              ? 'bg-accent-primary text-white'
              : 'bg-background-primary text-foreground-primary hover:bg-background-tertiary'
          )}
        >
          Code
        </button>
        <button
          onClick={() => togglePanel('events')}
          className={cn(
            'px-3 py-1 text-sm rounded-md transition-colors',
            state.panels.events
              ? 'bg-accent-primary text-white'
              : 'bg-background-primary text-foreground-primary hover:bg-background-tertiary'
          )}
        >
          Events
        </button>
      </div>
    </div>
  );
};

/**
 * Named exports for compound component pattern
 */
DevStage.Canvas = DevStageCanvas;
DevStage.Controls = DevStageControls;
DevStage.Code = DevStageCode;
DevStage.Toolbar = DevStageToolbar;
