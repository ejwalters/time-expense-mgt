import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';


function App() {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');

  console.log('Rendering App component');


  useEffect(() => {
    // Fetch data from our test endpoint
    fetch('/fetchSampleCollection')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    console.log('Running useEffect hook');
    // Fetch data from our test endpoint
    fetch('/fetchUsers')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUser(data[0]);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <p>Server says: {message} {user.fullName} {user.email}</p>
      </header>
    </div>
  );
}

export default App;
