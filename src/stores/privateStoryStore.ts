import { create } from 'zustand';
import { DateValue } from '@mantine/dates';

interface TimePerTurn {
  days: number;
  hours: number;
  minutes: number;
}


export interface User {
  id: string;
  imageUrl: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  emailAddresses: unknown[];
}

interface PrivateStoryState {
  collaborator: string;
  contributors: string[];
  startDate: DateValue;
  endDate: DateValue;
  days: number;
  hours: number;
  minutes: number;
  isActiveDate: boolean;
  isActiveTime: boolean;
  calculatedEndDate: Date | null;
  timePerTurn: TimePerTurn;
  users: User[];
  setCollaborator: (person: string) => void;
  setCollaboratorsList: (list: string[]) => void;
  setStartDate: (date: DateValue | null) => void;
  setEndDate: (date: DateValue | null) => void;
  setDays: (days: number) => void;
  setHours: (hours: number) => void;
  setMinutes: (minutes: number) => void;
  setIsActiveDate: (active: boolean) => void;
  setIsActiveTime: (active: boolean) => void;
  setCalculatedEndDate: (date: Date | null) => void;
  setTimePerTurn: (time: { days: number; hours: number; minutes: number }) => void;
  setUsers: (users: User[]) => void;
}

export const usePrivateStoryStore = create<PrivateStoryState>((set) => ({
  collaborator: '',
  contributors: [],
  startDate: null,
  endDate: null,
  days: 0,
  hours: 0,
  minutes: 0,
  isActiveDate: false,
  isActiveTime: false,
  calculatedEndDate: null,
  timePerTurn: { days: 0, hours: 0, minutes: 0 },
  users: [],
  setCollaborator: (person: string) => set({ collaborator: person }),
  setCollaboratorsList: (list: string[]) => set({ contributors: list }),
  setStartDate: (date: DateValue) => set({ startDate: date }),
  setEndDate: (date: DateValue) => set({ endDate: date }),
  setDays: (days: number) => set({ days }),
  setHours: (hours: number) => set({ hours }),
  setMinutes: (minutes: number) => set({ minutes }),
  setIsActiveDate: (isActive: boolean) => set({ isActiveDate: isActive }),
  setIsActiveTime: (isActive: boolean) => set({ isActiveTime: isActive }),
  setCalculatedEndDate: (date: Date | null) => set({ calculatedEndDate: date }),
  setTimePerTurn: (time: TimePerTurn) => set({ timePerTurn: time }),
  setUsers: (users: User[]) => set({ users: users }),
}));
