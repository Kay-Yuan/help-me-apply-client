export interface Job {
  id: string;
  jobLink: string;
  jobTitle?: string;
  jobLocation?: string;
  jobDescription?: string;
  jobRequirement?: string;
  jobExperienceLevel?: string;
  jobType?: string;
  jobSalaryRange?: string;
  jobStatus?: boolean;
  companyId: string;
}
