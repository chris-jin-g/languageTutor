import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/Containers/App/App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react'

import createAppStore from './Lib/app-create-store';
const {persistor, store} = createAppStore()

// const store = appCreateStore();
/*eslint-disable */
ReactDOM.render(
 <Provider store={store}>
 <PersistGate persistor={persistor}><App/>
 </PersistGate>
</Provider>, document.getElementById("root"));
/* eslint-enable */

registerServiceWorker();

// import React from 'react'; import App from './App'; import {BrowserRouter,
// Route} from 'react-router-dom'; import {Provider} from 'react-redux'; import
// createAppStore from './store'; import {PersistGate} from
// 'redux-persist/es/integration/react' const {persistor, store} =
// createAppStore() const AppContainer = () => (  <Provider store={store}>
// <PersistGate persistor={persistor}>    <BrowserRouter>     <Route path="/"
// component={App}/>    </BrowserRouter>   </PersistGate>  </Provider> ); export
// default AppContainer;