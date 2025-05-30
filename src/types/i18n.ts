
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
  'nav.translations': string;

  // Sidebar groups
  'sidebar.operations': string;
  'sidebar.resources': string;
  'sidebar.collaboration': string;
  'sidebar.administration': string;

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
  'landing.features.description': string;
  'landing.features.workOrders.title': string;
  'landing.features.workOrders.description': string;
  'landing.features.inventory.title': string;
  'landing.features.inventory.description': string;
  'landing.features.maintenance.title': string;
  'landing.features.maintenance.description': string;
  'landing.features.procurement.title': string;
  'landing.features.procurement.description': string;
  'landing.features.procedures.title': string;
  'landing.features.procedures.description': string;
  'landing.features.analytics.title': string;
  'landing.features.analytics.description': string;
  'landing.benefits.title': string;
  'landing.benefits.subtitle': string;
  'landing.benefits.improvement.title': string;
  'landing.benefits.improvement.description': string;
  'landing.benefits.standardize.title': string;
  'landing.benefits.standardize.description': string;
  'landing.benefits.performance.title': string;
  'landing.benefits.performance.description': string;
  'landing.cta.title': string;
  'landing.cta.subtitle': string;
  'landing.cta.startTrial': string;
  'landing.cta.scheduleDemo': string;
  'landing.cta.freeTrial': string;
  'landing.cta.noCard': string;
  'landing.cta.cancelAnytime': string;

  // Admin panel
  'admin.translations': string;
  'admin.translations.title': string;
  'admin.translations.subtitle': string;
  'admin.translations.language': string;
  'admin.translations.key': string;
  'admin.translations.value': string;
  'admin.translations.search': string;
  'admin.translations.filter': string;
  'admin.translations.all': string;
  'admin.translations.updated': string;
  'admin.translations.export': string;
  'admin.translations.import': string;

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
