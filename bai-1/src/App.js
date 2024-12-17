import './App.css';
import React, { useState } from "react";
import { getAll } from "./components/service/studentService";
import ListComponent from "./components/student/ListComponent";
import HeaderComponet from "./components/student/HeaderComponet";
import 'bootstrap/dist/css/bootstrap.min.css';

function HeaderComponent() {
    return null;
}

function App() {

    const [studentsList, setStudentsList] = useState(getAll());

    const addStudent = (newStudent) => {
        setStudentsList([...studentsList, { id: studentsList.length + 1, ...newStudent }]);
    };

    const updateStudent = (id, updatedData) => {
        setStudentsList(studentsList.map(student => student.id === id ? { ...student, ...updatedData } : student));
    };
    const deleteStudent = (id) => {
        setStudentsList(studentsList.filter(student => student.id !== id));
    };

    return (
        <>
            <HeaderComponet/>
            <div className="container mt-4">
                <ListComponent
                    studentsList={studentsList}
                    onAdd={addStudent}
                    onUpdate={updateStudent}
                    onDelete={deleteStudent}
                />
            </div>
        </>
    );
}

export default App;
