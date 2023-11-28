import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { chooseFilm, getFilms, selectFilm } from '../../features/filmFeature/filmSlice';
import './filmInside.scss';

const FilmInside = () => {

    const { category,page,filmId } = useParams();
    const film = useSelector(selectFilm);

    const dispatch = useDispatch();

    useEffect(()=>{
        // dispatch(getFilms({category:category,page:page}));
        console.log(film);
        // dispatch(searchFilms({movie:value, page:currentPage}));
        dispatch(chooseFilm(filmId));
    },[])

    if(!film?.length){
        return <div>Loading...</div>
    }

    return (
        <div className='filmInside'>
            <div className="filmBox">
                <div className = "filmInsideImage" style={{backgroundImage: `url("https://image.tmdb.org/t/p/w500${film[0].backdrop_path}")`}}></div>
                <div className="desc">
                    <h2>{film[0].original_title}</h2>
                    <p>{film[0].overview}</p>
                    <p>Rating: {film[0].vote_average}/10 <span className = "star"> ☆ </span></p>
                </div>
            </div>
        </div>
    )
}
export default FilmInside;