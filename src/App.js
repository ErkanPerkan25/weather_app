import './App.css';
import WeatherCard from './components/weather_card';

function App() {
  return (
    <div className="App">
        <header className="App-header">
            <h1>Weather App</h1>
        </header>
        <main className="Weather">
            <WeatherCard />
        </main>
    </div>
  );
}

export default App;
