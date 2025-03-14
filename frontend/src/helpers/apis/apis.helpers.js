import axios from "axios";
import { serverUrl } from "../../config/config";

export const getOrders = async (date) => {
  try {
    const response = await axios.get(`${serverUrl}/api/orders`);
    const filteredOrders = response?.data?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return filteredOrders;
  } catch (error) {
    console.error("❌", error);
    return [];
  }
};

export const getOrdersByDate = async (date) => {
  try {
    const response = await axios.get(`${serverUrl}/api/orders/date/${date}`);
    const filteredOrders = response?.data?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return filteredOrders;
  } catch (error) {
    console.error("❌", error);
    return [];
  }
};

export const getDeliveryNotes = async () => {
  try {
    const response = await axios.get(`${serverUrl}/api/deliveryNotes`);
    const filteredOnSites = response?.data?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return filteredOnSites;
  } catch (error) {
    console.error("❌ Error fetching delivery notes:", error);
    throw new Error("Failed to fetch delivery notes");
  }
};

export const getOnSitesByDate = async (date) => {
  try {
    const response = await axios.get(`${serverUrl}/api/onSites/date/${date}`);
    const filteredOnSites = response?.data?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return filteredOnSites;
  } catch (error) {
    console.error("❌", error);
    return [];
  }
};
