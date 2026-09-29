import { useEffect, useState } from "react";
import type { JSX } from "react";
import "./Video.scss";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export default function Video(): JSX.Element {
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
				const response = await fetch(
					`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
				)
				if (!isCancelled) {
					const data = await response.json()
					const results = data.results
					if (results.length > 0 && results[0]?.key) {
						setTrailerUrl(results[0].key)
					} else {
						setTrailerUrl("")

					}
				}
			} catch (error) {
				if (!isCancelled) {
					setError(error as Error)
				}
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
		<main className="video-detail">
			{error && "..Something went wrong"}
			{loading ? <>Loading.. </> :
				(trailerUrl !== "" ?
					(<div className="video-row">
						<iframe className="responsive" src={`https://www.youtube.com/embed/${trailerUrl}`}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
					</div>)
					:
					<iframe className="responsive" src={`https://www.youtube.com/embed/Wndx_3B0lgc?si=7BUm7jNLmSNqg_tK`}
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>)}
		</main>
	)
}