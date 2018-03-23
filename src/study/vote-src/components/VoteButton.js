import React from 'react';
import {connect} from "react-redux";
import action from '../store/action/index';

class VoteButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {supportA, supportB} = this.props;
        console.log(this.props);
        return <main className="panel-body">
            <button type="button"
                    className="btn btn-danger"
                    onClick={()=>{
                        supportA()
                    }
                    }>
                白敬亭
            </button>
            &nbsp;&nbsp;
            <button type="button"
                    className="btn btn-success"
                    onClick={()=>{
                        supportB()
                    }}>
                刘昊然
            </button>
        </main>;
    }
}

const mapStateToProps = (state) => {
    //=>state:存储的是store中的状态
    //{vote:{A:,B:}}
    return {
        ...state.vote
    }//=>返回的是啥，就相当于把这些属性挂载到组件的props上了
};
const mapDispatchToProps = (dispatch) => {
    const {supportA, supportB} = action.vote;
    return {
        supportA() {
            dispatch(supportA())
        },
        //把返回对象中的每一个属性方法挂载到props上
        supportB() {
            dispatch(supportB())
        }
    }

};
export default connect(state => ({...state.vote}), action.vote)(VoteButton);
/*
* connect:react-redux中提供的高阶组件，目的是为了把store容器中的state、action分别作为组件的属性传递给组件
* 第二个括号中的参数是我们需要处理的组件
* 第一个括号中的参数：
* mapStateToProps：把store容器中的state作为组件的属性
* mapDispatchToProps：把store容器中的派发操作作为组件的属性
*/