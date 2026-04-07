import React, { useEffect, useRef, useState } from 'react';
import { Message, User } from '../types';

interface Conversation {
  partnerId: string;
  partnerUsername: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
}

interface MessagesPanelProps {
  user: User;
  onClose: () => void;
  getConversations: () => Conversation[];
  getThread: (partnerId: string) => Message[];
  sendMessage: (msg: Omit<Message, 'id' | 'createdAt' | 'read'>) => void;
  markRead: (partnerId: string) => void;
  initialPartnerId?: string | null;
  initialPartnerUsername?: string | null;
}

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return 'az önce';
  if (diff < 3600) return Math.floor(diff / 60) + ' dk önce';
  if (diff < 86400) return Math.floor(diff / 3600) + ' sa önce';
  return Math.floor(diff / 86400) + ' gün önce';
}

export default function MessagesPanel({
  user, onClose, getConversations, getThread, sendMessage, markRead,
  initialPartnerId, initialPartnerUsername,
}: MessagesPanelProps) {
  const [activeId, setActiveId] = useState<string | null>(initialPartnerId || null);
  const [activeUsername, setActiveUsername] = useState<string | null>(initialPartnerUsername || null);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const convs = getConversations();
  const thread = activeId ? getThread(activeId) : [];

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [thread.length, activeId]);
  useEffect(() => { if (activeId) markRead(activeId); }, [activeId]);

  const send = () => {
    if (!input.trim() || !activeId || !activeUsername) return;
    sendMessage({ fromUserId: user.id, fromUsername: user.username, toUserId: activeId, toUsername: activeUsername, content: input.trim() });
    setInput('');
  };

  const openConv = (id: string, username: string) => { setActiveId(id); setActiveUsername(username); };

  return (
    <>
      <div className="messages-overlay" onClick={onClose}></div>
      <div className="messages-panel">
        <div className="mp-header">
          <div className="mp-title">💬 Mesajlar</div>
          <button className="mp-close" onClick={onClose}>✕</button>
        </div>
        <div className="mp-body">
          {/* Conversation list */}
          <div className="mp-conv-list">
            {convs.length === 0 && !initialPartnerId && (
              <div className="mp-empty">Henüz mesajın yok.<br /><span>İlanlardan birine mesaj gönder!</span></div>
            )}
            {convs.map(c => (
              <div
                key={c.partnerId}
                className={`mp-conv-item${activeId === c.partnerId ? ' active' : ''}`}
                onClick={() => openConv(c.partnerId, c.partnerUsername)}
              >
                <div className="mp-avatar">{c.partnerUsername[0].toUpperCase()}</div>
                <div className="mp-conv-info">
                  <div className="mp-conv-name">{c.partnerUsername}</div>
                  <div className="mp-conv-last">{c.lastMessage.slice(0, 40)}{c.lastMessage.length > 40 ? '…' : ''}</div>
                </div>
                <div className="mp-conv-meta">
                  <div className="mp-conv-time">{timeAgo(c.lastTime)}</div>
                  {c.unread > 0 && <div className="mp-unread-badge">{c.unread}</div>}
                </div>
              </div>
            ))}
            {/* New conversation started from listing */}
            {initialPartnerId && !convs.find(c => c.partnerId === initialPartnerId) && (
              <div
                className={`mp-conv-item active`}
                onClick={() => openConv(initialPartnerId, initialPartnerUsername || '')}
              >
                <div className="mp-avatar">{(initialPartnerUsername || '?')[0].toUpperCase()}</div>
                <div className="mp-conv-info">
                  <div className="mp-conv-name">{initialPartnerUsername}</div>
                  <div className="mp-conv-last">Yeni konuşma</div>
                </div>
              </div>
            )}
          </div>

          {/* Chat thread */}
          {activeId ? (
            <div className="mp-chat">
              <div className="mp-chat-header">
                <button className="mp-back" onClick={() => setActiveId(null)}>←</button>
                <div className="mp-avatar sm">{(activeUsername || '?')[0].toUpperCase()}</div>
                <span className="mp-chat-name">{activeUsername}</span>
              </div>
              <div className="mp-messages">
                {thread.length === 0 && (
                  <div className="mp-no-msg">Konuşmayı başlat! 👋</div>
                )}
                {thread.map(m => (
                  <div key={m.id} className={`mp-msg${m.fromUserId === user.id ? ' mine' : ' theirs'}`}>
                    <div className="mp-bubble">{m.content}</div>
                    <div className="mp-msg-time">{timeAgo(m.createdAt)}</div>
                  </div>
                ))}
                <div ref={bottomRef}></div>
              </div>
              <div className="mp-input-row">
                <input
                  className="mp-input"
                  placeholder="Mesajını yaz..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') send(); }}
                />
                <button className="mp-send-btn" onClick={send} disabled={!input.trim()}>➤</button>
              </div>
            </div>
          ) : (
            <div className="mp-chat mp-select-prompt">
              <div className="mp-empty-chat">💬<br />Bir konuşma seç</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
