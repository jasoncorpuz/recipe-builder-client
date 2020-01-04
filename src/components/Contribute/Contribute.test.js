import React from 'react';
import ReactDOM from 'react-dom';
import Contribute from './Contribute';
import { BrowserRouter } from 'react-router-dom'
import App from '../App/App'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <BrowserRouter>
        <App>
            <Contribute />
        </App>
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});