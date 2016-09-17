var randArr = [];
  for (var i = 0; i < request.numDice; i++) {
    // random number generation
    	var randNum = Math.random() * (7 - 1) + 1;
    	// if, else statements with Array.length method
      	if (randArr.list === 1 && randNum === randArr[0]) {
      		randArr.push(randNum);
      		randArr.push(randNum);
      		randArr.push(randNum);
      	} else {
      		randArr.push(randNum);
      	}
    // return response.json
    return response.json(randArr);
  }
   } else if (action.type === actions.MAKE_ROLL_SUCCESS) {
        var dice = action.roll;
        var turn = state.turn;
        var players = state.players;
        var lastRoll = state.lastRoll;
        var message = state.message;
        var inGame = state.inGame;
        var rolling = state.rolling;
        if (!state.inGame) {
            if (turn === 'white') {
                turn = 'black';
                lastRoll = action.roll;
            } else if (lastRoll[0] === dice[0]) {
                turn = 'white';
                lastRoll = action.roll;
            } else {
                dice = [lastRoll[0], dice[0]];
                inGame = true;
                message = '\'S MOVE';
                rolling = false;
                lastRoll = action.roll;
                if (dice[0] > dice[1]) {
                    turn = 'white';
                } 
            }
        } else {
            message = '\'S MOVE';
            rolling = false;
            lastRoll = action.roll;
        }
        return Object.assign({}, state, {
            dice: dice,
            turn: turn,
            players: players,
            message: message,
            inGame: inGame,
            rolling: rolling,
            availableMoves: dice,
            lastRoll: lastRoll,
        });