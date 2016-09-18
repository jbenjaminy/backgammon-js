						data: {
							state: this.props.state
							fromPos: id,
						}

else if (action.type === actions.SELECT) {
        var highlight = action.id;
        var valid1 = state.valid1;
        var valid2 = state.valid2;
        if (state.highlight === highlight) {
            highlight = null;
            valid1 = null;
            valid2 = null;
        }
        return Object.assign({}, state, {
            highlight: highlight,
            valid1: valid1,
            valid2: valid2
        });
    }

def find_valid_moves(player, from_pos, avail_moves):
	from_pos = int(from_pos)
	start = from_pos
	if start in (28, 1):
		return json.dumps([[], from_pos])
	valid_moves = []
	moves = avail_moves.split('_')
	for move in moves:
		# checks that moving from current player's occupied space or the bar
		if (player == 'white' and cur_pos[from_pos][player] > 0 and (sum(cur_pos[i][player] for i in range(1, 8)) == 15)):
			end = start - int(move)
			if end < 1: 
				end = 1
			if (cur_pos[end]['black'] == 1 or cur_pos[end]['black'] == 0) and (start - 1 >= int(move) or sum(cur_pos[i][player] for i in range(start + 1, start + 5)) == 0):
				valid_moves.append({'position': end, 'roll': int(move)})
		elif (player == 'black' and cur_pos[from_pos][player] > 0 and (sum(cur_pos[i][player] for i in range(22, 29)) == 15)):
			end = start + int(move)
			if end > 28: 
				end = 28
			if (cur_pos[end]['white'] == 1 or cur_pos[end]['white'] == 0) and (28 - start >= int(move) or sum(cur_pos[i][player] for i in range(start - 5, start)) == 0):
				valid_moves.append({'position': end, 'roll': int(move)})
		elif ((cur_pos[from_pos][player] > 0) and (cur_pos[21][player] == 0)) or (from_pos == 21 and cur_pos[21][player]):
			if player == 'white':
				end = start - int(move)
				# if move crosses bar, bar is not included in projected 'end' position
				if (start > 21 and end <= 21) or (start > 8 and end <= 8):
					end = end - 1
				# when piece is trapped/rolling off of bar
				elif start == 21:
					end = 28 - int(move)
				# checks that 'end' position is not the home space and opponent has 1 or no pieces on space
				if ((end > 1) and (cur_pos[end]['black'] == 1 or cur_pos[end]['black'] == 0)):
					valid_moves.append({'position': end, 'roll': int(move)})
			elif player == 'black':
				end = start + int(move)
				# if move crosses bar, bar is not included in projected 'end' position
				if ((start < 21) and (end >= 21)) or ((start < 8) and (end >= 8)):
					end = end + 1
				# when piece is trapped/rolling off of bar
				elif start == 21:
					end = 1 + int(move)
				# checks that 'end' position is not the home space and opponent has 1 or no pieces on space
				if ((end < 28) and (cur_pos[end]['white'] == 1 or cur_pos[end]['white'] == 0)):
					valid_moves.append({'position': end, 'roll': int(move)})
	return json.dumps([valid_moves, from_pos])

else if (action.type === actions.FIND_VALID_MOVES_SUCCESS) {
        var valid1 = null;
        var valid2 = null;
        if (action.validMoves.length === 1 || action.validMoves.length === 3 || action.validMoves.length === 4) {
            valid1 = action.validMoves[0].position;
        } else if (action.validMoves.length === 2) {
            valid1 = action.validMoves[0].position;
            valid2 = action.validMoves[1].position;
        }
        return Object.assign({}, state, {
            validMoves: action.validMoves,
            highlight: action.id,
            valid1: valid1,
            valid2: valid2
        });