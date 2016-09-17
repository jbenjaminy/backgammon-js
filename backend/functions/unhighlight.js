else if (action.type === actions.UNHIGHLIGHT) {
        return Object.assign({}, state, {
            highlight: null,
            valid1: null,
            valid2: null
        });