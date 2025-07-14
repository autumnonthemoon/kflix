import { JSX, useEffect, useState } from "react";
import axios from "axios";
import "./Video.scss";
import { useParams } from "react-router-dom";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY

export default function Video(): JSX.Element {
	//get video id from url
	const { id } = useParams()
	const movieId = Number(id)
	const [trailerUrl, setTrailerUrl] = useState<string>("")
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		let isCancelled = false

		async function fetchData() {
			try {
				setLoading(true)
				const response = await axios.get(
					`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
				)
				if (!isCancelled) {
					const results = response.data.results
					if (results.length > 0 && results[0]?.key) {
						setTrailerUrl(results[0].key)
					} else {
						setTrailerUrl("")
					}
				}
			} catch (error) {
				if (!isCancelled) setError(error as Error)
			} finally {
				if (!isCancelled) setLoading(false)
			}
		}

		if (movieId) fetchData()

		return () => {
			isCancelled = true
		}
	}, [movieId])

	return (
		<main className="video-detail"> {
			loading ? <>Loading.. </> :
				(trailerUrl !== "" ?
					(<div className="video-row">
						<iframe className="responsive" src={`https://www.youtube.com/embed/${trailerUrl}`}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
					</div>)
					:
					(<div className="no-video">No video found..</div>))}</main>
	)
}