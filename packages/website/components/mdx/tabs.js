import React, { useState, cloneElement, Children, isValidElement } from 'react'

import clsx from 'clsx'

/**
 * @typedef {object} TabItemProps
 * @property {React.ReactNode} children
 * @property {string} value a unique id for this tab item
 * @property {boolean} [default] if true, sets this item as the default on first load
 * @property {string} [label] a label to display in the tab header instead of props.value
 * @property {boolean} [hidden]
 * @property {string} [className]
 * @property {Record<string, unknown>} [attributes]
 */

/**
 *
 * @param {TabItemProps} props
 */
export function TabItem(props) {
  const { hidden, className, children } = props
  return (
    <div role="tabpanel" {...{ hidden, className: clsx(className) }}>
      {children}
    </div>
  )
}

/**
 * @typedef {object} TabsProps
 * @property {React.ReactNode} children
 * @property {string} [className]
 */

/**
 *
 * @param {TabsProps} props
 */
export function Tabs(props) {
  const children =
    Children.map(props.children, (child) => {
      if (isValidElement(child) && isTabItem(child)) {
        return child
      }
      throw new Error(
        `Unexpected child in Tabs element. All children of <Tabs> should be a <TabItem> with a unique "value" prop`
      )
    }) || []

  const values = children.map(({ props: { value, label, attributes } }) => ({
    value,
    label,
    attributes,
  }))
  const uniqueValues = new Set(values.map((v) => v.value))
  if (uniqueValues.size !== values.length) {
    throw new Error(
      `All <TabItem> children of a <Tabs> component must have a unique 'value' prop`
    )
  }

  const defaultValue = values.length > 0 ? values[0].value : null
  const [selectedValue, setSelectedValue] = useState(defaultValue)
  /**
   * @type Array<HTMLLIElement | null>
   */
  const tabRefs = []

  /**
   * @param {React.FocusEvent<HTMLLIElement> | React.MouseEvent<HTMLLIElement>} e
   */
  const handleTabChange = ({ currentTarget }) => {
    const newTabIndex = tabRefs.indexOf(currentTarget)
    if (newTabIndex < 0) {
      return
    }
    const newValue = values[newTabIndex].value
    if (newValue !== selectedValue) {
      setSelectedValue(newValue)
    }
  }

  return (
    <div className="tabs-container">
      <ul
        role="tablist"
        aria-orientation="horizontal"
        className={clsx('tabs', 'list-none', 'm-0', props.className)}
      >
        {values.map(({ value, label, attributes }) => {
          const isActive = selectedValue === value
          return (
            <li
              role="tab"
              tabIndex={isActive ? 0 : -1}
              aria-selected={isActive}
              key={value}
              ref={(tr) => tabRefs.push(tr)}
              onFocus={handleTabChange}
              onClick={handleTabChange}
              {...attributes}
              className={clsx(
                'tabs__item',
                isActive ? 'tabs__item--active' : null,
                attributes ? attributes.className : null
              )}
            >
              {label || value}
            </li>
          )
        })}
      </ul>

      <div className="tabs__content">
        {children.map((tabItem, i) =>
          cloneElement(tabItem, {
            key: i,
            hidden: tabItem.props.value !== selectedValue,
          })
        )}
      </div>
    </div>
  )
}

/**
 * @param {React.ReactElement} comp
 * @returns true if we think the given element is a tab item
 */
function isTabItem(comp) {
  return typeof comp.props.value !== 'undefined'
}
