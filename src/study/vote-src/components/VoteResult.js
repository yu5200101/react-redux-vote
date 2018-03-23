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
