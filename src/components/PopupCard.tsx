import { JSX, useEffect } from "react";
import { Movie } from "../data/types/types";
import './PopupCard.scss'
import { Link } from "react-router-dom";

interface PopupCardPropsTypes {
    movie: Movie | undefined
    removeMovie: () => void
    baseUrl: string
    favorite: string[]
    handleFave: (id: string) => void
}

export default function PopupCard(props: PopupCardPropsTypes): JSX.Element {
    const { movie, removeMovie, baseUrl, handleFave, favorite } = props

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === "Escape") {
            removeMovie()
          }
        };
      
        window.addEventListener('keydown', handleKeyDown)
      
        return () => {
          window.removeEventListener('keydown', handleKeyDown)
        }
      }, [])
      

    return <div className="overlay" onClick={removeMovie}>
        <div className="popup" onClick={(e) => e.stopPropagation()}>
            {movie && <div className="content">
                <div
                    className="poster_container"
                    style={{ backgroundImage: `url(${baseUrl + movie.backdrop_path})` }}
                >
                </div>

                <div className="text">
                    <h2>
                        {movie.title ? movie.title : movie.name}
                    </h2>
                    <div className="intro">
                        {movie.overview}
                    </div>

                    <div onClick={(e) => { handleFave(movie.id); e.stopPropagation()}} className="thumbnail_icons_actions"> <svg
                        id="heart"
                        viewBox="0 -28 512.00002 512"
                        className={favorite.includes(movie.id) ? "favorite" : "notFavorite"}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="m471.382812 44.578125c-26.503906-28.746094-62.871093-44.578125-102.410156-44.578125-29.554687 0-56.621094 9.34375-80.449218 27.769531-12.023438 9.300781-22.917969 20.679688-32.523438 33.960938-9.601562-13.277344-20.5-24.660157-32.527344-33.960938-23.824218-18.425781-50.890625-27.769531-80.445312-27.769531-39.539063 0-75.910156 15.832031-102.414063 44.578125-26.1875 28.410156-40.613281 67.222656-40.613281 109.292969 0 43.300781 16.136719 82.9375 50.78125 124.742187 30.992188 37.394531 75.535156 75.355469 127.117188 119.3125 17.613281 15.011719 37.578124 32.027344 58.308593 50.152344 5.476563 4.796875 12.503907 7.4375 19.792969 7.4375 7.285156 0 14.316406-2.640625 19.785156-7.429687 20.730469-18.128907 40.707032-35.152344 58.328125-50.171876 51.574219-43.949218 96.117188-81.90625 127.109375-119.304687 34.644532-41.800781 50.777344-81.4375 50.777344-124.742187 0-42.066407-14.425781-80.878907-40.617188-109.289063zm0 0" />
                    </svg>
                        <Link to={`/details/${movie.id}`} state={{ movie: movie.id }}> <svg className="video_icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-48-247.616L668.608 512 464 375.616v272.768zm10.624-342.656 249.472 166.336a48 48 0 0 1 0 79.872L474.624 718.272A48 48 0 0 1 400 678.336V345.6a48 48 0 0 1 74.624-39.936z" /></svg></Link>
                    </div>
                </div>

            </div>}
        </div>
    </div>
}