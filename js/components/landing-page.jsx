import React from 'react';
import {Link} from 'react-router';

function LandingPage() {
    return (
        <section className='landing-container'>
            <div className='landing-page'>
                <Link to='/new'>
                    <button className='intro'>New Game</button>
                </Link>
                <Link to='/join'>
                    <button className='intro'>Join Game</button>
                </Link>
                <Link to='/resume'>
                    <button className='intro'>Resume Game</button>
                </Link>
            </div>
        </section>
    );
}

module.exports = LandingPage;