// @ts-nocheck
"use client";
import { useState, useEffect, useRef } from 'react';

export default function HomePage() {
  const [threads, setThreads] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState('patient');
  const [isChatBoxVisible, setIsChatBoxVisible] = useState(false);

  const addMessage = () => {
    const updatedThreads = [...threads, { user: currentUser, message: newMessage }];
    setThreads(updatedThreads);
    setNewMessage('');
  };

  const toggleChatBox = (e) => {
    e.preventDefault();
    setIsChatBoxVisible((prevVisibility) => !prevVisibility);
  };

  const switchToDoctor = () => {
    setCurrentUser('doctor');
  };

  const switchToPatient = () => {
    setCurrentUser('patient');
  };

  const getAvatar = (user) => {
    return user === 'patient' ? '/patient-avatar.png' : '/doctor-avatar.png';
  };

  const getRoleName = () => {
    return currentUser === 'patient' ? 'Patient' : 'Doctor';
  };

  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [threads]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b relative">
      <title>livewell</title>
      <div className="fixed left-4 top-4 flex flex-col space-y-2">
        <button
          className={`p-2 rounded-full ${currentUser === 'doctor' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
          onClick={switchToDoctor}
        >
          I am a Doctor
        </button>
        <button
          className={`p-2 rounded-full ${currentUser === 'patient' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
          onClick={switchToPatient}
        >
          I am a Patient
        </button>
      </div>

      {isChatBoxVisible && (
        <div className="fixed bottom-4 right-4 bg-white p-4 border border-gray-300 rounded shadow-md z-10 max-w-sm">
          <div className="flex items-center justify-between border-b p-2">
            <div className="flex items-center">
              <img
                className="rounded-full w-10 h-10 ml-1"
                src={getAvatar(currentUser)}
                alt={`${currentUser} Avatar`}
              />
              <div className="pl-2">
                <div className="font-semibold">
                  <a className="hover:underline" href="#">
                    {getRoleName()}
                  </a>
                </div>
                <div className="text-xs text-gray-600">Online</div>
              </div>
            </div>

          </div>
          <div ref={messagesContainerRef} className="flex flex-col" style={{ minHeight: '200px', maxHeight: '400px', overflowY: 'auto' }}>
            {threads.map((thread, index) => (
              <div
                key={index}
                className={`flex items-center mb-6 ${thread.user === 'patient' ? 'flex-row-reverse' : 'flex-row'
                  }`}
              >
                <div className="flex-none flex flex-col items-center space-y-2 ml-4">
                  <img
                    className="rounded-full w-12 h-12"
                    src={getAvatar(thread.user)}
                    alt={`${thread.user} Avatar`}
                  />
                  <a href="#" className="block text-sm font-medium hover:underline">
                    {thread.user === 'patient' ? 'patient' : 'doctor'}
                  </a>
                </div>
                <div
                  className={`flex-1 ${thread.user === 'patient' ? 'bg-green-100 text-gray-800' : 'bg-gray-200 text-black'
                    } p-4 rounded-lg mb-4`}
                >
                  <div className="text-base">{thread.message}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center border-t p-2">
            <div>
              <button className="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button" onClick={addMessage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            <div className="w-full mx-2">
              <input
                className="w-full rounded-full border border-gray-200 p-2"
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Aa"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-4 right-4 z-20 flex flex-col space-y-2">
        <div
          onClick={toggleChatBox}
          className={`intercom-lightweight-app-launcher-icon intercom-lightweight-app-launcher-icon-open ${isChatBoxVisible ? 'hidden' : 'block'
            }`}
          style={{ transition: 'transform 0.3s ease-in-out', transform: 'scale(0.8)' }}
          onMouseEnter={() =>
            (document.querySelector('.intercom-lightweight-app-launcher-icon-open') as HTMLElement).style.transform =
            'scale(1)'
          }
          onMouseLeave={() =>
            (document.querySelector('.intercom-lightweight-app-launcher-icon-open') as HTMLElement).style.transform =
            'scale(0.3)'
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 32">
            <path
              d="M28 32s-4.714-1.855-8.527-3.34H3.437C1.54 28.66 0 27.026 0 25.013V3.644C0 1.633 1.54 0 3.437 0h21.125c1.898 0 3.437 1.632 3.437 3.645v18.404H28V32zm-4.139-11.982a.88.88 0 00-1.292-.105c-.03.026-3.015 2.681-8.57 2.681-5.486 0-8.517-2.636-8.571-2.684a.88.88 0 00-1.29.107 1.01 1.01 0 00-.219.708.992.992 0 00.318.664c.142.128 3.537 3.15 9.762 3.15 6.226 0 9.621-3.022 9.763-3.15a.992.992 0 00.317-.664 1.01 1.01 0 00-.218-.707z"
            ></path>
          </svg>
        </div>
        <text className=" text-white p-2 rounded focus:outline-none">chat here</text>
      </div>
    </main>
  );
}
