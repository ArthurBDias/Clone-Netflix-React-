import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation} from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import './styles/MovieRow.css'

export default function MovieRow({title, items}) {

    const [itemsPerView, setItemsPerView] = useState(0)

    const setView = () => {
        if(window.innerWidth >= 1920){
            setItemsPerView(6.5)
        }
        else if(window.innerWidth >= 1670){
            setItemsPerView(5.8)
        }
        else if(window.innerWidth >= 1480){
            setItemsPerView(5.2)
        }
        else if(window.innerWidth >= 1335){
            setItemsPerView(4.8)
        }

        else if(window.innerWidth >= 1200){
            setItemsPerView(4.2)
        }

        else if(window.innerWidth >= 1015){
            setItemsPerView(3.5)
        }

        else if(window.innerWidth >= 769){
            setItemsPerView(3.4)
        }

        else if(window.innerWidth >= 540){
            setItemsPerView(2.8)
        }

        else if(window.innerWidth >= 280){
            setItemsPerView(2.5)
        }
        
    }
    
    useEffect(() =>{
        setView()
    }, [])

    window.addEventListener('resize', setView)

  return (
    <div className="movieRow">
        <h2>{title}</h2>

            <Swiper
            slidesPerView={itemsPerView}
            slidesPerGroup={Math.ceil(itemsPerView / 2)}
            speed={500}
            modules={[Navigation]}
            navigation={itemsPerView > 3 ? true : false}      
            >
        
                {
                    items.results && items.results.map((item, index) => (
                        <SwiperSlide key={index} style={{width: '20vw !important'}}>                          
                            <Link to={`/exhibition/${item.name ? 'series' : 'movies'}${item.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.title ? item.title : item.name} className="movie_img" />
                            </Link>
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
     
  )
}
