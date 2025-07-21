import { useState, useEffect } from 'react';
import { chatService } from '../services/chat.service';
import type { Message } from '../models/message.model';

export const useChatService = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const subscription = chatService.getMessages().subscribe(setMessages);
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const sendMessage = async (text: string, sender: string = '用戶') => {
    // 添加用戶訊息
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      isOwn: true
    };
    
    chatService.addMessage(userMessage);
    
    // 發送到 API 並接收流式回應
    await chatService.sendStreamMessage(text);
  };

  const clearMessages = () => {
    chatService.clearMessages();
  };

  const getMessageCount = () => {
    return chatService.getMessageCount();
  };

  return {
    messages,
    sendMessage,
    clearMessages,
    getMessageCount
  };
};
