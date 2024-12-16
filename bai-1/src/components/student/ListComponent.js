import React from "react";
import {getAll} from "../service/studentService";

class ListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentsList: []
        };
    }
componentDidMount() {
        const students =getAll();
        this.setState({studentsList : students });
}
render() {
        return (
            <div>
                <h2>danh sách học sinh</h2>
                <table className="table table-striped table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên</th>
                            <th>Tuổi</th>
                            <th>Địa chỉ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.studentsList.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.age}</td>
                                <td>{student.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );

}
}
export default  ListComponent ;