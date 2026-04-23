import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface DrawerMobileSheetProps {
  open: boolean;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
}

export function DrawerMobileSheet({
  open,
  closeLabel,
  onClose,
  children,
}: DrawerMobileSheetProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" aria-label={closeLabel} className="absolute inset-0 bg-black/45" onClick={onClose} />
          <motion.div
            className="absolute inset-x-0 bottom-0 max-h-[86dvh] overflow-hidden rounded-t-2xl border border-border/70 bg-card"
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
