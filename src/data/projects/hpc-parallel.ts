import type { Project } from '@/types';

export const hpcParallel: Project = {
  slug: 'hpc-parallel',
  title: {
    ja: 'HPC環境における並列計算アルゴリズムの実装と高速化',
    en: 'Implementation and Acceleration of Parallel Computing Algorithms in HPC Environment',
  },
  meta: {
    ja: '個人プロジェクト',
    en: 'Personal Project',
  },
  description: 'Implementation and Acceleration of Parallel Computing Algorithms in HPC Environment',
  sections: [
    {
      title: { ja: '概要', en: 'Overview' },
      content: {
        ja: [
          'HPC（High-Performance Computing）環境下での大規模科学技術計算を想定し，疎行列演算の高速化に挑戦．',
        ],
        en: [
          'Challenged sparse matrix computation acceleration assuming large-scale scientific computing in HPC (High-Performance Computing) environments.',
        ],
      },
    },
    {
      title: { ja: '詳細', en: 'Details' },
      content: {
        ja: [
          '共有メモリ型並列処理（OpenMP）と分散メモリ型並列処理（MPI）の双方を駆使し，並列計算アルゴリズムをC/C++で実装．',
          '実装の第一段階として，モンテカルロ法による円周率計算の並列化を通じて並列プログラミングの基礎を習得．',
          'その後，計算機科学における典型的な難題である疎行列計算に応用し，データ構造の分割，プロセス間の通信オーバーヘッドの最小化，計算負荷の均等化（ロードバランシング）といった低レイヤーな課題に直接取り組み，計算処理の高速化を達成．',
        ],
        en: [
          'Implemented parallel computing algorithms in C/C++ utilizing both shared memory parallel processing (OpenMP) and distributed memory parallel processing (MPI).',
          'As the first stage of implementation, mastered the fundamentals of parallel programming through parallelization of pi calculation using the Monte Carlo method.',
          'Subsequently applied to sparse matrix computation, a typical challenge in computer science, directly tackling low-layer challenges such as data structure partitioning, minimization of inter-process communication overhead, and load balancing to achieve computational acceleration.',
        ],
      },
    },
  ],
  technologies: ['C', 'C++', 'MPI', 'OpenMP', 'HPC', 'Parallel Computing', 'Linux'],
};
