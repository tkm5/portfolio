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
          'Raspberry Pi 5（8GB RAM, NVMe SSD 2TB）上にUbuntu Server 24.04とDocker Composeで10コンテナ規模のホームサーバーをIaCとして構築．',
        ],
        en: [
          'Built a 10-container home server as Infrastructure-as-Code on a Raspberry Pi 5 (8GB RAM, NVMe SSD 2TB) running Ubuntu Server 24.04 with Docker Compose.',
        ],
      },
    },
    {
      title: { ja: '詳細', en: 'Details' },
      content: {
        ja: [
          'Nginx Proxy Manager，SambaによるTime Machineバックアップ，Homebridge / Home Assistantによるスマートホーム統合，Changedetection / Uptime Kumaによる監視を5プロファイルで段階起動．',
          'Tailscale・AdGuard Home・RcloneはホストOSへ直接導入し，設定は全てGit管理，永続データは分離する構成とした．',
          '冪等なphaseスクリプトと13項目のヘルスチェックにより再現性の高い運用を実現．PCIe Gen3有効化によりNVMe SSDの速度を約2倍化．',
        ],
        en: [
          'Nginx Proxy Manager, Samba-based Time Machine backups, smart home integration via Homebridge and Home Assistant, and monitoring with Changedetection and Uptime Kuma are brought up in stages via five Docker Compose profiles.',
          'Tailscale, AdGuard Home and Rclone run directly on the host OS; configuration is fully Git-managed and kept separate from persistent data.',
          'Idempotent phase scripts and a 13-item health check deliver reproducible operations; enabling PCIe Gen3 roughly doubles NVMe SSD throughput.',
        ],
      },
    },
  ],
  technologies: [
    'Raspberry Pi 5',
    'Ubuntu 24.04',
    'Docker',
    'Docker Compose',
    'Nginx Proxy Manager',
    'Samba',
    'Homebridge',
    'Home Assistant',
    'Tailscale',
    'AdGuard Home',
    'IaC',
  ],
};
