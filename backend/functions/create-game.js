var curPos = {1: {'white': 0, 'black': 0}, 2: {'white': 0, 'black': 2}, 3: {'white': 0, 'black': 0}, 4: {'white': 0, 'black': 0}, 5: {'white': 0, 'black': 0}, 6: {'white': 0, 'black': 0}, 7: {'white': 5, 'black': 0}, 8: {'white': 0, 'black': 0}, 9: {'white': 0, 'black': 0}, 10: {'white': 3, 'black': 0}, 11: {'white': 0, 'black': 0}, 12: {'white': 0, 'black': 0}, 13: {'white': 0, 'black': 0}, 14: {'white': 0, 'black': 5}, 15: {'white': 5, 'black': 0}, 16: {'white': 0, 'black': 0}, 17: {'white': 0, 'black': 0}, 18: {'white': 0, 'black': 0}, 19: {'white': 0, 'black': 3}, 20: {'white': 0, 'black': 0}, 21: {'white': 0, 'black': 0}, 22: {'white': 0, 'black': 5}, 23: {'white': 0, 'black': 0}, 24: {'white': 0, 'black': 0}, 25: {'white': 0, 'black': 0}, 26: {'white': 0, 'black': 0}, 27: {'white': 2, 'black': 0}, 28: {'white': 0, 'black': 0}}

if (action.type === actions.PAGE_LOAD) {
        return Object.assign({}, {
            positions: null,
            dice: [1],
            turn: 'white',
            players: {
                white: 'PLAYER ONE',
                black: 'PLAYER TWO'
            },
            message: ': ROLL FOR FIRST TURN',
            inGame: false,
            highlight: null,
            rolling: true,
            validMoves: [],
            availableMoves: [],
            diceUsed: [],
            valid1: null,
            valid2: null,
            winner: null,
            lastRoll: null,
            gameId: null
        });
    } else if (action.type === actions.NEW_GAME_SUCCESS) {
        return Object.assign({}, state, {
            positions: action.positions
        });