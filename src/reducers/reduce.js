import {ADD} from "../actions/action";

const INITIAL_STATE = {
    data: [{name : "test",
        currency : "test",
        incoming : "test",
        expense: "test"}],
}


export const reducer =  (state = INITIAL_STATE, action) => {
    console.log(action.type)
    switch (action.type) {
        case "ADD":
            console.log(1)
            return {
                ...state,
                data: action.payload
            }
        default :
            return state;
    }
};
