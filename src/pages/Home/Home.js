// import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.scss";
import { useEffect, useState } from "react";

export default function UploadPage() {
  //useState for weather in main bar
  const [temp, setTemp] = useState("");
  const [background, setBackground] = useState(); //hardcoded picture of the sun from database

  //variables for key and url, can store this in another place in the future
  const urlWeather = `https://api.weatherbit.io/v2.0/current?lat=49.2850&lon=-123.1147`;
  const apiKey = `&key=e840589dcb26493795dcd26a7469f83b&include=minutely`;

  /*
   *************************************************************************
   *Kayle's changes
   */

  //get the temperature
  //put the temperature in the data spot
  const getTemp = () => {
    axios
      .get(`${urlWeather}${apiKey}`)
      .then((response) => {
        const app_temp = response.data.data[0].app_temp;
        setTemp(app_temp);
      })
      .catch((err) => console.log(err));
  };

  //default background it the sun picture
  //get precip
  //if precep is >=1 than rain picture
  const getPrecip = () => {
    axios
      .get(`${urlWeather}${apiKey}`)
      .then((response) => {
        console.log(response.data.data[0].precip);
        const precip = response.data.data[0].precip;
        if (precip >= "1") {
          axios
            .get(`http://localhost:8080`)
            .then((response) => {
              setBackground(response.data); //set to picture of rain
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  //get snow
  //if snow is >=1 than snow picture
  const getSnow = () => {
    axios
      .get(`${urlWeather}${apiKey}`)
      .then((response) => {
        console.log(response.data.data[0].snow);
        const snow = response.data.data[0].snow;
        if (snow >= "1") {
          axios
            .get(`http://localhost:8080`)
            .then((response) => {
              setBackground(response.data); //set to picture of snow
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  //get sun
  //get cloud
  //if clouds are >50 than picture is cloudy
  const getCloud = () => {
    axios
      .get(`${urlWeather}${apiKey}`)
      .then((response) => {
        console.log(response.data.data[0].clouds);
        const cloud = response.data.data[0].clouds;
        if (cloud >= "1") {
          axios
            .get(`http://localhost:8080`)
            .then((response) => {
              setBackground(response.data); //set to picture of cloud
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  //work on getting mocktail data once server is running

  useEffect(() => {
    getPrecip();
    getCloud();
    getSnow();
    getTemp();
  }, []);

  /*
   *************************************************************************
   *Kayle's changes
   */

  return (
    <div className="pokemon">
      <div className="pokemon__weather">
        <div className="pokemon__weather-wrapper">
          <p className="pokemon__weather-info">{temp}ºC</p>
        </div>
      </div>
      <p className="content">
        It is ______(fill in with warm, hot, or cold). A great mocktail to share
        today with your pokemon is....
      </p>
      <div className="pokemon__mocktail">
        <div className="pokemon__mocktail-wrapper">
          <p className="pokemon__mocktail-info">Data</p>
        </div>
      </div>

      <div className="pokemin__image">
        <div class="marquee">
          <div class="marquee-content">
            <div class="marquee-item">
              <img
                src="https://via.placeholder.com/600/000000/FFFFFF/?text=01"
                alt=""
              />
            </div>
            <div class="marquee-item">
              <img
                src="https://via.placeholder.com/600/000000/FFFFFF/?text=01"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
