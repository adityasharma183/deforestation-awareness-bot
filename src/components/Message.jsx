import React from 'react';

export default function Message({ role, content }) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`${isUser ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800'} max-w-[80%] p-3 rounded-xl`}>
        <div style={{ whiteSpace: 'pre-wrap' }}>{content}</div>
      </div>
    </div>
  );
}
