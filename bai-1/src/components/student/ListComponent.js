import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllStudents, deleteStudentById } from '../service/studentService';
import { toast } from 'react-toastify';

function StudentList() {
    const [students, setStudents] = useState(getAllStudents());

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this student?');
        if (confirmDelete) {
            deleteStudentById(id);
            setStudents(getAllStudents()); // Refresh the list after deletion
            toast.success('Student deleted successfully!');
        }
    };

    return (
        <div>
            <h1 className="text-center mb-4">Student List</h1>
            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                    <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.length > 0 ? (
                        students.map(student => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.age}</td>
                                <td>{student.address}</td>
                                <td>{student.email}</td>
                                <td className="text-center">
                                    <Link
                                        to={`/detail/${student.id}`}
                                        className="btn btn-primary btn-sm me-2"
                                    >
                                        View
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(student.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No students found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StudentList;
