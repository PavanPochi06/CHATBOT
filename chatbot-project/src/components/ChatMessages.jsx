import { ChatMessage } from './ChatMessage';
import { useAutoScroll } from './useAutoScroll.jsx';
import './ChatMessages.css';

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useAutoScroll([chatMessages]);

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      <div className="messages-inner">
        {chatMessages.length > 0 && (
          <div className="date-divider">
            <span className="date-divider-text">
              {new Date().toLocaleDateString([], {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        )}
        {chatMessages.map((chatMessage) => (
          <ChatMessage
            key={chatMessage.id}
            message={chatMessage.message}
            sender={chatMessage.sender}
            timestamp={chatMessage.timestamp}
            isLoading={chatMessage.isLoading}
            isError={chatMessage.isError}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatMessages;