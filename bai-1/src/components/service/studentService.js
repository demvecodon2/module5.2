import axios from "axios";
import { toast } from "react-toastify";

export const addStudent = async (student) => {
    try {
        const response = await axios.post('http://localhost:3000/students', student);
        return response.data;
    } catch (error) {
        console.error('Error adding student:', error);
        toast.error('Lỗi khi thêm sinh viên');
    }
};

export const getAllStudents = async () => {
    try {
        const response = await axios.get('http://localhost:3000/students');
        return response.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        toast.error('Lỗi khi lấy danh sách sinh viên');
    }
};

export const findStudentById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/students/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error finding student by ID:', error);
        toast.error('Lỗi khi tìm sinh viên theo ID');
    }
};

export const updateStudentById = async (updatedStudent) => {
    try {
        const response = await axios.put(`http://localhost:3000/students/${updatedStudent.id}`, updatedStudent);
        return response.data;
    } catch (error) {
        console.error('Error updating student:', error);
        toast.error('Lỗi khi cập nhật sinh viên');
    }
};

export const deleteStudentById = async (id) => {
    try {
        await axios.delete(`http://localhost:3000/students/${id}`);
    } catch (error) {
        console.error('Error deleting student:', error);
        toast.error('Lỗi khi xóa sinh viên');
    }
};

export const searchStudents = async (name, classId) => {
    let url = `http://localhost:3000/students?name_like=${name}&classes.id=${classId}`;

    if (!classId) {
        url = `http://localhost:3000/students?name_like=${name}`;
    }

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error searching students:', error);
        toast.error('Lỗi khi tìm kiếm sinh viên');
    }
};