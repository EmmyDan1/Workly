"use client";

import { createContext, useContext, useState } from "react";

import type { ProjectMember } from "@/types/projects";

type MemberContextType = {
  members: ProjectMember[];
  addMember: (member: ProjectMember) => void;
  updateMember: (id: string, updates: Partial<ProjectMember>) => void;
  deleteMember: (id: string) => void;
};

const MemberContext = createContext<MemberContextType | null>(null);

export const MemberProvider = ({ children }: { children: React.ReactNode }) => {
  const [members, setMembers] = useState<ProjectMember[]>([
    {
      id: "daniel",
      name: "Daniel",
      email: "daniel@example.com",
    },
    {
      id: "sarah",
      name: "Sarah",
      email: "sarah@example.com",
    },
    {
      id: "michael",
      name: "Michael",
      email: "michael@example.com",
    },
  ]);

  const addMember = (member: ProjectMember) => {
    setMembers((prev) => [...prev, member]);
  };

  const updateMember = (id: string, updates: Partial<ProjectMember>) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, ...updates } : member,
      ),
    );
  };

  const deleteMember = (id: string) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  return (
    <MemberContext.Provider
      value={{
        members,
        addMember,
        updateMember,
        deleteMember,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
};

export const useMember = () => {
  const context = useContext(MemberContext);

  if (!context) {
    throw new Error("useMember must be used inside MemberProvider");
  }

  return context;
};
