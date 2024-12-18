import React from 'react';
import { useParams } from 'react-router-dom';
import { findStudentById } from '../service/studentService';

function StudentDetail() {
    const { id } = useParams();
    const student = findStudentById(Number(id));

    return (
        <div className="card mx-auto mt-4" style={{ maxWidth: '30rem' }}>
            <div className="card-header text-center">Student Detail</div>
            <div className="card-body">
                {student ? (
                    <div>
                        <p><strong>Name:</strong> {student.name}</p>
                        <p><strong>Age:</strong> {student.age}</p>
                        <p><strong>Address:</strong> {student.address}</p>
                        <p><strong>Email:</strong> {student.email}</p>
                    </div>
                ) : (
                    <p className="text-danger">Student not found</p>
                )}
            </div>
        </div>
    );
}

export default StudentDetail;
