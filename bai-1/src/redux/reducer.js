import {combineReducers} from "redux";


const  initStage = {
   account: null,
}
function accountReducer(stage = initStage,action) {
    switch(action.type){
        case 'LOGIN':
            return {...stage, account: action.payload  }
        case 'LOGOUT':
            return {
                ...stage,
                account : null
            }
        default:
            return stage;
    }

}
export const rootReducer  = combineReducers({
    user: accountReducer
});
