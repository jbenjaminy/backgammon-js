import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const propTypes = {
    dispatch: PropTypes.func,
    state: PropTypes.object
};

class NewGame extends React.Component {
    constructor() {
        super();
        this.newGame = this.newGame.bind(this);
    }

    newGame(event) {
        event.preventDefault();
        const promise = new Promise((res) => {
            res(
                this.props.dispatch({
                    type: 'server/createGame',
                    data: {
                        playerOne: this.name.value
                    }
                })
            );
        });
        promise.then(function() {
            window.location.href = '/#/game';
        });
    }

    render() {
        return (
            <section className='landing-container'>
                <div className='landing-page'>
                    <div>
                        <h2>Enter your name:</h2>
                        <form onSubmit={this.newGame}>
                            <input type='text' ref={(name) => { this.name = name; }} required />
                            <button type='submit'>Start Game</button>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state
    };
};

NewGame.propTypes = propTypes;
module.exports = connect(mapStateToProps)(NewGame);