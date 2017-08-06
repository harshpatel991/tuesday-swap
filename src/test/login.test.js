import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import App from '../App';
import { CookiesProvider} from 'react-cookie';
import {BrowserRouter} from "react-router-dom";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <CookiesProvider>
            <App/>
        </CookiesProvider>
        </BrowserRouter>, div);

    const nodeEmail = this.ids.email;
    nodeEmail.value = 'verified@test.com';
    const nodePassword = this.ids.password;
    nodePassword.value = 'verified';

    ReactTestUtils.Simulate.change(nodeEmail);
    ReactTestUtils.Simulate.change(nodePassword);
});