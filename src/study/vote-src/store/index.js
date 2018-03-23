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
