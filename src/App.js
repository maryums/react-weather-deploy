import React, { useState } from 'react';
import axios from 'axios';


function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');



  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=f9b8f25a74c92adeeb7d4391ccb86814`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then(
        (response) => {
          setData(response.data)
          console.log(response.status);
          console.log(response.data);
        })
        .catch(error => {
          console.log(error.response.data.message);
          const errorText = error.response.data.message;
          console.log(error.response.data);
          document.querySelector("#citynotfound").innerHTML = errorText;
        })
    }
  }

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

          <div className="top-error"> <h1 id="citynotfound"></h1></div>

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
              <p className="bold">
                {data.main ? <p>{data.main.feels_like.toFixed()} </p> : null}</p>
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
      </div>
    </div>
  );

}

export default App;