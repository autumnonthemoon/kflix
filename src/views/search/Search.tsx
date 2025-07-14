import { JSX, useEffect, useMemo, useState } from "react"
import "./Search.scss"
import requests from "../../data/requests"
import { Link } from "react-router-dom"
import { Movie } from "../../data/types/types"
import PopupCard from "../../components/PopupCard"
import useFetch from "../../hooks/useFetch"

interface FetchedItem {
	name: string
	id: string
	backdrop_path?: string
	original_name?: string
	title?: string
	overview?: string
	vote_average?: string
	poster_path?: string
}

interface SearchPropsTypes {
	baseUrl: string
	handleFave: (id: string) => void
	favorite: string[]
}

export default function Search(props: SearchPropsTypes): JSX.Element {
	const { baseUrl, handleFave, favorite } = props
	const [allContent, setAllContent] = useState<FetchedItem[]>([])
	const [filteredContent, setFilteredContent] = useState<FetchedItem[]>([])
	const [searchTerm, setSearchTerm] = useState<string>("")
	const [showPopup, setShowPopup] = useState<Movie>()
	const { data: dramasRes, loading: loadingDramas, error: errorDramas } = useFetch<Movie[]>(requests.fetchKoreanDramas)
	const { data: moviesRes, loading: loadingMovies, error: errorMovies } = useFetch<Movie[]>(requests.fetchKoreanMovies)
	const { data: horrorsRes, loading: loadingHorrors, error: errorHorrors } = useFetch<Movie[]>(requests.fetchHorrorMovies)
	const { data: varietyRes, loading: loadingVariety, error: errorVariety } = useFetch<Movie[]>(requests.fetchComedyMovies)

	useEffect(() => {

		console.log(dramasRes, moviesRes, horrorsRes, varietyRes)
		if (!dramasRes && !moviesRes && !horrorsRes && !varietyRes) return

		const combined = [
			...(varietyRes ?? []),
			...(dramasRes ?? []),
			...(moviesRes ?? []),
			...(horrorsRes ?? [])]

		setAllContent(combined)
	}, [varietyRes, dramasRes, moviesRes, horrorsRes])

	useEffect(() => {
		const results = allContent.filter((item) =>
			(item.title || item.name).toLowerCase().includes(searchTerm.toLowerCase())
		)

		if (searchTerm === "") {
			setFilteredContent([])
		} else {
			setFilteredContent(results)
		}
	}, [searchTerm])

	const removeMovie = () => {
		setShowPopup(undefined)
	}

	return <main className="search-container">
		<input type="text" 
			className="search-bar" 
			placeholder="Search something.." 
			value={searchTerm} onChange={(e) => 
			setSearchTerm(e.target.value)} 
		/>

		<div className="results">
			{filteredContent.length > 0 && filteredContent.map((movie: Movie, index) => {
				return movie.backdrop_path && <div className="poster-image poster-small" key={index} onClick={() => setShowPopup(movie)}>
					<img className="row-poster row-posterSmall"
						src={`${baseUrl}${movie.backdrop_path}`} alt={movie.name}
					/>
					<div className="info">
						<div className="rating">Rating: {movie.vote_average} </div>
						<div className="title">{movie?.name || movie?.title || movie?.original_name}</div>
						<div onClick={(e) => { handleFave(movie.id); e.stopPropagation() }} className="thumbnail-icons-actions"> <svg
							id="heart"
							viewBox="0 -28 512.00002 512"
							className={favorite.includes(movie.id) ? "favorite" : "notFavorite"}
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0" />
						</svg>
							<Link to={`/details/${movie.id}`} state={{ movie: movie.id }}> <svg className="video-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-48-247.616L668.608 512 464 375.616v272.768zm10.624-342.656 249.472 166.336a48 48 0 0 1 0 79.872L474.624 718.272A48 48 0 0 1 400 678.336V345.6a48 48 0 0 1 74.624-39.936z" /></svg></Link>
						</div>
					</div>
				</div>
			})}
		</div>

		<div className={`popup-container ${showPopup ? "show" : "hide"}`}>
			<PopupCard movie={showPopup} baseUrl={baseUrl} removeMovie={removeMovie} handleFave={handleFave} favorite={favorite} />
		</div>
	</main>
}