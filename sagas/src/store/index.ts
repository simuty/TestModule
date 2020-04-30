/*
 * @Author: simuty
 * @Date: 2020-04-27 13:35:35
 * @LastEditTime: 2020-04-29 15:36:08
 * @LastEditors: Please set LastEditors
 * @Description:
 *
 *      1. redux 中间件初始化；
 *      2. 引入文件说明
 *          1.  rootReducer: reducer 根据antion.type生成新的state, 也是createStore所需要的参数
 *          2.  rootSaga: saga 相关配置
 *      2. 
 *
 */
import { createStore, applyMiddleware, compose } from 'redux';

import createSagaMiddleware, { END } from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';


/**---------redux-中间件配置&初始化------------*/


// saga 初始化
const sagaMiddleware = createSagaMiddleware();

// 加载中间件
const middleware: any = applyMiddleware(sagaMiddleware);
/**---------redux-中间件配置&初始化------------*/


export default function configureStore() {
    const store: any =
        process.env.NODE_ENV === 'production'
            ? createStore(rootReducer, middleware)
            : (window as any).__REDUX_DEVTOOLS_EXTENSION__
                ? createStore(
                    rootReducer,
                    compose(middleware, (window as any).__REDUX_DEVTOOLS_EXTENSION__())
                )
                : createStore(rootReducer, middleware)

    sagaMiddleware.run(rootSaga);
    // store.close = () => store.dispatch(END);
    return store;
}