"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CLIENTS, PROJECTS, TEAM_MEMBERS } from "@/data/mockData";
import { useLoading } from "@/context/LoadingContext";
import { formatCurrency } from "@/utils/formatters";
import { getClientLogo } from "@/utils/clientLogos";
import Header from "../components/portfolio_page/Header";
import SubHeader from "../components/portfolio_page/SubHeader";
import ProjectCard from "../components/portfolio_page/ProjectCard";
import ClientCard from "../components/portfolio_page/ClientCard";
import SortFilterControls from "../components/portfolio_page/SortFilterControls";
import DataGrid from "../components/portfolio_page/DataGrid";
import TabSelector from "../components/portfolio_page/TabSelector";

type SortOption = "variance" | "cost" | "client" | "status";
type TabOption = "projects" | "clients";

export default function PortfolioPage() {
  const router = useRouter();
  const { setIsLoading: setGlobalLoading } = useLoading();
  const [activeTab, setActiveTab] = useState<TabOption>("projects");
  const [sortBy, setSortBy] = useState<SortOption>("variance");
  const [sortOpen, setSortOpen] = useState(false);
  const [showAtRisk, setShowAtRisk] = useState(false);

  // Sort projects dynamically
  const sortedProjects = [...PROJECTS].sort((a, b) => {
    switch (sortBy) {
      case "variance":
        return Math.abs(b.spent - b.budget) - Math.abs(a.spent - a.budget);
      case "cost":
        return b.spent - a.spent;
      case "client":
        const clientA = CLIENTS.find((c) => c.id === a.clientId)?.name || "";
        const clientB = CLIENTS.find((c) => c.id === b.clientId)?.name || "";
        return clientA.localeCompare(clientB);
      case "status":
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  // Calculate total portfolio metrics
  const totalBudget = PROJECTS.reduce((sum, p) => sum + p.budget, 0);
  const totalSpend = PROJECTS.reduce((sum, p) => sum + p.spent, 0);
  const totalVariance = totalSpend - totalBudget;
  const variancePercent =
    totalBudget > 0 ? ((totalVariance / totalBudget) * 100).toFixed(1) : "0";
  const activeProjects = PROJECTS.length;
  const projectsOverBudget = PROJECTS.filter((p) => p.spent > p.budget).length;
  const atRiskProjects = PROJECTS.filter((p) => p.spent > p.budget).length;

  // Calculate workforce metrics
  const totalAllocatedHours = TEAM_MEMBERS.reduce(
    (sum, e) => sum + e.totalHours,
    0,
  );
  const avgUtilisation =
    TEAM_MEMBERS.length > 0
      ? (
          TEAM_MEMBERS.reduce((sum, e) => sum + e.utilizationPercentage, 0) /
          TEAM_MEMBERS.length
        ).toFixed(0)
      : "0";
  const overallocatedResources = TEAM_MEMBERS.filter(
    (e) => e.utilizationPercentage > 100,
  ).length;

  // Filter projects if "at risk" is active
  const displayedProjects = showAtRisk
    ? sortedProjects.filter((p) => p.spent > p.budget)
    : sortedProjects;

  const handleLogout = () => {
    setGlobalLoading(true);
    setTimeout(() => {
      setGlobalLoading(false);
      router.push("/login");
    }, 1000);
  };

  const handleNavigateToClient = (clientId: string) => {
    setGlobalLoading(true);
    setTimeout(() => {
      setGlobalLoading(false);
      router.push(`/client/${clientId}`);
    }, 1000);
  };

  const handleNavigateToProject = (projectId: string) => {
    setGlobalLoading(true);
    setTimeout(() => {
      setGlobalLoading(false);
      router.push(`/project/${projectId}`);
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
    <div
      style={{
        background: "#F9FAFB",
        minHeight: "100vh",
      }}
    >
      {/* Header with Metrics */}
      <Header
        onLogout={handleLogout}
        onEmployeesClick={handleNavigateToEmployees}
        metrics={{
          atRiskProjects,
          projectsOverBudget,
          totalVariance,
          variancePercent,
          totalBudget,
          activeProjects,
          clientsCount: CLIENTS.length,
          avgUtilization: parseInt(avgUtilisation),
          overallocatedResources,
        }}
        subheader={
          <SubHeader
            title="Project Intelligence Overview"
            description="Real-time portfolio metrics and project performance tracking"
          />
        }
      />

      {/* Main Content */}
      <main
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "48px 32px",
        }}
        className="flex flex-col justify-center items-center"
      >
        <div className="flex w-full items-start">
          <TabSelector
            tabs={[
              { id: "projects", label: "Projects", count: PROJECTS.length },
              { id: "clients", label: "Clients", count: CLIENTS.length },
            ]}
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab as TabOption)}
          />
        </div>
        {/* Tab Selector */}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <DataGrid
            title="Projects"
            subtitle={`${displayedProjects.length} of ${PROJECTS.length} projects`}
            items={displayedProjects}
            minWidth="300px"
            controls={
              <SortFilterControls
                sortBy={sortBy}
                showAtRisk={showAtRisk}
                sortOpen={sortOpen}
                onSortChange={setSortBy}
                onSortOpenChange={setSortOpen}
                onAtRiskToggle={setShowAtRisk}
              />
            }
            renderCard={(project) => {
              const clientName =
                CLIENTS.find((c) => c.id === project.clientId)?.name ||
                "Unknown";
              const logoSrc = getClientLogo(project.clientId);

              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  clientName={clientName}
                  onNavigate={handleNavigateToProject}
                  logoSrc={logoSrc}
                />
              );
            }}
          />
        )}

        {/* Clients Tab */}
        {activeTab === "clients" && (
          <DataGrid
            title="Clients"
            subtitle={`${CLIENTS.length} active clients`}
            items={CLIENTS}
            minWidth="280px"
            renderCard={(client) => {
              const clientProjects = PROJECTS.filter(
                (p) => p.clientId === client.id,
              );
              const clientBudget = clientProjects.reduce(
                (sum, p) => sum + p.budget,
                0,
              );
              const clientSpent = clientProjects.reduce(
                (sum, p) => sum + p.spent,
                0,
              );
              const projectsOverBudget = clientProjects.filter(
                (p) => p.spent > p.budget,
              ).length;
              const logoSrc = getClientLogo(client.id);

              return (
                <ClientCard
                  key={client.id}
                  client={client}
                  projectCount={clientProjects.length}
                  totalBudget={clientBudget}
                  totalSpent={clientSpent}
                  onNavigate={handleNavigateToClient}
                  logoSrc={logoSrc}
                  projectsOverBudget={projectsOverBudget}
                />
              );
            }}
          />
        )}
      </main>
    </div>
  );
}
