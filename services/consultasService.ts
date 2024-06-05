// consultasService.ts
import axios from "axios";
import { Consultas, List } from "@/interfaces/consultas";

const API_URL = "https://backend-tester-741806943268.herokuapp.com/consultas";

export const getConsultas = async (
  page: number,
  limit: number
): Promise<Consultas> => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching consultas:", error);
    throw error;
  }
};

export const getConsultaById = async (id: number): Promise<List> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching consulta details:", error);
    throw error;
  }
};

export const applyToConsulta = async (consultaId: number, userId: number) => {
  try {
    const response = await axios.post(
      `https://backend-tester-741806943268.herokuapp.com/candidatos`,
      { consultaId, userId }
    );
    return response.data;
  } catch (error) {
    console.error("Error applying to consulta:", error);
    throw error;
  }
};

export const checkApplicationStatus = async (
  consultaId: number,
  userId: number
): Promise<{ exists: boolean; candidatoId?: number }> => {
  try {
    const response = await axios.post(
      `https://backend-tester-741806943268.herokuapp.com/candidatos/check`,
      { consultaId, userId }
    );
    return response.data;
  } catch (error) {
    console.error("Error checking application status:", error);
    return { exists: false };
  }
};

export const deleteApplication = async (candidatoId: number) => {
  console.log("candidatoId", candidatoId);
  try {
    await axios.delete(
      `https://backend-tester-741806943268.herokuapp.com/candidatos/${candidatoId}`
    );
  } catch (error) {
    console.error("Error deleting application:", error);
    throw error;
  }
};
