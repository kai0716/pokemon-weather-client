import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.scss";
import { useEffect, useState } from "react";

export default function UploadPage() {
    //useState for weather in main bar
    //   const [weather, setWeather] = useState(null);

    //variables for key and url, can store this in another place in the future
    const urlWeather = `https://api.weatherbit.io/v2.0/current?lat=49.2850&lon=-123.1147`;
    const apiKey = `&key=e840589dcb26493795dcd26a7469f83b&include=minutely`;

    //get the list for the videos
    useEffect(() => {
        axios
            .get(`${urlWeather}${apiKey}`)
            .then((response) => {
                console.log(response.data.data[0].app_temp);
            })
            .catch((err) => console.log(err));
    }, []);


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
        <div className='pokemon'>
            <div className='pokemon__weather'>
                <div className='pokemon__weather-wrapper'>
                    <p className='pokemon__weather-info'>Data</p>
                </div>
            </div>
            <p className='content'>It is ______(fill in with  warm, hot, or cold).  A great mocktail
                to share today with your pokemon is....
            </p>
            <div className='pokemon__mocktail'>
                <div className='pokemon__mocktail-wrapper'>
                    <p className='pokemon__mocktail-info'>Data</p>
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