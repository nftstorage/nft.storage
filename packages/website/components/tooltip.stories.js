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
      defaultValue: 'ns-tooltip',
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
    <button className="button">Hello</button>
  </Tooltip>
)

export const Default = Template.bind({})
