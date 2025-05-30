
export type Language = 'en' | 'fr' | 'no';

export interface TranslationKeys {
  // Navigation
  'nav.dashboard': string;
  'nav.workOrders': string;
  'nav.procedures': string;
  'nav.inventory': string;
  'nav.assets': string;
  'nav.purchaseOrders': string;
  'nav.reporting': string;
  'nav.users': string;
  'nav.organization': string;
  'nav.subscriptions': string;
  'nav.requests': string;
  'nav.meters': string;
  'nav.locations': string;
  'nav.messages': string;

  // Authentication
  'auth.login': string;
  'auth.signup': string;
  'auth.signOut': string;
  'auth.email': string;
  'auth.password': string;
  'auth.confirmPassword': string;
  'auth.fullName': string;
  'auth.welcomeBack': string;
  'auth.signInToAccount': string;
  'auth.noAccount': string;
  'auth.createAccount': string;
  'auth.joinSupplyMantix': string;
  'auth.alreadyHaveAccount': string;
  'auth.getStarted': string;
  'auth.forgotPassword': string;

  // Landing page
  'landing.hero.title': string;
  'landing.hero.subtitle': string;
  'landing.hero.getStarted': string;
  'landing.hero.watchDemo': string;
  'landing.features.title': string;
  'landing.features.subtitle': string;
  'landing.benefits.title': string;
  'landing.benefits.subtitle': string;
  'landing.cta.title': string;
  'landing.cta.subtitle': string;
  'landing.cta.startTrial': string;
  'landing.cta.scheduleDemo': string;

  // Common
  'common.search': string;
  'common.save': string;
  'common.cancel': string;
  'common.delete': string;
  'common.edit': string;
  'common.create': string;
  'common.loading': string;
  'common.error': string;
  'common.success': string;
  'common.profile': string;
  'common.settings': string;
  'common.notifications': string;
}

export type Translations = Record<Language, TranslationKeys>;
