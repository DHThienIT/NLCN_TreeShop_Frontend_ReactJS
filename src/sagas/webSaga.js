import { call, put } from "redux-saga/effects";
import { setCart, setListAddress, setListInvoice, setListTree, setNumberOfTree, setTrackingListTree } from "../actions/action";
import RootService from "../services/rootService";
// import AuthService from "../services/auth.service";

// function* setCurrentUser(action) {
//     console.log('App Saga - Action: ', action);
//     const currentUser = yield call(AuthService.getCurrentUser())

//     // console.log('-----------------------------------------trackingList: ', trackingList.data);
//     yield put(setCurrentUser(currentUser))
// }
function* getAllListTree(action) {
    console.log('App Saga - Action: ', action);
    const allListTreeList = yield call(RootService.TreeService.getAllListTree, 0, 'treeId')
    const numberOfTrees = yield call(RootService.TreeService.getNumberOfTrees)
    yield put(setListTree(allListTreeList.data.content))
    yield put(setNumberOfTree(numberOfTrees.data))
}

function* getCurrentCart(action) {
    console.log('App Saga - Action: ', action);
    const cart = yield call(RootService.CartService.getListCartItem, action.payload.id)
    yield put(setCart(cart.data))
}

function* getTrackingListTree(action) {
    console.log('App Saga - Action: ', action);
    const trackingList = yield call(RootService.TrackingListTreeService.getTrackingListTreeByUserId, action.payload.id)
    yield put(setTrackingListTree(trackingList.data))
}

function* restartTrackingListTree(action) {
    console.log('App Saga - Action: ', action);
    const trackingList = yield call(RootService.TrackingListTreeService.updateTreeInTrackingList, action.currentUserId, action.treeId)
    yield put(setTrackingListTree(trackingList.data))
}

function* restartListAddress(action) {
    console.log('App Saga - Action: ', action);
    const listAddress = yield call(RootService.AddressService.getAllAddressInfo, action.payload.id)
    yield put(setListAddress(listAddress.data))
}

function* restartInvoicesPaySuccessByUser(action) {
    console.log('App Saga - Action: ', action);
    const listInvoice = yield call(RootService.InvoiceService.getAllInvoicesPaySuccessByUser, action.payload.id)
    console.log(listInvoice);
    yield put(setListInvoice(listInvoice))
}

const WebSaga = {
    getAllListTree,
    getCurrentCart,
    getTrackingListTree,
    restartTrackingListTree,
    restartListAddress,
    restartInvoicesPaySuccessByUser,
}

export default WebSaga