import axios from "axios";

const baseUrl = "http://localhost:5000";

const companyService = {
  getCompanies: async (offset: number) => {
    const { data } = await axios.get(`${baseUrl}/company?offset=${offset}`);

    return data;
  },
};

export default companyService;
