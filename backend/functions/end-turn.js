else if (action.type === actions.END_TURN) {
        var message = '\'S ROLL';
        var turn = 'white';
        if (state.turn === 'white') {
            turn = 'black';
        }
        return Object.assign({}, state, {
            message: message,
            turn: turn,
            rolling: true,
            diceUsed: [],
            highlight: null,
            valid1: null,
            valid2: null

        });