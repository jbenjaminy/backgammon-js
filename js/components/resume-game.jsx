import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const propTypes = {
    dispatch: PropTypes.func,
    gameId: PropTypes.object
};

class ResumeGame extends React.Component {
    constructor() {
        super();
        this.resumeGame = this.resumeGame.bind(this);
    }

    resumeGame(event) {
        event.preventDefault();
        const promise = new Promise((res) => {
            res(
                this.props.dispatch({
                    type: 'server/findGame',
                    data: this.id.value
                })
            );
        });
        promise.then(function() {
            window.location.href = '/#/game/' + this.props.gameId;
        });
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

ResumeGame.propTypes = propTypes;
module.exports = connect(mapStateToProps)(ResumeGame);