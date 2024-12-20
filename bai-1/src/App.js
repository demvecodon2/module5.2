import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import StudentList from './components/student/ListComponent';
import AddStudent from './components/student/AddStudent';
import StudentDetail from './components/student/StudentDetail';
import UpdateStudent from './components/student/UpdateStudent';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
    return (

            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" to="/">Student Management</NavLink>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/">List</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/add">Add</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container mt-4">
                    <ToastContainer />
                    <Routes>
                        <Route path="/" element={<StudentList />} />
                        <Route path="/add" element={<AddStudent />} />
                        <Route path="/detail/:id" element={<StudentDetail />} />
                        <Route path="/edit/:id" element={<UpdateStudent />} />
                    </Routes>
                </div>
            </div>
    );
}

export default App;