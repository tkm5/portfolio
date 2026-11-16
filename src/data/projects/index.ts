import type { Project } from '@/types';

import { businessAnalysisPipeline } from './business-analysis-pipeline';
import { insuranceAi } from './insurance-ai';
import { governmentSimilarity } from './government-similarity';
import { operationsTransformation } from './operations-transformation';
import { chatSystem } from './chat-system';
import { aiTutorPoc } from './ai-tutor-poc';
import { realEstateDataPlatform } from './real-estate-data-platform';
import { codingAgentTooling } from './coding-agent-tooling';
import { devcontainer } from './devcontainer';
import { homeServer } from './home-server';
import { transcriptionApp } from './transcription-app';
import { hpcParallel } from './hpc-parallel';

export const projects: Project[] = [
  insuranceAi,
  businessAnalysisPipeline,
  operationsTransformation,
  chatSystem,
  governmentSimilarity,
  aiTutorPoc,
  realEstateDataPlatform,
  codingAgentTooling,
  transcriptionApp,
  devcontainer,
  homeServer,
  hpcParallel,
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
