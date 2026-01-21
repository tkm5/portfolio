import type { Project } from '@/types';

export const homeServer: Project = {
  slug: 'home-server',
  title: {
    ja: 'コンテナベースの多機能ホームサーバー',
    en: 'Container-Based Multi-Function Home Server',
  },
  meta: {
    ja: '個人プロジェクト',
    en: 'Personal Project',
  },
  description: 'Container-Based Multi-Function Home Server',
  sections: [
    {
      title: { ja: '概要', en: 'Overview' },
      content: {
        ja: [
          'Raspberry Pi上にDocker/Docker Composeを使用し，HomebridgeによるスマートホームハブおよびNetatalk/Avahiを用いたTime Machineサーバーを並行稼働する環境を構築．',
        ],
        en: [
          'Built an environment on Raspberry Pi using Docker/Docker Compose, running a smart home hub with Homebridge and a Time Machine server using Netatalk/Avahi in parallel.',
        ],
      },
    },
    {
      title: { ja: '詳細', en: 'Details' },
      content: {
        ja: [
          'コンテナネットワークの最適化や自動再起動・ヘルスチェック設定，ディレクトリをボリュームマウントさせることによるデータの永続化を実施．',
          '各種家電の一元管理と信頼性の高いデータバックアップ環境を単一サーバー上で両立．',
        ],
        en: [
          'Implemented container network optimization, automatic restart and health check configurations, and data persistence through directory volume mounting.',
          'Achieved unified management of various home appliances and a reliable data backup environment on a single server.',
        ],
      },
    },
  ],
  technologies: [
    'Raspberry Pi',
    'Docker',
    'Docker Compose',
    'Homebridge',
    'Netatalk',
    'Time Machine',
    'Linux',
  ],
};
