import React, { useEffect, useState } from 'react';
import './App.css';

const api = {
  key: "7349558356a51c6375015115f3ca8b8e",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query,setQuery]=useState('');
  const [weather,setWeather]=useState({});

  const search= (evt)=>{
    if(evt.key==='Enter'){
    if(query===''){
      alert('plz enter city name');
    }
    else{
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=>res.json())
      .then(res=>{console.log(res);
      setWeather(res);
       setQuery('');
       console.log(weather);
     }
      ).catch(err=>{
        console.log(err);
      })
    }
    }
  }

  useEffect(()=>{
    if(navigator.geolocation){
      getposition().then(position=>{
        console.log(position);
        getWeather(position.coords.latitude,position.coords.longitude)
      }).catch(err=>{
        alert('you did not allow to get your location, please allow it');
      })
    }
  },[])

const getposition=()=>{
  return new Promise((resolve,reject,options)=>{
    navigator.geolocation.getCurrentPosition(resolve,reject,options);
  })
}

const getWeather=async(lat,lon)=>{
  const api_call = await fetch(
    `${api.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}`
  );
  const data= await api_call.json();
  setWeather(data);
}

const datebuilder=(d)=>{
  const months=['january','February','march','April','May','June','July','August','September'
,'October','November','December'];
const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let day=days[d.getDay()];
let date=d.getDate();
let month=months[d.getMonth()];
let year=d.getFullYear();

return `${day}, ${date} ${month} ${year}`;
}

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 20) ? 'app warm' : 'app') : 'app'}>
     <main>
      <div className='search-box'>
        <input type="text" className='search-bar'
        placeholder='Search.......'
        value={query}
        onChange={e=> setQuery(e.target.value)}
        onKeyPress={search}
        />
      </div>
      {
        (typeof weather.main!=='undefined') ? (
          <div>
          <div className='location-box'>
         <div className='location'>{weather.name}, {weather.sys.country}</div>
         <div className='date'>{datebuilder(new Date())}</div>
          </div>
          <div className='weather-box'>
            <div className='temp'>
            {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
          </div>
        ):('')
      }
     </main>
    </div>
  );
}

export default App;
