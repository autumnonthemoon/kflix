import Row from "../../components/Row";
import Banner from "../../components/Banner";
import type { Movie } from "../../data/types/types";
import { useState } from "react";
import PopupCard from "../../components/PopupCard";

interface HomePropsTypes {
	movies: Movie[]
	dramas: Movie[]
	variety: Movie[]
	horrors: Movie[]
	favorite: string[]
	handleFave: (id: string) => void
	baseUrl: string
}

export default function Home({ movies, dramas, variety, horrors, handleFave, favorite, baseUrl }: HomePropsTypes) {
	const [showPopupCard, setShowPopupCard] = useState<Movie>()
	const [visibleRow, setVisibleRow] = useState(0)

	const removeMovie = () => {
		setShowPopupCard(undefined)
	}

	return (
		<main>
			<Banner />
			{visibleRow >= 0 && <Row title="Korean series" isLargeRow={true} movies={dramas} handleFave={handleFave} favorite={favorite} baseUrl={baseUrl} key={1} setShowPopupCard={setShowPopupCard} onComplete={() => setVisibleRow(1)} />}
			{visibleRow >= 1 && <Row title="Korean movies" isLargeRow={false} movies={movies} handleFave={handleFave} favorite={favorite} baseUrl={baseUrl} setShowPopupCard={setShowPopupCard} onComplete={() => setVisibleRow(2)} />}
			{visibleRow >= 2 && <Row title="Korean horror" isLargeRow={false} movies={horrors} handleFave={handleFave} favorite={favorite} baseUrl={baseUrl} setShowPopupCard={setShowPopupCard} onComplete={() => setVisibleRow(3)} />}
			{visibleRow >= 3 && <Row title="Korean Comedy" isLargeRow={false} movies={variety} handleFave={handleFave} favorite={favorite} baseUrl={baseUrl} setShowPopupCard={setShowPopupCard} />}

			<div className={`popup-container ${showPopupCard ? "show" : "hide"}`}>
				<PopupCard movie={showPopupCard} baseUrl={baseUrl} removeMovie={removeMovie} handleFave={handleFave} favorite={favorite} />
			</div>
		</main>
	)
}


