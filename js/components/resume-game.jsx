import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router'

class ResumeGame extends React.Component {
    constructor() {
        super();
        this.resumeGame = this.resumeGame.bind(this);
    }

    resumeGame(event) {
        event.preventDefault();
        this.props.dispatch({
            type: 'server/findGame',
            data: {
                id: this.id.value
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
            <section className="landing-container">
                <div className="landing-page">
                    <h2>Enter Game ID:</h2>
                    <form onSubmit={this.resumeGame}>
                        <input type="text" ref={(id) => { this.id = id; }} required />
                        <button type="submit">Resume Game</button>
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

module.exports = connect(mapStateToProps)(ResumeGame);