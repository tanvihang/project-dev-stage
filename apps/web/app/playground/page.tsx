'use client';

import { DevStage } from '@devstage/ui';
import { ComponentConfig } from '@devstage/core';
import { Button } from '../../components/Button';

const buttonConfig: ComponentConfig = {
  id: 'button',
  name: 'Button',
  component: Button,
  description: 'A versatile button component with multiple variants and sizes',
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
        options: ['primary', 'secondary', 'outline'],
      },
    },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'medium',
      description: 'Button size',
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      description: 'Disable button interaction',
    },
  ],
  defaultProps: {
    label: 'Click me',
    variant: 'primary',
    size: 'medium',
    disabled: false,
  },
};

export default function PlaygroundPage() {
  return (
    <div className="playground-page min-h-screen bg-background-primary p-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground-primary">Component Playground</h1>
      <DevStage component={buttonConfig}>
        <div className="space-y-4">
          <DevStage.Toolbar />
          <div className="flex gap-4">
            <DevStage.Controls />
            <div className="flex-1 flex gap-4">
              <DevStage.Canvas />
              <DevStage.Code />
            </div>
          </div>
        </div>
      </DevStage>
    </div>
  );
}
