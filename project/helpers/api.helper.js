import axios from 'axios';
import { serverUrl } from '../config/config';

export const getOrders = async () => {
  try {
    const response = await axios.get(`${serverUrl}/api/orders`);
    const filteredOrders = response?.data?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return filteredOrders;
  } catch (error) {
    console.error('❌', error);
    return [];
  }
};

export const getProducts = async (date) => {
  try {
    const response = await axios.get(`${serverUrl}/api/products`);
    return response?.data || [];
  } catch (error) {
    console.error('❌', error);
    return [];
  }
};
