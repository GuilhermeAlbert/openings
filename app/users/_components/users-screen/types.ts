import type { UserSummary } from "@/lib/opportunities/users";

export interface UserFilterOption {
  value: string;
  count: number;
}

export interface UsersScreenProps {
  users: UserSummary[];
}
