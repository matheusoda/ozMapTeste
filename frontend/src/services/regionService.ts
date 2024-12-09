import axios from "axios";

const API_URL = "http://localhost:3003/api/regions";

export interface CreateRegionPayload {
    name: string;
    user: string;
}

export const createRegion = async (regionData: CreateRegionPayload) => {
    const response = await axios.post(API_URL, regionData);
    return response.data;
};

export const getRegions = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching regions:", error);
        throw error;
    }
};

export const updateRegion = async (id: string, data: CreateRegionPayload) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating region:", error);
        throw error;
    }
};

export const deleteRegion = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting region:", error);
        throw error;
    }
};
