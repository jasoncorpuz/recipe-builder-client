import React from 'react';
import ReactDOM from 'react-dom';
import ContributionSuccess from './Contribution-Success';
import { BrowserRouter } from 'react-router-dom'
import App from '../App/App'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <BrowserRouter>
        <App>
            <ContributionSuccess />
        </App>
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});