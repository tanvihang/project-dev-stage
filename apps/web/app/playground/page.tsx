'use client';

import { DevStage } from '@devstage/ui';
import { ComponentConfig } from '@devstage/core';

// Demo component
const DemoButton = ({ label = 'Click me', variant = 'primary' }: any) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${
        variant === 'primary'
          ? 'bg-accent-primary text-white'
          : 'bg-background-secondary text-foreground-primary'
      }`}
    >
      {label}
    </button>
  );
};

// Component configuration
const buttonConfig: ComponentConfig = {
  id: 'demo-button',
  name: 'Demo Button',
  component: DemoButton,
  description: 'A simple demo button component',
  props: [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Click me',
      description: 'Button label text',
    },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'primary',
      description: 'Button style variant',
      control: {
        type: 'select',
        options: ['primary', 'secondary'],
      },
    },
  ],
  defaultProps: {
    label: 'Click me',
    variant: 'primary',
  },
};

export default function PlaygroundPage() {
  return (
    <div className="playground-page p-8">
      <h1 className="text-3xl font-bold mb-6">Component Playground</h1>
      <div className="border border-border-default rounded-lg p-6">
        <DevStage component={buttonConfig}>
          <div className="space-y-4">
            <DevStage.Toolbar />
            <div className="flex gap-4">
              <DevStage.Controls />
              <DevStage.Canvas />
              <DevStage.Code />
            </div>
          </div>
        </DevStage>
      </div>
    </div>
  );
}
