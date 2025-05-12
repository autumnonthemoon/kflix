// api key here
const API_KEY = "";

const requests = {
    fetchTrending: `trending/all/day?api_key=${API_KEY}&with_genres=35&region=ko&language=ko&with_original_language=ko`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35&language=ko&with_original_language=ko&adult=false&language=en& &sort_by=primary_release_date.desc&certification_country=US&certification.lte=PG-13`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27&language=ko&with_original_language=ko&adult=false&language=en &sort_by=primary_release_date.desct&certification_country=US&certification.lte=PG-13`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749&language=ko&with_original_language=ko&adult=false&language= &sort_by=primary_release_date.desc&certification_country=US&certification.lte=PG-13`,
    fetchKoreanDramas: `/discover/tv?api_key=${API_KEY}&language=en&with_original_language=ko&adult=false &certification_country=US&certification.lte=PG-13`,
    fetchKoreanMovies: `/discover/movie?api_key=${API_KEY}&language=ko&with_original_language=ko&adult=false&language=en &sort_by=primary_release_date.desc&certification_country=US&certification.lte=PG-13`,
}

export default requests
