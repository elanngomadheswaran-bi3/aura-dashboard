"use client";

import { useRouter, useParams } from "next/navigation";
import { CLIENTS, PROJECTS } from "@/data/mockData";
import { getClientLogo } from "@/utils/clientLogos";
import Header from "@/app/components/portfolio_page/Header";
import SubHeader from "@/app/components/portfolio_page/SubHeader";
import ProjectCard from "@/app/components/portfolio_page/ProjectCard";
import DataGrid from "@/app/components/portfolio_page/DataGrid";
import { useLoading } from "@/context/LoadingContext";

export default function ClientDetail() {
  const router = useRouter();
  const params = useParams();
  const { setIsLoading: setGlobalLoading } = useLoading();
  const clientId = params.clientId as string;

  const client = CLIENTS.find((c) => c.id === clientId);
  const clientProjects = PROJECTS.filter((p) => p.clientId === clientId);

  if (!client) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Client not found
          </h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const handleNavigateToProject = (projectId: string) => {
    setGlobalLoading(true);
    setTimeout(() => {
      setGlobalLoading(false);
      router.push(`/project/${projectId}`);
    }, 1000);
  };

  const handleLogout = () => {
    setGlobalLoading(true);
    setTimeout(() => {
      setGlobalLoading(false);
      router.push("/login");
    }, 1000);
  };

  const handleNavigateToEmployees = () => {
    setGlobalLoading(true);
    setTimeout(() => {
      setGlobalLoading(false);
      router.push("/employees");
    }, 1000);
  };

  return (
    <div style={{ background: "#F9FAFB", minHeight: "100vh" }} className="w-full">
      {/* Header without metrics - just navigation */}
      <Header
        onLogout={handleLogout}
        onEmployeesClick={handleNavigateToEmployees}
        subheader={
          <div className="w-full max-w-screen-2xl p-10 text-white">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 mb-6 bg-transparent border-none cursor-pointer text-sm font-medium hover:text-gray-900 transition-colors"
            >
              ← Back
            </button>

            <div className="mb-20 text-center flex flex-col">
              <h1 className="text-4xl font-bold mb-2">
                {client.name}
              </h1>
              <div className="flex text-center w-full gap-3 justify-center items-center">
                <p className="text-xl leading-relaxed">
                  {client.description}
                </p>
                <p className="text-4xl font-bold mb-5">.</p>
                <div className="flex items-center gap-2 text-xl ">
                  <span className="font-semibold">
                    {clientProjects.length}
                  </span>
                  {clientProjects.length === 1 ? "project" : "projects"}
                </div>
                
              </div>
            </div>
          </div>
        }
      />

      {/* Main Content - Projects Grid */}
      <main
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px 48px" }}
      >
        <DataGrid
          title="Projects"
          subtitle={`${clientProjects.length} ${clientProjects.length === 1 ? "project" : "projects"} for ${client.name}`}
          items={clientProjects}
          minWidth="300px"
          renderCard={(project) => {
            const logoSrc = getClientLogo(project.clientId);

            return (
              <ProjectCard
                key={project.id}
                project={project}
                clientName={client.name}
                onNavigate={handleNavigateToProject}
                logoSrc={logoSrc}
              />
            );
          }}
        />
      </main>
    </div>
  );
}
