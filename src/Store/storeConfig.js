import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({

});
const middleware = applyMiddleware(thunk);

const configureStore = () => {
    return createStore(rootReducer, middleware);
}

export default configureStore;