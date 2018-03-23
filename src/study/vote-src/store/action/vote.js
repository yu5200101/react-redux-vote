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