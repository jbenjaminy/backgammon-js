import random
import json
from flask import Flask
from os import environ

app = Flask(__name__)

init_pos = {1: {'white': 0, 'black': 0}, 2: {'white': 0, 'black': 2}, 3: {'white': 0, 'black': 0}, 4: {'white': 0, 'black': 0}, 5: {'white': 0, 'black': 0}, 6: {'white': 0, 'black': 0}, 7: {'white': 5, 'black': 0}, 8: {'white': 0, 'black': 0}, 9: {'white': 0, 'black': 0}, 10: {'white': 3, 'black': 0}, 11: {'white': 0, 'black': 0}, 12: {'white': 0, 'black': 0}, 13: {'white': 0, 'black': 0}, 14: {'white': 0, 'black': 5}, 15: {'white': 5, 'black': 0}, 16: {'white': 0, 'black': 0}, 17: {'white': 0, 'black': 0}, 18: {'white': 0, 'black': 0}, 19: {'white': 0, 'black': 3}, 20: {'white': 0, 'black': 0}, 21: {'white': 0, 'black': 0}, 22: {'white': 0, 'black': 5}, 23: {'white': 0, 'black': 0}, 24: {'white': 0, 'black': 0}, 25: {'white': 0, 'black': 0}, 26: {'white': 0, 'black': 0}, 27: {'white': 2, 'black': 0}, 28: {'white': 0, 'black': 0}}
cur_pos = {1: {'white': 0, 'black': 0}, 2: {'white': 0, 'black': 2}, 3: {'white': 0, 'black': 0}, 4: {'white': 0, 'black': 0}, 5: {'white': 0, 'black': 0}, 6: {'white': 0, 'black': 0}, 7: {'white': 5, 'black': 0}, 8: {'white': 0, 'black': 0}, 9: {'white': 0, 'black': 0}, 10: {'white': 3, 'black': 0}, 11: {'white': 0, 'black': 0}, 12: {'white': 0, 'black': 0}, 13: {'white': 0, 'black': 0}, 14: {'white': 0, 'black': 5}, 15: {'white': 5, 'black': 0}, 16: {'white': 0, 'black': 0}, 17: {'white': 0, 'black': 0}, 18: {'white': 0, 'black': 0}, 19: {'white': 0, 'black': 3}, 20: {'white': 0, 'black': 0}, 21: {'white': 0, 'black': 0}, 22: {'white': 0, 'black': 5}, 23: {'white': 0, 'black': 0}, 24: {'white': 0, 'black': 0}, 25: {'white': 0, 'black': 0}, 26: {'white': 0, 'black': 0}, 27: {'white': 2, 'black': 0}, 28: {'white': 0, 'black': 0}}

@app.route("/new_game")
def new_game():
	cur_pos = init_pos
	return json.dumps(init_pos)

@app.route("/roll/<num_dice>")
def generate_roll(num_dice):
	rand_list = []
	for n in range(int(num_dice)):
		rand_num = random.randrange(1, 7)
		if (len(rand_list) == 1) and (rand_num == rand_list[0]):
			rand_list.append(rand_num)
			rand_list.append(rand_num)
			rand_list.append(rand_num)
		else:
			rand_list.append(rand_num)
	return json.dumps(rand_list)

@app.route("/valid_moves/<player>/<from_pos>/<avail_moves>")
def find_valid_moves(player, from_pos, avail_moves):
	from_pos = int(from_pos)
	valid_moves = []
	start = from_pos
	moves = avail_moves.split('_')
	for move in moves:
		# account for moving to home space
		if ((cur_pos[from_pos][player] > 0) and (cur_pos[21][player] == 0)) or (from_pos == 21 and cur_pos[21][player]):
			if player == 'white':
				end = start - int(move)
				if (start > 21 and end <= 21) or (start > 8 and end <= 8):
					end = end - 1
				elif start == 21:
					end = 28 - int(move)
				if ((end > 1) and (cur_pos[end]['black'] == 1 or cur_pos[end]['black'] == 0)):
					valid_moves.append({'position': end, 'roll': int(move)})
			elif player == 'black':
				end = start + int(move)
				if ((start < 21) and (end >= 21)) or ((start < 8) and (end >= 8)):
					end = end + 1
				elif start == 21:
					end = 1 + int(move)
				if ((end < 28) and (cur_pos[end]['white'] == 1 or cur_pos[end]['white'] == 0)):
					valid_moves.append({'position': end, 'roll': int(move)})
	return json.dumps(valid_moves)

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
	return json.dumps([cur_pos, int(roll)])

if __name__ == "__main__":
    app.run()
