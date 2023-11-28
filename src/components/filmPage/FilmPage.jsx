import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilms, searchFilms, selectFilms, selectPageCount } from '../../features/filmFeature/filmSlice';
import Film from '../film/Film';
import './filmPage.scss';
import searchIcon from '../../assets/images/searchIcon.png';
import filterIcon from '../../assets/images/filterIcon.png';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link, useParams } from 'react-router-dom';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

const FilmPage = () => {

    const {category,page} = useParams();
    const param = useParams();
    const films = useSelector(selectFilms);
    const dispatch = useDispatch();
    const [value, setValue] = useState("");
    const [isFilterOpened, setIsFilterOpened] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = useSelector(selectPageCount);

    const checkValue = function(){
        if(value===""){
            dispatch(getFilms({category:category,page:currentPage}));
        }else{
            dispatch(searchFilms({movie:value, page:currentPage}));
        }
    }

    useEffect(()=>{
        setCurrentPage(1);
        const time = setTimeout(()=>{
            checkValue();
        },500)
        return()=>{
            clearTimeout(time);
        }
    },[value])

    useEffect(()=>{
        setCurrentPage(1);
        setValue('');
    },[category])

    useEffect(()=>{
        checkValue();
        window.scrollTo(0, 0);
    },[currentPage,category])

    return (
        <>
        <div className = 'heading'>
        <OutsideClickHandler
            onOutsideClick={() => {
                if(isFilterOpened){
                    setIsFilterOpened(false);
                }
            }}
        >
            <div className= 'filter' onClick={()=>setIsFilterOpened(prev=>!prev)}>
                <img src = {filterIcon} alt="filterIcon" />
                    {isFilterOpened ?
                        <div className = "dropDown">
                            <Link to='/now_playing/1'><span className="nowPlaying filterType">Now Playing</span></Link>
                            <Link to='/popular/1'><span className="popular filterType">Popular</span></Link>
                            <Link to='/top_rated/1'><span className="topRated filterType">Top Rated</span></Link>
                            <Link to='/upcoming/1'><span className="upcoming filterType">Upcoming</span></Link>
                        </div>
                    :
                    ''
                    }
            </div>
        </OutsideClickHandler>

            <div className='searchBox'>
                <div className = "search">
                    <img src = {searchIcon} alt="searchIcon"/>
                    <input type ="search" value={value} onChange={(e)=>setValue(e.target.value)}/>
                </div>
            </div>
            </div>
            <div className = "filmPage">
                {films?.length ? films.map((film,i)=>{
                    return <Film key={`key_${i}`} film={film} category={category} />
                }) : 
                <div className='noResultBox'>
                    <span className='noResults'>No results</span>
                    <Link to='/popular/1'><span onClick={()=>setValue("")} className='backToFilms'>Back to films</span></Link>
                </div>
                }
            </div>
            <div className="pageinationDiv">
                {films?.length ? 
                <ResponsivePagination
                    current={currentPage}
                    total={totalPages}
                    onPageChange={setCurrentPage}
                />
                :
                ''
                }
            </div>
        </>
    )
}
export default FilmPage;