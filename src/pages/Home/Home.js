// import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.scss";
import { useEffect, useState } from "react";

export default function UploadPage() {
  //useState for weather in main bar
  const [temp, setTemp] = useState("");
  const [background, setBackground] = useState(
    `http://localhost:8080/images/sun.jpg`
  ); //hardcoded picture of the sun from database
  const [city, setCity] = useState("Vancouver");

  const [mocktail, setMocktails] = useState("");
  const [mocktailIng, setMocktailsIng] = useState("");

  const [_pokemonData, setPokemonData] = useState(null);
  // const [pokemonDetail, setPokemonDetail] = useState(null);
  const [list, setList] = useState([]);
  // const weather = "sunny";

  //current location and default is Vancouver,BC
  const [currentLocation, setCurrentLocation] = useState({
    lat: 49.28507657283974,
    lng: -123.11461581337777,
  });

  //Geolocation for user
  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let userLat = position.coords.latitude;
        let userLng = position.coords.longitude;
        setCurrentLocation({ lat: userLat, lng: userLng });
      });
    } else {
      //alert!
      alert(`Geolocation is not supported by your browser.`);
    }
  };

  //variables for weather locations, API key, and the weatherbit url
  const apiKey = `${process.env.REACT_APP_APIKEY}`;
  const urlWeather = `https://api.weatherbit.io/v2.0/current?lat=${currentLocation.lat}&lon=${currentLocation.lng}&key=${apiKey}`;

  //get the temperature
  //put the temperature in the data spot
  const getTemp = () => {
    getGeoLocation();
    axios
      .get(`${urlWeather}`)
      .then((response) => {
        const app_temp = response.data.data[0].app_temp;
        const city = response.data.data[0].city_name;
        setTemp(app_temp);
        setCity(city);
        console.log(response.data.data[0]);
      })
      .catch((err) => console.log(err));
  };
  //default background it the sun picture
  //get precip
  //if precep is >=1 than rain picture
  const getBackground = () => {
    getGeoLocation();
    axios
      .get(`${urlWeather}`)
      .then((response) => {
        const precip = response.data.data[0].precip;
        const snow = response.data.data[0].snow;
        const cloud = response.data.data[0].clouds;
        const fog = response.data.data[0].fog;
        if (precip >= 1) {
          axios
            .get(`http://localhost:8080/images/rain.jpg`)

            .then((response) => {
                const app_temp = response.data.data[0].app_temp;
                // const app_temp = Math.round(app_tempK - 273.15);
                setTemp(app_temp);
            })
            .catch((err) => console.log(err));
    };
    //default background it the sun picture
    //get precip
    //if precep is >=1 than rain picture
    const getBackground = () => {
        axios
            .get(`${urlWeather}${apiKey}`)
            .then((response) => {
                const precip = response.data.data[0].precip;
                const snow = response.data.data[0].snow;
                const cloud = response.data.data[0].clouds;
                const fog = response.data.data[0].fog;
                if (precip >= 1) {
                    axios
                        .get(`http://localhost:8080/images/rain.jpg`)
                        .then((response) => {
                            setBackground(`http://localhost:8080/images/rain.jpg`); //set to picture of rain
                        })
                        .catch((err) => console.log(err));
                } else if (snow >= 1) {
                    axios
                        .get(`http://localhost:8080/images/snow.jpg`)
                        .then((response) => {
                            setBackground(`http://localhost:8080/images/snow.jpg`); //set to picture of snow
                        })
                        .catch((err) => console.log(err));
                } else if (cloud > 50) {
                    axios
                        .get(`http://localhost:8080/images/clouds.jpg`)
                        .then((response) => {
                            setBackground(`http://localhost:8080/images/clouds.jpg`); //set to picture of cloud
                        })
                        .catch((err) => console.log(err));
                } else if (fog >= 35) {
                    axios
                        .get(`http://localhost:8080/images/fog.jpg`)
                        .then((response) => {
                            setBackground(`http://localhost:8080/images/fog.jpg`);
                        })
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));
    };
    //get mocktails
    const getMocktails = () => {
        axios
            .get(`http://localhost:8080/Mocktails`)
            .then((response) => {
                response.data.map((e) => {
                    if (temp <= 5) {
                        if (e.weather === "cold") {
                            setMocktails(e.name); //set to picture of cloud
                            setMocktailsIng(e.method);
                        }
                    } else if (temp <= 15) {
                        if (e.weather === "warm") {
                            setMocktails(e.name); //set to picture of cloud
                            setMocktailsIng(e.method);
                        }
                    } else if (temp > 15) {
                        if (e.weather === "hot") {
                            setMocktails(e.name); //set to picture of cloud
                            setMocktailsIng(e.method);
                        }
                    }
                });
            })
            .catch((err) => console.log(err));
    };
    //work on getting mocktail data once server is running
    useEffect(() => {
        getTemp();
        getBackground();
        getMocktails();
    }, []);
    /*
     *************************************************************************
     *Kayle's changes
     */
    //--------------------------Kevin Part------------------------------------
    const [pokemonData, setPokemonData] = useState(null);
    const [pokemonDetail, setPokemonDetail] = useState(null);
    const [list, setList] = useState([]);
    const weather = "sunny";
    const findPokemonWithName = (pokemonName) => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then((response) => {
                const pokemon = {
                    name: pokemonName,
                    url: response.data.sprites.front_default,
                };
                setList((prev) => [...prev, pokemon]);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  //get mocktails
  const getMocktails = () => {
    axios
      .get(`http://localhost:8080/Mocktails`)
      .then((response) => {
        response.data.map((e) => {
          if (temp <= 5) {
            if (e.weather === "cold") {
              setMocktails(e.name); //set to picture of cloud
              setMocktailsIng(e.method);
            }
          } else if (temp <= 15) {
            if (e.weather === "warm") {
              setMocktails(e.name); //set to picture of cloud
              setMocktailsIng(e.method);
            }
          } else if (temp > 15) {
            if (e.weather === "hot") {
              setMocktails(e.name); //set to picture of cloud
              setMocktailsIng(e.method);
            }
          }
        });
      })
      .catch((err) => console.log(err));
  };

  //work on getting mocktail data once server is running
  useEffect(() => {
    getTemp();
    getBackground();
    getMocktails();
  }, []);

  const findPokemonWithName = (pokemonName) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        const pokemon = {
          name: pokemonName,
          url: response.data.sprites.front_default,
        };
        setList((prev) => [...prev, pokemon]);
      })
      .catch((error) => {
        console.error(`Couldn't get a response from the API: ${error}`);
      });
  };

  //function created for getting type of pokemon but didn't have time to fully implement
  // const getType = (type) => {
  //   axios.get("https://pokeapi.co/api/v2/type/").then((response) => {
  //     let type = response.data.results.find((e) => e.name === type);
  //     console.log(type.url);
  //     axios.get(`${type.url}`).then((response) => {
  //       console.log(response.data);
  //     });
  //   });
  // };

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?limit=200")
      .then((response) => {
        setPokemonData(response.data.results);
        response.data.results.forEach((element) => {
          findPokemonWithName(element.name);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  return (
    <div
      className="pokemon"
      style={{
        backgroundImage: `url(${background})`,
        height: "100",
        width: "100",
        backgroundSize: "cover",
        backgroundRepeat: "none",
      }}
    >
      <div className="pokemon__weather">
        <div className="pokemon__weather-wrapper">
          <p className="pokemon__weather-info">{temp}ºC</p>
          <p className="pokemon__weather-info--city">{city}</p>
        </div>
      </div>
      <div className="content">
        <p>A great mocktail to catch one of these pokemon....</p>
        <p className="pokemon__mocktail-info">{mocktail}</p>
      </div>
      <div className="pokemon__mocktail">
        <div className="pokemon__mocktail-wrapper">
          <p className="pokemon__mocktail-p">{mocktailIng}</p>
        </div>
      </div>
      <div className="pokemon__image">
        <div className="marquee">
          <div className="marquee-content">
            {list &&
              shuffleArray(list).map((e, i) => {
                return (
                  <div key={i} className="marquee-item">
                    <img src={e.url} alt="pokemon image" />
                  </div>
                );
              })}
          </div>

        </div>
    );
}