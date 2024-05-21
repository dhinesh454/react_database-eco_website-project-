import React, { useCallback, useEffect, useState ,useMemo} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
const [movies,setMovies] = useState([]);
const [isLoading , setLoading]= useState(false);
const [error , setError]= useState(null);



const  fetchMovieHandler = useCallback(async()=>{
    // fetch('https://swapi.dev/api/films/')
    // .then(res=>{
    //   return res.json()
    // })
    // .then(data => {
    //   const transformedmovies = data.results.map(movieData => {
    //     return{
    //       id:movieData.episode_id,
    //       title:movieData.title,
    //       openingText:movieData.opening_crawl,
    //       releaseDate:movieData.release_date
    //     }
    //   });
    //   setMovies(transformedmovies)
    // })


    setLoading(true);
    setError(null);  //why agin null means previous error has to be cleared

  try {
       
        const res = await fetch('https://swapi.dev/api/films');
        if(!res.ok) {
          throw new Error('something Went Wrong!...')
        }
        const data = await res.json();
  
        const transformedmovies = data.results.map(movieData => {
          return{
            id:movieData.episode_id,
            title:movieData.title,
            openingText:movieData.opening_crawl,
            releaseDate:movieData.release_date
          }
        });
        setMovies(transformedmovies);
      
  } catch (error) {
    setError(error.message)
    console.log(error)
    
  }
  setLoading(false);




},[]);


useEffect(()=>{
  fetchMovieHandler();
},[fetchMovieHandler])

const content = useMemo(() => {
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (movies.length > 0) {
    return <MoviesList movies={movies} />;
  }
  return <p>Found No Movies</p>;
}, [isLoading, error, movies]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
    {content}
      </section>
    </React.Fragment>
  );
}

export default App;
