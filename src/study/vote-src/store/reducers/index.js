//合并所有编写reducer
import {combineReducers} from "redux";
import vote from './vote';

const reducer = combineReducers({
    vote
});
export default reducer;