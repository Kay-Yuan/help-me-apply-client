export interface Job {
  id: string;
  jobLink: string;
  jobTitle?: string;
  jobLocation?: string;
  jobDescription?: string;
  jobRequirement?: string;
  jobExperienceLevel?: string;
  jobType?: number;
  jobSalaryRange?: string;
  jobStatus?: boolean;
  companyId: string;
}
