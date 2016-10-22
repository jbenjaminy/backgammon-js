## To-Do:
	1) undo moves (push positions object onto positions history array and revert to past object (have to credit back roll as well, don't let it revert too far))
	2) if piece on bar, auto checks for valid moves/highlights after you roll.
	3) fix so it doesnt allow you to end turn just when A piece doesnt have any valid moves, but when no piece has valid moves.
	4) if moving home from a space where both rolls are less than that space, take the smaller roll
	5) Make where when two people connected to same game at same time, server notifies you to update your board states (allows someone to watch game or play without separate usernames still)
	6) Account for situation where one move is possible but won't make it possible for you to use other move and there is another situation where you are able to use both moves.
	8) integrate usernames
	-separate restart game/page load or removing new game dispatch from initialization page for user integration so refresh keeps game status
		*anything global is visible to all users
		*cur_pos global would need to become per user/per game storage
	9) doubling cube

	* create new room (by game id) in 'sockets' on create game and have sockets added to this on join/find game. only emit back to a particular room. 
	* add socket id to players obj so that socket id can be checked against stored socket id so that one player cant roll/move for the other player. 
	* only display access code to those who are in the game.
	* have game delete at the end of the game. 
	* store sockets in db.