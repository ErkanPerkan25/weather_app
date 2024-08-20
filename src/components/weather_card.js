import React, {useState, useEffect} from "react";

const WEATHER_API_KEY = "b2944cf156c5494f9ae223216240702"; 
const WEATHER_API_URL = "http://api.weatherapi.com/v1";


const Weather_Card = () =>{
    const [location, setLocation] = useState("");
    const [weatherInfo, setWeaherInfo] = useState();

    const changeLocation = (e) =>{
        setLocation(e.target.value);
    }

    async function getData() {
        try{
            const response = await fetch(`${WEATHER_API_URL}/current.json?key=${WEATHER_API_KEY}&q=${location}`);
            if(!response.ok){
                throw new Error(`Response status: ${response.status}`);            
            }

            setWeaherInfo(response.json());
            console.log(weatherInfo);

        } catch (error){
            console.error(error.message);
        }

    };

    const weatherShow = () =>{
        getData();
    };

    return(
        <div id="card">
            <h1>Weather App</h1>
            <p>Please Enter location</p>
            <input type="text" onChange={changeLocation}/>
            <br/>

            <button onClick={weatherShow}>Submit</button>
            <br/>

            <div id="weatherInfo">
                <p>{weatherInfo}</p>
            </div>
        </div>
    );
};

export default Weather_Card;
