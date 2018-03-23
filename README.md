
            
###真实项目中应用redux/react-redux的开发流程
>redux是用来进行状态统一管理的组件
>react-redux是把redux进一步封装，使其在react项目中可以快速应用
>真实项目中我们如果基于react框架开发，都会把redux/react-redux结合在一起来使用
但是值得注意的是，很多初学者体会到redux的好处后，经常出现很多内容都通过redux存储管理，不建议大家这样做，使用redux管理，逻辑复杂度提升很多，过多使用不方便开发和维护；一般我们只把平行组件间中需要用到的一些公共信息放到redux里，例如：
- 登录/注册成功后，我们可以把个人的基本信息或者权限信息（很少的数据）存放在redux中进行管理
- 在电商类产品，购物信息（加入到购物车中的内容），我们一般也放在redux中管理，（个人建议存放在redux容器中的购物信息，基本上是商品的标识，id，或者其他标识以及数量等少量信息即可，没必要把所有商品的信息存储进来）

###1、安装组件
>$ yarn add redux react-redux 或者$ npm i redux react-redux --save-dev 

###2、搭建项目目录
我们以一个小投票的案例来分析
我们是基于create-react-app构建的整个项目，其他的文件目录这里就不编写了，只把src中需
要的内容列举出来
|-src
  |-component[组件]，存放项目中的一个个组件
    |-VoteButton
    |-VoteResult
  |-store  存储的是redux全套管理内容
    |-action
      |-index.js
      |-vote.js
    |-reducers
      |-index.js
      |-vote.js
    |-action-types.js
    |-index.js
  |-index.js[项目的入口]，在这里实现JSX元素的渲染
  我们真实项目中为了方便管理，我们把每一个功能版块都建立对应的action和reducer，最后再由index中把多个个action和reducer进行合并并处理
  
  ###3、把store中需要编写的逻辑进行处理
  
  ### 1)定义所有的行为标识
  >action-types.js
  ```javascript
/*
* 宏观管理当前项目中需要用到的所有行为标识(redux中需要使用)
*/
export const VOTE_A = 'VOTE_A';
export const VOTE_B = 'VOTE_B';
```
  
  ### 2）处理reducer 
  >所有容器中的状态修改，都要经过reducer统一管理和处理
  >reducer/vote.js
  ```javascript
/*
* vote版块需要管理的state对应的reducer
* state:目前store容器中存储的当前reducer中对应的状态信息（开始容器中是没有这些状态的，我们需要对其设置一些默认值）
* action:一个对象，我们派发的行为，{type:行为标识，...}
*/
import * as Types from '../action-types';

function vote(state = {
    A: 0,
    B: 0
}, action) {
    state = {...state};//基于浅克隆技术把原有容器中存储的state克隆一份，接下来我们操作state和原有容器中的state没有任何关系了=> state=JSON.parse(JSON.stringify(state))深度克隆
    switch (action.type) {
        case Types.VOTE_A:
            state.A += 1;
            break;
        case Types.VOTE_B:
            state.B += 1;
            break;
    }
    return state;//=>把最新修改后的state返回，替换store容器中现有的state值
}

export default vote;
```
  >reducer/index.js
  ```javascript
//合并所有编写reducer
import {combineReducers} from "redux";
import vote from './vote';

const reducer = combineReducers({
    vote
});
export default reducer;
```
### 3)编写store中的redux创建容器
>store/index.js
```javascript

/*
* 创建容器 并且将其导出
* 1、依赖reducer
* 2、在这里配置各种中间件
* ...
*/
import {createStore} from 'redux';
import reducer from './reducers/index';

const store = createStore(reducer);

export default store;

```

### 4)action-creator
>把后期组件中需要进行dispatch派发的任务都封装为具体的方法，返回派发时是需要action对象即可

>action/vote.js
```javascript
import * as Types from '../action-types';

const vote = {
    supportA() {
        return {
            type: Types.VOTE_A,
        };
    },
    supportB() {
        return {
            type: Types.VOTE_B,
        }
    }
};
export default vote;

```

>action/index.js
 ```javascript

import vote from './vote';

const action = {
  vote,
};
export default action;
```

### 4)编写组件，基于react-redux完成状态的使用和修改
>index.js
```javascript
import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import VoteResult from "./components/VoteResult";
import VoteButton from "./components/VoteButton";
import {Provider, connect} from 'react-redux';
import store from './store/index';
//=>重要的事情：
//1、导入store(创建好的容器)
//2、利用react-redux中的provider组件（把组件作为根组件），把创建的容器通过属性的方式传递给这个根组件，（目的：基于react-redux的处理，可以把store中的状态信息以及dispatch传递给当前项目中的每一个子组件【前提是子组件需要经过高阶处理】）
ReactDom.render(
    <Provider store={store}>
        <div className="panel panel-default" style={{width: '50%', margin: '0 auto'}}>
            <VoteResult/>
            <VoteButton/>
        </div>
    </Provider>, window.root);
```

>component/VoteButton.js
```javascript

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
```

>components/VoteResult.js

```javascript

import React from 'react';
import {connect} from "react-redux";
import action from '../store/action/index';

class VoteResult extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {A, B} = this.props,
            val = ((A / (A + B)) * 100).toFixed(2) + '%';
        (A + B) === 0 ? val = '50%' : null;
        return <header className="panel-heading">
            <h3 className="panel-title">白敬亭VS刘昊然 谁更帅</h3>
            <div className="progress"
                 style={{
                     margin: '20px 0',
                     background: '#5cb85c'
                 }}>
                <div className="progress-bar"
                     role="progressbar"
                     aria-valuenow="60"
                     aria-valuemin="0"
                     aria-valuemax="100"
                     style={{
                         width: val,
                         background: '#d9534f'
                     }}>
                    {val}
                </div>
            </div>
        </header>;
    }
}

export default connect(state => ({...state.vote}), action.vote)(VoteResult);

```