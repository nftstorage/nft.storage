import RCTooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap_white.css'

/**
 * @param {Object} props
 * @param {JSX.Element} props.children
 * @param {JSX.Element} props.overlay
 * @param {string} props.id
 * @param {string} [props.placement]
 * @param {boolean} [props.destroyTooltipOnHide]
 * @param {string} [props.overlayClassName]
 */
const Tooltip = ({
  children,
  placement = 'top',
  overlay,
  id,
  destroyTooltipOnHide,
  overlayClassName = '',
  ...props
}) => (
  <RCTooltip
    placement={placement}
    overlay={<div className="bg-white p2 text-sm flex">{overlay}</div>}
    overlayInnerStyle={{ borderWidth: 0 }}
    destroyTooltipOnHide={destroyTooltipOnHide}
    overlayClassName={overlayClassName}
    id={id}
    {...props}
  >
    {children}
  </RCTooltip>
)

export default Tooltip
