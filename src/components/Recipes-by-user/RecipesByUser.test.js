import React from 'react';
import ReactDOM from 'react-dom';
import RecipesByUser from './RecipesByUser';
import { BrowserRouter } from 'react-router-dom'
import App from '../App/App'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <BrowserRouter>
        <App>
            <RecipesByUser />
        </App>
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});