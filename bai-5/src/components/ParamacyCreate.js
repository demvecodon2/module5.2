import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as ParamacyService from "../service/ParamacyService";
import * as CategoryService from "../service/CategoryService";

function ParamacyCreate() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const initialValues = {
        code: "",
        name: "",
        category: "",
        quality: 0,
        price: 0,
        input: ""
    };

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const categoryData = await CategoryService.getAllCategory();
            setCategories(categoryData);
        } catch (error) {
            console.log("Lỗi rồi", error);
        }
    };

    const objectValid = {
        code: Yup.string().required("Mã thuốc không được để trống")
            .matches(/^PROD-\d{4}$/, "Mã thuốc nhập chưa đúng định dạng (yêu cầu : PROD - XXXX với X là các chữ số)"),
        name: Yup.string()
            .required("Tên không được để trống")
            .min(3, "Tên không được ngắn hơn 3 ký tự")
            .max(200, "Tên không được vượt quá 200 ký tự"),
        quality: Yup.number()
            .required("Số lượng không được để trống")
            .min(1, "Số lượng phải lớn hơn 0")
            .typeError("Số lượng phải là một số hợp lệ"),
        input: Yup.date()
            .required("Ngày nhập không được để trống")
            .max(new Date(), "Ngày nhập không được lớn hơn ngày hiện tại"),
        genre: Yup.string().required("Không được để trống thể loại thuốc"),
        price: Yup.number()
            .required("Giá thuốc không được để trống")
            .min(0, "Giá thuốc phải lớn hơn hoặc bằng 0")
            .typeError("Giá thuốc phải là một số hợp lệ")
    };

const haddPharmacy = async (values) => {
try{
await ParamacyService.addPharmacy(values);
toast.success("Thêm thành công!");
navigate("/");
}catch (error) {
    toast.error("Thêm thất bại!");
}

}
    return (
        <div className="container">
            <h1>Thêm sản phẩm mới</h1>
            <Formik initialValues={initialValues} onSubmit={haddPharmacy} validationSchema={Yup.object(objectValid)}>
                <Form>
                    <div className="mb-3">
                        <label htmlFor="code" className="form-label">Mã thuốc</label>
                        <Field
                            name="code"
                            type="text"
                            className="form-control w-50"
                            id="code"
                        />
                        <ErrorMessage className="error" name="code" component="p"></ErrorMessage>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Tên thuốc</label>
                        <Field
                            name="name"
                            type="text"
                            className="form-control w-50"
                            id="name"
                        />
                        <ErrorMessage className="error" name="name" component="p"></ErrorMessage>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="genre" className="form-label">Chọn loại thuốc</label>
                        <Field as="select" name="genre" className="form-control w-50" id="genre">
                            <option value="">Chọn loại</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage className="error" name="genre" component="p"></ErrorMessage>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Giá thuốc</label>
                        <Field
                            name="price"
                            type="number"
                            className="form-control w-50"
                            id="price"
                        />
                        <ErrorMessage className="error" name="price" component="p"></ErrorMessage>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="quality" className="form-label">Số lượng</label>
                        <Field
                            name="quality"
                            type="number"
                            className="form-control w-50"
                            id="quality"
                        />
                        <ErrorMessage className="error" name="quality" component="p"></ErrorMessage>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="input" className="form-label">Ngày Nhập </label>
                        <Field
                            name="input"
                            type="date"
                            className="form-control w-50"
                            id="input"
                        />
                        <ErrorMessage className="error" name="input" component="p"></ErrorMessage>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <button type='submit' className="btn btn-primary">Thêm mới thuốc</button>
                        <Link className="btn btn-success" to="/">Trở lại trang chủ</Link>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default ParamacyCreate;