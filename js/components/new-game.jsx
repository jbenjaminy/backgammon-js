import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'

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
                state: this.props.state,
                playerOne: this.name.value.toUpperCase()
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.gameId !== "") {
            browserHistory.push(`/game/${nextProps.gameId}`);
        }
    }

    render() {
        return (
            <section className='landing-container'>
                <div className='landing-page'>
                    <form onSubmit={this.newGame}>
                        <input type='text' placeholder="ENTER YOUR NAME" ref={(name) => { this.name = name; }} required />
                        <button type='submit'>Start</button>
                    </form>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        gameId: state.gameId
    };
};

module.exports = connect(mapStateToProps)(NewGame);