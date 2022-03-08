import axios from "axios";
import { Company } from "@global/company";

const baseUrl = import.meta.env.VITE_API_URL;

const companyService = {
  getCompanies: async (offset: number) => {
    const { data } = await axios.get(`${baseUrl}/company?offset=${offset}`);

    return data;
  },

  getCompany: async (id: string) => {
    const { data } = await axios.get(`${baseUrl}/company/${id}`);

    return data;
  },

  addCompany: async (newCompany: Omit<Company, "id">) => {
    console.log(newCompany);

    const { data } = await axios.post(`${baseUrl}/company/create`, newCompany);

    return data;
  },

  deleteCompany: async (id: string) => {
    const { data } = await axios.delete(`${baseUrl}/company/${id}`);

    return data;
  },

  searchCompanyByName: async (name: string) => {
    const { data } = await axios.get(`${baseUrl}/company/search?name=${name}`);

    return data;
  },
};

export default companyService;
