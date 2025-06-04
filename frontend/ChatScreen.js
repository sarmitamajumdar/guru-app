import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [userLang, setUserLang] = useState('hi');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const load = async () => {
      const lang = await AsyncStorage.getItem('userLang');
      const name = await AsyncStorage.getItem('userName');
      setUserLang(lang || 'hi');
      setUserName(name || 'User');
    };
    load();

    setMessages([
      {
        _id: 1,
        text: '🙏 Hello! How can I assist you today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'GURU Helper',
        },
      },
    ]);
  }, []);

  const translateMessage = async (text) => {
    try {
      const res = await axios.post('http://localhost:8000/translate/', {
        text: text,
        target_lang: userLang,
      });
      return res.data.translated || text;
    } catch (e) {
      return text;
    }
  };

  const onSend = useCallback(async (newMessages = []) => {
    const translatedText = await translateMessage(newMessages[0].text);
    const userMsg = {
      ...newMessages[0],
      text: translatedText,
    };
    setMessages((prev) => GiftedChat.append(prev, [userMsg]));
  }, [userLang]);

  return <GiftedChat messages={messages} onSend={onSend} user={{ _id: 1, name: userName }} />;
}
