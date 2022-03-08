export interface Application {
  id: string;
  dateCreated: Date;
  applicationStatus?: string;
  expectedSalary?: string;
  jobId: string;
}
