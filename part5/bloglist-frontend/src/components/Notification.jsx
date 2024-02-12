import '../index.css'

const Notification = ({ message, error }) => {
  if (!message) {
    return null
  }

  const style = {
    color: error ? 'red' : 'green'
  }

  return (
    <div className='Notification' style={style}>
      {message}
    </div>
  )
}

export default Notification