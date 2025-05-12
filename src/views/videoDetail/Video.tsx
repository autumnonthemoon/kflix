import { JSX, useEffect, useState } from "react";
import axios from "axios";
import "./Video.scss";

export default function Video():JSX.Element {
  //get video id from url
  let movieId: number = parseInt(window.location.pathname.split("/").pop() || "0", 10)
  const [trailerUrl, setTrailerUrl] = useState("")

  //movie url
  function getMovie(movie:number) {
    const requestUrl = `https://api.themoviedb.org/3/movie/${movie}/videos?api_key=a141a3a7775642eba7f3a71405038590&language=en-US`

    if (movie === null) {
      setTrailerUrl('')
    } else {
      async function fetchData() {
        try {
          const request = await axios.get(requestUrl)

          if(request.data){
            setTrailerUrl(request.data.results[0].key)
            return request
          }
          
        } catch (e) {
          console.warn(e)
        }
      }
      fetchData()
    }
  }

  useEffect(()=>{
    if(movieId){
      getMovie(movieId)
    }
  }, [movieId])

  return (
    <main>{trailerUrl ?
      (<div className="video-row">
        <iframe className="responsive" src={`https://www.youtube.com/embed/${trailerUrl}`} 
        title="YouTube video player" frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>) : (<div className="no_video">No video found</div>)} </main>
  )
}