import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { findStudentById } from '../service/studentService';

function StudentDetail() {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const fetchedStudent = await findStudentById(Number(id));
                setStudent(fetchedStudent);
            } catch (err) {
                setError('Không tìm thấy sinh viên');
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [id]);

    if (loading) {
        return <div className="text-center">Đang tải...</div>;
    }

    return (
        <div className="card mx-auto mt-4" style={{ maxWidth: '30rem' }}>
            <div className="card-header text-center">Chi Tiết Sinh Viên</div>
            <div className="card-body">
                {error ? (
                    <p className="text-danger">{error}</p>
                ) : (
                    <div>
                        <p><strong>Tên:</strong> {student.name}</p>
                        <p><strong>Tuổi:</strong> {student.age}</p>
                        <p><strong>Địa chỉ:</strong> {student.address}</p>
                        <p><strong>Email:</strong> {student.email}</p>
                        <p><strong>Lớp:</strong> {student.classes?.name || 'Không có thông tin lớp'}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StudentDetail;