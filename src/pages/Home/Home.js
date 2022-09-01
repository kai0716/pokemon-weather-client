import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import './Home.scss'

export default function UploadPage() {

    let nav = useNavigate();
    const Navigate = (event) => {
        event.preventDefault();
        console.log(event.target.title.value);

        axios.post(`http://localhost:8080/videos`, {
            title: event.target.title.value,
            description: event.target.description.value
        })
            .then(response => {
                console.log(response.data);
                alert("Upload success");
                setTimeout(() => {
                    nav('/');
                }, 1000);
            })
            .catch((err) => console.log(err));

    }

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
            <div className='pokemin__mocktail'>
                <div className='pokemin__mocktail-wrapper'>
                    <p>Data</p>
                </div>
            </div>

            <div className='pokemin__image'>

            </div>

        </div>
    )
}