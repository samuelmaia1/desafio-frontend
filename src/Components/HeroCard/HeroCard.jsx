import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import './HeroCard.css'
import { Button, Modal, Box, Typography } from '@mui/material';
import {Combat} from '../CombatCard/Combat.jsx'
import { Link } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };  

let selectedHeroes = []

export function HeroCard({hero, heroes}){
    const [open, setOpen] = useState(false)
    const [combatResult, setCombatResult] = useState(null)

    const handleOpen = () => {
        alert('Selecionado!')
        if (selectedHeroes.length < 2) {
        // Aqui vai adicionar o herói selecionado caso não tenham sido selecionados os 2
          selectedHeroes.push(hero);
          if (selectedHeroes.length === 2) {
            alert('Combate!')
            // Se tiverem sidos selecionados os dois heróis, realiza o combate
            const [hero1, hero2] = selectedHeroes;
            console.log(hero1)
            const result = calculateCombat(hero1, hero2);
            setCombatResult(result);
            selectedHeroes = []; 
            setOpen(true)// Isso vai limpar o array para realizar novos combates com dois campeões diferentes
          }
        }
    };

    const handleClose = () => setOpen(false);

    const calculateCombat = (hero, oponent) => {
        // Função para calcular o resultado do combate
        let hPoints = 0;
        let oPoints = 0;
        const heroPowerstats = hero.powerstats;
        const oponentPowerstats = oponent.powerstats;
        
        for (let stat in heroPowerstats) {
          hPoints += heroPowerstats[stat] || 0;
          oPoints += oponentPowerstats[stat] || 0;
        }
    
        if (hPoints > oPoints) {
          return `${hero.name} vence!`;
        } else if (oPoints > hPoints) {
          return `${oponent.name} vence!`;
        } else {
          return 'Empate!';
        }
      };

    return (
        <>
            <Card variant="outlined" className='card-hero'>
                <CardContent>
                    <div className="card-content-apresentation">
                        <h3>{hero.name}</h3>
                        <img src={hero.images.sm} alt="" className='card-image'/>
                    </div>
                    <p>🧠 Inteligência: {hero.powerstats.intelligence}</p>
                    <p>💪 Força: {hero.powerstats.strength}</p>
                    <p>🏃 Velocidade: {hero.powerstats.speed}</p>
                    <p>🏋️‍♂️ Durabilidade: {hero.powerstats.durability}</p>
                    <p>⚡  Poder: {hero.powerstats.power}</p>
                    <p>🥊 Combate: {hero.powerstats.combat}</p>
                    <div className="container-buttons">
                      <Button variant="contained" className='button' onClick={handleOpen}>
                          Escolher campeão
                      </Button>
                      <Link to={`/${hero.id}`}>
                        <Button variant="contained" className='button'>
                            Página do campeão
                        </Button>
                      </Link>
                    </div>
                </CardContent>
            </Card>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className='combat-modal'
            >
                <Box className='modal-body'>
                <Typography id="modal-title" variant="h6" component="h2">
                    Resultado do combate!
                </Typography>
                {combatResult}
                <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }} className='close-modal'>
                    Close
                </Button>
                </Box>
            </Modal>
        </>
    )
}