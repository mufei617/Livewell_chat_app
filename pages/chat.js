import { useState } from 'react';

const Chat = () => {
  const [threads, setThreads] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState('patient');

  const addMessage = () => {
    const updatedThreads = [...threads, { user: currentUser, message: newMessage }];
    setThreads(updatedThreads);
    setNewMessage('');
  };

  return (
    <div>
      <h1>Chat</h1>

      <div>
        <label>
          Message:
          <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        </label>
        <button onClick={addMessage}>Send</button>
      </div>

      <div>
        {threads.map((thread, index) => (
          <div key={index} style={{ margin: '10px', padding: '5px', border: '1px solid #ccc' }}>
            <strong>{thread.user === 'patient' ? 'Patient:' : 'Doctor:'}</strong> {thread.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
