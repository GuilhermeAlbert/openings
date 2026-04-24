import { AnimatePresence, motion } from "framer-motion";
import { resultsGridStyles } from "@/app/opportunities/_components/opportunities-screen/styles";
import type {
  OpportunityItem,
  OpportunityViewMode,
} from "@/app/opportunities/_components/opportunities-screen/types";
import { OpportunityCard } from "@/app/opportunities/_components/opportunities-screen/opportunity-card";

interface ResultsGridProps {
  items: OpportunityItem[];
  viewMode: OpportunityViewMode;
  selectedOpportunityId: string | null;
  onSelectOpportunity: (item: OpportunityItem) => void;
  onCommunitySelect: (repository: string) => void;
  onAuthorSelect: (authorHandle: string) => void;
  hideCommunityIdentity: boolean;
  hideAuthorIdentity: boolean;
}

export function ResultsGrid({
  items,
  viewMode,
  selectedOpportunityId,
  onSelectOpportunity,
  onCommunitySelect,
  onAuthorSelect,
  hideCommunityIdentity,
  hideAuthorIdentity,
}: ResultsGridProps) {
  return (
    <motion.div
      layout
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={resultsGridStyles({ viewMode })}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
          >
            <OpportunityCard
              item={item}
              viewMode={viewMode}
              isSelected={selectedOpportunityId === item.id}
              onSelectOpportunity={onSelectOpportunity}
              onCommunitySelect={onCommunitySelect}
              onAuthorSelect={onAuthorSelect}
              hideCommunityIdentity={hideCommunityIdentity}
              hideAuthorIdentity={hideAuthorIdentity}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
