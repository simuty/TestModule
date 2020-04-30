import React from 'react';
import './App.css';

import { Provider } from 'react-redux'
import Couter from './components/Couter'
import CouterFun from './components/CouterFun'

import configureStore from './store'

const store = configureStore()

function App() {
    return (
        <Provider store={store}>
            {/* <Couter /> */}
            <CouterFun />
        </Provider>
    );
}

export default App;
