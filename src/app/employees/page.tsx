"use client";

import { useState, useMemo } from "react";
import { Search, Filter, TrendingUp } from "lucide-react";
import { TEAM_MEMBERS } from "@/data/mockData";

export default function Employees() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const filteredEmployees = useMemo(() => {
    let filtered = TEAM_MEMBERS;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.role.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by role
    if (filterRole !== "all") {
      filtered = filtered.filter((emp) => emp.role === filterRole);
    }

    // Sort
    if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "utilization") {
      filtered.sort((a, b) => b.utilization - a.utilization);
    }

    return filtered;
  }, [searchTerm, filterRole, sortBy]);

  const roles = Array.from(new Set(TEAM_MEMBERS.map((m) => m.role)));
  const avgUtilization = Math.round(
    TEAM_MEMBERS.reduce((sum, m) => sum + m.utilization, 0) /
      TEAM_MEMBERS.length,
  );

  return (
    <div className="min-h-screen bg-bi3-bg-light dark:bg-slate-900">
      {/* Header */}
      <div className="border-b border-bi3-divider dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-bi3-text-primary dark:text-white mb-2">
            Team Members
          </h1>
          <p className="text-bi3-text-secondary dark:text-slate-400">
            Manage and track your team's availability
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-bi3-divider dark:border-slate-700">
            <p className="text-bi3-text-secondary dark:text-slate-400 text-sm font-medium mb-2">
              Total Team Members
            </p>
            <p className="text-3xl font-bold text-bi3-text-primary dark:text-white">
              {TEAM_MEMBERS.length}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-bi3-divider dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <p className="text-bi3-text-secondary dark:text-slate-400 text-sm font-medium">
                Average Utilization
              </p>
              <TrendingUp className="w-4 h-4 text-bi3-blue" />
            </div>
            <p className="text-3xl font-bold text-bi3-text-primary dark:text-white">
              {avgUtilization}%
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-bi3-divider dark:border-slate-700">
            <p className="text-bi3-text-secondary dark:text-slate-400 text-sm font-medium mb-2">
              Available Roles
            </p>
            <p className="text-3xl font-bold text-bi3-text-primary dark:text-white">
              {roles.length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-bi3-divider dark:border-slate-700 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-bi3-text-secondary dark:text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-bi3-divider dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-bi3-text-primary dark:text-white placeholder-bi3-text-muted dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-bi3-blue"
              />
            </div>

            {/* Role Filter */}
            <div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-4 py-2 border border-bi3-divider dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-bi3-text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-bi3-blue"
              >
                <option value="all">All Roles</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-bi3-divider dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-bi3-text-primary dark:text-white focus:outline-none focus:ring-2 focus:ring-bi3-blue"
              >
                <option value="name">Sort by Name</option>
                <option value="utilization">Sort by Utilization</option>
              </select>
            </div>
          </div>
        </div>

        {/* Employee Table */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-bi3-divider dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-bi3-divider dark:border-slate-700 bg-bi3-bg-light dark:bg-slate-700">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-bi3-text-primary dark:text-white">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-bi3-text-primary dark:text-white">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-bi3-text-primary dark:text-white">
                    Projects
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-bi3-text-primary dark:text-white">
                    Utilization
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <p className="text-bi3-text-secondary dark:text-slate-400">
                        No employees found matching your criteria
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((employee) => (
                    <tr
                      key={employee.id}
                      className="border-b border-bi3-divider dark:border-slate-700 hover:bg-bi3-bg-light dark:hover:bg-slate-700 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-bi3-blue text-white flex items-center justify-center font-semibold">
                            {employee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span className="font-medium text-bi3-text-primary dark:text-white">
                            {employee.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-bi3-text-secondary dark:text-slate-400">
                          {employee.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-bi3-text-secondary dark:text-slate-400">
                          {employee.projectId ? "1" : "0"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-bi3-divider dark:bg-slate-600 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                employee.utilization > 80
                                  ? "bg-bi3-error"
                                  : employee.utilization > 60
                                    ? "bg-bi3-warning"
                                    : "bg-bi3-success"
                              }`}
                              style={{ width: `${employee.utilization}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-bi3-text-primary dark:text-white min-w-10">
                            {employee.utilization}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Utilization Info */}
        <div className="mt-8 bg-blue-50 dark:bg-slate-700 border border-blue-200 dark:border-slate-600 rounded-lg p-6">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <span className="font-semibold">Utilization Legend:</span>{" "}
            Utilization indicates the percentage of capacity currently allocated
            to projects. Green (0-60%) = Available, Amber (60-80%) = High
            Demand, Red (80%+) = Over Capacity
          </p>
        </div>
      </div>
    </div>
  );
}
