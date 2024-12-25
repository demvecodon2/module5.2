import {checkLogin} from "../components/service/accountService";

export function login(loginInfo) {

    return async (dispatch) => {
        const account = await checkLogin(loginInfo);
        if(account!=null){
        dispatch({
                type: "LOGIN",
                    payload: account
        })
            return true;
    }else{
           console.log("Login ko thanh cong!  ");
           return false;
        }
    }
}

export function logout() {
    return {
        type: "LOGOUT"
    };
}

