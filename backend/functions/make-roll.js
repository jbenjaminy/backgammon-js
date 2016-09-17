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