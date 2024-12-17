const studentsList = [
    { id: 1, name: 'Hiếu', age: 22, address: 'Quảng Trị', email:'hieu@gmail.com' },
    { id: 2, name: 'Lưu', age: 26, address: 'Huế',email: 'luu@gmail.com' },
    { id: 3, name: 'Minh', age: 29, address: 'Đà Nẵng', email: 'minh@gmail.com' },
    { id: 4, name: 'Hưng', age: 25, address: 'Quảng Nam', email: 'hung@gmail.com' },
    { id: 5, name: 'Sơn', age: 32, address: 'Quảng Trị', email: 'son@gmail.com' },
    { id: 6, name: 'Thi', age: 28, address: 'Đà Nẵng',email:'thi@gmail.com' },
];

export function getAll() {
    return [...studentsList];
}

export function addStudent(student) {
    const newId = studentsList.length ? studentsList[studentsList.length - 1].id + 1 : 1;
    const newStudent = { id: newId, ...student };
    studentsList.push(newStudent);
    return newStudent;
}

export function getStudentById(id) {
    return studentsList.find(student => student.id === id) || null;
}

export function updateStudent(id, updatedData) {
    const index = studentsList.findIndex(student => student.id === id);
    if (index === -1) return null;

    studentsList[index] = { ...studentsList[index], ...updatedData };
    return studentsList[index];
}

export function deleteStudent(id) {
    const index = studentsList.findIndex(student => student.id === id);
    if (index === -1) return false;

    studentsList.splice(index, 1);
    return true;
}
