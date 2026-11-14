export type Lang = 'en' | 'ja';

export const t = {
  en: {
    nav: { units: 'Available units', buildings: 'Our buildings', eligibility: 'Eligibility', about: 'About', resident: 'Resident login', apply: 'Apply now' },
    banner: 'Makiki Banyan opens January 2027 — 90 new apartments.',
    bannerCta: 'Get on the list →',
    hero: {
      eyebrow: 'Honolulu · Workforce rentals',
      h1: 'A home in town, at a rent that makes sense.',
      lede: 'New, professionally managed apartments in Makiki, Punchbowl and Moʻiliʻili, reserved for Oʻahu households earning up to 80% of area median income.',
      cta1: 'See available units',
      cta2: 'Check if I qualify',
      proof: 'Built and managed by Oceans Real Estate under Honolulu’s Bill 7 program',
    },
    stats: { units: 'new apartments', buildings: 'new buildings', first: 'first move-ins' },
    units: { eyebrow: 'Now leasing', h2: 'Available units', live: 'Updated live from our leasing system', apply: 'Apply', mo: '/ mo', available: 'Available', waitlist: 'Join waitlist', none: 'Nothing open at the moment. Join the waitlist below and we’ll text you first.' },
    buildings: { eyebrow: 'Our buildings', h2: 'Built in Honolulu, for Honolulu.', lede: 'Every Anchor building was developed under the City’s Bill 7 workforce-housing program, which trades property-tax relief for a long-term promise: rents stay within reach of local working households.', apartments: 'apartments' },
    how: {
      eyebrow: 'Eligibility', h2: 'Do I qualify?',
      lede: 'Anchor apartments are for households earning at or below 80% of the Honolulu area median income, as published each year by HUD. Limits depend on how many people live with you.',
      cta: 'See this year’s income limits',
      steps: [
        ['Check your income', 'Compare your household’s gross income to the 80% AMI table for your household size.'],
        ['Apply online', 'Pick a unit and apply in about 15 minutes. Have pay stubs, ID and your last tax return ready.'],
        ['Certify & move in', 'We verify your income, sign the lease, and hand you the keys. Recertification is once a year.'],
      ],
    },
    waitlist: { h2: 'Nothing open right now?', lede: 'Join the waitlist and we’ll text you the moment a unit that fits your household comes up.', name: 'Name', phone: 'Mobile phone', cta: 'Join waitlist', consent: 'By joining you agree to receive text messages from Anchor Rentals about unit availability. Message frequency varies. Reply STOP to opt out, HELP for help. Message and data rates may apply.', done: 'You’re on the list. We’ll text you when something opens.' },
    about: { h2: 'Managed by the people who built it.', body: 'Anchor Rentals is the leasing and management brand of Oceans Real Estate, a Honolulu brokerage and developer that has been building workforce housing under Bill 7 since 2022. We manage what we build, so the person answering your maintenance request knows the building.' },
    footer: { legal: '© 2026 Anchor Rentals, a DBA of Oceans Real Estate LLC · RB-22133', eho: 'Equal Housing Opportunity', privacy: 'Privacy', lang: '日本語', langHref: '/ja/' },
  },
  ja: {
    nav: { units: '空室情報', buildings: '物件一覧', eligibility: '入居条件', about: '会社概要', resident: '入居者ログイン', apply: '申込み' },
    banner: 'マキキ・バンヤン 2027年1月オープン — 新築90戸',
    bannerCta: 'ウェイトリストに登録 →',
    hero: {
      eyebrow: 'ホノルル · ワークフォース住宅',
      h1: '街なかに、無理のない家賃の住まいを。',
      lede: 'マキキ、パンチボウル、モイリイリの新築アパート。世帯収入がエリア中央値（AMI）の80%以下のオアフ島在住世帯が対象です。',
      cta1: '空室を見る',
      cta2: '入居条件を確認',
      proof: 'ホノルル市Bill 7プログラムに基づき、オーシャンズ不動産が開発・管理',
    },
    stats: { units: '新築戸数', buildings: '新築棟数', first: '入居開始' },
    units: { eyebrow: '入居者募集中', h2: '空室情報', live: '管理システムと連動し自動更新', apply: '申込む', mo: '/ 月', available: '入居可能日', waitlist: 'ウェイトリスト登録', none: '現在空室はありません。下記ウェイトリストにご登録ください。' },
    buildings: { eyebrow: '物件一覧', h2: 'ホノルルで、ホノルルのために。', lede: 'アンカー・レンタルズの全物件は、ホノルル市のBill 7ワークフォース住宅プログラムのもとで開発されています。固定資産税の軽減と引き換えに、地元の働く世帯が手の届く家賃を長期的に維持します。', apartments: '戸', newBuild: '新築' },
    how: {
      eyebrow: '入居条件', h2: '入居できますか？',
      lede: 'アンカーの住戸の多くは、ホノルルのエリア中央所得（AMI）の80%以下の世帯が対象です。一部の物件では、限られた戸数を所得上限なしで募集しています。',
      cta: '今年の所得上限を見る',
      openTag: '所得制限なし',
      qualTag: '所得制限あり',
      steps: [
        ['所得を確認', '世帯の総所得を、世帯人数ごとの80% AMI表と比較します。'],
        ['オンラインで申込み', '物件を選び、約15分で申込み完了。給与明細、身分証、前年の確定申告書をご用意ください。'],
        ['認定・入居', '所得を確認し、賃貸契約を締結、鍵をお渡しします。再認定は年1回です。'],
      ],
    },
    waitlist: { h2: '今は空室がありませんか？', lede: 'ウェイトリストにご登録いただくと、条件に合う空室が出た時点でSMSでお知らせします。', name: 'お名前', phone: '携帯電話番号', cta: '登録する', consent: '登録により、アンカー・レンタルズから空室に関するSMSを受信することに同意したものとみなします。配信停止はSTOPと返信してください。通信料が発生する場合があります。', done: '登録が完了しました。空室が出次第ご連絡します。' },
    about: { h2: '建てた人が、管理する。', body: 'アンカー・レンタルズは、2022年以降Bill 7のもとでワークフォース住宅を手がけてきたホノルルの不動産会社、オーシャンズ不動産の賃貸・管理ブランドです。自社で建てた建物を自社で管理するため、修繕のご連絡に対応するスタッフが建物を熟知しています。' },
    footer: { legal: '© 2026 Anchor Rentals（Oceans Real Estate LLC のDBA）· RB-22133', eho: 'Equal Housing Opportunity', privacy: 'プライバシー', lang: 'English', langHref: '/' },
  },
} as const;

export function useT(lang: Lang) {
  return t[lang];
}
