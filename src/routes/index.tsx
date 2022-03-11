import { useRoutes } from "react-router-dom";
import { MainLayout } from "@layout";
import { CompanyContainer, CompanyDetail } from "@views/company";
import { JobContainer, JobDetail } from "@views/job";
import { ApplicationContainer, ApplicationDetail } from "@views/application";
import { dividerClasses } from "@mui/material";

const MainRoutes = {
  path: "/",
  element: <MainLayout />,

  children: [
    { path: "/", element: <div>Dashboard</div> },
    {
      path: "/company",
      element: (
        <div>
          <CompanyContainer />
        </div>
      ),
    },
    {
      path: "/company/:companyId",
      element: <CompanyDetail />,
    },
    {
      path: "/job",
      element: <JobContainer />,
    },
    { path: "/job/:jobId", element: <JobDetail /> },
    {
      path: "/application",
      element: <ApplicationContainer />,
    },
    {
      path: "/application/:applicationId",
      element: <ApplicationDetail />,
    },
  ],
};

export default function ThemeRoutes() {
  return useRoutes([MainRoutes]);
}
