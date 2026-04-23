import { motion } from "framer-motion";
import {
  opportunitiesDescriptionStyles,
  opportunitiesHeaderStyles,
  opportunitiesKickerStyles,
  opportunitiesTitleStyles,
} from "@/app/opportunities/_components/opportunities-screen/styles";

interface OpportunitiesScreenHeaderProps {
  kicker: string;
  title: string;
  description: string;
}

export function OpportunitiesScreenHeader({
  kicker,
  title,
  description,
}: OpportunitiesScreenHeaderProps) {
  return (
    <motion.header
      className={opportunitiesHeaderStyles()}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <p className={opportunitiesKickerStyles()}>{kicker}</p>
      <h1 className={opportunitiesTitleStyles()}>{title}</h1>
      <p className={opportunitiesDescriptionStyles()}>{description}</p>
    </motion.header>
  );
}
