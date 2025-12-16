'use client';

import { useMemo } from 'react';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  PlaygroundState,
  ComponentConfig,
  PlaygroundEvent,
  ViewportSize,
  ThemeMode,
  BackgroundOption,
  generateEventId,
} from '@devstage/core';

interface PlaygroundStore extends PlaygroundState {
  // Actions
  updateProp: (name: string, value: unknown) => void;
  updateProps: (props: Record<string, unknown>) => void;
  resetProps: () => void;

  setViewport: (viewport: ViewportSize) => void;
  setTheme: (theme: ThemeMode) => void;
  setBackground: (background: BackgroundOption) => void;

  togglePanel: (panel: keyof PlaygroundState['panels']) => void;
  setPanelSize: (panel: keyof PlaygroundState['panelSizes'], size: number) => void;

  logEvent: (event: Omit<PlaygroundEvent, 'id' | 'timestamp'>) => void;
  clearEvents: () => void;

  setCodeViewOption: <K extends keyof PlaygroundState['codeView']>(
    key: K,
    value: PlaygroundState['codeView'][K]
  ) => void;
}

/**
 * Create playground store with component config
 */
export const createPlaygroundStore = (
  component: ComponentConfig,
  initialState?: Partial<PlaygroundState>
) => {
  const defaultState: PlaygroundState = {
    componentId: component.id,
    props: component.defaultProps || {},
    viewport: 'desktop',
    theme: 'system',
    background: 'transparent',
    panels: {
      controls: true,
      code: true,
      events: false,
    },
    panelSizes: {
      controls: 300,
      canvas: 0, // Flexible
      code: 400,
    },
    events: [],
    codeView: {
      language: 'tsx',
      showTypes: true,
      showImports: true,
    },
    ...initialState,
  };

  return create<PlaygroundStore>()(
    devtools(
      persist(
        (set) => ({
          ...defaultState,

          // Prop management
          updateProp: (name, value) => {
            set(
              (state) => ({
                props: { ...state.props, [name]: value },
              }),
              false,
              'updateProp'
            );
          },

          updateProps: (props) => {
            set({ props }, false, 'updateProps');
          },

          resetProps: () => {
            set({ props: component.defaultProps || {} }, false, 'resetProps');
          },

          // Viewport & theme
          setViewport: (viewport) => {
            set({ viewport }, false, 'setViewport');
          },

          setTheme: (theme) => {
            set({ theme }, false, 'setTheme');
          },

          setBackground: (background) => {
            set({ background }, false, 'setBackground');
          },

          // Panel management
          togglePanel: (panel) => {
            set(
              (state) => ({
                panels: {
                  ...state.panels,
                  [panel]: !state.panels[panel],
                },
              }),
              false,
              'togglePanel'
            );
          },

          setPanelSize: (panel, size) => {
            set(
              (state) => ({
                panelSizes: {
                  ...state.panelSizes,
                  [panel]: size,
                },
              }),
              false,
              'setPanelSize'
            );
          },

          // Event logging
          logEvent: (event) => {
            const newEvent: PlaygroundEvent = {
              ...event,
              id: generateEventId(),
              timestamp: Date.now(),
            };

            set(
              (state) => ({
                events: [...state.events, newEvent].slice(-100), // Keep last 100 events
              }),
              false,
              'logEvent'
            );
          },

          clearEvents: () => {
            set({ events: [] }, false, 'clearEvents');
          },

          // Code view settings
          setCodeViewOption: (key, value) => {
            set(
              (state) => ({
                codeView: {
                  ...state.codeView,
                  [key]: value,
                },
              }),
              false,
              'setCodeViewOption'
            );
          },
        }),
        {
          name: `devstage-${component.id}`,
          partialize: (state) => ({
            props: state.props,
            viewport: state.viewport,
            theme: state.theme,
            background: state.background,
            codeView: state.codeView,
          }),
        }
      )
    )
  );
};

/**
 * Hook to create and use playground store
 */
export const usePlaygroundStore = (
  component: ComponentConfig,
  initialState?: Partial<PlaygroundState>
) => {
  const store = useMemo(
    () => createPlaygroundStore(component, initialState),
    [component.id] // Only recreate if component changes
  );

  return store();
};
