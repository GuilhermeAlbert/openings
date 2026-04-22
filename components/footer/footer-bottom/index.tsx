import * as React from "react";
import { motion } from "framer-motion";
import { Copy, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind";
import type { FooterBottomProps } from "../types";
import {
  footerBottomActionsStyles,
  footerBottomMetaStackStyles,
  footerBottomRootStyles,
  footerBottomTextStyles,
  footerSignatureStyles,
  footerSupportButtonStyles,
} from "../styles";

export function FooterBottom({
  className,
  supportEmail,
  supportText,
  copyrightText,
  signature,
}: FooterBottomProps) {
  const handleCopySupportEmail = React.useCallback(async () => {
    if (!supportEmail) {
      return;
    }

    try {
      await navigator.clipboard.writeText(supportEmail);
      toast.success("Support email copied");
    } catch {
      toast.error("Could not copy support email");
    }
  }, [supportEmail]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(footerBottomRootStyles(), className)}
    >
      <div className={footerBottomMetaStackStyles()}>
        <p className={footerBottomTextStyles()}>{copyrightText}</p>
        <p className={footerBottomTextStyles()}>{supportText}</p>
      </div>

      <div className={footerBottomActionsStyles()}>
        {supportEmail ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleCopySupportEmail}
            className={footerSupportButtonStyles()}
          >
            <Mail className="size-3.5" aria-hidden="true" />
            <span>{supportEmail}</span>
            <Copy className="size-3.5 opacity-70" aria-hidden="true" />
          </Button>
        ) : null}
        <p className={footerSignatureStyles()}>{signature}</p>
      </div>
    </motion.div>
  );
}
