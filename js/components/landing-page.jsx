import React from 'react';
import {Link} from 'react-router';

function LandingPage() {
    return (
        <section className='landing-container'>
            <div className='landing-page'>
                <Link to='/new'>
                    <button>New Game</button>
                </Link>
                <Link to='/join'>
                    <button className='join'>Join Game</button>
                </Link>
                <Link to='/resume'>
                    <button>Resume Game</button>
                </Link>
            </div>
        </section>
    );
}

module.exports = LandingPage;