import React, { useState, useEffect, JSX } from "react";
import "./Banner.scss";
import axios from "../axios";
import requests from "../data/requests";
import { Link } from "react-router-dom";
import { Movie } from "../data/types/types";
const baseUrl = "https://image.tmdb.org/t/p/original/";

export default function Banner():JSX.Element {
    const [movie, setMovie] = useState<Movie>()
    
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(requests.fetchKoreanDramas)
                const results = response.data.results

                if(!results || results.length === 0){
                    console.warn("No dramas found")
                }

                const randomIndex = Math.floor(Math.random() * results.length)
                setMovie(results[randomIndex])

            } catch (e) {
                console.warn(e)
            }
        }
        fetchData()
    }, [])

    function truncate(str:string, n:number) {
        return str?.length > n ? str.slice(0, n - 3) + "..." : str
    }

    return (
        <>
            {movie &&
                (<header className="header" style={{ backgroundImage: `url("${baseUrl}${movie?.backdrop_path}")` }}>
                    <div className="header-description">
                        <h1>{movie?.name || movie?.title || movie?.original_name}</h1>
                        {movie?.overview && <h2>{truncate(movie?.overview, 250)}</h2>}
                        <h3>Rating: {movie.vote_average}</h3>
                        <div className="banner-buttons">
                            <Link to={`/details/${movie.id}`} state={{ movie: movie.id }}>
                                <button className="banner-button">Play</button>
                            </Link>
                            <Link to={"/favorites"}><button className="banner-button">My list</button>
                            </Link>
                        </div>
                    </div>
                </header>)}
        </>
    )
}