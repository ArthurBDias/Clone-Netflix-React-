import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import {RequestMovie} from '../../request'
import {RequestMovieSimilar} from '../../request'
import {FaPlay} from 'react-icons/fa'

import Loading from '../layout/Loading'
import LinkButton from '../layout/LinkButton'
import MovieBlock from '../layout/MovieBlock'
import styles from './styles/Exhibition.module.css'
import YouTube from 'react-youtube'

export default function Exhibition() {

  const [exhibitionData, setExhibitionData] = useState(null)
  const [exhibitionSimilar, setExhibitionSimilar] = useState(null)

  const  {id} = useParams()
  if(exhibitionData){
    var date = exhibitionData.first_air_date ? new Date(exhibitionData.first_air_date).getFullYear()
      : new Date(exhibitionData.release_date).getFullYear()

      var exhibitionGeners = exhibitionData.genres.map((gener) => {
        return gener.name
      })

      var seasonsOrRunTime = exhibitionData.number_of_seasons ? [exhibitionData.number_of_seasons, 'seasons']
       : [exhibitionData.runtime, 'runtime']

       if (seasonsOrRunTime[1] === 'runtime') {
        let hours = 0

        for (let i = 0; i < seasonsOrRunTime[0]; i += 60) {
          hours++
          seasonsOrRunTime[0] = seasonsOrRunTime[0] - 60
        }

        seasonsOrRunTime[0] = `${hours.toString()}h ${seasonsOrRunTime[0]}m`
       }

  }

  useEffect(() =>{

    async function loadExhibition(type, id) {
      const similar = await RequestMovieSimilar(type, id)  //'tv' id.replace('series', '')
      setExhibitionSimilar(similar)

      const movie = await RequestMovie(type, id)  //'tv' id.replace('series', '')
      setExhibitionData(movie)
      
    }

    if(id.includes('series')){   
      loadExhibition('tv', id.replace('series', ''))

    }else  if(id.includes('movies')){
      loadExhibition('movie', id.replace('movies', ''))
    }
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 250)

  }, [id])

  return (
    <div className={styles.exhibition_container}> 
      {
         exhibitionData ? (
          <>
          <div className={styles.exhibition_background} style={
            {background: `url(https://image.tmdb.org/t/p/original${exhibitionData.backdrop_path})`,
            
  } }>

            <div className={styles.exhibition_shadow}>

              <div className={styles.exhibition_presentation}>

                <h1 className={styles.exhibition_title}>{exhibitionData.name ? exhibitionData.name : exhibitionData.title}</h1>
                <p className={styles.exhibition_tagline}>{exhibitionData.tagline}</p>
                <p className={styles.exhibition_decripion}>{exhibitionData.overview}</p>

              </div>

            </div>
          </div>
          <div className={styles.exhibition_info}>
            <div className={styles.exhibition_points}>{exhibitionData.vote_average.toFixed(1)} Pontos</div>
            <div className={styles.exhibition_date}>{date}</div>
            <div className={styles.exhibition_season_or_time}>
              {seasonsOrRunTime[1] === 'seasons' ?
               seasonsOrRunTime[0] + ` season${seasonsOrRunTime[0] > 1 ? 's' : ''}` 
              : seasonsOrRunTime[0]}
            </div>

          </div>
          <div className={styles.exhibition_geners}>Geners: {exhibitionGeners.map((gener, index) =>(
              <span key={index}>{gener}</span>
            ))}
          </div>

            <div className={styles.exhibition_buttons}>

               <LinkButton link='./' icon={<FaPlay/>} text='Play'/>
               <LinkButton link='./' customStyle={{
                  backgroundColor: '#BB1D24',
                  color: 'white'
                }} icon='+' text=' Add to list'/>
           </div>

           {exhibitionData.videos.results.length > 0 && (
            <div className={styles.exhibition_trailer_container}>

              <h1 className={styles.exhibition_trailer_title}>{exhibitionData.videos.results[exhibitionData.videos.results.length - 1].name ?
              exhibitionData.videos.results[exhibitionData.videos.results.length - 1].name:
              exhibitionData.videos.results[exhibitionData.videos.results.length - 1].name}</h1>

              <YouTube
              className={styles.exhibition_trailer}
                videoId={exhibitionData.videos.results[exhibitionData.videos.results.length - 1].key}
              />

          </div>
           )}

           <div>
            <MovieBlock title='Similar' movieData={exhibitionSimilar.results}/>
           </div>
          </>
        ): (
          <Loading/>
        )
      }
    </div>
  )
}
