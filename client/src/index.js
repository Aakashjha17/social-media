// all action towards our backend are done using redux we need to dispatch those action
//adding redux make our application scalable
import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';//provider going to keep track that store i.e global state that allows us access that store from anywhere inside the app
import { createStore , applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers';

import App from './App';
import './index.css'

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store= {store}>
        <App />
    </Provider>,
    document.getElementById('root')
);