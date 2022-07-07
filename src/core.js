import {createActions, handleActions} from "redux-actions";
import {combineReducers} from "redux";

const moduleList = [
    'mapping_management',
    // 'barcodes_management',
    // 'areas_management'
]

export function getModules() {
    return moduleList.map((module) => {
        return {
            manifest: require(`./modules/${module}/manifest`).manifest,
            reducer: require(`./modules/${module}/reducer`).reducer,
            actions: require(`./modules/${module}/actions`).actions,
        }
    })
}

export function getReducer() {
    return combineReducers(getModules().reduce((reducers, module) => ({
        ...reducers,
        [module.manifest.moduleName]: handleActions(module.reducer.handlers, module.reducer.defaultState, {prefix: module.manifest.moduleName})
    }), {}))
}

export function getActions(moduleName) {
    return getModules().reduce((actions, module) => ({
        ...actions,
        [module.manifest.moduleName]: createActions(module.actions, {prefix: module.manifest.moduleName})
    }), {})[moduleName];
}