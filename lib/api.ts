import { Stage } from '@/types';
import axios from 'axios';

const API_BASE = 'http://localhost:3001/vmg';

export const getStages = async () => axios.get(`${API_BASE}/stages`).then(res => res.data);
export const getProducts = async () => axios.get(`${API_BASE}/products`).then(res => res.data);
export const createStage = async (data: Partial<Stage>) => axios.post(`${API_BASE}/stages`, data);
export const updateStage = async (id: string, data: Partial<Stage>) => axios.put(`${API_BASE}/stages/${id}`, data);
export const deleteStage = async (id: string) => axios.delete(`${API_BASE}/stages/${id}`);
export const getProcessByProduct = async (id:string) =>
  axios.get(`${API_BASE}/products/process?` + `proId=${id}`).then(res => res.data.stages);
