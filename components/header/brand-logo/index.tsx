"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils/tailwind";
import type { BrandLogoProps } from "../types";
import { brandLogoMarkStyles, brandLogoRootStyles } from "./styles";

export function BrandLogo({
  className,
  href = "/",
  brandName = "openings.dev",
  lightLogoSrc = "/logo-light.png",
  darkLogoSrc = "/logo-dark.png",
}: BrandLogoProps) {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";
  const logoSrc = isDarkTheme ? darkLogoSrc : lightLogoSrc;
  const logoAlt = isDarkTheme
    ? `${brandName} dark logo`
    : `${brandName} light logo`;

  return (
    <Link href={href} className={cn(brandLogoRootStyles(), className)}>
      <span className={brandLogoMarkStyles()}>
        <Image
          src={logoSrc}
          alt={logoAlt}
          fill
          sizes="190px"
          priority
          className="object-contain"
        />
      </span>
    </Link>
  );
}
