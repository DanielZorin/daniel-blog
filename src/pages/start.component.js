import React from 'react';

const StartPage = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col w-full h-full items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Welcome</h1>
        <div className="space-x-4">
          <a
            href="/en"
            className="text-2xl font-semibold text-blue-500 hover:text-blue-700 transition duration-300"
          >
            English
          </a>
          <a
            href="/ru"
            className="text-2xl font-semibold text-red-500 hover:text-red-700 transition duration-300"
          >
            Русский
          </a>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
