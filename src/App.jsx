import React, { useState } from 'react';
import './App.css';
import FetchDog from './components/FetchDog';
import Error from './components/Error';

const api_key = 'live_XkAyXmgogzaKFHKDuXs47EHb32vjgK1Ai36WpyJCeAfBhwFLr8Lg16U2tmqby6ZX';
const headers = { 'x-api-key': api_key };

function App() {
  const [dogData, setDogData] = useState(null);
  const [error, setError] = useState(null);

  const fetchDogData = async () => {
    try {
      setError(null); // Reset error state
  
      const response = await fetch('https://api.thedogapi.com/v1/images/search', {
        method: 'GET',
        headers: headers,
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch images: ' + response.status);
      }
  
      const data = await response.json();
  
      if (data.length > 0) {
        const image = data[0];
        const breedResponse = await fetch(`https://api.thedogapi.com/v1/breeds/${image.breeds[0]?.id}`, {
          method: 'GET',
          headers: headers,
        });
  
        if (!breedResponse.ok) {
          throw new Error('Failed to fetch breed information: ' + breedResponse.status);
        }
  
        const breedData = await breedResponse.json();
        setDogData({ image, breed: breedData });
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError('Error generating image: ' + error.message);
      setDogData(null); // Reset dogData to null when an error occurs
    }
  };
  

  return (
    <div className="outmost-container">
      <h2>Dog! Dog! Dog!</h2>
      <p>Click the button to see some dogs!</p>
      {error && <Error error={error} />} {/* Render Error component if there's an error */}
      {!error && <FetchDog dogData={dogData} />} {/* Render FetchDog component if there's no error */}
      <br />
      <button type="button" className="button" onClick={fetchDogData}>Generate a dog</button>
    </div>
  );
}

export default App;
