"use client";

import { createContext, useContext, useEffect, useState } from "react";

import type { Team } from "@/types/projects";

type TeamContextType = {
  teams: Team[];
  addTeam: (name: string, description?: string) => Promise<void>;
  updateTeam: (id: string, updates: Partial<Team>) => Promise<void>;
  deleteTeam: (id: string) => void;
  getTeam: (id: string) => Team | undefined;
  isCreateTeamOpen: boolean;
  openCreateTeamModal: () => void;
  closeCreateTeamModal: () => void;
};

const TeamContext = createContext<TeamContextType | null>(null);

export const TeamProvider = ({ children }: { children: React.ReactNode }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await fetch("http://localhost:5000/api/teams", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch teams");
        }

        const data = await response.json();

        setTeams(
          data.map((team: any) => ({
            ...team,
            createdAt: team.created_at,
          })),
        );
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    };

    fetchTeams();
  }, []);
  const openCreateTeamModal = () => {
    setIsCreateTeamOpen(true);
  };

  const closeCreateTeamModal = () => {
    setIsCreateTeamOpen(false);
  };

  const addTeam = async (name: string, description?: string) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await fetch("http://localhost:5000/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create team");
      }

      const data = await response.json();

      const newTeam: Team = {
        ...data,
        createdAt: data.created_at,
      };

      setTeams((previousTeams) => [...previousTeams, newTeam]);

      closeCreateTeamModal();
    } catch (error) {
      console.error("Failed to create team:", error);
    }
  };

  const updateTeam = async (id: string, updates: Partial<Team>) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/teams/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: updates.name,
          description: updates.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update team");
      }

      const data = await response.json();

      const updatedTeam: Team = {
        ...data,
        createdAt: data.created_at,
      };

      setTeams((previousTeams) =>
        previousTeams.map((team) => (team.id === id ? updatedTeam : team)),
      );
    } catch (error) {
      console.error("Failed to update team:", error);
    }
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
        closeCreateTeamModal,
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
