import React, { useState, useEffect, JSX } from "react";
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import "./App.scss";
import Home from "./views/home/Home";
import Favorites from "./views/favorites/Favorites";
import Video from "./views/videoDetail/Video";
import requests from "./data/requests";
import { Movie } from "./data/types/types"
import Nav from "./components/Nav";
import Search from "./views/search/Search";
import { ThemeProvider } from "./context/ThemeContext";
import useFetch from "./hooks/useFetch";

export default function App(): JSX.Element {
	const baseUrl = "https://image.tmdb.org/t/p/original/"
	const { data: dramas, loading: loadingDramas, error: errorDramas } = useFetch<Movie[]>(requests.fetchKoreanDramas)
	const { data: movies, loading: loadingMovies, error: errorMovies } = useFetch<Movie[]>(requests.fetchKoreanMovies)
	const { data: horrors, loading: loadingHorrors, error: errorHorrors } = useFetch<Movie[]>(requests.fetchHorrorMovies)
	const { data: variety, loading: loadingVariety, error: errorVariety } = useFetch<Movie[]>(requests.fetchComedyMovies)

	const [favorite, setFavorite] = useState<string[]>(() => {
		try {
			const data = localStorage.getItem("faves")
			return data ? JSON.parse(data) : []
		} catch {
			return []
		}
	})

	const [allMovies, setAllMovies] = useState<Movie[]>([])
	let findFavorite = allMovies.filter(movie => favorite.includes(movie.id))

	//combine all movies and remove duplicates
	useEffect(() => {
		// Combine all movies or empty arrays
		const combined = [
			...(dramas ?? []),
			...(movies ?? []),
			...(horrors ?? []),
			...(variety ?? []),
		]

		// Remove duplicates by id using a Map
		const uniqueMovies = Array.from(
			new Map(combined.map(movie => [movie.id, movie])).values()
		)

		setAllMovies(uniqueMovies)
	}, [dramas, movies, horrors, variety])

	useEffect(() => {
		localStorage.setItem("faves", JSON.stringify(favorite))
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

	if (loadingDramas || loadingMovies || loadingHorrors || loadingVariety) return <p>Loading...</p>
	if (errorDramas || errorMovies || errorHorrors || errorVariety) return <p>Error loading movies</p>

	return (
		<ThemeProvider>
			<div className="App">
				<BrowserRouter basename={process.env.NODE_ENV === "production" ? "/websitedemo/movie-app" : ""}>
					<Nav show={show} />
					<Routes>
						<Route path="/"
							element={<Home
								movies={movies ?? []}
								dramas={dramas ?? []}
								horrors={horrors ?? []}
								variety={variety ?? []}
								handleFave={handleFave}
								favorite={favorite}
								baseUrl={baseUrl} />}
						/>
						<Route path="/favorites"
							element={<Favorites
								handleFave={handleFave}
								findFavorite={findFavorite}
								baseUrl={baseUrl}
								favorite={favorite} />}
						/>
						<Route path="/details/:id"
							element={<Video />}
						/>
						<Route path="/search"
							element={<Search
								handleFave={handleFave}
								favorite={favorite}
								baseUrl={baseUrl} />}
						/>
					</Routes>
				</BrowserRouter>
			</div>
		</ThemeProvider>
	)
}


