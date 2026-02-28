"use client";

import { useRouter, useParams } from "next/navigation";
import {
  ChevronLeft,
  DollarSign,
  Users,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { PROJECTS, TEAM_MEMBERS } from "@/data/mockData";

export default function ProjectDetail() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;

  const project = PROJECTS.find((p) => p.id === projectId);
  const projectTeam = TEAM_MEMBERS.filter((t) => t.projectId === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-bi3-bg-light dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-bi3-text-primary dark:text-white mb-4">
            Project not found
          </h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-bi3-blue text-white rounded-lg hover:bg-blue-700"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const budgetPercentage = (project.spent / project.budget) * 100;
  const remainingBudget = project.budget - project.spent;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200";
      case "In Progress":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
      case "On Hold":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-bi3-bg-light dark:bg-slate-900">
      {/* Header */}
      <div className="border-b border-bi3-divider dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-bi3-text-secondary dark:text-slate-400 hover:text-bi3-text-primary dark:hover:text-white mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-bi3-text-primary dark:text-white mb-2">
                {project.name}
              </h1>
              <p className="text-bi3-text-secondary dark:text-slate-400">
                {project.description}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}
            >
              {project.status}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Budget Overview */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-bi3-divider dark:border-slate-700 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-bi3-text-primary dark:text-white">
              Budget Overview
            </h2>
            <DollarSign className="w-5 h-5 text-bi3-blue" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <p className="text-sm text-bi3-text-secondary dark:text-slate-400 mb-2">
                Total Budget
              </p>
              <p className="text-2xl font-bold text-bi3-text-primary dark:text-white">
                ${project.budget.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-bi3-text-secondary dark:text-slate-400 mb-2">
                Amount Spent
              </p>
              <p className="text-2xl font-bold text-bi3-text-primary dark:text-white">
                ${project.spent.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-bi3-text-secondary dark:text-slate-400 mb-2">
                Remaining
              </p>
              <p
                className={`text-2xl font-bold ${remainingBudget > 0 ? "text-bi3-success" : "text-bi3-error"}`}
              >
                ${remainingBudget.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-bi3-text-secondary dark:text-slate-400">
                Budget used
              </span>
              <span className="font-medium text-bi3-text-primary dark:text-white">
                {budgetPercentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-bi3-divider dark:bg-slate-600 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-bi3-blue to-blue-500 h-3 rounded-full transition-all"
                style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
              />
            </div>
            {remainingBudget < 0 && (
              <p className="text-sm text-bi3-error dark:text-red-400">
                Budget exceeded by ${Math.abs(remainingBudget).toLocaleString()}
              </p>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timeline */}
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-bi3-divider dark:border-slate-700 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-bi3-blue" />
                <h3 className="text-lg font-semibold text-bi3-text-primary dark:text-white">
                  Timeline
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-bi3-divider dark:border-slate-700">
                  <span className="text-bi3-text-secondary dark:text-slate-400">
                    Start Date
                  </span>
                  <span className="font-medium text-bi3-text-primary dark:text-white">
                    {new Date(project.startDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-bi3-divider dark:border-slate-700">
                  <span className="text-bi3-text-secondary dark:text-slate-400">
                    End Date
                  </span>
                  <span className="font-medium text-bi3-text-primary dark:text-white">
                    {new Date(project.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-bi3-text-secondary dark:text-slate-400">
                    Duration
                  </span>
                  <span className="font-medium text-bi3-text-primary dark:text-white">
                    {Math.ceil(
                      (new Date(project.endDate).getTime() -
                        new Date(project.startDate).getTime()) /
                        (1000 * 60 * 60 * 24),
                    )}{" "}
                    days
                  </span>
                </div>
              </div>
            </div>

            {/* Deliverables */}
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-bi3-divider dark:border-slate-700 p-6">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle className="w-5 h-5 text-bi3-blue" />
                <h3 className="text-lg font-semibold text-bi3-text-primary dark:text-white">
                  Key Deliverables
                </h3>
              </div>
              <ul className="space-y-3">
                {project.deliverables?.map((deliverable, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-bi3-text-secondary dark:text-slate-400"
                  >
                    <CheckCircle className="w-4 h-4 text-bi3-success flex-shrink-0" />
                    {deliverable}
                  </li>
                )) || (
                  <p className="text-bi3-text-muted dark:text-slate-500">
                    No deliverables specified
                  </p>
                )}
              </ul>
            </div>
          </div>

          {/* Team Members */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-bi3-divider dark:border-slate-700 p-6 h-fit">
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-bi3-blue" />
              <h3 className="text-lg font-semibold text-bi3-text-primary dark:text-white">
                Team Members
              </h3>
            </div>
            <div className="space-y-4">
              {projectTeam.length === 0 ? (
                <p className="text-bi3-text-muted dark:text-slate-500 text-sm">
                  No team members assigned
                </p>
              ) : (
                projectTeam.map((member) => (
                  <div
                    key={member.id}
                    className="pb-4 border-b border-bi3-divider dark:border-slate-700 last:border-0"
                  >
                    <p className="font-medium text-bi3-text-primary dark:text-white text-sm">
                      {member.name}
                    </p>
                    <p className="text-xs text-bi3-text-secondary dark:text-slate-400 mt-1">
                      {member.role}
                    </p>
                    <div className="mt-2 w-full bg-bi3-divider dark:bg-slate-600 rounded-full h-1.5">
                      <div
                        className="bg-bi3-blue h-1.5 rounded-full"
                        style={{ width: `${member.utilization}%` }}
                      />
                    </div>
                    <p className="text-xs text-bi3-text-muted dark:text-slate-500 mt-1">
                      {member.utilization}% utilized
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
