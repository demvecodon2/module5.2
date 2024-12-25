import axios from "axios";

export async function checkLogin(loginInfo) {
    try {
        const reponse = await axios.get("http://localhost:3000/accounts");

        const account = reponse.data.find(ac => ac.username === loginInfo.username && ac.password === loginInfo.password);
        if (account!=null){
            return account;
        }else{
            return null;
        }
    } catch (error) {
        return null;
    }


}