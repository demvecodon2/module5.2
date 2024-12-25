import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/accountAction';
import StudentList from './components/student/ListComponent';
import AddStudent from './components/student/AddStudent';
import StudentDetail from './components/student/StudentDetail';
import UpdateStudent from './components/student/UpdateStudent';
import LoginComponent from './components/student/LoginComponet';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
    const account = useSelector(state => state.user.account);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/home">Student Management</NavLink>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">List</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/add">Add</NavLink>
                            </li>
                            <li className="nav-item">
                                {account ? (
                                    <>
                                        <span className="nav-link"> {account.username}</span>
                                        <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                                    </>
                                ) : (
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container mt-4">
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<StudentList />} />
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/add" element={<AddStudent />} />
                    <Route path="/detail/:id" element={<StudentDetail />} />
                    <Route path="/edit/:id" element={<UpdateStudent />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;