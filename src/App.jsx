import React, { useState } from 'react';
import './App.css';
import FetchDog from './components/FetchDog';
import Error from './components/Error';
import BanList from './components/BanList';

const api_key = 'live_XkAyXmgogzaKFHKDuXs47EHb32vjgK1Ai36WpyJCeAfBhwFLr8Lg16U2tmqby6ZX';
const headers = { 'x-api-key': api_key };

function App() {
  const [dogData, setDogData] = useState(null);
  const [error, setError] = useState(null);
  const [banList, setBanList] = useState([]);

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
        console.log('Breed data:', breedData);

        // Check if any of the attributes are in the ban list
        const isBanned = Object.entries(breedData).some(([key, value]) => banList.includes(value));

        if (!isBanned) {
          setDogData({ image, breed: breedData });
        } else {
          fetchDogData(); // Fetch another image if the current one is banned
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError('Error generating image: ' + error.message);
      setDogData(null); // Reset dogData to null when an error occurs
    }
  };

  const addToBanList = (value) => {
    setBanList([...banList, value]);
  };

  return (
    <div className="App">
      <div className="outmost-container">
        <h2>Dog! Dog! Dog!</h2>
        <p>Click the button to see some dogs!</p>
        {error && <Error error={error} />} {/* Render Error component if there's an error */}
        {!error && <FetchDog dogData={dogData} addToBanList={addToBanList} />} {/* Render FetchDog component if there's no error */}
        <br />
        <button type="button" className="button" onClick={fetchDogData}>Generate a dog</button>
      </div>
      <BanList banList={banList} /> {/* Render BanList component */}
    </div>
  );
}

export default App;
