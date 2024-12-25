import { useEffect, useState } from "react";
import * as ParamacyService from "../service/ParamacyService";
import * as categoryService from "../service/CategoryService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment/moment";

function ParamacyList() {
    const [pharmacies, setPharmacy] = useState([]);
    const [categories, setCategory] = useState([]);
    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        fetchPharmacies(name, selectedCategory);
    }, [name, selectedCategory]);

    const fetchPharmacies = async (name, category) => {
        try {
            const pharmacyItems = await ParamacyService.getAllPharmacy(name, category);
            setPharmacy(pharmacyItems);
            if (pharmacyItems.length === 0) {
                toast.info("Không có sản phẩm!!!");
            }
            const categoryData = await categoryService.getAllCategory();
            setCategory(categoryData);
        } catch (error) {
            toast.error("Lỗi khi tải dữ liệu. Vui lòng thử lại.");
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-primary">Quản lý Sản phẩm</h1>
                <Link className="btn btn-success" to="/create">Thêm mới</Link>
            </div>
            <div className="mb-4">
                <p><strong>Tìm kiếm sản phẩm theo tên:</strong></p>
                <input
                    className="form-control w-50"
                    value={name}
                    placeholder="Nhập tên sản phẩm cần tìm kiếm"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <p><strong>Tìm kiếm sản phẩm theo thể loại:</strong></p>
                <select
                    id="category"
                    className="form-control w-50"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Chọn thể loại</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <table className="table table-hover">
                <thead className="thead-dark">
                <tr>
                    <th>STT</th>
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Thể loại</th>
                    <th>Ngày nhập</th>
                    <th>Số lượng</th>
                </tr>
                </thead>
                <tbody>
                {pharmacies.map((pharmacy, index) => {
                    const category = categories.find(cat => cat.id === pharmacy.category);

                    return (
                        <tr key={pharmacy.id}>
                            <td>{index + 1}</td>
                            <td>{pharmacy.code}</td>
                            <td>{pharmacy.name}</td>
                            <td>{pharmacy.price}</td>
                            <td>{pharmacy.category}</td>
                            <td>{moment(pharmacy.input, 'YYYY-MM-DD').format('DD-MM-YYYY')}</td>
                            <td>{pharmacy.quantity}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default ParamacyList;