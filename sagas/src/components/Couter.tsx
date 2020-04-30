/** 
 * 类组件
*/

import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch, compose } from 'redux';

// Component

interface ICouterStateProps {
    value: number
}

interface ICouterDispatchProps {
    onIncrement: Function,
    onDecrement: Function,
    onIncrementIfOdd: Function,
    onIncrementAsync: Function,
}

interface ICouterProps extends ICouterStateProps, ICouterDispatchProps { }

interface ICouterState { }

export class Couter extends React.Component<ICouterProps, ICouterState> {

    public render() {
        const { value, onIncrement, onDecrement, onIncrementIfOdd, onIncrementAsync } = this.props
        const handleIncrement = () => {
            onIncrement()
        }
        const handleDecrement = () => {
            onDecrement()
        }
        const handleIfOdd = () => {
            onIncrementIfOdd()
        }
        const handleAsync = () => {
            onIncrementAsync()
        }
        return (
            <div>
                Clicked: {value} times
                <button onClick={handleIncrement}>+</button>
                <button onClick={handleDecrement}>-</button>
                <button onClick={handleIfOdd}>Increment if odd</button>
                <button onClick={handleAsync}>Increment async</button>
            </div>
        );
    }
}

// Container

interface ICouterOwnProps { }
// 从state获取props
const mapStateToProps = (state: any, ownProps: ICouterOwnProps): ICouterStateProps => {
    return {
        value: state.couter
    };
};
// dispatch
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: ICouterOwnProps): ICouterDispatchProps => {
    return {
        onIncrement() {
            dispatch({ type: 'INCREMENT' })
        },
        onDecrement() {
            dispatch({ type: 'DECREMENT' })
        },
        onIncrementIfOdd() {
            dispatch({ type: 'INCREMENT_IF_ODD' })
        },
        onIncrementAsync() {
            dispatch({ type: 'INCREMENT_ASYNC' })
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Couter);