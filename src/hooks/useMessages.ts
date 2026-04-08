import { useState } from 'react';
import { Message } from '../types';

const KEY = 'squad4game_messages';

export function useMessages(userId: string | null) {
  const [messages, setMessages] = useState<Message[]>(() => {
    try { const s = localStorage.getItem(KEY); return s ? JSON.parse(s) : []; }
    catch { return []; }
  });

  const save = (msgs: Message[]) => {
    localStorage.setItem(KEY, JSON.stringify(msgs));
    setMessages(msgs);
  };

  const sendMessage = (msg: Omit<Message, 'id' | 'createdAt' | 'read'>) => {
    const newMsg: Message = { ...msg, id: Date.now().toString(), createdAt: new Date().toISOString(), read: false };
    save([...messages, newMsg]);
  };

  const markRead = (partnerId: string) => {
    const updated = messages.map(m =>
      m.fromUserId === partnerId && m.toUserId === userId ? { ...m, read: true } : m
    );
    save(updated);
  };

  // Get conversations for current user
  const getConversations = () => {
    if (!userId) return [];
    const partnerIds = new Set<string>();
    messages.forEach(m => {
      if (m.fromUserId === userId) partnerIds.add(m.toUserId);
      if (m.toUserId === userId) partnerIds.add(m.fromUserId);
    });
    return Array.from(partnerIds).map(partnerId => {
      const thread = messages.filter(m =>
        (m.fromUserId === userId && m.toUserId === partnerId) ||
        (m.fromUserId === partnerId && m.toUserId === userId)
      ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      const last = thread[thread.length - 1];
      const unread = thread.filter(m => m.fromUserId === partnerId && !m.read).length;
      const partnerUsername = last.fromUserId === partnerId ? last.fromUsername : last.toUsername;
      return { partnerId, partnerUsername, lastMessage: last.content, lastTime: last.createdAt, unread };
    }).sort((a, b) => new Date(b.lastTime).getTime() - new Date(a.lastTime).getTime());
  };

  const getThread = (partnerId: string) =>
    messages
      .filter(m =>
        (m.fromUserId === userId && m.toUserId === partnerId) ||
        (m.fromUserId === partnerId && m.toUserId === userId)
      )
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  return { messages, sendMessage, markRead, getConversations, getThread };
}
