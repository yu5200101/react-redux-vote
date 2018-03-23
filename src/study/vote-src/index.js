import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from "redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import VoteResult from "./components/VoteResult";
import VoteButton from "./components/VoteButton";
import {Provider, connect} from 'react-redux';
import store from './store/index';
ReactDom.render(
    <Provider store={store}>
        <div className="panel panel-default" style={{width: '50%', margin: '0 auto'}}>
            <VoteResult/>
            <VoteButton/>
        </div>
    </Provider>, window.root);
/*
* redux && react-redux (react-mobx、dva/react框架)
* 一款用来统一管理数据和状态的组件，redux可以应用到vue,react,JQ...这些技术中，但是react-redux是专门针对于react开发的
*
* store就是我们创建的这个容器
* 获取统一状态信息：getState
* 修改容器中的信息:store.state.xxx=xxx;这样是修改状态，
* redux不允许(redux是统一状态管理，不允许直接的修改状态信息，这样会导致状态管理混乱，redux把修改容器中状态的行为操作统一放在一起reducer进行管理，这样还有一个好处，可以控制修改状态完成后，进行一些额外的事情，例如:重新渲染对应的组件等)
* store.subscribe：基于发布订阅模式，创建一个事件池，把一些方法填充到事件池中，当容器中的状态信息发生改变的时候，通知事件池中的方法依次执行。
*/