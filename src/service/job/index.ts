import axios from "axios";
import { Job } from "@global/job";

const baseUrl = import.meta.env.VITE_API_URL;

const jobService = {
  getJobs: async (offset: number) => {
    const { data } = await axios.get(`${baseUrl}/job?offset=${offset}`);

    return data;
  },

  getJob: async (id: string) => {
    const { data } = await axios.get(`${baseUrl}/job/${id}`);

    return data;
  },

  getJobListWithCompany: async (offset: number) => {
    const { data } = await axios.get(`${baseUrl}/job/lists?offset=${offset}`);

    return data;
  },

  getJobByTitle: async (jobTitle: string, companyId?: string) => {
    const { data } = companyId
      ? await axios.get(
          `${baseUrl}/job/search?jobTitle=${jobTitle}&companyId=${companyId}`
        )
      : await axios.get(`${baseUrl}/job/search?jobTitle=${jobTitle}`);

    return data;
  },

  addJob: async (newJob: Omit<Job, "id" | "companyId">) => {
    console.log(newJob);

    const { data } = await axios.post(`${baseUrl}/job/create`, newJob);

    return data;
  },

  deleteJob: async (id: string) => {
    const { data } = await axios.delete(`${baseUrl}/job/${id}`);

    return data;
  },
};

export default jobService;
