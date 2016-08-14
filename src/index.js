import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
import initialState from './store/initialState'

import './styles/app.less'

const store = configureStore(initialState);

render(
    <Provider store={store}>
        <div className='app'>
            <App />
        </div>
    </Provider>, document.getElementById('spa')
);
