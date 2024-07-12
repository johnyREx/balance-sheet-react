export const initialState = null;

export const  reducer = (state, action) => {

    if(action.type=== "SuperUser"){
        return action.payload;
    }

    return state;


}