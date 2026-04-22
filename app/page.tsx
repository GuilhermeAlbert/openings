"use client";

import { useI18n } from "@/components/providers/i18n-provider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Home() {
  const { messages } = useI18n();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-20 pt-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border/70 bg-card p-8 shadow-[0_12px_36px_-20px_rgb(0_0_0/0.22)]">
          <p className="text-sm font-medium tracking-[0.02em] text-muted-foreground">
            {messages.home.kicker}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            {messages.home.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            {messages.home.description}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
