import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const propTypes = {
  dispatch: PropTypes.func,
};

class JoinGame extends React.Component {
  constructor() {
    super();
    this.joinGame = this.joinGame.bind(this);
  }

  joinGame(event) {
    event.preventDefault();
    const promise = new Promise((res) => {
      res(this.props.dispatch({
        type: 'server/joinGame',
        data: {
          _id: this.id.value,
          playerTwo: this.name.value
        }
      }));
    });
    promise.then(function() {
      window.location.href = '/#/game/' + this.props.gameId;
    });
  }

  render() {
    return (
      <section className="landing-container">
        <div className="landing-page">
          <form onSubmit={this.joinGame}>
            <div>
              <h2>Enter your name:</h2>
              <input type="text" ref={(name) => { this.name = name; }} required />
            </div>
            <div>
              <h2>Enter Game ID:</h2>
              <input type="text" ref={(id) => { this.id = id; }} required />
            </div>
            <button type="submit">Join Game</button>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    gameId: state.gameId
  };
};

JoinGame.propTypes = propTypes;
export const JoinGame = connect(mapStateToProps)(JoinGame);
