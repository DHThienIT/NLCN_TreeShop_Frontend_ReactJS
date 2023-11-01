import { all, takeEvery, call } from 'redux-saga/effects'
import WebSaga from './webSaga'
import {
    GET_ALL_LIST_TREE,
    RESTART_TRACKING_LIST_TREE,
    SUCCESSFUL_LOGIN_NOTIFICATION,
    RESTART_lIST_ADDRESS
} from '../constants/constants'

function* handleLogin(action) {
    // yield call(WebSaga.setCurrentUser, action)
    yield call(WebSaga.getCurrentCart, action);
    yield call(WebSaga.getTrackingListTree, action);
    yield call(WebSaga.restartListAddress, action);
    yield call(WebSaga.restartInvoicesPaySuccessByUser, action);
}

function* handleRestartTrackingListTree(action) {
    yield call(WebSaga.restartTrackingListTree, action);
}

function* handleRestartListAddress(action) {
    yield call(WebSaga.restartListAddress, action);
}

function* handleAllListTree(action) {
    // console.log('111111111111111111111 2');
    yield call(WebSaga.getAllListTree, action);
}

function* sagas() {
    yield all([
        takeEvery(GET_ALL_LIST_TREE, handleAllListTree),
        takeEvery(SUCCESSFUL_LOGIN_NOTIFICATION, handleLogin),
        takeEvery(RESTART_TRACKING_LIST_TREE, handleRestartTrackingListTree),
        takeEvery(RESTART_lIST_ADDRESS, handleRestartListAddress),
    ])
}

export default sagas