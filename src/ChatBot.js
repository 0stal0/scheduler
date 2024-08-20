import React, { useState } from 'react';
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    setInput('');

    try {
      const headers = {
        'Content-Type': 'application/json',
        'api-key': process.env.REACT_APP_OPENAI_API_KEY,
      };

      const payload = {
        messages: [
          {
            role: 'system',
            content: `제주도 현지인 역할, 말투는 자연스럽고 친근하게 하지만 반말은 안됨, 이모티콘을 적절히 사용하고 기호는 사용하지 마세요. 답변은 최대한 간결하고 요약해서, 각 장소에 대한 설명은 한 문장으로 작성하고 최대 3개까지 추천해 주세요.`
          },
          {
            role: 'user',
            content: input
          }
        ],
        temperature: 0.7,
        top_p: 0.95,
        max_tokens: 150,
      };
      

      const response = await axios.post(
        'https://a1418openai.openai.azure.com/openai/deployments/A1418openai/chat/completions?api-version=2023-03-15-preview',
        payload,
        { headers }
      );

      if (response.data && response.data.choices) {
        const botMessageContent = response.data.choices[0].message.content.trim();
        const botMessage = { role: 'bot', content: botMessageContent };
        
        setMessages([...messages, userMessage, botMessage]);
      } else {
        console.error("No choices found in response.");
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col w-full h-[80vh] p-4 sm:p-6 bg-gradient-to-br from-green-500 via-blue-700 to-purple-800 rounded-lg shadow-lg max-w-full sm:max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-4">제주도 어디를 가고 싶으세요?</h1>
      <div className="flex-grow p-4 sm:p-6 mb-4 bg-white rounded-lg shadow-inner overflow-y-scroll max-h-[80vh]">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`my-2 sm:my-4 p-3 sm:p-4 rounded-lg ${msg.role === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-200 text-left'}`}
          >
            <strong>{msg.role === 'user' ? '여행자' : '현지인'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow p-3 sm:p-4 border border-gray-300 rounded-l-lg focus:outline-none"
          placeholder="제주 현지인의 추천을 받아보세요"
        />
        <button
          onClick={sendMessage}
          className="p-3 sm:p-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-700 transition duration-300 flex items-center"
        >
          <FaPaperPlane className="mr-3" /> 보내기
        </button>
      </div>
    </div>
  );
};

export default ChatBot;

