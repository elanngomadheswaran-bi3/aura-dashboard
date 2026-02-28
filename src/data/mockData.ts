import clients from "./clients.json";
import projectsData from "./projects.json";
import teamMembers from "./teamMembers.json";
import auraData from "./Project Name - AURA.json";

export interface Project {
  id: string;
  name: string;
  description: string;
  clientId: string;
  poNumber?: string;
  projectCode?: string;
  budget: number;
  spent: number;
  status: "Completed" | "In Progress" | "On Hold" | "Planned";
  startDate: string;
  endDate: string;
  deliverables?: string[];
}

export interface Client {
  id: string;
  name: string;
  description: string;
  status: "Completed" | "In Progress" | "On Hold" | "Planned";
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  employeeId: string;
  projectId?: string;
  department: string;
  totalHours: number;
  utilizationPercentage: number;
}

// Calculate project spending from AURA data
const calculateProjectSpending = (): Record<string, number> => {
  const projectSpent: Record<string, number> = {};
  const overheadCosts: Record<string, number> = {};

  // Build employee hourly costs map from Overhead Cost section
  (auraData["Overhead Cost"] as any[]).slice(1).forEach((emp) => {
    overheadCosts[emp["Column2"]] = emp["Total Cost"] || 0;
  });

  // Calculate spent per project from Timesheet
  (auraData["Timesheet - UI"] as any[]).forEach((entry) => {
    if (!entry["Project Code"] || entry["Project Code"] === "-No Value-")
      return;

    const projectCode = entry["Project Code"];
    const empId = entry["Employee ID"];
    const hours = entry["Total Hours"] || 0;
    const hourlyRate = overheadCosts[empId] || 0;
    const cost = hours * hourlyRate;

    if (!projectSpent[projectCode]) {
      projectSpent[projectCode] = 0;
    }
    projectSpent[projectCode] += cost;
  });

  return projectSpent;
};

// Calculate spent amounts once
const PROJECT_SPENDING = calculateProjectSpending();

// Enrich projects with calculated spending
const enrichProjectsWithSpending = (projects: any[]): Project[] => {
  return projects.map((project) => ({
    ...project,
    spent: PROJECT_SPENDING[project.projectCode] || 0,
  }));
};

// Export JSON data as typed exports
export const CLIENTS: Client[] = clients as Client[];
export const PROJECTS: Project[] = enrichProjectsWithSpending(
  projectsData as any[],
);
export const TEAM_MEMBERS: TeamMember[] = teamMembers as TeamMember[];

// Utility functions for common operations
export const getProjectsByClient = (clientId: string): Project[] => {
  return PROJECTS.filter((p) => p.clientId === clientId);
};

export const getTeamMembersByProject = (projectId: string): TeamMember[] => {
  return TEAM_MEMBERS.filter((m) => m.projectId === projectId);
};

export const getClientById = (clientId: string): Client | undefined => {
  return CLIENTS.find((c) => c.id === clientId);
};

export const getProjectById = (projectId: string): Project | undefined => {
  return PROJECTS.find((p) => p.id === projectId);
};

export const calculateProjectMetrics = (projectId: string) => {
  const project = getProjectById(projectId);
  if (!project) return null;

  const teamMembers = getTeamMembersByProject(projectId);
  const spent = project.spent || 0;
  const avgUtilization =
    teamMembers.length > 0
      ? (
          teamMembers.reduce((sum, m) => sum + m.utilizationPercentage, 0) /
          teamMembers.length
        ).toFixed(0)
      : "0";

  return {
    budget: project.budget,
    spent: spent,
    remaining: project.budget - spent,
    budgetPercent: ((spent / project.budget) * 100).toFixed(1),
    teamSize: teamMembers.length,
    avgUtilization: avgUtilization,
    status: project.status,
  };
};

export const calculateClientMetrics = (clientId: string) => {
  const clientProjects = getProjectsByClient(clientId);
  const totalBudget = clientProjects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = clientProjects.reduce((sum, p) => sum + (p.spent || 0), 0);

  return {
    totalProjects: clientProjects.length,
    totalBudget: totalBudget,
    totalSpent: totalSpent,
    remaining: totalBudget - totalSpent,
    budgetPercent:
      totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(1) : "0",
  };
};

export const calculatePortfolioMetrics = () => {
  const totalBudget = PROJECTS.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = PROJECTS.reduce((sum, p) => sum + (p.spent || 0), 0);
  const totalVariance = totalSpent - totalBudget;
  const variancePercent =
    totalBudget > 0 ? ((totalVariance / totalBudget) * 100).toFixed(1) : "0";

  const avgUtilization =
    TEAM_MEMBERS.length > 0
      ? (
          TEAM_MEMBERS.reduce((sum, m) => sum + m.utilizationPercentage, 0) /
          TEAM_MEMBERS.length
        ).toFixed(0)
      : "0";

  return {
    totalBudget,
    totalSpent,
    totalVariance,
    variancePercent,
    totalProjects: PROJECTS.length,
    projectsOverBudget: PROJECTS.filter((p) => (p.spent || 0) > p.budget)
      .length,
    totalTeamSize: TEAM_MEMBERS.length,
    avgUtilization,
  };
};
