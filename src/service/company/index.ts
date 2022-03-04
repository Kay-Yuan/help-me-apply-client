import axios from "axios";

const baseUrl = "http://localhost:5000";

interface Company {
  id: string;
  companyName: string;
  companyURL: string;
  companyAddress?: string;
  recruiterName?: string;
  recruiterEmail?: string;
  recruiterNumber?: string;
  rate?: number;
}

const companyService = {
  getCompanies: async (offset: number) => {
    const { data } = await axios.get(`${baseUrl}/company?offset=${offset}`);

    return data;
  },

  addCompany: async (newCompany: Company) => {
    const response = await axios.post(`${baseUrl}/company/create`, newCompany);

    return response;
  },
};

export default companyService;
