import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { findStudentById, updateStudentById } from '../services/studentService';
import { toast } from 'react-toastify';

function UpdateStudent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const student = findStudentById(Number(id));

    const formik = useFormik({
        initialValues: {
            name: student?.name || '',
            age: student?.age || '',
            address: student?.address || '',
            email: student?.email || '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            age: Yup.number().required('Age is required').min(1, 'Age must be at least 1'),
            address: Yup.string().required('Address is required'),
            email: Yup.string().required('Email is required').email('Invalid email'),
        }),
        onSubmit: (values) => {
            updateStudentById(Number(id), values);
            toast.success('Student updated successfully!');
            navigate('/');
        },
    });

    if (!student) {
        return <div className="text-danger text-center">Student not found!</div>;
    }

    return (
        <div>
            <h1 className="text-center">Update Student</h1>
            <form onSubmit={formik.handleSubmit} className="w-50 mx-auto">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className={`form-control ${formik.errors.name && 'is-invalid'}`}
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors.name && <div className="invalid-feedback">{formik.errors.name}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                        type="number"
                        className={`form-control ${formik.errors.age && 'is-invalid'}`}
                        name="age"
                        onChange={formik.handleChange}
                        value={formik.values.age}
                    />
                    {formik.errors.age && <div className="invalid-feedback">{formik.errors.age}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        className={`form-control ${formik.errors.address && 'is-invalid'}`}
                        name="address"
                        onChange={formik.handleChange}
                        value={formik.values.address}
                    />
                    {formik.errors.address && <div className="invalid-feedback">{formik.errors.address}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className={`form-control ${formik.errors.email && 'is-invalid'}`}
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email && <div className="invalid-feedback">{formik.errors.email}</div>}
                </div>
                <button type="submit" className="btn btn-success w-100">Update Student</button>
            </form>
        </div>
    );
}

export default UpdateStudent;
