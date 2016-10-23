let initialState = {
    gameId: '',
    players: {},      
    curPos: {},
    returnPos: null,
    dice: [],
    validMoves: [],
    availableMoves: [],
    diceUsed: [],
    lastRoll: [],              
    inGame: false,       
    isRolling: false,       
    turn: '',       
    message: '',
    winner: '',             
    highlight: null,       
    validOne: null,       
    validTwo: null       
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'update': {
            return Object.assign({}, state, {
                gameId: action.data._id,
                players: action.data.players,      
                curPos: action.data.curPos,
                returnPos: action.data.returnPos,
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
};

export default reducer;