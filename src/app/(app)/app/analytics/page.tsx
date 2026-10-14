import type { Metadata } from "next";
import { AnalyticsDashboard } from "@/components/app/analytics/AnalyticsDashboard";

export const metadata: Metadata = { title: "Analytics" };

export default function AppAnalyticsPage() {
  return <AnalyticsDashboard />;
}
