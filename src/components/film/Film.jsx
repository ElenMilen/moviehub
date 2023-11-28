import { Link } from "react-router-dom";
import "./film.scss";

const Film = ({film, category}) => {
return(
    <Link to={`/${category}/film/${film.id}`}>
        <div className = "film">
            <div className = "filmImage" style={{backgroundImage: `url("https://image.tmdb.org/t/p/w500${film.poster_path}")`}}></div>
            <div className = "filmDescription">
                {film.title}
            </div>
        </div>
    </Link>
    )
}

export default Film;