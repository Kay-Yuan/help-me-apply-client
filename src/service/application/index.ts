import axios from "axios";

const baseUrl = "http://localhost:5001";

interface Application {
  id: string;
  dateCreated: Date;
  applicationStatus?: string;
  expectedSalary?: string;
  jobId: string;
}

const ApplicationService = {
  getApplications: async (offset: number) => {
    const { data } = await axios.get(`${baseUrl}/application?offset=${offset}`);

    return data;
  },

  getApplication: async (id: string) => {
    const { data } = await axios.get(`${baseUrl}/application/${id}`);

    return data;
  },

  addApplication: async (newApplication: Omit<Application, "id" | "jobId">) => {
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
