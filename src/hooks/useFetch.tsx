import { useEffect, useState } from "react"

export default function useFetch<T = unknown>(url:string) {
	const [data, setData] = useState<T | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<Error | null>(null)
	const baseUrl = "https://api.themoviedb.org/3"

	useEffect(()=> {
		if(!url) return
		fetch(baseUrl + url)
			.then((res) => {
				if(!res.ok) throw new Error("something went wrong")
				return res.json()
			})
			.then((data)=>setData(data.results))
			.catch(setError)
			.finally(() => setLoading(false))
	}, [url])

	return {data, loading, error}
}