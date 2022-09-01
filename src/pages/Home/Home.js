import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.scss";
import { useEffect } from "react";

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

            <div className='pokemin__image'>
                <div class="marquee">
                    <div class="marquee-content">
                        <div class="marquee-item">
                            <img src="https://via.placeholder.com/600/000000/FFFFFF/?text=01" alt="" />
                        </div>
                        <div class="marquee-item">
                            <img src="https://via.placeholder.com/600/000000/FFFFFF/?text=01" alt="" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );

}

