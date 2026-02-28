import { useState } from 'react';
import './ChatMessage.css';

function formatTime(date) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function ChatMessage({ message, sender, timestamp, isLoading, isError }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof message === 'string') {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isUser = sender === 'user';
  const isBot = sender === 'robot';

  return (
    <div className="chat-message-wrapper">
      <div className={`chat-message-row ${isUser ? 'user' : 'bot'}`}>
        {/* Avatar */}
        {isBot && (
          <div className="message-avatar bot-avatar" aria-label="AI">
            🤖
          </div>
        )}
        {isUser && (
          <div className="message-avatar user-avatar" aria-label="You">
            👤
          </div>
        )}

        {/* Bubble */}
        <div
          className={`message-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}${isError ? ' error-bubble' : ''}`}
        >
          {isLoading ? (
            <div className="loading-dots" aria-label="AI is typing">
              <span /><span /><span />
            </div>
          ) : (
            message
          )}
        </div>
      </div>

      {/* Meta: timestamp + copy */}
      {!isLoading && (
        <div className={`message-meta ${isUser ? 'user' : 'bot'}`}>
          <span className="message-timestamp">{formatTime(timestamp)}</span>
          {isBot && typeof message === 'string' && (
            <button className="copy-btn" onClick={handleCopy} aria-label="Copy message">
              {copied ? '✓ Copied' : '⎘ Copy'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}