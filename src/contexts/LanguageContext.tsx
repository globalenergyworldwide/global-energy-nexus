import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar' | 'de' | 'fr' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.refinery': 'Refinery',
    'nav.surveying': 'Surveying',
    'nav.export': 'Export/Import',
    'nav.p2p': 'P2P Platform',
    'nav.shop': 'Shop',
    'nav.investors': 'Investors',
    'nav.contact': 'Contact',
    'nav.signin': 'Sign In',
    'nav.dashboard': 'Dashboard',
    'nav.signout': 'Sign Out',
    'hero.title': 'Fueling the Future Through',
    'hero.subtitle': 'Innovation & Global Connection',
    'hero.description': 'Leading international oil and energy operations with cutting-edge technology, sustainable practices, and a global P2P trading network.',
    'btn.explore': 'Explore Our Operations',
    'btn.p2p': 'P2P Energy Exchange',
    'btn.getstarted': 'Get Started Today',
    'btn.learnmore': 'Learn More',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.refinery': 'المصفاة',
    'nav.surveying': 'المسح',
    'nav.export': 'التصدير/الاستيراد',
    'nav.p2p': 'منصة P2P',
    'nav.shop': 'المتجر',
    'nav.investors': 'المستثمرون',
    'nav.contact': 'اتصل بنا',
    'nav.signin': 'تسجيل الدخول',
    'nav.dashboard': 'لوحة التحكم',
    'nav.signout': 'تسجيل الخروج',
    'hero.title': 'دفع المستقبل من خلال',
    'hero.subtitle': 'الابتكار والاتصال العالمي',
    'hero.description': 'رائدة في عمليات النفط والطاقة الدولية مع تكنولوجيا متطورة وممارسات مستدامة وشبكة تداول P2P عالمية.',
    'btn.explore': 'استكشف عملياتنا',
    'btn.p2p': 'بورصة الطاقة P2P',
    'btn.getstarted': 'ابدأ اليوم',
    'btn.learnmore': 'اعرف المزيد',
  },
  de: {
    'nav.home': 'Startseite',
    'nav.about': 'Über uns',
    'nav.refinery': 'Raffinerie',
    'nav.surveying': 'Vermessung',
    'nav.export': 'Export/Import',
    'nav.p2p': 'P2P-Plattform',
    'nav.shop': 'Shop',
    'nav.investors': 'Investoren',
    'nav.contact': 'Kontakt',
    'nav.signin': 'Anmelden',
    'nav.dashboard': 'Dashboard',
    'nav.signout': 'Abmelden',
    'hero.title': 'Die Zukunft gestalten durch',
    'hero.subtitle': 'Innovation & globale Verbindung',
    'hero.description': 'Führend im internationalen Öl- und Energiegeschäft mit modernster Technologie, nachhaltigen Praktiken und einem globalen P2P-Handelsnetzwerk.',
    'btn.explore': 'Erkunden Sie unsere Geschäftstätigkeit',
    'btn.p2p': 'P2P-Energiebörse',
    'btn.getstarted': 'Jetzt loslegen',
    'btn.learnmore': 'Mehr erfahren',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.refinery': 'Raffinerie',
    'nav.surveying': 'Arpentage',
    'nav.export': 'Export/Import',
    'nav.p2p': 'Plateforme P2P',
    'nav.shop': 'Boutique',
    'nav.investors': 'Investisseurs',
    'nav.contact': 'Contact',
    'nav.signin': 'Se connecter',
    'nav.dashboard': 'Tableau de bord',
    'nav.signout': 'Se déconnecter',
    'hero.title': 'Alimenter l\'avenir grâce à',
    'hero.subtitle': 'L\'innovation et la connexion mondiale',
    'hero.description': 'Leader des opérations pétrolières et énergétiques internationales avec une technologie de pointe, des pratiques durables et un réseau commercial P2P mondial.',
    'btn.explore': 'Explorez nos opérations',
    'btn.p2p': 'Bourse d\'énergie P2P',
    'btn.getstarted': 'Commencer aujourd\'hui',
    'btn.learnmore': 'En savoir plus',
  },
  zh: {
    'nav.home': '首页',
    'nav.about': '关于我们',
    'nav.refinery': '炼油厂',
    'nav.surveying': '勘测',
    'nav.export': '进出口',
    'nav.p2p': 'P2P平台',
    'nav.shop': '商店',
    'nav.investors': '投资者',
    'nav.contact': '联系我们',
    'nav.signin': '登录',
    'nav.dashboard': '仪表板',
    'nav.signout': '登出',
    'hero.title': '通过以下方式推动未来',
    'hero.subtitle': '创新与全球连接',
    'hero.description': '凭借尖端技术、可持续实践和全球P2P贸易网络，引领国际石油和能源业务。',
    'btn.explore': '探索我们的业务',
    'btn.p2p': 'P2P能源交易所',
    'btn.getstarted': '立即开始',
    'btn.learnmore': '了解更多',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
