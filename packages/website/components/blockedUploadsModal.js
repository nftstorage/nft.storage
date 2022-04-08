import Button from './button'
import Modal from './modal'

/**
 *
 * @param {Object} props
 * @param {React.MouseEventHandler} props.onClose
 */
const BlockedUploadsModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <p className="chicagoflf f6">
        You may have been temporarily blocked from uploading new files. You may,
        however, continue to view and take actions on existing uploads.
      </p>

      <p className="chicagoflf f6 mv4">
        If you feel this was a mistake please contact support@nft.storage
      </p>
      <Button onClick={onClose}>Confirm</Button>
    </Modal>
  )
}

export default BlockedUploadsModal
