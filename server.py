# run with `python3 server.py`
# python3 -m pip install flask
import random
import json
from flask import Flask
from os import environ

app = Flask(__name__)

@app.route("/roll/<numDice>")
def generate_roll(numDice):
	randList = []
	for n in range(int(numDice)):
		randNum = random.randrange(1, 7)
		if len(randList) == 1 and randNum == randList[0]:
			randList.append(randNum)
			randList.append(randNum)
			randList.append(randNum)
		else:
			randList.append(randNum)
	return json.dumps(randList)

if __name__ == "__main__":
    app.run()



# serve static build dir from this file
# do I need something like this?
# 	app.use(function(request, response, next) {
# 	  response.header("Access-Control-Allow-Origin", "*");
# 	  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
# 	  next();
# 	});

# 	@app.route("/")
# def home():
#     resp = flask.Response("Foo bar baz")
#     resp.headers['Access-Control-Allow-Origin'] = '*'
#     return resp

# need something like: 
# if (numDice === 2) {
# 	possibleMoves()
# }
# 
# possibleMoves():
# 
# function called after roll and after every move:
# if piece is trapped (position 21) then only look at available moves for trapped piece (maybe do this for the select function)
# if no trapped pieces, when a player selects a piece, looks at possible rolls.
# makes sure it is that player's piece,
# makes sure each move does not fall on stack of other players chips
# makes sure move is in correct direction
# makes sure that they don't move home until all pieces in home quadrant
# 
# 
# 
# 
# initial setup:
#     	positions: {
       # 1: {white: null, black: null}, 2: {white: null, black: 2}, 3: {white: null, black: null}, 4: {white: null, black: null}, 5: {white: null, black: null}, 6: {white: null, black: null}, 7: {white: 5, black: null}, 8: {white: null, black: null}, 9: {white: null, black: null}, 10: {white: 3, black: null}, 11: {white: null, black: null}, 12: {white: null, black: null}, 13: {white: null, black: null}, 14: {white: null, black: 5}, 15: {white: 5, black: null}, 16: {white: null, black: null}, 17: {white: null, black: null}, 18: {white: null, black: null}, 19: {white: null, black: 3}, 20: {white: null, black: null}, 21: {white: null, black: null}, 22: {white: null, black: 5}, 23: {white: null, black: null}, 24: {white: null, black: null}, 25: {white: null, black: null}, 26: {white: null, black: null}, 27: {white: 2, black: null}, 28: {white: null, black: null} 
      # },
