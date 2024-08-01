import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import './HeroPage.css'
import { Spinner } from "../Components/LoadingSpinner/Spinner"

export function HeroPage(){
    const api_url = 'https://homologacao3.azapfy.com.br/api/ps/metahumans'

    const [isLoading, setIsLoading] = useState(true)

    const [hero, setHero] = useState(null)

    const {id} = useParams()

    useEffect(() => {
        
        async function getHero(){

            const response = await fetch(api_url)

            const heroesArray = await response.json()

            let data

            heroesArray.forEach((hero) => {
                if (hero.id == id) {
                    data = hero
                    setHero(data)
                    setIsLoading(false)
                    return
                }
            })
        }

        getHero()
    }, [])

    useEffect(() => {
        console.log(hero)
    }, [hero])
    return (
        <>
            {
                isLoading?
                <Spinner/>
                :
                <div className='container-info'>
                    <div className="container-info-principal">
                        <img src={hero.images.sm} alt="" className='hero-image' />
                        <h1 className='hero-name'>{hero.name}</h1>
                        <h2 className="titles">{hero.biography.aliases[0]}</h2>
                    </div>
                    <div className='container-info-habilities'>
                        <h2 className='titles'>Habilidades: </h2>
                        <p>🧠 Inteligência: {hero.powerstats.intelligence}</p>
                        <p>💪 Força: {hero.powerstats.strength}</p>
                        <p>🏃 Velocidade: {hero.powerstats.speed}</p>
                        <p>🏋️‍♂️ Durabilidade: {hero.powerstats.durability}</p>
                        <p>⚡  Poder: {hero.powerstats.power}</p>
                        <p>🥊 Combate: {hero.powerstats.combat}</p>
                    </div>
                    <div className="container-button">
                        <Link to='/' className='inicial-page'>Lutar!</Link>
                    </div>
                </div>
            }
        </>
    )
}