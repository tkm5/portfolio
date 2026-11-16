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
          'C/C++でOpenMPとMPIを使い，疎行列演算の高速化に取り組んだ．',
        ],
        en: [
          'Worked on speeding up sparse matrix computation in C/C++ with OpenMP and MPI.',
        ],
      },
    },
    {
      title: { ja: '詳細', en: 'Details' },
      content: {
        ja: [
          '共有メモリ型並列処理(OpenMP)と分散メモリ型並列処理(MPI)の双方を駆使し，並列計算アルゴリズムをC/C++で実装した．',
          '実装の第一段階として，モンテカルロ法による円周率計算の並列化を通じて並列プログラミングの基礎を習得した．',
          'その後，疎行列計算に応用し，データの分割，プロセス間の通信オーバーヘッド，計算負荷の均等化（ロードバランシング）に取り組んで高速化した．',
        ],
        en: [
          'Implemented parallel computing algorithms in C/C++ utilizing both shared memory parallel processing (OpenMP) and distributed memory parallel processing (MPI).',
          'As the first stage of implementation, mastered the fundamentals of parallel programming through parallelization of pi calculation using the Monte Carlo method.',
          'Then applied this to sparse matrix computation, working on data partitioning, inter-process communication overhead, and load balancing to speed it up.',
        ],
      },
    },
  ],
  technologies: ['C', 'C++', 'MPI', 'OpenMP', 'HPC', 'Parallel Computing'],
};
