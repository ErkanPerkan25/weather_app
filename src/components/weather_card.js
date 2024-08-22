import React, {useState, useEffect} from "react";
import { useGeolocated } from "react-geolocated";

const Weather_Card = () =>{
    const [celsius, setCelsius] = useState(null);
    const [fahrenheit, setFahrenheit] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [region, setRegion] = useState(null);
    const [city, setCity] = useState(null);

    const WEATHER_API_KEY = "b2944cf156c5494f9ae223216240702"; 
    const WEATHER_API_URL = "http://api.weatherapi.com/v1";

    const {coords, isGeolocationAvailable, isGeolocationEnable} =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });


    async function getData() {
        if(coords){
            const url = `${WEATHER_API_URL}/current.json?key=${WEATHER_API_KEY}&q=${coords["latitude"]},${coords["longitude"]}`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                  throw new Error(`Response status: ${response.status}`);
                }

                const json = await response.json();

                setCelsius(json.current["temp_c"]);
                setFahrenheit(json.current["temp_f"]);
                setHumidity(json.current["humidity"]);
                setRegion(json.location["region"]);
                setCity(json.location["name"]);

                console.log(json);
            } catch (error) {
                console.error(error.message);
            }
        }
        else{
            console.error("Geoloaction is not available!");
        }
    }

    useEffect(() =>{
        getData();
    },[coords])

    return(
        <div id="card">
            <h1>Weather App</h1>
            <div id="weather">
                <h4>{city},{region}</h4>
                <p>Celsius: {celsius} °C</p>
                <p>Fahrenheit: {fahrenheit} °F</p>
                <p>Humidity: {humidity} %</p>
            </div>
        </div>
    );
};

export default Weather_Card;
