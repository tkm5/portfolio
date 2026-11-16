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
          'Raspberry Pi 5(8GB RAM)＋NVMe SSD 2TB上にUbuntu Server 24.04 LTS arm64を載せ，Docker Composeに10サービスを定義し，シェルスクリプトとあわせてホームサーバーをInfrastructure as Codeとして構築した．スマートホームハブ，Time Machineバックアップ，Web変更検知，死活監視，Tailscaleによる外出先からの接続を単一筐体に同居させ，設定をGitで管理して再構築できるようにした．',
        ],
        en: [
          'Built a home server as Infrastructure-as-Code on a Raspberry Pi 5 (8GB RAM) with a 2TB NVMe SSD running Ubuntu Server 24.04 LTS arm64: 10 services defined in Docker Compose, plus shell scripts. Consolidates a smart-home hub, Time Machine backups, web change detection, uptime monitoring, and remote access over Tailscale into a single box, with configuration kept in Git so the environment can be rebuilt.',
        ],
      },
    },
    {
      title: { ja: 'アーキテクチャ', en: 'Architecture' },
      content: {
        ja: [
          'Docker Compose profiles（`phase1`〜`phase4`および`full`）で依存関係順に段階起動する構成にした．検証中は特定フェーズのみを立ち上げ，通常運用では`full`で全サービスを起動する．各フェーズにセットアップスクリプトを1対1で対応させ，フェーズごとに再実行できる．',
          'Bridge / Host の2種ネットワークを用途別に明示的に使い分けた．SMB・mDNS・Bluetoothを使うコンテナ（Samba，Homebridge，Home Assistant）はHostネットワークに配置し，それ以外のHTTP系はBridgeに隔離した．Homepageダッシュボードの`siteMonitor`は，Bridgeサービスはコンテナ名で，HostサービスはDocker bridgeのゲートウェイIPで解決する二層の命名規則を実装し，両方を1か所で監視できるようにした．',
          'Nginx Proxy ManagerのREST API（Bearerトークン）でプロキシホストを操作する手順を，リポジトリのドキュメントに記録した．AvahiのCNAMEパブリッシャー（`/etc/avahi/cname.d/services.conf`）で`<service>.local → ubuntu-pi.local`を動的発行し，家庭内DNSを汚さず全サービスに`.local`ドメインを付与した．',
        ],
        en: [
          'Uses Docker Compose profiles (`phase1`–`phase4` and `full`) to bring the stack up in dependency order. During validation only the relevant phase is started; in normal operation `full` starts every service. Each phase has a matching setup script, so each phase can be re-run.',
          "Bridge and Host networks are used deliberately for different roles. Containers with layer-2 requirements (Samba, Homebridge, Home Assistant — SMB, mDNS, Bluetooth) run on the host network; plain HTTP services are isolated on a bridge. The Homepage dashboard's `siteMonitor` resolves bridge services by container name and host services by the Docker bridge gateway IP, giving a single monitoring surface across both worlds.",
          'The procedure for managing Nginx Proxy Manager proxy hosts through its REST API (Bearer token) is documented in the repository. Avahi publishes CNAMEs (`/etc/avahi/cname.d/services.conf`) that map `<service>.local -> ubuntu-pi.local` on the fly, giving every service a `.local` hostname without polluting the household DNS.',
        ],
      },
      list: {
        ja: [
          'phase1 基盤: Nginx Proxy Manager / Docker Socket Proxy（Homepageを読み取り専用でソケット露出）/ Homepage / MkDocs Material',
          'phase2 ファイル: Samba（Time Machine，`vfs_fruit`を有効化）',
          'phase3 スマートホーム: Homebridge(HomeKit)/ Home Assistant（`privileged` + host net + D-Bus）',
          'phase4 監視: Playwright Chrome（JS描画）/ Changedetection.io / Uptime Kuma',
          'ホスト直接導入: Tailscale（Exit Node・サブネットルート）/ Rclone（cron日次バックアップ）',
        ],
        en: [
          'phase1 platform: Nginx Proxy Manager / Docker Socket Proxy (read-only socket exposure for Homepage) / Homepage / MkDocs Material',
          'phase2 files: Samba (Time Machine, `vfs_fruit` enabled)',
          'phase3 smart home: Homebridge (HomeKit) / Home Assistant (`privileged` + host network + D-Bus)',
          'phase4 monitoring: Playwright Chrome (JS rendering) / Changedetection.io / Uptime Kuma',
          'Installed directly on the host: Tailscale (exit node and subnet route) / Rclone (daily cron backup)',
        ],
      },
    },
    {
      title: { ja: '運用・可観測性', en: 'Operations & Observability' },
      content: {
        ja: [
          '`phase0-prereq.sh`から`phase4-utility.sh`までのスクリプトは，インストールや設定ファイルの作成の前に既存の状態を確認し，再実行しても重複しない．',
          '`verify-all.sh`で12項目（Docker，8サービスのHTTP応答またはコンテナの状態，Samba，Tailscale，Rclone）を確認し，1件でも失敗すれば終了コード1を返す．',
          'Rcloneのcronで毎日Google Driveへバックアップするようにした（`--bwlimit 5M`で帯域を制限）．永続データはGit管理外の`~/data/`，設定は`configs/`に分けた．',
        ],
        en: [
          'The scripts from `phase0-prereq.sh` through `phase4-utility.sh` check the existing state before installing packages or writing config files, so re-runs do not duplicate work.',
          '`verify-all.sh` runs 12 checks (Docker; the HTTP response or container state of 8 services; Samba; Tailscale; Rclone) and exits with code 1 if any fails.',
          'A daily Rclone cron job backs up to Google Drive (bandwidth capped with `--bwlimit 5M`). Persistent data lives in the git-ignored `~/data/`, separate from configuration in `configs/`.',
        ],
      },
    },
    {
      title: { ja: 'ハードウェアとOSの導入', en: 'Hardware and OS Setup' },
      content: {
        ja: [
          'OSの導入もstep1〜step7のスクリプトにした．SHA256で検証したUbuntuのイメージをNVMeに書き込み，cloud-initで初期設定し，EEPROMのブート順をNVMe優先にする．',
        ],
        en: [
          'OS installation is scripted as step1 to step7: a SHA256-verified Ubuntu image is written to NVMe, cloud-init applies the initial settings, and the EEPROM boot order puts NVMe first.',
        ],
      },
    },
  ],
  technologies: [
    'Raspberry Pi 5',
    'Ubuntu Server 24.04',
    'Docker',
    'Docker Compose',
    'Nginx Proxy Manager',
    'Samba (vfs_fruit)',
    'Homebridge',
    'Home Assistant',
    'Tailscale',
    'Rclone',
    'Avahi (mDNS)',
    'MkDocs Material',
    'Changedetection.io',
    'Playwright',
    'Uptime Kuma',
    'Bash',
    'IaC',
  ],
};
