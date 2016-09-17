export function reducer(state = {}, action) {
    switch (action.type) {
        case 'update': {
            return Object.assign({}, state, {
                gameId: action.data.gameId,
                players: action.data.players,      
                positions: action.data.positions,
                dice: action.data.dice,
                validMoves: action.data.validMoves,
                availableMoves: action.data.availableMoves,       
                diceUsed: action.data.diceUsed,       
                inGame: action.data.inGame,       
                isRolling: action.data.isRolling,       
                turn: action.data.turn,       
                message: action.data.message,       
                lastRoll: action.data.lastRoll,       
                highlight: action.data.highlight,       
                validOne: action.data.validOne,       
                validTwo: action.data.validTwo,       
                winner: action.data.winner       
            });
        }
        default: {
            return state;
        }
    }
}