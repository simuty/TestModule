import { all, fork } from 'redux-saga/effects';

import couterSata from './couter';
function* rootSaga() {
    yield all([
        fork(couterSata)
    ])
}
export default rootSaga;