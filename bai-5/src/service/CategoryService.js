import axios from "axios";

const URL_CATEGORY = 'http://localhost:3000/categories';

export const getAllCategory = async () => {
    try {
        const response = await axios.get(URL_CATEGORY);
        return response.data;
    } catch (err) {
        return [];
    }
}