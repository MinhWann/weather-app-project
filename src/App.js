import React, { useState, useEffect} from "react";

const api = {
  key: "24a50225c459b3b6b8cafba62baedc58",
  base: "https://api.openweathermap.org/data/2.5/",
}

function App() {
  const [searchInput, setSearchInput] = useState("");  
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);


  useEffect(() => {
    const fethWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true); 
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`
        const respone = await fetch(url);
        const data = await respone.json();
        if (respone.ok) {
        setWeatherInfo(
          `${data.name} , ${data.sys.country} , ${data.weather[0].description} , ${data.main.temp}℃ `
        );
        setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fethWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="City"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)} 
        ></input>
        <button>Search</button>
      </form>
      {loading ? (<div>Loading...</div>
      ) : (
        <>
        {errorMessage ? (
          <div style={{color: "red"}}>{errorMessage}</div>
        ) : (
          <div>{weatherInfo}</div>
        )}
        </>
      ) }
    </>
  );
}

export default App;
