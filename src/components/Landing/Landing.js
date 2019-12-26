import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'

class Landing extends Component {
    state = {}
    render() {
        return (
            <main role='main'>
                    <h1>Recipe Roulette!</h1>
                        <h2>purely chaotic concoctions.</h2>
                        <section>
                            <header>Create with other people...</header>
                            <p>Recipe Roulette lets you collaborate and contribute to recipes with other people -- randomnly. You won't find out what's in your recipe until after its finished. Should you cook it or not?</p>
                        </section>
                        <header>See all of the crazy concoctions...</header>
                        <p>See what people across have come up with! While some recipes may be completely impractical, some will spark inspiration for the chef that likes challenges.</p>
                        <section>
                            <header>Start your chaotic collaborations now!</header>
                            <Link to='/recipe-list'>see some recipes here...</Link>
                            <p>The path to unknown food awaits.</p>
                            <Link to='/signup'>Sign me up!</Link>
                            <div><Link to='/contribute'>contribute.</Link></div>
                        </section>
                        <footer>footer</footer>
                    </main>
                    );
                }
            }
            
export default Landing;