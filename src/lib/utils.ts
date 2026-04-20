export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "processing":
      return "text-blue-400";
    case "in_transit":
      return "text-cyan-400";
    case "delayed":
      return "text-red-400";
    case "rerouted":
      return "text-amber-400";
    case "delivered":
      return "text-emerald-400";
    default:
      return "text-slate-400";
  }
}

export function getStatusBgColor(status: string): string {
  switch (status) {
    case "processing":
      return "bg-blue-500/20 border-blue-500/30";
    case "in_transit":
      return "bg-cyan-500/20 border-cyan-500/30";
    case "delayed":
      return "bg-red-500/20 border-red-500/30";
    case "rerouted":
      return "bg-amber-500/20 border-amber-500/30";
    case "delivered":
      return "bg-emerald-500/20 border-emerald-500/30";
    default:
      return "bg-slate-500/20 border-slate-500/30";
  }
}

export function getRiskColor(score: number): string {
  if (score >= 70) return "#EF4444";
  if (score >= 40) return "#F59E0B";
  return "#10B981";
}

export function getRiskLabel(score: number): string {
  if (score >= 70) return "High";
  if (score >= 40) return "Medium";
  return "Low";
}

export function animateCounter(
  from: number,
  to: number,
  duration: number,
  callback: (value: number) => void
): void {
  const start = performance.now();
  const update = (time: number) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    callback(Math.round(from + (to - from) * eased));
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
