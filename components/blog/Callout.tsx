import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

type CalloutType = "info" | "success" | "warning" | "error";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const calloutConfig = {
  info: {
    icon: Info,
    bgClass: "bg-blue-50 dark:bg-blue-950/30",
    borderClass: "border-blue-200 dark:border-blue-800",
    iconClass: "text-blue-600 dark:text-blue-400",
    titleClass: "text-blue-900 dark:text-blue-100",
  },
  success: {
    icon: CheckCircle,
    bgClass: "bg-emerald-50 dark:bg-emerald-950/30",
    borderClass: "border-emerald-200 dark:border-emerald-800",
    iconClass: "text-emerald-600 dark:text-emerald-400",
    titleClass: "text-emerald-900 dark:text-emerald-100",
  },
  warning: {
    icon: AlertTriangle,
    bgClass: "bg-amber-50 dark:bg-amber-950/30",
    borderClass: "border-amber-200 dark:border-amber-800",
    iconClass: "text-amber-600 dark:text-amber-400",
    titleClass: "text-amber-900 dark:text-amber-100",
  },
  error: {
    icon: AlertCircle,
    bgClass: "bg-red-50 dark:bg-red-950/30",
    borderClass: "border-red-200 dark:border-red-800",
    iconClass: "text-red-600 dark:text-red-400",
    titleClass: "text-red-900 dark:text-red-100",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "my-6 rounded-lg border p-4",
        config.bgClass,
        config.borderClass
      )}
    >
      <div className="flex gap-3">
        <Icon className={cn("h-5 w-5 mt-0.5 flex-shrink-0", config.iconClass)} />
        <div className="flex-1 min-w-0">
          {title && (
            <p className={cn("font-semibold mb-1", config.titleClass)}>
              {title}
            </p>
          )}
          <div className="text-sm text-foreground/80 [&>p]:mb-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
