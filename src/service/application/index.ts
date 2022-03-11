import axios from "axios";
import { Application } from "@global/application";

const baseUrl = import.meta.env.VITE_API_URL;

const ApplicationService = {
  getApplications: async (offset: number) => {
    const { data } = await axios.get(`${baseUrl}/application?offset=${offset}`);

    return data;
  },

  getApplication: async (id: string) => {
    const { data } = await axios.get(`${baseUrl}/application/${id}`);

    return data;
  },

  addApplication: async (newApplication: Omit<Application, "id">) => {
    console.log(newApplication);

    const { data } = await axios.post(
      `${baseUrl}/application/create`,
      newApplication
    );

    return data;
  },

  deleteApplication: async (id: string) => {
    const { data } = await axios.delete(`${baseUrl}/application/${id}`);

    return data;
  },
};

export default ApplicationService;
