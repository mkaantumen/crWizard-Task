import {store} from "../index";


export const ADD = async (state) => {
    console.log(state)
    store.dispatch({ type: "ADD", payload: state })
    return store.getState()
};

export const getData = async () => {
    return store.getState()
};
