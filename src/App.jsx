import './App.css'
import { useState, useRef } from 'react';

function App() {
  const apiKey = "57dd3971c1a08c4dd7ae810a77b7965c";

  const [value, setValue] = useState(''); 
  const [city, setCity] = useState('City');
  const [temp, setTemp] = useState('');
  const [descrip, setDescrip] = useState('');
  const [WeathIcon, setWeathIcon] = useState('');
  const [country, setCountry] = useState('');
  const [humi, setHumi] = useState('');
  const [wind, setWind] = useState('');

  const ref = useRef();
  
  const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
      return data;
  }
    
  const showWeatherData = async(city) => {
    const data = await getWeatherData(city);
      setCity(data.name);
      setTemp(parseInt(data.main.temp));
      setDescrip(data.weather[0].description)
      setWeathIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
      setCountry(`https://flagsapi.com/${data.sys.country}/flat/32.png/`);
      setHumi(data.main.humidity);
      setWind(data.wind.speed);

      ref.current.style.display=('')
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    const city = value;
    showWeatherData(city);
    setValue('');
  };

  return (
    <div className='app'>
      <form onSubmit={handleSubmit}>
        <h3>Confira o clima de uma cidade:</h3>
        <div className='form-input'>
          <input 
            type='text' 
            value={value}
            placeholder='Digite o nome de uma cidade'
            required 
            onChange={(e) => setValue(e.target.value)}
          />
          <button name='search'>
            <i className='fa-solid fa-search'></i>
          </button>
        </div>
      </form>
      <div className='weather-data' ref={ref} style={{display: 'none'}}>
        <h2><i className="fa-solid fa-location-dot"></i>
          <span>{city}</span>
          <img className='country' src={country}/>
        </h2>

        <p className='temp'>{temp}<span>&deg;C</span></p>

        <div className='description'>
          <p>{descrip}</p>
          <img src={WeathIcon} alt='Weather conditions'/>
        </div>

        <div className='details'>
          <p className='humidity'>
          <i className="fa-solid fa-droplet"></i>
            {humi}%
          </p>
          
          <p className='wind'>
          <i className="fa-solid fa-wind"></i>
            {wind}km/h
          </p>
        </div>
      </div>
    </div>
  )
}

export default App;
