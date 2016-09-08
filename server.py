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
		if len(rand_list) == 1 and rand_num == rand_list[0]:
			rand_list.append(rand_num)
			rand_list.append(rand_num)
			rand_list.append(rand_num)
		else:
			rand_list.append(rand_num)
	return json.dumps(rand_list)

@app.route("/valid_moves/<id>")
def find_valid_moves(id):
	valid_moves = []
	return json.dumps(valid_moves)
	# check for empty spaces and spaces with only one of opponents pieces
	# make sure moving in right direction and don't include bar/home
	# account for moving off bar
	# account for moving to home space
	# want back array with objects:
		# [{position: 6, roll: 4}]
@app.route("/update_pos/<to_pos>/<from_pos>")
def update_pos(to_pos, from_pos):
	to = cur_pos[to_pos]
	frm = cur_pos[from_pos]
	if frm.white:
		cur_pos[from_pos].white = fr.white - 1
		cur_pos[to_pos].white = to.white + 1
		if to.black == 1:
			cur_pos[to_pos].black = to.black - 1
			cur_pos[21].black = cur_pos[21].black + 1
	else:
		cur_pos[from_pos].black = fr.black - 1
		cur_pos[to_pos].black = to.black + 1
		if to.white == 1:
			cur_pos[to_pos].white = to.white - 1
			cur_pos[21].white = cur_pos[21].white + 1
	return json.dumps(cur_pos)

if __name__ == "__main__":
    app.run()
