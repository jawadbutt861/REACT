const Message = ({ message, type }) => {
  if (!message) return null

  return (
    <div className={`message message-${type} message-visible`} role="alert">
      <span className="message-text">{message}</span>
    </div>
  )
}

export default Message