import axios from "axios";

const baseUrl = "http://localhost:5001";

interface Job {
  id: string;
  jobLink: string;
  jobTitle?: string;
  jobLocation?: string;
  jobDescription?: string;
  jobRequirement?: string;
  jobExperienceLevel?: string;
  jobType?: number;
  jobSalaryRange?: string;
  jobStatus?: string;
  companyId: string;
}

const JobService = {
  getJobs: async (offset: number) => {
    const { data } = await axios.get(`${baseUrl}/job?offset=${offset}`);

    return data;
  },

  getJob: async (id: string) => {
    const { data } = await axios.get(`${baseUrl}/job/${id}`);

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

export default JobService;
