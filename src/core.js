import {createActions, handleActions} from "redux-actions";
import {applyMiddleware, combineReducers, createStore} from "redux";
import promise from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension';

const moduleList = [
    'mapping_management',
    'areas_management',
    'barcodes_management'
]

export function getModules() {
    return moduleList.map((module) => {
        return {
            manifest: require(`./modules/${module}/manifest`).default(),
            reducer: require(`./modules/${module}/reducer`).default(),
            actions: require(`./modules/${module}/actions`).default(),
        }
    })
}

function getAllModules() {
    const mainModule = {
        manifest: require(`./manifest`).default(),
        reducer: require(`./reducer`).default(),
        actions: require(`./actions`).default(),
    }

    return [...moduleList.map((module) => {
        return {
            manifest: require(`./modules/${module}/manifest`).default(),
            reducer: require(`./modules/${module}/reducer`).default(),
            actions: require(`./modules/${module}/actions`).default(),
        }
    }), mainModule];
}

export function getReducer() {
    return combineReducers(getAllModules().reduce((reducers, module) => ({
        ...reducers,
        [module.manifest.moduleName]: handleActions(module.reducer.handlers, module.reducer.defaultState, {prefix: module.manifest.moduleName})
    }), {}))
}

export function getActions(moduleName) {
    return getAllModules().reduce((actions, module) => ({
        ...actions,
        [module.manifest.moduleName]: createActions(module.actions, {prefix: module.manifest.moduleName})
    }), {})[moduleName];
}

const asyncDispatchMiddleware = store => next => action => {
    let syncActivityFinished = false;
    let actionQueue = [];

    function flushQueue() {
        actionQueue.forEach(a => store.dispatch(a)); // flush queue
        actionQueue = [];
    }

    function asyncDispatch(asyncAction) {
        actionQueue = actionQueue.concat([asyncAction]);

        if (syncActivityFinished) {
            flushQueue();
        }
    }

    const actionWithAsyncDispatch =
        Object.assign({}, action, { asyncDispatch });

    const res = next(actionWithAsyncDispatch);

    syncActivityFinished = true;
    flushQueue();

    return res;
};

const loadingStateMiddleware = store => next => action => {
    if(action.type.includes('PENDING')) {
        store.dispatch(getActions('app').setLoading(true))
    }

    if(action.type.includes('FULFILLED')) {
        store.dispatch(getActions('app').setLoading(false))
    }

    if(action.type.includes('REJECTED')) {
        store.dispatch(getActions('app').setLoading(false))
        store.dispatch(getActions('app').setSnackbar({
            severity: 'error',
            open: true,
            message: `Ops! Qualcosa è andato storto... riprova.`,
            timeout: 2000
        }))
    }

    next(action);
}

const completeStateMiddleware = store => next => action => {
    const actionWithCompleteState = Object.assign({}, action, { completeState : store.getState() });
    next(actionWithCompleteState)
}

export const store = createStore(getReducer(), composeWithDevTools(applyMiddleware(promise, loadingStateMiddleware, completeStateMiddleware, asyncDispatchMiddleware)));