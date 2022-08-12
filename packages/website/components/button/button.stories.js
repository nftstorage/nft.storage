import React from 'react'
import Button from '.'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: Button,
  title: 'Button',
  parameters: {
    layout: 'centered',
    controls: {
      sort: 'requiredFirst',
    },
  },
  argTypes: {
    type: {
      options: ['button', 'submit', 'reset'],
      control: { type: 'select' },
      table: {
        disable: true,
      },
    },
    children: {
      control: 'text',
      default: 'Button',
      name: 'label',
    },
    variant: {
      options: ['light', 'dark', 'tag', 'caution'],
      control: { type: 'select' },
    },
    disabled: {
      control: 'boolean',
    },
    small: {
      control: 'boolean',
    },
    hologram: {
      control: 'boolean',
      default: true,
    },
  },
}

const Template = (
  /** @type {{
   * children: JSX.Element | string | 'Button';
   * }} */
  args
) => {
  const label = args.children || 'Button'
  return <Button {...args}>{label}</Button>
}

export const Default = Template.bind({})
