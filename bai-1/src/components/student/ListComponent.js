import React, {useState} from 'react';

function ListComponent({studentsList, onAdd, onUpdate, onDelete}) {
    const [newStudent, setNewStudent] = useState({name: '', age: '', address: '', email: ''});
    const [editingStudent, setEditingStudent] = useState(null);

    const handleAdd = () => {
        if (newStudent.name && newStudent.age && newStudent.address) {
            onAdd(newStudent);
            setNewStudent({name: '', age: '', address: '', email: ''});
        }
    };
    const handleUpdate = () => {
        if (editingStudent && editingStudent.name && editingStudent.age && editingStudent.address && editingStudent.email) {
            onUpdate(editingStudent.id, editingStudent);
            setEditingStudent(null);
        }
    };
    return (
        <div>
            <h2 className="mb-3">Danh sách sinh viên</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Tuổi</th>
                    <th>Địa chỉ</th>
                    <th>Email</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {studentsList.length > 0 ? (
                    studentsList.map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.address}</td>
                            <td>{student.email}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => setEditingStudent(student)}
                                >
                                    Sửa
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => {
                                        if (window.confirm(`Bạn có chắc chắn muốn xóa học sinh tên ${student.name} không?`)) {
                                            onDelete(student.id);
                                        }
                                    }}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center">Không có dữ liệu</td>
                    </tr>
                )}
                </tbody>
            </table>
            <h3>Thêm sinh viên mới</h3>
            <input
                type="text"
                placeholder="Tên"
                value={newStudent.name}
                onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
            />
            <input
                type="number"
                placeholder="Tuổi"
                value={newStudent.age}
                onChange={(e) => setNewStudent({...newStudent, age: e.target.value})}
            />
            <input
                type="text"
                placeholder="Địa chỉ"
                value={newStudent.address}
                onChange={(e) => setNewStudent({...newStudent, address: e.target.value})}
            />
            <input
                type="email"
                placeholder="Email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
            />
            <button className="btn btn-primary btn-sm" onClick={handleAdd}>Thêm</button>

            {editingStudent && (
                <div>
                    <h3>Sửa sinh viên</h3>
                    <input
                        type="text"
                        placeholder="Tên"
                        value={editingStudent.name}
                        onChange={(e) => setEditingStudent({...editingStudent, name: e.target.value})}
                    />
                    <input
                        type="number"
                        placeholder="Tuổi"
                        value={editingStudent.age}
                        onChange={(e) => setEditingStudent({...editingStudent, age: e.target.value})}
                    />
                    <input
                        type="text"
                        placeholder="Địa chỉ"
                        value={editingStudent.address}
                        onChange={(e) => setEditingStudent({...editingStudent, address: e.target.value})}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={editingStudent.email}
                        onChange={(e) => setEditingStudent({...editingStudent, email: e.target.value})}
                    />
                    <button className="btn btn-success btn-sm" onClick={handleUpdate}>Cập nhật</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditingStudent(null)}>Hủy</button>
                </div>
            )}
        </div>
    );
}

export default ListComponent;
