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