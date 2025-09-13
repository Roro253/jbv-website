export type Source = {
  title: string;
  publisher: string;
  yearOrDate: string;
  url: string;
};

export const sources: Source[] = [
  { title: "Sean Ellis PMF Survey (40% signal)", publisher: "pmfsurvey.com", yearOrDate: "ongoing", url: "https://pmfsurvey.com/" },
  { title: "How to measure PMF (explainers)", publisher: "Prelaunch & case studies", yearOrDate: "2023–2025", url: "https://prelaunch.com/blog/sean-ellis-test" },
  { title: "Cloud metrics & CAC payback", publisher: "Bessemer Venture Partners", yearOrDate: "evergreen", url: "https://www.bvp.com/atlas/cloud-computing-metrics/" },
  { title: "SaaS CAC Payback Benchmarks", publisher: "First Page Sage", yearOrDate: "2024–2025", url: "https://firstpagesage.com/reports/saas-cac-payback-benchmarks/" },
  { title: "Full-stack AI constraints", publisher: "CSIS", yearOrDate: "2025", url: "https://www.csis.org/analysis/securing-full-stack-us-leadership-ai" },
  { title: "Semiconductor & data-center investment wave", publisher: "McKinsey / U.S. data-center build reporting", yearOrDate: "2024–2025", url: "https://www.mckinsey.com/~/media/mckinsey/industries/semiconductors/our%20insights/mckinsey%20on%20semiconductors%202024/mck_semiconductors_2024_webpdf.pdf" },
  { title: "AI data-center build (news context)", publisher: "Reuters", yearOrDate: "2025", url: "https://www.reuters.com/business/us-data-center-build-hits-record-ai-demand-surges-bank-america-institute-says-2025-09-10/" },
  { title: "NVIDIA AI accelerator market share (analyst est.)", publisher: "Yahoo Finance (analyst note)", yearOrDate: "2025", url: "https://finance.yahoo.com/news/nvidia-dominates-ai-chips-analyst-143411443.html" }
];
