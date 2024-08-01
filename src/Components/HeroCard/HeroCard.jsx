import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import './HeroCard.css'
import { Button, Modal, Box, Typography } from '@mui/material';
import {Combat} from '../CombatCard/Combat.jsx'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  

export function HeroCard({hero, heroes}){
    const [open, setOpen] = useState(false);
    const [combatResults, setCombatResults] = useState([]);

    const handleOpen = () => {
        const results = heroes.map(oponent => ({
            hero,
            oponent,
            result: calculateCombat(hero, oponent),
        }));
        setCombatResults(results);
        setOpen(true);
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
          return `${hero.name} wins!`;
        } else if (oPoints > hPoints) {
          return `${oponent.name} wins!`;
        } else {
          return 'Draw!';
        }
      };

    return (
        <>
            <Card variant="outlined" className='card-hero'>
                <CardContent>
                    <div className="card-content-apresentation">
                        <h3>{hero.name}</h3>
                        <img src={hero.images.sm} alt="" />
                    </div>
                    <p>Inteligência: {hero.powerstats.intelligence}</p>
                    <p>Força: {hero.powerstats.strength}</p>
                    <p>Velocidade: {hero.powerstats.speed}</p>
                    <p>Durabilidade: {hero.powerstats.durability}</p>
                    <p>Poder: {hero.powerstats.power}</p>
                    <p>Combate: {hero.powerstats.combat}</p>
                    <Button variant="contained" className='button' onClick={handleOpen}>
                        Conferir combates
                    </Button>
                </CardContent>
            </Card>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-title" variant="h6" component="h2">
                    Combates
                </Typography>
                {combatResults.map((result, index) => (
                    <div key={index}>
                    <Typography variant="body1">
                        {result.hero.name} vs {result.oponent.name}: {result.result}
                    </Typography>
                    </div>
                ))}
                <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
                    Close
                </Button>
                </Box>
            </Modal>
        </>
    )
}