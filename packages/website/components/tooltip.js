import RCTooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap_white.css'

/**
 * @param {Object} props
 * @param {JSX.Element} props.children
 * @param {JSX.Element} props.overlay
 * @param {string} [props.placement]
 * @param {boolean} [props.destroyTooltipOnHide]
 * @param {string} [props.overlayClassName]
 */
const Tooltip = ({
  children,
  placement = 'top',
  overlay,
  destroyTooltipOnHide,
  overlayClassName = '',
  ...props
}) => (
  <RCTooltip
    placement={placement}
    overlay={<div className="bg-white p2 f6 flex">{overlay}</div>}
    overlayInnerStyle={{ borderColor: '#ee4116' }}
    destroyTooltipOnHide={destroyTooltipOnHide}
    overlayClassName={overlayClassName}
    {...props}
  >
    {children}
  </RCTooltip>
)

export default Tooltip
