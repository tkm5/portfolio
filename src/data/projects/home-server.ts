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
          'Raspberry Pi 5（8GB RAM）＋NVMe SSD 2TB上にUbuntu Server 24.04 LTS arm64を載せ，Docker Composeとシェルスクリプトで10コンテナ規模のホームサーバーをInfrastructure as Codeとして構築．スマートホームハブ，Time Machineバックアップ，Web変更検知，死活監視，社外VPN接続までを単一筐体で同居させ，設定は全てGit管理することで再構築コストを最小化した．',
        ],
        en: [
          'Built a 10-container home server as Infrastructure-as-Code on a Raspberry Pi 5 (8GB RAM) with a 2TB NVMe SSD running Ubuntu Server 24.04 LTS arm64, using Docker Compose and shell scripts. Consolidates smart-home hub, Time Machine backups, web change detection, uptime monitoring, and an off-site VPN into a single box, with all configuration Git-managed so the environment can be rebuilt from scratch cheaply.',
        ],
      },
    },
    {
      title: { ja: 'アーキテクチャ', en: 'Architecture' },
      content: {
        ja: [
          'Docker Compose profiles（`phase1`〜`phase4`および`full`）で依存関係順に段階起動する構成を採用．検証中は特定フェーズのみを立ち上げ，本番運用時は`full`で一括起動という運用パスを設計．各フェーズに冪等なセットアップスクリプトを1対1で対応させ，再現性を担保した．',
          'Bridge / Host の2種ネットワークを用途別に明示的に使い分け．SMB，mDNS，Bluetoothなど L2的要件を持つコンテナ（Samba，Homebridge，Home Assistant）はHostネットワークに配置し，それ以外のHTTP系はBridgeに隔離．Homepageダッシュボードの`siteMonitor`は，Bridgeサービスはコンテナ名で，HostサービスはDocker bridgeのゲートウェイIPで解決する二層の命名規則を実装して統一的に監視している．',
          'Nginx Proxy Managerには REST APIを Bearerトークンで叩き，プロキシホストを宣言的に構成．手作業で設定した状態をAPIから読み取って`configs/`へ書き出すことで，WebUIでの変更も最終的にIaC側へ吸い上げられる流れにした．AvahiのCNAMEパブリッシャー（`/etc/avahi/cname.d/services.conf`）で`<service>.local → ubuntu-pi.local`を動的発行し，家庭内DNSを汚さず全サービスに`.local`ドメインを付与．',
        ],
        en: [
          'Uses Docker Compose profiles (`phase1`–`phase4` and `full`) to bring the stack up in dependency order. During validation only the relevant phase is started; in production `full` starts everything at once. Each phase has a matching idempotent setup script, so the state can always be reproduced from the repo.',
          "Bridge and Host networks are used deliberately for different roles. Containers with layer-2 requirements (Samba, Homebridge, Home Assistant — SMB, mDNS, Bluetooth) run on the host network; plain HTTP services are isolated on a bridge. The Homepage dashboard's `siteMonitor` resolves bridge services by container name and host services by the Docker bridge gateway IP, giving a single monitoring surface across both worlds.",
          'Proxy hosts on Nginx Proxy Manager are configured declaratively by hitting its REST API with a Bearer token; state touched through the web UI is read back and written into `configs/`, so ad-hoc changes still land in IaC. Avahi publishes CNAMEs (`/etc/avahi/cname.d/services.conf`) that map `<service>.local -> ubuntu-pi.local` on the fly, giving every service a `.local` hostname without polluting the household DNS.',
        ],
      },
      list: {
        ja: [
          'phase1 基盤: Nginx Proxy Manager / Docker Socket Proxy（Homepageを読み取り専用でソケット露出）/ Homepage / MkDocs Material',
          'phase2 ファイル: Samba（Time Machine，`vfs_fruit`完全対応）',
          'phase3 スマートホーム: Homebridge（HomeKit + Tesla連携）/ Home Assistant（`privileged` + host net + D-Bus）',
          'phase4 監視: Playwright Chrome（JS描画）/ Changedetection.io / Uptime Kuma',
          'ホスト直接導入: Tailscale（Exit Node）/ AdGuard Home（systemd-resolvedスタブリスナー無効化で共存）/ Rclone（cron日次バックアップ）',
        ],
        en: [
          'phase1 platform: Nginx Proxy Manager / Docker Socket Proxy (read-only socket exposure for Homepage) / Homepage / MkDocs Material',
          'phase2 files: Samba (Time Machine with full `vfs_fruit` support)',
          'phase3 smart home: Homebridge (HomeKit + Tesla integration) / Home Assistant (`privileged` + host network + D-Bus)',
          'phase4 monitoring: Playwright Chrome (JS rendering) / Changedetection.io / Uptime Kuma',
          'Installed directly on the host: Tailscale (Exit Node) / AdGuard Home (coexists with systemd-resolved by disabling the stub listener) / Rclone (daily cron backup)',
        ],
      },
    },
    {
      title: { ja: '運用・可観測性', en: 'Operations & Observability' },
      content: {
        ja: [
          '`phase0-prereq.sh`から`phase4-utility.sh`までの全シェルスクリプトを冪等に設計．再実行しても差分のみ適用されるよう，`systemctl enable --now`や`docker compose up -d`の前に状態チェックを組み込み，配線ミスからの復旧を高速化した．',
          '`verify-all.sh`で13項目のヘルスチェック（ポート疎通・コンテナステータス・mDNS解決・SMB接続・Home Assistant API疎通等）を集約．デプロイ直後に一括検証し，どのレイヤーで問題が起きているかを即座に切り分けられる運用体制を構築．',
          'Rcloneが毎日3:00に`homeassistant`と`timemachine`をGoogle Driveへ5MB/s制限で同期．上流帯域を圧迫せず，かつローカルとクラウドの二重化によるディザスタリカバリを実現．データは`~/data/`（`.gitignore`）に集約し設定（`configs/`）と物理的に分離することで，誤バックアップを防いだ．',
        ],
        en: [
          'All shell scripts from `phase0-prereq.sh` through `phase4-utility.sh` are idempotent. State checks are inserted before `systemctl enable --now` and `docker compose up -d`, so re-runs only apply deltas and recovery from misconfiguration is fast.',
          '`verify-all.sh` runs 13 health checks in one shot — port reachability, container status, mDNS resolution, SMB connectivity, Home Assistant API — making it trivial to pinpoint which layer is failing right after a deploy.',
          'Rclone syncs `homeassistant` and `timemachine` to Google Drive at 03:00 daily, throttled to 5 MB/s to avoid saturating upstream bandwidth, giving on-box + cloud redundancy. Persistent data lives under `~/data/` (`.gitignored`), physically separated from config under `configs/` so backups never pull in source artifacts.',
        ],
      },
    },
    {
      title: { ja: 'ハードウェア最適化', en: 'Hardware Tuning' },
      content: {
        ja: [
          '`/boot/firmware/config.txt`に`dtparam=pcie1_gen=3`を追記してPCIe Gen3を有効化．NVMe SSDのスループットを約450MB/s → 900MB/sへ倍増させ，Time Machineのバックアップ時間を実効的に半減．さらにEEPROMを最新化して NVMeブートの安定性を確保した．',
          'AdGuard Homeが UDP/53を占有する必要があるため，`systemd-resolved`のスタブリスナーを`/etc/systemd/resolved.conf`から無効化し`/etc/resolv.conf`をAdGuardへ向けることで，OS標準DNSと宅内DNSフィルタの競合を解消．',
        ],
        en: [
          'Enabled PCIe Gen3 by appending `dtparam=pcie1_gen=3` to `/boot/firmware/config.txt`, roughly doubling NVMe SSD throughput (~450 MB/s -> ~900 MB/s) and effectively halving Time Machine backup times. The EEPROM was also flashed to the latest release to keep NVMe boot stable.',
          'Because AdGuard Home needs UDP/53, the `systemd-resolved` stub listener is disabled via `/etc/systemd/resolved.conf` and `/etc/resolv.conf` is pointed at AdGuard, eliminating the port conflict between the OS default resolver and the household DNS filter.',
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
    'AdGuard Home',
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
