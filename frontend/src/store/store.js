import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

export const rootReducer = combineReducers({ 
    
})

const logger = createLogger();

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

export default function configureStore(preloadedState={}){
    return createStore(rootReducer, preloadedState, applyMiddleware(...middleware))
}
