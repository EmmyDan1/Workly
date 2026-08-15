"use client";

import { createContext, useContext, useEffect, useState } from "react";

import type { Team } from "@/types/projects";

type TeamContextType = {
  teams: Team[];
  addTeam: (team: Team) => void;
  updateTeam: (id: string, updates: Partial<Team>) => void;
  deleteTeam: (id: string) => void;
  getTeam: (id: string) => Team | undefined;
  isCreateTeamOpen: boolean;
  openCreateTeamModal: () => void;
  closeCreateTeamModal: () => void;
};

const TeamContext = createContext<TeamContextType | null>(null);

const TEAMS_STORAGE_KEY = "project-management-teams";

const initialTeams: Team[] = [
  {
    id: "engineering",
    name: "Engineering",
    description: "Builds and maintains Workly.",
    memberIds: ["daniel", "sarah", "michael"],
    createdAt: "2026-08-13T00:00:00.000Z",
  },
  {
    id: "product",
    name: "Product",
    description: "Shapes the product experience and roadmap.",
    memberIds: ["daniel", "sarah"],
    createdAt: "2026-08-13T00:00:00.000Z",
  },
  {
    id: "design",
    name: "Design",
    description: "Creates thoughtful and consistent experiences.",
    memberIds: ["sarah", "michael"],
    createdAt: "2026-08-13T00:00:00.000Z",
  },
];

export const TeamProvider = ({ children }: { children: React.ReactNode }) => {
  const [teams, setTeams] = useState<Team[]>(() => {
    if (typeof window === "undefined") {
      return initialTeams;
    }

    try {
      const storedTeams = localStorage.getItem(TEAMS_STORAGE_KEY);

      if (storedTeams) {
        return JSON.parse(storedTeams);
      }

      return initialTeams;
    } catch (error) {
      console.error("Failed to load teams:", error);

      return initialTeams;
    }
  });
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const openCreateTeamModal = () => {
    setIsCreateTeamOpen(true);
  };

  const closeCreateTeamModal = () => {
    setIsCreateTeamOpen(false);
  };

  useEffect(() => {
    localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(teams));
  }, [teams]);

  const addTeam = (team: Team) => {
    setTeams((previousTeams) => [...previousTeams, team]);
  };

  const updateTeam = (id: string, updates: Partial<Team>) => {
    setTeams((previousTeams) =>
      previousTeams.map((team) =>
        team.id === id
          ? {
              ...team,
              ...updates,
            }
          : team,
      ),
    );
  };

  const deleteTeam = (id: string) => {
    setTeams((previousTeams) => previousTeams.filter((team) => team.id !== id));
  };

  const getTeam = (id: string) => {
    return teams.find((team) => team.id === id);
  };

  return (
    <TeamContext.Provider
      value={{
        teams,
        addTeam,
        updateTeam,
        deleteTeam,
        getTeam,
        isCreateTeamOpen,
        openCreateTeamModal,
        closeCreateTeamModal
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => {
  const context = useContext(TeamContext);

  if (!context) {
    throw new Error("useTeam must be used inside TeamProvider");
  }

  return context;
};
