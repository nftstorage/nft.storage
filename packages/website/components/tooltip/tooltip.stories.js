import React from 'react'
import Tooltip from '.'
import { within, userEvent, screen } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
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
export const Active = Template.bind({})

// @ts-ignore
Active.play = async ({ canvasElement }) => {
  // Starts querying the component from its root element
  const canvas = await within(canvasElement).findByRole('button')
  // See https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
  await userEvent.hover(canvas)

  // 👇 Assert DOM structure
  expect(screen.getByText('Some Tooltip Content')).toBeInTheDocument()
}
