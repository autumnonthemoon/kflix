import { JSX, useEffect, useState } from "react";
import axios from "axios";
import "./Video.scss";
import { useParams } from "react-router-dom";

export default function Video(): JSX.Element {
	//get video id from url
	const { id } = useParams()
	const movieId = Number(id)
	const [trailerUrl, setTrailerUrl] = useState<string>("")
	const [error, setError] = useState<Error | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	//movie url
	useEffect(() => {

		let isCancelled = false

		async function fetchData() {
			const requestUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=a141a3a7775642eba7f3a71405038590&language=en-US`

			try {
				setLoading(true)
				const request = await axios.get(requestUrl)
				const result = request.data.results

				if (!isCancelled) {
					if (result.length > 0) {
						setTrailerUrl(result[0].key)
						return request
					} else {
						setTrailerUrl("")
					}
				}

			} catch (e) {
				if (!isCancelled) {
					setError(e as Error)
					console.warn(e)
				}
			} finally {
				setLoading(false)
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