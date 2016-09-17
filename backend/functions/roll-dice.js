var dice = ['./dice-roll-one.gif'];
        if (state.inGame) {
            dice = ['./dice-roll-one.gif', './dice-roll-two.gif'];
        }
        return Object.assign({}, state, {
            dice: dice
        });