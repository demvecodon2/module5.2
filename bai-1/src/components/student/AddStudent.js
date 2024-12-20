import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addStudent } from '../service/studentService';
import { toast } from 'react-toastify';
import axios from 'axios';

function AddStudent() {
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/classes')
            .then(response => setClasses(response.data))
            .catch(error => console.error('Lỗi khi lấy danh sách lớp:', error));
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            age: '',
            address: '',
            email: '',
            classes: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Tên là bắt buộc'),
            age: Yup.number().required('Tuổi là bắt buộc').min(10, 'Tuổi phải ít nhất là 10')
                .max(110,'tuổi ko quá 110'),
            address: Yup.string().required('Địa chỉ là bắt buộc'),
            email: Yup.string().required('Email là bắt buộc').email('Email không hợp lệ'),
            classes: Yup.string().required('Lớp là bắt buộc'),
        }),
        onSubmit: async (values) => {
            try {
                const selectedClass = classes.find(cls => cls.id === values.classes);
                const studentData = {
                    ...values,
                    classes: selectedClass || { id: '', name: 'Chưa xác định' }
                };
                await addStudent(studentData);
                toast.success('Thêm sinh viên thành công!');
                formik.resetForm();
            } catch (error) {
                console.error('Error adding student:', error);
                toast.error('Lỗi khi thêm sinh viên');
            }
        },
    });

    return (
        <div>
            <h1 className="text-center">Thêm Sinh Viên</h1>
            <form onSubmit={formik.handleSubmit} className="w-50 mx-auto">
                <div className="mb-3">
                    <label className="form-label">Tên</label>
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
                    <label className="form-label">Tuổi</label>
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
                    <label className="form-label">Địa chỉ</label>
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
                <div className="mb-3">
                    <label className="form-label">Lớp</label>
                    <select
                        className={`form-control ${formik.errors.classes && 'is-invalid'}`}
                        name="classes"
                        onChange={formik.handleChange}
                        value={formik.values.classes}
                    >
                        <option value="">Chọn một lớp</option>
                        {classes.map((cls) => (
                            <option key={cls.id} value={cls.id}>
                                {cls.name}
                            </option>
                        ))}
                    </select>
                    {formik.errors.classes && <div className="invalid-feedback">{formik.errors.classes}</div>}
                </div>
                <button type="submit" className="btn btn-success w-100">Thêm Sinh Viên</button>
            </form>
        </div>
    );
}

export default AddStudent;