import portfolioMetricsData from "../data/portfolioMetrics.json";

export interface CustomPortfolioMetrics {
  [key: string]: string | number | undefined | null;
}

const metrics: CustomPortfolioMetrics = (portfolioMetricsData as any)?.metrics || {};

/**
 * Returns a metric value only if it exists and is non-empty.
 * Returns null if the value is missing, empty string, or undefined, ensuring no placeholder or zero is displayed.
 */
export function getPortfolioMetric(key: string): string | null {
  const val = metrics[key];
  if (val === undefined || val === null || val === "") {
    return null;
  }
  return String(val);
}

export default metrics;
