import axios from "axios";

const URL_PHARMACY = 'http://localhost:3000/products';
const URL_CATEGORY = 'http://localhost:3000/categories';

export const getAllPharmacy = async (name, category) => {
  try {
    let URL = `${URL_PHARMACY}?_sort=quantity&_order=desc&`;
    if (name) {
      URL += `name_like=${name}&`;
    }
    if (category) {
      URL += `category=${category}&`;
    }
    const res = await axios.get(URL);
    console.log('Fetched pharmacy items:', res.data);
    return res.data;
  } catch (e) {
    console.error('Error fetching pharmacy items:', e);
    return [];
  }
}

export const addPharmacy = async (pharmacy) => {
  try {
    const res = await axios.post(URL_PHARMACY, pharmacy);
    console.log('Added pharmacy item:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error adding pharmacy item:', error);
  }
}

export const checkPharmacyCodeExists = async (product_code) => {
  try {
    const res = await axios.get(`${URL_PHARMACY}?product_code=${product_code}`);
    console.log('Check pharmacy code exists:', res.data);
    return res.data.length > 0;
  } catch (error) {
    console.error('Error checking pharmacy code:', error);
    return false;
  }
};