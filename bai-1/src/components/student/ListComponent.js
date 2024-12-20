import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {getAllStudents, deleteStudentById, searchStudents} from '../service/studentService';
import {toast} from 'react-toastify';

function StudentList() {
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchStudents();
        fetchClasses();
    }, []);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const fetchedStudents = await getAllStudents();
            setStudents(fetchedStudents);
        } catch (error) {
            console.error('Lỗi khi tải danh sách học sinh:', error);
            toast.error('Không thể tải danh sách học sinh');
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

    const handleDelete = async (id, name) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa học sinh ${name} không?`)) {
            try {
                await deleteStudentById(id);
                toast.success(`Xóa học sinh ${name} thành công!`);
                fetchStudents(); // Refresh the student list after deletion
            } catch (error) {
                console.error('Lỗi khi xóa học sinh:', error);
                if (error.response && error.response.status === 404) {
                    toast.error('Học sinh không tồn tại hoặc đã bị xóa.');
                } else {
                    toast.error('Không thể xóa học sinh. Vui lòng thử lại sau.');
                }
            }
        }
    };

    const getClassName = (classId) => {
        const classObject = classes.find(c => c.id === classId);
        return classObject ? classObject.name : 'Chưa xác định';
    };

    const searchNameRef = useRef();
    const searchClassRef = useRef();
    const handleSearch = async () => {
        console.log("------search by class:------------ ");

        const searchName = searchNameRef.current.value;
        const searchClass = searchClassRef.current.value;
        const filteredStudents = await searchStudents(searchName, searchClass);
        setStudents(filteredStudents);

    };


    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Student List</h1>
            <Link to="/add" className="btn btn-success mb-3">Add New Student</Link>
            <div className="mb-3">
                <strong>Tìm kiếm theo tên:</strong>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                    ref={searchNameRef}
                />
            </div>
            <div className="mb-3">
                <strong>Tìm kiếm theo lớp:</strong>
                <select
                    className="form-select"
                    ref={searchClassRef}>
                    <option value="">Chọn lớp</option>
                    {classes.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>
            <button className="btn btn-primary mb-3" onClick={handleSearch}>Tìm 1kiếm</button>

            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                    <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Tuổi</th>
                        <th>Địa chỉ</th>
                        <th>Email</th>
                        <th>Tên Lớp</th>
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
                                <td>{student.classes.name}</td>
                                <td className="text-center">
                                    <Link to={`/detail/${student.id}`}
                                          className="btn btn-primary btn-sm me-2">View</Link>
                                    <Link to={`/edit/${student.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                    <button className="btn btn-danger btn-sm" onClick={() =>
                                        handleDelete(student.id, student.name)}>Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">No students found.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StudentList;