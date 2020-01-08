import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'

class Landing extends Component {
    state = {}
    render() {
        return (
            <main role='main' className='landing'>
                    <section>
                    <h1 className='title'>Recipe Roulette!</h1>
                        <h2>purely chaotic concoctions.</h2>
                        
                            <header>Create with other people...</header>
                            <p className='description'>Recipe Roulette lets you collaborate and contribute to recipes with other people -- randomly. You won't find out what's in your recipe until after its finished. Should you cook it or not?</p>
                        
                        <p>See what people across have come up with! While some recipes may be completely impractical, some will spark inspiration for the chef that likes challenges.</p>
                        
                            <header>Start your chaotic collaborations now!</header>
                            <Link to='/recipe-list'><h2>see some recipes here...</h2></Link>
                            <p>The path to unknown food awaits.</p>
                            <Link to='/signup'><h2 className='signup'>Sign me up!</h2></Link>
                        
                        </section>
                    </main>
                    );
                }
            }
            
export default Landing;