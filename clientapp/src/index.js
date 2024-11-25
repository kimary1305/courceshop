import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import JeweleryStore from "./store/JeweleryStore";

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        jewelery: new JeweleryStore(),
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);

