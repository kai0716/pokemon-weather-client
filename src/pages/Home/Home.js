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
  const [mocktail, setMocktails] = useState("");

  //variables for key and url, can store this in another place in the future
  const urlWeather = `https://api.weatherbit.io/v2.0/current?lat=49.2850&lon=-123.1147`;
  const apiKey = `&key=960a3e9c92ed4f7bb9cedd0bd9a99c03`;
  const apiK = `01f041aa5c5772c110be5f9ac7132843`;
  const lat = `49.2850`;
  const lon = `-123.1147`;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiK}`;

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
        console.log(response.data.data[0]);
        const precip = response.data.data[0].precip;
        const snow = response.data.data[0].snow;
        const cloud = response.data.data[0].clouds;
        const fog = response.data.data[0].fog;
        if (precip >= "1") {
          axios
            .get(`http://localhost:8080/images/rain.jpg`)
            .then((response) => {
              setBackground(response.data); //set to picture of rain
            })
            .catch((err) => console.log(err));
    }, []);

        } else if (snow >= "1") {
          axios
            .get(`http://localhost:8080/images/snow.jpg`)
            .then((response) => {
              setBackground(response.data); //set to picture of snow
            })
            .catch((err) => console.log(err));
        } else if (cloud >= "1") {
          axios
            .get(`http://localhost:8080/images/cloud.jpg`)
            .then((response) => {
              setBackground(response.data); //set to picture of cloud
            })
            .catch((err) => console.log(err));
        } else if (fog >= "35") {
          axios
            .get(`http://localhost:8080/images/fog.jpg`)
            .then((response) => {
              setBackground(response.data);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  //get snow
  //if snow is >=1 than snow picture
  // const getSnow = () => {
  //   axios
  //     .get(`${urlWeather}${apiKey}`)
  //     .then((response) => {
  //       const snow = response.data.data[0].snow;
  //       if (snow >= "1") {
  //         axios
  //           .get(`http://localhost:8080/images/snow.jpg`)
  //           .then((response) => {
  //             setBackground(response.data); //set to picture of snow
  //           })
  //           .catch((err) => console.log(err));
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  //get cloud
  //if clouds are >50 than picture is cloudy
  // const getCloud = () => {
  //   axios
  //     .get(`${urlWeather}${apiKey}`)
  //     .then((response) => {
  //       const cloud = response.data.data[0].clouds;
  //       if (cloud >= "1") {
  //         axios
  //           .get(`http://localhost:8080/images/cloud.jpg`)
  //           .then((response) => {
  //             setBackground(response.data); //set to picture of cloud
  //           })
  //           .catch((err) => console.log(err));
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  //get fog
  //if fog are >35 than picture is cloudy
  // const getFog = () => {
  //   axios
  //     .get(`${urlWeather}${apiKey}`)
  //     .then((response) => {
  //       const fog = response.data.data[0].fog;
  //       if (fog >= "35") {
  //         axios
  //           .get(`http://localhost:8080/images/fog.jpg`)
  //           .then((response) => {
  //             setBackground(response.data);
  //           })
  //           .catch((err) => console.log(err));
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  //get mocktails
  const getMocktails = () => {
    axios
      .get(`http://localhost:8080/Mocktails`)
      .then((response) => {
        if (temp < "5") {
          setMocktails(response.data.weather.cold); //set to picture of cloud
        } else if (temp < "15") {
          setMocktails(response.data.weather.warm); //set to picture of cloud
        } else {
          setMocktails(response.data.weather.hot); //set to picture of cloud
        }
      })
      .catch((err) => console.log(err));
  };

  //work on getting mocktail data once server is running

  useEffect(() => {
    getBackground();
    getTemp();
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
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(response => {

            const pokemon = {
                name: pokemonName,
                url: response.data.sprites.front_default
            }

            setList((prev) => [...prev, pokemon])

        }).catch(error => {
            console.error(`Couldn't get a response from the API: ${error}`);
        });
    }

    const getType = (type) => {
        axios.get("https://pokeapi.co/api/v2/type/")
            .then((response) => {

                let type = response.data.results.find((e) => e.name === type);
                console.log(type.url);
                axios.get(`${type.url}`)
                    .then((response) => {
                        console.log(response.data);
                    });

            });
    }

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon/?limit=200').then(response => {
            setPokemonData(response.data.results);

            response.data.results.forEach(element => {
                findPokemonWithName(element.name)

            });


        }).catch(err => {
            console.error(err);
        });
    }, []);

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
        </div>
      </div>
      <p className="content">
        It is ______(fill in with warm, hot, or cold). A great mocktail to share
        today with your pokemon is....
      </p>
      <div className="pokemon__mocktail">
        <div className="pokemon__mocktail-wrapper">
          <p className="pokemon__mocktail-info">{mocktail}</p>

        </div>
      </div>

       <div className='pokemon__image'>
          <div className="marquee">
              <div className="marquee-content">
                  {list && shuffleArray(list).map((e, i) => {
                      return (
                          <div key={i} className="marquee-item">
                              <img src={e.url} alt="pokemon image" />
                          </div>)
                  })}

              </div>
          </div>
      </div>
  );
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

