import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router'


class JoinGame extends React.Component {
    constructor() {
        super();
        this.joinGame = this.joinGame.bind(this);
    }

    joinGame(event) {
        event.preventDefault();
        this.props.dispatch({
            type: 'server/joinGame',
            data: {
                id: this.id.value,
                playerTwo: this.name.value
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
                    <form onSubmit={this.joinGame}>
                        <div>
                            <h2>Enter your name:</h2>
                            <input type='text' ref={(name) => { this.name = name; }} required />
                        </div>
                        <div>
                            <h2>Enter Game ID:</h2>
                            <input type='text' ref={(id) => { this.id = id; }} required />
                        </div>
                        <button type='submit'>Join Game</button>
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

module.exports = connect(mapStateToProps)(JoinGame);
