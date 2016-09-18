data: {
                                    state: this.props.state,
                                    toPos: move.position,
                                    roll: move.roll
                                }

@app.route("/update_pos/<to_pos>/<from_pos>/<roll>")
def update_pos(to_pos, from_pos, roll):
	to = cur_pos[int(to_pos)]
	frm = cur_pos[int(from_pos)]
	if frm['white']:
		cur_pos[int(from_pos)]['white'] = frm['white'] - 1
		cur_pos[int(to_pos)]['white'] = to['white'] + 1
		if to['black'] == 1:
			cur_pos[int(to_pos)]['black'] = to['black'] - 1
			cur_pos[21]['black'] = cur_pos[21]['black'] + 1
	elif frm['black']:
		cur_pos[int(from_pos)]['black'] = frm['black'] - 1
		cur_pos[int(to_pos)]['black'] = to['black'] + 1
		if to['white'] == 1:
			cur_pos[int(to_pos)]['white'] = to['white'] - 1
			cur_pos[21]['white'] = cur_pos[21]['white'] + 1
	print('from position -->', from_pos, frm)
	print('to position -->', to_pos, to)
	print('current positions -->', cur_pos)
	return json.dumps([cur_pos, int(roll)])

else if (action.type === actions.UPDATE_POSITIONS_SUCCESS) {
        var moves = state.availableMoves;
        var removeme = action.roll; 
        var used = [];
        var message = state.message;
        var inGame = state.inGame;
        var winner = state.winner;
        var positions = action.positions;
        var moves = state.availableMoves.filter(function(val, index) {
            if (val === removeme) {
                if (state.diceUsed.length === 0) {
                    used.push(index);
                } else if (state.diceUsed.length === 1) {
                    used = [0, 1];
                } else if (state.diceUsed.length === 2) {
                    used = [0, 1, 2];
                } else {
                    used = [0, 1, 2, 3];
                }
                removeme = null; 
                return false;
            } return true;
        });
        if (positions[1].white === 15 || positions[28].black === 15) {
            message = ' WINS!';
            winner = state.turn;
            inGame = false;
        }
        return Object.assign({}, state, {
            availableMoves: moves,
            positions: positions,
            highlight: null,
            valid1: null,
            valid2: null,
            diceUsed: used,
            inGame: inGame,
            message: message,
            winner: winner
        });