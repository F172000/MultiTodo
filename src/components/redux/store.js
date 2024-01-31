import {configureStore} from '@reduxjs/toolkit';
import listReducer from './reducer';
const store=configureStore({
    reducer:{
        list:listReducer,
    },
});
export default store;