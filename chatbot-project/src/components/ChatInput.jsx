import { useState, useRef, useCallback, useEffect } from 'react';
import { Chatbot } from 'supersimpledev';
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages, isLoading, setIsLoading, pendingPrompt, setPendingPrompt }) {
  const [inputText, setInputText] = useState('');
  const textareaRef = useRef(null);

  // When a suggestion card is clicked, populate the input and focus it
  useEffect(() => {
    if (pendingPrompt) {
      setInputText(pendingPrompt);
      setPendingPrompt('');
      setTimeout(() => { textareaRef.current?.focus(); adjustTextareaHeight(); }, 0);
    }
  }, [pendingPrompt, setPendingPrompt]);


  const adjustTextareaHeight = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 140) + 'px';
    }
  };

  const handleInput = (e) => {
    setInputText(e.target.value);
    adjustTextareaHeight();
  };

  const sendMessage = useCallback(async () => {
    const trimmed = inputText.trim();
    if (!trimmed || isLoading) return;

    setInputText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    const userMsg = {
      message: trimmed,
      sender: 'user',
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };

    const loadingMsg = {
      message: 'loading',
      sender: 'robot',
      id: crypto.randomUUID(),
      isLoading: true,
      timestamp: new Date(),
    };

    const withUser = [...chatMessages, userMsg];
    setChatMessages([...withUser, loadingMsg]);
    setIsLoading(true);

    try {
      const response = await Chatbot.getResponseAsync(trimmed);
      setChatMessages([
        ...withUser,
        {
          message: response,
          sender: 'robot',
          id: crypto.randomUUID(),
          timestamp: new Date(),
        },
      ]);
    } catch {
      setChatMessages([
        ...withUser,
        {
          message: '⚠️ Something went wrong. Please try again.',
          sender: 'robot',
          id: crypto.randomUUID(),
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, isLoading, chatMessages, setChatMessages, setIsLoading]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const canSend = inputText.trim().length > 0 && !isLoading;

  return (
    <div className="chat-input-area">
      <div className="chat-input-inner">
        {/* Typing indicator */}
        <div className={`typing-indicator ${isLoading ? '' : 'hidden'}`}>
          <span>🤖</span>
          NexusAI is thinking…
        </div>

        <div className={`chat-input-box${isLoading ? ' disabled' : ''}`}>
          <textarea
            ref={textareaRef}
            className="chat-input-field"
            placeholder="Ask NexusAI anything…"
            value={inputText}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isLoading}
            id="chat-input-field"
          />
          <div className="input-actions">
            <button
              className="send-btn"
              onClick={sendMessage}
              disabled={!canSend}
              aria-label="Send message"
              id="send-message-btn"
            >
              ➤
            </button>
          </div>
        </div>

        <div className="input-footer">
          <span className="input-footer-text">
            Press <strong>Enter</strong> to send · <strong>Shift+Enter</strong> for new line
          </span>
        </div>
      </div>
    </div>
  );
}
