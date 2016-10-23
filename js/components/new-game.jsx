import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router'

class NewGame extends React.Component {
    constructor() {
        super();
        this.newGame = this.newGame.bind(this);
    }

    newGame(event) {
        event.preventDefault();
        this.props.dispatch({
            type: 'server/createGame',
            data: {
                playerOne: this.name.value.toUpperCase()
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.gameId !== "") {
            hashHistory.push(`/game/${nextProps.gameId}`);
        }
    }

    render() {
        return (
            <section className='landing-container'>
                <div className='landing-page'>
                    <h2>Enter your name:</h2>
                    <form onSubmit={this.newGame}>
                        <input type='text' ref={(name) => { this.name = name; }} required />
                        <button type='submit'>Start Game</button>
                    </form>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        gameId: state.gameId
    };
};

module.exports = connect(mapStateToProps)(NewGame);