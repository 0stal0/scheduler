import React from 'react';
import ChatBot from './ChatBot';

const Dashboard = () => {
    return (
      <div className="h-screen flex flex-col">
        <header className="bg-blue-500 text-white p-4">
          <h1 className="text-2xl">히위고 대시보드</h1>
        </header>
        <main className="flex-1">
          <ChatBot />
        </main>
      </div>
    );
  };

export default Dashboard;
