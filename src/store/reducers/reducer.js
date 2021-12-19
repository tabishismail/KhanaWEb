const INITIAL_STATE = {
    CurrentUser:{
        name:"hello"
    }
};
function Reducer(state = INITIAL_STATE,action){
    switch(action.type){
        case "User":
            return { ...state,CurrentUser:action.User}
        default:
            return state;        
    }
}
export default Reducer;