import React from "react"
import {Link} from 'react-router-dom'
import styles from './styles/MovieBlock.module.css'
import Loading from "./Loading"

export default function MovieBlock({movieData, title}){

    return(
        <>
            {movieData && (
                <div className={styles.movieBlock_container}>

                    <h1 className={styles.movieBlock_title}>{title}</h1>

                    <div className={styles.red_line}></div>

                    <div className={styles.movie_items_container}>
                        {movieData.length >= 1 ? ( 
                            <>
                                {movieData.map((movie, index) =>(
                                    <div className={movie.poster_path ? styles.movie_item_wrapper : ''} key={index}>
                                        {movie.poster_path && (
                                                <Link to={`/exhibition/${movie.name ? 'series' : 'movies'}${movie.id}`}>
                                                    <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.name ? movie.name : movie.title}/>
                                                </Link>
                                        )}
                                    </div>
                                    
                                ))}
                            </>
                        ) : (
                        <p>no items found, make sure the search field is correct</p>
                        )}
                        
                    </div>

                </div> 
            )}
        </>
    )
}