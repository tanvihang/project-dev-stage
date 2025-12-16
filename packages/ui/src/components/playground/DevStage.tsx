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

// Placeholder components for compound component pattern
export const DevStageCanvas = ({ children }: { children?: ReactNode }) => {
  return <div className="devstage-canvas">{children || 'Canvas'}</div>;
};

export const DevStageControls = ({ children }: { children?: ReactNode }) => {
  return <div className="devstage-controls">{children || 'Controls'}</div>;
};

export const DevStageCode = ({ children }: { children?: ReactNode }) => {
  return <div className="devstage-code">{children || 'Code'}</div>;
};

export const DevStageToolbar = ({ children }: { children?: ReactNode }) => {
  return <div className="devstage-toolbar">{children || 'Toolbar'}</div>;
};

export const DevStageViewport = ({ children }: { children?: ReactNode }) => {
  return <div className="devstage-viewport">{children || 'Viewport'}</div>;
};

/**
 * Named exports for compound component pattern
 */
DevStage.Canvas = DevStageCanvas;
DevStage.Controls = DevStageControls;
DevStage.Code = DevStageCode;
DevStage.Toolbar = DevStageToolbar;
DevStage.Viewport = DevStageViewport;
