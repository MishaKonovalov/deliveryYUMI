import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from '../src/components/ShopSide/App/App'
import { applyMiddleware, createStore } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './store/reducers/rootReducer'

const store = createStore(rootReducer, applyMiddleware(thunk))

const app = (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)
ReactDOM.render(<>{app}</>, document.getElementById('root'))
