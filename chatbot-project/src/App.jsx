import { useState, useCallback } from 'react';
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import './App.css';

const SUGGESTIONS = [
  { icon: '💡', title: 'Explain a concept', desc: 'Break down a complex topic' },
  { icon: '✍️', title: 'Write something', desc: 'Emails, essays, code & more' },
  { icon: '🔍', title: 'Research a topic', desc: 'Get facts and summaries' },
  { icon: '🧮', title: 'Solve a problem', desc: 'Math, logic, debugging' },
];

const HISTORY = [
  { id: 1, title: 'JavaScript async/await explained' },
  { id: 2, title: 'Best practices for React hooks' },
  { id: 3, title: 'How does HTTP caching work?' },
];

function App() {
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState('');

  const handleClearChat = useCallback(() => {
    if (!isLoading) setChatMessages([]);
  }, [isLoading]);

  const handleSuggestion = useCallback((title) => {
    setPendingPrompt(title);
  }, []);

  return (
    <div className="app-shell">
      {/* ── Sidebar ── */}
      <aside className="sidebar" aria-label="Sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">✦</div>
          <span className="sidebar-logo-text">NexusAI</span>
        </div>

        <button className="sidebar-new-chat" onClick={handleClearChat} id="new-chat-btn">
          <span>＋</span>
          New Chat
        </button>

        <span className="sidebar-label">Recent</span>
        {HISTORY.map((h) => (
          <button key={h.id} className="sidebar-item" id={`history-${h.id}`}>
            <span className="sidebar-item-icon">💬</span>
            <span
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flex: 1,
                textAlign: 'left',
              }}
            >
              {h.title}
            </span>
          </button>
        ))}

        <span className="sidebar-label" style={{ marginTop: 8 }}>Tools</span>
        <button className="sidebar-item" id="sidebar-settings">
          <span className="sidebar-item-icon">⚙️</span> Settings
        </button>
        <button className="sidebar-item" id="sidebar-help">
          <span className="sidebar-item-icon">❓</span> Help & FAQ
        </button>

        <div className="sidebar-spacer" />

        <div className="sidebar-user">
          <div className="sidebar-user-avatar">P</div>
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">Pavan</span>
            <span className="sidebar-user-plan">Pro Plan</span>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="main-content">
        {/* Header */}
        <header className="chat-header">
          <div className="chat-header-left">
            <div className="chat-header-dot" />
            <div>
              <div className="chat-header-title">NexusAI Assistant</div>
              <div className="chat-header-subtitle">Powered by advanced AI · Always online</div>
            </div>
          </div>
          <div className="chat-header-actions">
            <button className="header-btn" title="Clear chat" onClick={handleClearChat} id="clear-chat-btn">
              🗑
            </button>
            <button className="header-btn" title="Share" id="share-btn">
              ↗
            </button>
            <button className="header-btn" title="More options" id="more-options-btn">
              ⋯
            </button>
          </div>
        </header>

        {/* Welcome Screen OR Messages */}
        {chatMessages.length === 0 ? (
          <div className="welcome-container">
            <div className="welcome-icon">✦</div>
            <div>
              <h1 className="welcome-title">
                Hello, I'm <span>NexusAI</span>
              </h1>
              <p className="welcome-subtitle">
                Your intelligent assistant — ask me anything, from answering questions to
                writing code and explaining complex topics.
              </p>
            </div>
            <div className="welcome-suggestions">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.title}
                  className="suggestion-card"
                  onClick={() => handleSuggestion(s.title)}
                  id={`suggestion-${s.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="suggestion-card-icon">{s.icon}</div>
                  <div className="suggestion-card-title">{s.title}</div>
                  <div className="suggestion-card-desc">{s.desc}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <ChatMessages chatMessages={chatMessages} />
        )}

        {/* Input */}
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          pendingPrompt={pendingPrompt}
          setPendingPrompt={setPendingPrompt}
        />
      </div>
    </div>
  );
}

export default App;
