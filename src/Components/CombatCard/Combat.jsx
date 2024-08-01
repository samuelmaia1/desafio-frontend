export function Combat({hero, oponent}){
    const [heroPoints, setHeroPoints] = useState(0)
    const [oponentPoints, setOponentPoints] = useState(0)
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        combat()
    }, [])

    async function combat(){
        let hPoints = 0;
        let oPoints = 0;
        const heroPowerstats = hero.powerstats;
        const oponentPowerstats = oponent.powerstats;
        
        for (let stat in heroPowerstats) {
            hPoints += heroPowerstats[stat] || 0;
            oPoints += oponentPowerstats[stat] || 0;
        }
        setHeroPoints(hPoints)
        setOponentPoints(oPoints)

        if (hPoints > oPoints) {
            setWinner(hero.name);
        } else if (oPoints > hPoints) {
            setWinner(oponent.name);
        } else {
            setWinner('Draw');
        }
    }

    async function compare(){
        if (heroPoints > oponentPoints){
            await combat()
            return true
        } 
        else if (oponentPoints > heroPoints){
            await combat()
            return false
        } 
        else {
            await combat()
            return true
        }
    }

    return (
        <>
            <p>{hero.name} vs. {oponent.name}</p>
            {winner === 'Draw' ? (
                <p>Empate</p>
            ) : (
                <p>{winner} WINS!</p>
            )}
        </>
    )
}