import type { Project } from '@/types';

import { businessAnalysisPipeline } from './business-analysis-pipeline';
import { slmMlops } from './slm-mlops';
import { insuranceAi } from './insurance-ai';
import { governmentRag } from './government-rag';
import { chatSystem } from './chat-system';
import { creativeCanvas } from './creative-canvas';
import { pharmaAnalytics } from './pharma-analytics';
import { aiAgent } from './ai-agent';
import { gasPaymentTable } from './gas-payment-table';
import { devcontainer } from './devcontainer';
import { homeServer } from './home-server';
import { transcriptionApp } from './transcription-app';
import { hpcParallel } from './hpc-parallel';

export const projects: Project[] = [
  businessAnalysisPipeline,
  slmMlops,
  insuranceAi,
  governmentRag,
  chatSystem,
  creativeCanvas,
  pharmaAnalytics,
  aiAgent,
  gasPaymentTable,
  devcontainer,
  homeServer,
  transcriptionApp,
  hpcParallel,
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
