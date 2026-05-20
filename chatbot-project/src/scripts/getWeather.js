import { weatherCodes } from "./weatherCodes";

export async function getWeather(lat, lon){
    // -27.4698° S, 153.0251° E
    const url = new URL("https://api.open-meteo.com/v1/forecast")
    url.searchParams.set("latitude", lat)
    url.searchParams.set("longitude", lon)
    url.searchParams.set("current", "temperature_2m,weathercode,windspeed_10m,relative_humidity_2m");
    url.searchParams.set("temperature_unit", "celsius");

    try{
      const res = await fetch(url);
      if(!res.ok){
        throw new Error("could not fetch api data")
      }
      const data = await res.json()
      console.log(data)
      return generateMessage(data)

    } catch(err){
      console.log(err.message)
    }
  }

function generateMessage(data){
return `
Weather in Brisbane now: ${weatherCodes[data.current.weathercode]}
Temperature: ${data.current.temperature_2m}ºC; 
Wind: ${data.current.windspeed_10m} mps; 
Humidity: ${data.current.relative_humidity_2m}%`
}