import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'

class ResumeGame extends React.Component {
    constructor() {
        super();
        this.resumeGame = this.resumeGame.bind(this);
    }

    resumeGame(event) {
        event.preventDefault();
        this.props.dispatch({
            type: 'server/resumeGame',
            data: {
                state: this.props.state,
                name: this.name.value.toUpperCase(),
                id: this.id.value
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
            <section className="landing-container">
                <div className="landing-page">
                    <form onSubmit={this.resumeGame}>
                        <input type='text' placeholder='ENTER YOUR NAME' ref={(name) => { this.name = name; }} required />
                        <input type='text' placeholder='ENTER GAME ID' ref={(id) => { this.id = id; }} required />
                        <button type="submit">Resume</button>
                    </form>
                </div>
            </section>
        );
    }   
}

const mapStateToProps = (state) => {
    return {
        gameId: state.gameId,
        state: state
    };
};

module.exports = connect(mapStateToProps)(ResumeGame);