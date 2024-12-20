import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {findStudentById, updateStudentById} from '../service/studentService';
import {toast} from 'react-toastify';
import axios from "axios";

function UpdateStudent() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({});
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const fetchedStudent = await findStudentById(Number(id));
                setStudent(fetchedStudent || null);
                setError(fetchedStudent ? null : 'Không tìm thấy sinh viên');
            } catch {
                setError('Lỗi khi lấy dữ liệu sinh viên');
            } finally {
                setLoading(false);
            }
        };

        const fetchClasses = async () => {
            try {
                const response = await fetch('http://localhost:3000/classes');
                const fetchedClasses = await response.json();
                setClasses(fetchedClasses);
            } catch (error) {
                console.error('Lỗi khi tải danh sách lớp:', error);
                toast.error('Không thể tải danh sách lớp');
            }
        };

        fetchStudent();
        fetchClasses();
    }, [id]);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-danger text-center">{error}</div>;

    if (!student) {
        return "";
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        age: Yup.number().required('Age is required').min(10, 'Age must be at least 10'),
        address: Yup.string().required('Address is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        classes: Yup.string().required('Class is required'),
    });

    const handleSubmit = async (values) => {
        try {
            const response = await axios.put(`http://localhost:3000/students/${values.id}`, values);
            toast.success('Cập nhật sinh viên thành công!');
            navigate('/');
        } catch (error) {
            toast.success('Cập nhật sinh viên không thành công!');
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">Cập nhật học sinh</h3>
            <Formik
                initialValues={student}
                onSubmit={handleSubmit}
            >
                <Form className="w-50 mx-auto">
                    <div hidden>
                        <Field type="text" name="id" className="form-control"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tên học sinh:</label>
                        <Field type="text" name="name" className="form-control"/>
                        <ErrorMessage name="name" component="div" className="text-danger"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tuổi:</label>
                        <Field type="text" name="age" className="form-control"/>
                        <ErrorMessage name="age" component="div" className="text-danger"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Địa chỉ:</label>
                        <Field type="text" name="address" className="form-control"/>
                        <ErrorMessage name="address" component="div" className="text-danger"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <Field type="email" name="email" className="form-control"/>
                        <ErrorMessage name="email" component="div" className="text-danger"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Lớp:</label>
                        <Field as="select" name="classId" className="form-select">
                            <option value="">Select a class</option>
                            {classes.map((classItem) => (
                                <option key={classItem.id} value={classItem.id}>
                                    {classItem.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="classId" component="div" className="text-danger"/>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Cập nhật</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default UpdateStudent;