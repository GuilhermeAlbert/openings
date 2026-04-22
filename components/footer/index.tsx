"use client";

import { motion } from "framer-motion";
import { AtSign, Globe, Link2 } from "lucide-react";
import { cn } from "@/lib/utils/tailwind";
import { FooterBottom } from "./footer-bottom";
import { FooterBrand } from "./footer-brand";
import { FooterLinks } from "./footer-links";
import {
  footerContainerStyles,
  footerMainGridStyles,
  footerRootStyles,
  footerSurfaceStyles,
  footerTopDividerStyles,
} from "./styles";
import type { FooterLinkGroup, FooterProps, FooterSocialLink } from "./types";

const DEFAULT_LINK_GROUPS: FooterLinkGroup[] = [
  {
    id: "product",
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    id: "company",
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "Community", href: "/community" },
    ],
  },
  {
    id: "contribution",
    title: "Contribution",
    links: [
      { label: "GitHub", href: "https://github.com", external: true },
      {
        label: "Contributing",
        href: "https://github.com/openings-dev/openings.dev/blob/main/CONTRIBUTING.md",
        external: true,
      },
      {
        label: "Report issue",
        href: "https://github.com/openings-dev/openings.dev/issues/new",
        external: true,
      },
    ],
  },
  {
    id: "legal",
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

const DEFAULT_SOCIAL_LINKS: FooterSocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: Link2,
    external: true,
  },
  {
    label: "X",
    href: "https://x.com",
    icon: Globe,
    external: true,
    ariaLabel: "X social profile",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: AtSign,
    external: true,
  },
];

export function Footer({
  className,
  brandHref = "/",
  brandName = "openings.dev",
  brandTagline = "Remote jobs intelligence",
  description = "Discover meaningful remote opportunities through curated signals, trusted repositories, and structured hiring insights.",
  supportEmail = "support@openings.dev",
  supportText = "Built for distributed teams and high-context hiring decisions.",
  copyrightText,
  signature = "Powered by Trebla",
  lightLogoSrc = "/light-mode-favicon.svg",
  darkLogoSrc = "/dark-mode-favicon.svg",
  linkGroups,
  socialLinks,
}: FooterProps) {
  const resolvedLinkGroups = linkGroups?.length
    ? linkGroups
    : DEFAULT_LINK_GROUPS;
  const resolvedSocialLinks = socialLinks?.length
    ? socialLinks
    : DEFAULT_SOCIAL_LINKS;
  const resolvedCopyright =
    copyrightText ??
    `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`;

  return (
    <footer className={cn(footerRootStyles(), className)}>
      <span className={footerTopDividerStyles()} aria-hidden="true" />
      <span className={footerSurfaceStyles()} aria-hidden="true" />

      <div className={footerContainerStyles()}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={footerMainGridStyles()}
        >
          <FooterBrand
            href={brandHref}
            brandName={brandName}
            brandTagline={brandTagline}
            description={description}
            lightLogoSrc={lightLogoSrc}
            darkLogoSrc={darkLogoSrc}
            socialLinks={resolvedSocialLinks}
          />
          <FooterLinks groups={resolvedLinkGroups} />
        </motion.div>

        <FooterBottom
          supportEmail={supportEmail}
          supportText={supportText}
          copyrightText={resolvedCopyright}
          signature={signature}
        />
      </div>
    </footer>
  );
}
