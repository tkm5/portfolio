'use client';

import { useLocale } from 'next-intl';
import { TopNav, Footer } from '@/components/layout';
import { BackLink } from '@/components/ui';

export function ImprintContent() {
  const locale = useLocale();
  const basePath = locale === 'ja' ? '/ja' : '';

  const content = {
    ja: {
      sitePolicyIntro:
        '本ウェブサイト（https://takumig.black 以下のディレクトリ，以下「本サイト」）をご利用いただく前に，以下の条件をよくお読みください．',
      disclaimer: '免責事項',
      disclaimerText:
        '本サイトに掲載される情報については細心の注意を払っておりますが，その正確性や完全性を保証するものではありません．本サイトに掲載される情報は予告なく変更される場合があります．本サイトの情報やコンテンツの利用により直接的または間接的に生じたいかなる損害についても，責任を負いません．',
      copyright: '著作権・商標',
      copyrightText:
        '本サイトに掲載されているテキスト，イラスト，ロゴ，写真，動画，ソフトウェア，その他の情報の著作権は，takumigまたは第三者に帰属します．著作権法で認められた個人的使用や研究等を除き，著作権者の事前の許可なく，無断転載やその他の形式での使用（複製，改変，配布，公衆送信を含む）はできません．',
      prohibited: '禁止行為',
      prohibitedText:
        '本サイトに掲載された個人情報を含む情報を，他者の名誉や信用を毀損する形で使用することを禁じます．',
      jurisdiction: '準拠法・管轄',
      jurisdictionText:
        '本サイトの利用は，別途規定がない限り，日本法に準拠します．本サイトに関する紛争は，東京地方裁判所を第一審の専属的合意管轄裁判所とします．',
      link: 'リンク',
      linkText:
        '本サイトへのリンクは，営利・非営利を問わず原則として自由です．ただし，takumigや他の企業・個人を誹謗中傷するコンテンツを含むサイトや，著作権等の権利を侵害するサイトからのリンクはご遠慮ください．',
      basicRule: '基本方針',
      basicRuleText:
        '本サイトでは，サービスの円滑な運営に必要な範囲でユーザーの情報（以下「個人情報」）を収集する場合があり，収集した個人情報は利用目的の範囲内で適切に取り扱います．',
      scope: '個人情報の範囲',
      scopeText:
        '個人情報とは，個人に関する情報であり，氏名，メールアドレス等の特定の個人を識別できる情報を指します．',
      purpose: '利用目的',
      purposeText:
        '法令に別段の定めがない限り，個人情報はサービスの提供，確認のための連絡，質問への回答等，円滑な運営のために使用します．',
      restriction: '利用・提供の制限',
      restrictionText:
        '収集した個人情報は，法令により開示が求められる場合や，不正アクセス，脅迫等の違法行為がある場合，その他正当な理由がある場合を除き，上記の利用目的以外に使用したり，第三者に提供したりすることはありません．',
      security: 'セキュリティ対策',
      securityText:
        '収集した個人情報の漏洩，紛失，破壊を防止し，その他収集した情報を適切に管理するために必要な措置を講じます．',
      change: 'プライバシーポリシーの変更',
      changeText: '本プライバシーポリシーは，必要に応じて変更される場合があります．',
    },
    en: {
      sitePolicyIntro:
        "Before using this website (i.e. directory following https://takumig.black; hereinafter referred to as the 'Website'), please read the following conditions carefully.",
      disclaimer: 'Disclaimer',
      disclaimerText:
        'Though extreme care is used in posting information on the Website, it does not warrant the accuracy or completeness of the information. The information posted on the Website may change without prior notice. No liability is assumed for any damage or loss which may directly or indirectly arise out of your use of any information or contents contained on the Website.',
      copyright: 'Copyright and Trademark',
      copyrightText:
        'The copyright to texts, illustrations, logos, photos, moving images, software and any other information posted on the Website is vested in takumig or third party. Unless permitted by the Copyright Act for personal use, research and the like, such information shall not be used without prior permission of the copyright holder.',
      prohibited: 'Prohibited Acts',
      prohibitedText:
        'Any information, including personal information, posted on the Website shall not be used in any form which may dishonor or discredit anybody.',
      jurisdiction: 'Governing Law and Jurisdiction',
      jurisdictionText:
        'Unless otherwise provided herein, the use of the Website shall be governed by the laws of Japan. Any dispute relating to this Website shall be submitted to the agreed exclusive jurisdiction of the Tokyo District court for the first instance.',
      link: 'Link',
      linkText:
        'In principle, you are free to provide a link to the Website, irrespective of whether for profit or not. However, please refrain from setting a link from websites that contain contents intended to defame or discredit, or that infringe copyrights or other rights.',
      basicRule: 'Basic Rule',
      basicRuleText:
        "This Website may collect information of users (hereinafter referred to as 'Personal Information') to the extent necessary for smooth operations of services and will appropriately handle the collected Personal Information within the scope of purpose of use.",
      scope: 'Scope of Personal Information',
      scopeText:
        'Personal Information is the information that pertains to an individual person and may identify a particular individual person, e.g. name, email address and the like.',
      purpose: 'Purpose of Use',
      purposeText:
        'Unless otherwise provided in the laws and regulations, Personal Information may be used for the purpose of smooth operations, including without limitation the provision of services, communication for confirmation or response to questions.',
      restriction: 'Restriction on Use and Provision',
      restrictionText:
        'Collected Personal Information shall not be used or provided to third party for any purpose other than the purpose of use stated above, unless required by laws and regulations or if there is unauthorized access, threatening or other illegal act or there is any other justifiable reason.',
      security: 'Security Measures',
      securityText:
        'Measures necessary to prevent the collected Personal Information from being divulged, lost or destroyed and to appropriately maintain other collected information will be taken.',
      change: 'Change in Privacy Policy',
      changeText: 'This Privacy Policy is subject to change, when needed.',
    },
  };

  const c = locale === 'ja' ? content.ja : content.en;

  return (
    <>
      <TopNav />
      <div className="lg:pl-[180px]">
        <main className="max-w-content mx-auto px-6 py-16 pt-[calc(60px+4rem)]">
          <BackLink href={`${basePath}/`} labelKey="backToHome" />

          <h1 className="text-xl md:text-2xl font-normal mb-8">Imprint</h1>

          <div className="imprint-content">
            <h2 className="text-lg font-normal mt-10 mb-4">Site Policy</h2>
            <p className="text-sm text-muted mb-4">{c.sitePolicyIntro}</p>

            <h3 className="text-base font-normal mt-6 mb-2">{c.disclaimer}</h3>
            <p className="text-sm text-muted mb-4">{c.disclaimerText}</p>

            <h3 className="text-base font-normal mt-6 mb-2">{c.copyright}</h3>
            <p className="text-sm text-muted mb-4">{c.copyrightText}</p>

            <h3 className="text-base font-normal mt-6 mb-2">{c.prohibited}</h3>
            <p className="text-sm text-muted mb-4">{c.prohibitedText}</p>

            <h3 className="text-base font-normal mt-6 mb-2">{c.jurisdiction}</h3>
            <p className="text-sm text-muted mb-4">{c.jurisdictionText}</p>

            <h3 className="text-base font-normal mt-6 mb-2">{c.link}</h3>
            <p className="text-sm text-muted mb-4">{c.linkText}</p>

            <h2 className="text-lg font-normal mt-10 mb-4">Privacy Policy</h2>

            <h3 className="text-base font-normal mt-6 mb-2">{c.basicRule}</h3>
            <p className="text-sm text-muted mb-4">{c.basicRuleText}</p>

            <h3 className="text-base font-normal mt-6 mb-2">{c.scope}</h3>
            <p className="text-sm text-muted mb-4">{c.scopeText}</p>

            <h3 className="text-base font-normal mt-6 mb-2">{c.purpose}</h3>
            <p className="text-sm text-muted mb-4">{c.purposeText}</p>

            <h3 className="text-base font-normal mt-6 mb-2">{c.restriction}</h3>
            <p className="text-sm text-muted mb-4">{c.restrictionText}</p>

            <h3 className="text-base font-normal mt-6 mb-2">{c.security}</h3>
            <p className="text-sm text-muted mb-4">{c.securityText}</p>

            <h3 className="text-base font-normal mt-6 mb-2">{c.change}</h3>
            <p className="text-sm text-muted mb-4">{c.changeText}</p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
