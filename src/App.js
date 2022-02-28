import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';




function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=f9b8f25a74c92adeeb7d4391ccb86814`


  const searchLocation = (event) => {

    if (event.key === 'Enter') {
      handleReset();
      axios.get(url).then(
        (response) => {
          setData(response.data)
        })
        .catch(error => {
          setErrorMessage(error.response.data.message);
        })
    }
  }

  const handleReset = (e) => {
    // e.preventDefault();
    console.log(location, data);
    // clearing the values
    setLocation("");
    setData({});
    setErrorMessage("");
  };


  return (
    <div className="App">
      <div className='search'>
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />



      </div>

      <div className="container">
        <div className="top">


          <div className="location">
            <p>{data.name}</p>
          </div>

          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()} F</h1> : null}
          </div>

          <div className="description">
            {data.weather ? <p>{data.weather[0].main} </p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()} </p> : null}
              <p>Feels Like </p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}</p> : null}
              <p>Humidity</p>
            </div>
            <div className='wind'>
              {data.wind ? <p>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>

          </div>
        }

        {errorMessage && (
          <h3 className="error center"> {errorMessage} </h3>
        )
        }




      </div>
    </div>
  );

}

export default App;