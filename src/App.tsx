import React, { useState, useEffect, JSX } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.scss';
import Home from "./views/home/Home";
import Favorites from "./views/favorites/Favorites";
import Video from "./views/videoDetail/Video";
import axios from "./axios";
import requests from "./data/requests";
import { Movie } from './data/types/types'
import Nav from "./components/Nav";
import Search from "./views/search/Search";

export default function App(): JSX.Element {
  const baseUrl = "https://image.tmdb.org/t/p/original/"
  const [movies, setMovies] = useState<Movie[]>([])
  const [dramas, setDramas] = useState<Movie[]>([])
  const [horrors, setHorrors] = useState<Movie[]>([])
  const [variety, setVariety] = useState<Movie[]>([])
  const [favorite, setFavorite] = useState<string[]>(() => {
    try {
      const data = localStorage.getItem('faves')
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  })

  const [allMovies, setAllMovies] = useState<Movie[]>([])
  let findFavorite = allMovies.filter(movie => favorite.includes(movie.id))

  //get movies from api
  useEffect(() => {
    async function fetchAllMovies() {
      try {
        const requestDramas = await axios.get(requests.fetchKoreanDramas)
        setDramas(requestDramas.data.results)

        const requestMovies = await axios.get(requests.fetchKoreanMovies)
        setMovies(requestMovies.data.results)

        const requestHorrors = await axios.get(requests.fetchHorrorMovies)
        setHorrors(requestHorrors.data.results)

        const requestVariety = await axios.get(requests.fetchComedyMovies)
        setVariety(requestVariety.data.results)

        if (!requestDramas && !requestMovies && !requestVariety && !requestHorrors) {
          return 0
        } else {
          return { requestMovies, requestDramas, requestHorrors, requestVariety }
        }
      } catch (error) {
        console.warn(error)
      }

    }
    fetchAllMovies()
  }, [])

  //combine all movies and remove duplicates
  useEffect(() => {
    let allMovies = [...new Set([...dramas, ...movies, ...horrors, ...variety])]
    allMovies = allMovies.filter((elem, index, self) => self.findIndex(
      (t) => { return (t.id === elem.id) }) === index)
    setAllMovies(allMovies)

  }, [variety])

  useEffect(() => {
    localStorage.setItem('faves', JSON.stringify(favorite))
  }, [favorite])

  function handleFave(id: string) {
    //add favorites
    let filter = favorite.includes(id)

    if (!filter) {
      setFavorite(oldArray => [...oldArray, id])
    }

    // toggle favorite for heart icon
    if (filter) {
      setFavorite(favorite.filter(item => item !== id))
    }
  }

  const [show, handleShow] = useState(false)

  const handleScroll = () => {
    if (window.scrollY >= 10) {
      handleShow(true)
    } else {
      handleShow(false)
    }
  }

  // scroll add bg
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="App">
      <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/websitedemo/movie-app' : ''}>
        <Nav show={show} />

        <Routes>
          <Route path="/" element={<Home movies={movies} dramas={dramas} horrors={horrors} variety={variety} handleFave={handleFave} favorite={favorite} baseUrl={baseUrl} />} />
          <Route path="/favorites" element={<Favorites handleFave={handleFave} findFavorite={findFavorite} baseUrl={baseUrl} favorite={favorite} />} />
          <Route path="/details/:id" element={<Video />} />
          <Route path="/search" element={<Search handleFave={handleFave} favorite={favorite} baseUrl={baseUrl} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


