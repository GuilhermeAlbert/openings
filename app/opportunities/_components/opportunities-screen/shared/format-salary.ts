import type { OpportunitySalary } from "@/app/opportunities/_components/opportunities-screen/types";

interface PeriodLabels {
  month: string;
  year: string;
  hour: string;
}

export function formatSalary(
  salary: OpportunitySalary | undefined,
  locale: string,
  periodLabels: PeriodLabels,
) {
  if (!salary || (!salary.min && !salary.max)) {
    return "";
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: salary.currency,
    maximumFractionDigits: 0,
  });
  const period = periodLabels[salary.period];

  if (salary.min && salary.max) {
    return `${formatter.format(salary.min)} – ${formatter.format(salary.max)} / ${period}`;
  }

  if (salary.min) {
    return `${formatter.format(salary.min)}+ / ${period}`;
  }

  return `${formatter.format(salary.max ?? 0)} / ${period}`;
}
