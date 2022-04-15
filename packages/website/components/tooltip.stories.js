import React from 'react'
import Tooltip from './tooltip'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: Tooltip,
  title: 'Tooltip',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placement: {
      options: ['top', 'bottom', 'left', 'right'],
      control: { type: 'select' },
    },
    overlay: {
      control: 'text',
      defaultValue: 'Some Tooltip Content',
    },
    // visible: {
    //     options: ['true', 'false', 'undefined'],
    //     control: { type: 'select' },
    // },
    trigger: {
      options: ['click', 'hover'],
      control: { type: 'select' },
    },
    overlayClassName: {
      control: 'text',
    },
  },
}

const Template = (
  /** @type {{
   * children: JSX.Element;
   * overlay: JSX.Element;
   * id: string;
   * placement?: string | undefined;
   * destroyTooltipOnHide?: boolean | undefined;
   * overlayClassName?: string | undefined;
   * }} */
  args
) => (
  <Tooltip {...args}>
    <p className="font-sans text-xl">Hello</p>
  </Tooltip>
)

export const Default = Template.bind({})
