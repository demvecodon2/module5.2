let studentsList = [
    { id: 1, name: 'Hiếu', age: 22, address: 'Quảng Trị', email: 'hieu@gmail.com' },
    { id: 2, name: 'Lưu', age: 26, address: 'Huế', email: 'luu@gmail.com' },
    { id: 3, name: 'Minh', age: 29, address: 'Đà Nẵng', email: 'minh@gmail.com' },
    { id: 4, name: 'Hưng', age: 25, address: 'Quảng Nam', email: 'hung@gmail.com' },
    { id: 5, name: 'Sơn', age: 32, address: 'Quảng Trị', email: 'son@gmail.com' },
    { id: 6, name: 'Thi', age: 28, address: 'Đà Nẵng', email: 'thi@gmail.com' },
];

export const getAllStudents = () => studentsList;

export const addStudent = (student) => {
    studentsList.push({ ...student, id: studentsList.length + 1 });
};

export const findStudentById = (id) => {
    return studentsList.find(student => student.id === id);
};
export const deleteStudentById = (id) => {
    studentsList = studentsList.filter(student => student.id !== id);
};
export const updateStudentById = (id, updatedStudent) => {
    const index = studentsList.findIndex(student => student.id === id);
    if (index !== -1) {
        studentsList[index] = { ...studentsList[index], ...updatedStudent };
    }
};