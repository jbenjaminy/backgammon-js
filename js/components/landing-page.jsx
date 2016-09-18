import React from 'react';
import { Link } from 'react-router';

function LandingPage() {
    return (
        <section className='landing-container'>
            <div className='landing-page'>
                <h1>Backgammon</h1>
                <div>
                    <Link to='/new'>
                        <button>New Game</button>
                    </Link>
                    <Link to='/join'>
                        <button>Join Game</button>
                    </Link>
                    <Link to='/resume'>
                        <button>Resume Game</button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

module.exports = LandingPage;