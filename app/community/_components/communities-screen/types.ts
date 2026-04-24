import type { CommunitySummary } from "@/lib/opportunities/communities";

export interface CommunityFilterOption {
  value: string;
  count: number;
}

export interface CommunitiesScreenProps {
  communities: CommunitySummary[];
}
