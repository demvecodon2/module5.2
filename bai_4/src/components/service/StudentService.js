import axios from 'axios';

export async function getAllStudents() {
    try {
        const response = await axios.get('http://localhost:3000/student');
        return response.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
}

export async function addStudent(student) {
    try {
        const response = await axios.post('http://localhost:3000/student    ', student);
        return response.data;
    } catch (error) {
        console.error('Error adding student:', error);
        throw error;
    }
}