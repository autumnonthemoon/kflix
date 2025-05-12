import Row from "../../components/Row";
import Banner from "../../components/Banner";
import { Movie } from "../../data/types/types";
import { useState } from "react";
import PopupCard from "../../components/PopupCard";

interface HomePropsTypes {
  movies: Movie[]
  dramas: Movie[]
  variety: Movie[]
  horrors: Movie[]
  favorite: string[]
  handleFave: (id:string) => void
  baseUrl: string
}

export default function Home(props :HomePropsTypes) {
  const {movies, dramas, variety, horrors, handleFave, favorite, baseUrl } = props

  const [showPopupCard, setShowPopupCard] = useState<Movie>()

  const removeMovie = () => {
    setShowPopupCard(undefined)
  }

  return (
    <main>
      <Banner />
      <Row title="Korean series" isLargeRow={true} movies={dramas} handleFave={handleFave} favorite={favorite}   baseUrl={baseUrl} key={1} setShowPopupCard={setShowPopupCard}/>
      <Row title="Korean movies" isLargeRow={false} movies={movies} handleFave={handleFave} favorite={favorite}  baseUrl={baseUrl}  setShowPopupCard={setShowPopupCard}/>
      <Row title="Korean horror" isLargeRow={false} movies={horrors} handleFave={handleFave} favorite={favorite}  baseUrl={baseUrl}  setShowPopupCard={setShowPopupCard}/>
      <Row title="Korean Comedy" isLargeRow={false} movies={variety} handleFave={handleFave} favorite={favorite}   baseUrl={baseUrl}  setShowPopupCard={setShowPopupCard} />

      <div className={`popup-container ${showPopupCard ? 'show' : 'hide'}`}>
        <PopupCard movie={showPopupCard}  baseUrl={baseUrl} removeMovie={removeMovie} handleFave={handleFave} favorite={favorite} />
      </div>
    </main>
    )
}


