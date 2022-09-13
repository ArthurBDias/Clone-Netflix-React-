import React, {useState, useEffect, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'

import {FaSearch} from 'react-icons/fa'
import styles from './styles/Header.module.css'
import {RequestMovieSearch} from '../../request'

export default function Header() {

  const [blackHeader, setBlackHeader] = useState(false)

  const [search, setSearch] = useState(null)

  const [searchInput, setSearchInput] = useState("")

  const navigate = useNavigate()

  useEffect(() => {

    const scrolListener = () =>{

      if (window.scrollY > 10) {
        setBlackHeader(true)
      }else{
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrolListener)

    return () => {
    window.removeEventListener('scroll', scrolListener)
    }

  }, [])

  useEffect(() =>{
    async function loadSearch() {
      const requireSearch = await RequestMovieSearch(search)
      if(requireSearch.results){
        navigate('/search', {state: {searchData: {searchName: search, searchMovies: requireSearch}}})
      }
    }
    if (search && search.length >= 1){
      loadSearch()
    }
      setSearchInput('')
  }, [search])

  function handleSubmit(e) {
    e.preventDefault()
    setSearch(searchInput)
  } 

  return (
    <header className={`${styles.header} ${blackHeader ? styles.blackHeader : ''}`}>
      <div className={styles.hader_logo}>
        <Link to='/'>
          <img src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png?w=684&h=456" alt="Netflix logo"/>
        </Link>
      </div>

      <div className={styles.hader_search}>
        <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Search in english...' value={searchInput} onChange={(e) => {setSearchInput(e.target.value)}}/><button type='submit'><FaSearch/></button>
        </form>
      </div>
    </header>
  )
}
