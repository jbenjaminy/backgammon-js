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
                state: this.props.state,
                id: this.id.value,
                playerTwo: this.name.value.toUpperCase()
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
                        <input type='text' placeholder='ENTER YOUR NAME' ref={(name) => { this.name = name; }} required />
                        <input type='text' placeholder='ENTER GAME ID' ref={(id) => { this.id = id; }} required />
                        <button type='submit'>Join</button>
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

module.exports = connect(mapStateToProps)(JoinGame);
