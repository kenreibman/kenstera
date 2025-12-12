"use client";
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

type ScheduleModalProps = {
  label: string;
  calLink: string;
  namespace?: string;
  className?: string;
  layout?: "month_view" | "week_view" | "column_view";
  theme?: "auto" | "dark" | "light";
};

export function ScheduleModal({
  label,
  calLink,
  namespace = "kenstera-modal",
  className,
  layout = "month_view",
  theme = "auto",
}: ScheduleModalProps) {
  useEffect(() => {
    let mounted = true;
    (async () => {
      const cal = await getCalApi({ namespace });
      if (!mounted) return;
      cal("ui", {
        hideEventTypeDetails: false,
        layout,
      });
    })();
    return () => {
      mounted = false;
    };
  }, [namespace, layout]);
  return (
    <button
      type="button"
      data-cal-namespace={namespace}
      data-cal-link={calLink}
      data-cal-config={JSON.stringify({ layout, theme })}
      className={className}
    >
      {label}
    </button>
  );
}