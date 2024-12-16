const studentsList = [
    { id: 1, name: ' Hiếu', age: 22,address: 'Quảng Trị'},
    { id: 2, name: ' Lưu', age: 26, address: 'Huế' },
    { id: 3, name: 'Minh', age: 29, address: 'Đà Nẵng' },
    { id: 4, name: 'Hưng', age: 25, address: 'Quảng Nam' },
    { id: 5, name: 'sơn', age: 32, address: 'Quảng Trị' },
    { id: 6, name: 'thi', age: 28, address: 'Đà Nẵng' },


]
export function getAll(){
    return [...studentsList];
}