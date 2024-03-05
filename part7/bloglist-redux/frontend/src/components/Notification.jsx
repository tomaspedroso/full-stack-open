import { useSelector } from 'react-redux'

import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (!notification.message) {
    return null
  }

  const variant = notification.error ? 'danger' : 'success'

  return <Alert variant={variant}>{notification.message}</Alert>
}

export default Notification
