/* eslint-disable no-constant-condition */

import { put, takeEvery, delay } from 'redux-saga/effects'

/** 
 * 
 * takeLatest, // 短时间内（没有执行完函数）多次触发的情况下，指会触发相应的函数一次
 * takeEvery, // takeLatest 的同胞兄弟，不同点是每次都会触发相应的函数
 * !put, // 作用跟 dispatch 一毛一样，可以就理解为dispatch
 * !call, // fork 的同胞兄弟，不过fork是非阻塞，call是阻塞，阻塞的意思就是到这块就停下来
 * fork, // 是非阻塞的，返回一个任务，是可以取消的
 * take, // 监听函数(可以理解为就是监听action.type)
 * cancel, // 取消fork的任务
 * cancelled, // 判断是否取消了,
 * race // 队列
*/

export function* incrementAsync() {
    yield delay(1000)
    yield put({ type: 'INCREMENT' })
}

export default function* rootSaga() {
    console.log('加载saga: 监听INCREMENT_ASYNC， 等待1000后，触发INCREMENT')
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

