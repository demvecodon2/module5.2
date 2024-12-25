import React, { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { login } from "../../redux/accountAction";
import { checkLogin } from "../service/accountService";
import { toast } from "react-toastify";

function LoginComponet() {
    const account = useSelector(state => state.user.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleLogin = async () => {
        let username = usernameRef.current.value;
        let password = passwordRef.current.value;
        const loginInfo = {
            username: username,
            password: password,
        };
        console.log(loginInfo);
        let isLoginSuccess = await dispatch(login(loginInfo));
        if (isLoginSuccess) {
            toast.success('Login thành công!');
            navigate('/students');
        } else {
            toast.error(' đăng nhập thất bại! sai mất khẩu hoặc tài khoản.');
            console.log('Login failed!');
            passwordRef.current.value = '';
        }
    };

    return (
        <form>
            <h3>Login {(account != null) ? account.username : ""}</h3>
            <div>
                <label>Username:</label>
                <input ref={usernameRef} name={'username'} required />
            </div>
            <div>
                <label>Password:</label>
                <input ref={passwordRef} name={'password'} required />
            </div>
            <div>
                <button onClick={handleLogin} type={'button'}>Login</button>
            </div>
        </form>
    );
}

export default LoginComponet;