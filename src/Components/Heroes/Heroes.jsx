import { useState } from "react"
import { useEffect } from "react"
import {HeroCard} from '../HeroCard/HeroCard.jsx'
import './Heroes.css'
import { Link } from "react-router-dom"


export function Heroes(){
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const api_url = 'https://homologacao3.azapfy.com.br/api/ps/metahumans'

    const [heroes, setHeroes] = useState([])

    const [filteredHeroes, setFilteredHeroes] = useState([])

    const [search, setSearch] = useState('')

    const [filtered, setFiltered] = useState(false)

    // Resgate dos dados da api
    useEffect(() => {

        async function getHeroes(){
            const response = await fetch(api_url)

            const data = await response.json()

            setHeroes(data)
        }

        getHeroes()

    }, [])

    const handleSearch = (e) => {
        const value = e.target.value
        setSearch(value)

        if (value.trim() !== ''){
            setFiltered(true)
        } else {
            setFiltered(false)
        }
        
        setFilteredHeroes(heroes.filter((hero) => hero.name.toLowerCase().includes(search.toLowerCase())))
    }

    return(
        <>
            <div >

            <form>
                <input type="text" placeholder='Pesquiser herói...' onChange={handleSearch} value={search}/>
            </form>

                <div className="container-heroes">
                    {
                        filtered?
                        filteredHeroes?.map((hero) => (
                            <Link className="hero">
                                <HeroCard key={hero.id} hero={hero} heroes={heroes}/>
                            </Link>
                        ))
                        :
                        heroes.map((hero, heroes) => (
                            <Link className="hero">
                                <HeroCard key={hero.id} hero={hero} heroes={heroes}/>
                            </Link>
                            
                        ))
                    }
                </div>

                
            </div>
        </>
    )
}