const createPlayer = (playerName) => {

    const name = playerName || "*Generate rdm player name*";
    const getName = () => name;

    

    return { getName };

};