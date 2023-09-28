import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your API base URL

export async function getAllVendors() {
    try {
        const response = await axios.get(`${API_BASE_URL}/vendors`);
        return response.data;
    } catch (error) {
        throw error;
    }
}