export const verificationEn = {
  title: 'Product Data Transparency',
  subtitle: 'Every claim about Mercury GP is tracked, sourced, and categorized. This registry shows our commitment to data integrity.',
  sectionLabels: {
    all: 'All Claims',
    verified: 'Verified',
    pending: 'Pending Verification',
    unverified: 'Unverified',
    allCategories: 'All Categories',
    source: 'Source',
    evidence: 'Evidence',
    lastVerified: 'Last Verified',
    category: 'Category',
    status: 'Status',
    claim: 'Claim',
    detail: 'Detail',
    close: 'Close',
    verifiedCount: (v: number, total: number) => `${v} of ${total} claims verified`,
    showingCount: (shown: number, total: number) => `Showing ${shown} of ${total} claims`,
  },
  categories: {
    specification: 'Specification',
    feature: 'Feature',
    safety: 'Safety',
    comparison: 'Comparison',
    general: 'General',
  },
  statuses: {
    verified: 'Verified',
    pending: 'Pending',
    unverified: 'Unverified',
  },
  disclaimer: 'This registry is maintained for transparency. Claims should be verified against official Mercury GP documentation. Last updated: 2025.',
  viewRegistry: 'View Data Registry',
} as const;

export type VerificationContent = typeof verificationEn;
