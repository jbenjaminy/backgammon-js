-Frontend:
	-be able to move a piece from/to any position on the board (bar, 24 spaces, home (26 positions)); stack on bar (slots where things would be placed);
	-differentiate between white/black pieces, otherwise just storing # of pieces and white/black for each position


actions: 
game:
-new game 
-init pre-roll
-init turn
-init game end
-dice roll

turn
*roll off bar
*roll home
*move piece
*trap player
*end turn

state:
-Players
-username
-player's colors
	-isTurn

Game:
	-GameStatus
		-PreRoll
			-player
		-playing	
			-Player
		-win
			-player
	-dice:
		-number
		-roll
-Board:
	-piece location
	-piece color
	-isTrapped
	-available moves
	-unavailable spaces

componenets:
-board
-quadrants
-spaces
-homes
-dice
-player
-bar
