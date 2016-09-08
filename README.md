# run frontend at endpoint: http://localhost:5000/static/index.html

## To-Do:
	2) Add backend/algorithms:
		-check for valid moves
		-roll dice
		-serve positions
		-undo move

## Fixes:
1) get bottom-board uls to align bottom

## Additional features:
1) integrate usernames
2) undo moves (push positions object onto positions history array and revert to past object (have to credit back roll as well, don't let it revert too far))
3) doubling cube
4) animations

# python3 -m pip install flask
# run with `python3 server.py`

# May need to add this.
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