
export type Language = 'en' | 'fr' | 'no';

export interface TranslationKeys {
  // Navigation
  'nav.dashboard': string;
  'nav.workOrders': string;
  'nav.purchaseOrders': string;
  'nav.requests': string;
  'nav.assets': string;
  'nav.inventory': string;
  'nav.procedures': string;
  'nav.meters': string;
  'nav.locations': string;
  'nav.reporting': string;
  'nav.messages': string;
  'nav.users': string;
  'nav.organization': string;
  'nav.subscriptions': string;
  'nav.translations': string;

  // Sidebar groups
  'sidebar.overview': string;
  'sidebar.operations': string;
  'sidebar.resources': string;
  'sidebar.collaboration': string;
  'sidebar.administration': string;

  // Organization
  'organization.title': string;
  'organization.description': string;
  'organization.tabs.settings': string;
  'organization.tabs.branding': string;
  'organization.tabs.members': string;
  'organization.tabs.subscription': string;
  'organization.tabs.billing': string;
  'organization.settings.general': string;

  // Common
  'common.save': string;
  'common.cancel': string;
  'common.edit': string;
  'common.delete': string;
  'common.add': string;
  'common.search': string;
  'common.filter': string;
  'common.actions': string;
  'common.status': string;
  'common.date': string;
  'common.name': string;
  'common.description': string;
  'common.loading': string;
  'common.error': string;
  'common.success': string;

  // Work Orders
  'workOrders.title': string;
  'workOrders.new': string;
  'workOrders.status.open': string;
  'workOrders.status.inProgress': string;
  'workOrders.status.completed': string;
  'workOrders.status.cancelled': string;

  // Procedures
  'procedures.title': string;
  'procedures.new': string;
  'procedures.steps': string;
  'procedures.duration': string;

  // Translation Management
  'translations.title': string;
  'translations.description': string;
  'translations.key': string;
  'translations.value': string;
  'translations.language': string;
  'translations.save': string;
  'translations.search': string;
  'translations.filter': string;
  'translations.filterByLanguage': string;
  'translations.refresh': string;
}

export const translations: Record<Language, TranslationKeys> = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.workOrders': 'Work Orders',
    'nav.purchaseOrders': 'Purchase Orders',
    'nav.requests': 'Requests',
    'nav.assets': 'Assets',
    'nav.inventory': 'Inventory',
    'nav.procedures': 'Procedures',
    'nav.meters': 'Meters',
    'nav.locations': 'Locations',
    'nav.reporting': 'Reporting',
    'nav.messages': 'Messages',
    'nav.users': 'Users',
    'nav.organization': 'Organization',
    'nav.subscriptions': 'Subscriptions',
    'nav.translations': 'Translations',

    // Sidebar groups
    'sidebar.overview': 'Overview',
    'sidebar.operations': 'Operations',
    'sidebar.resources': 'Resources',
    'sidebar.collaboration': 'Collaboration',
    'sidebar.administration': 'Administration',

    // Organization
    'organization.title': 'Organization Settings',
    'organization.description': 'Manage your organization settings, branding, members, and billing',
    'organization.tabs.settings': 'Settings',
    'organization.tabs.branding': 'Branding',
    'organization.tabs.members': 'Members',
    'organization.tabs.subscription': 'Subscription',
    'organization.tabs.billing': 'Billing',
    'organization.settings.general': 'General Settings',

    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.actions': 'Actions',
    'common.status': 'Status',
    'common.date': 'Date',
    'common.name': 'Name',
    'common.description': 'Description',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',

    // Work Orders
    'workOrders.title': 'Work Orders',
    'workOrders.new': 'New Work Order',
    'workOrders.status.open': 'Open',
    'workOrders.status.inProgress': 'In Progress',
    'workOrders.status.completed': 'Completed',
    'workOrders.status.cancelled': 'Cancelled',

    // Procedures
    'procedures.title': 'Procedures',
    'procedures.new': 'New Procedure',
    'procedures.steps': 'Steps',
    'procedures.duration': 'Duration',

    // Translation Management
    'translations.title': 'Translation Management',
    'translations.description': 'Manage translations for different languages',
    'translations.key': 'Translation Key',
    'translations.value': 'Translation Value',
    'translations.language': 'Language',
    'translations.save': 'Save Translation',
    'translations.search': 'Search translations...',
    'translations.filter': 'Filter',
    'translations.filterByLanguage': 'Filter by language',
    'translations.refresh': 'Refresh Translations',
  },
  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de bord',
    'nav.workOrders': 'Ordres de travail',
    'nav.purchaseOrders': 'Bons de commande',
    'nav.requests': 'Demandes',
    'nav.assets': 'Actifs',
    'nav.inventory': 'Inventaire',
    'nav.procedures': 'Procédures',
    'nav.meters': 'Compteurs',
    'nav.locations': 'Emplacements',
    'nav.reporting': 'Rapports',
    'nav.messages': 'Messages',
    'nav.users': 'Utilisateurs',
    'nav.organization': 'Organisation',
    'nav.subscriptions': 'Abonnements',
    'nav.translations': 'Traductions',

    // Sidebar groups
    'sidebar.overview': 'Vue d\'ensemble',
    'sidebar.operations': 'Opérations',
    'sidebar.resources': 'Ressources',
    'sidebar.collaboration': 'Collaboration',
    'sidebar.administration': 'Administration',

    // Organization
    'organization.title': 'Paramètres de l\'organisation',
    'organization.description': 'Gérez les paramètres, l\'image de marque, les membres et la facturation de votre organisation',
    'organization.tabs.settings': 'Paramètres',
    'organization.tabs.branding': 'Image de marque',
    'organization.tabs.members': 'Membres',
    'organization.tabs.subscription': 'Abonnement',
    'organization.tabs.billing': 'Facturation',
    'organization.settings.general': 'Paramètres généraux',

    // Common
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.add': 'Ajouter',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.actions': 'Actions',
    'common.status': 'Statut',
    'common.date': 'Date',
    'common.name': 'Nom',
    'common.description': 'Description',
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',

    // Work Orders
    'workOrders.title': 'Ordres de travail',
    'workOrders.new': 'Nouvel ordre de travail',
    'workOrders.status.open': 'Ouvert',
    'workOrders.status.inProgress': 'En cours',
    'workOrders.status.completed': 'Terminé',
    'workOrders.status.cancelled': 'Annulé',

    // Procedures
    'procedures.title': 'Procédures',
    'procedures.new': 'Nouvelle procédure',
    'procedures.steps': 'Étapes',
    'procedures.duration': 'Durée',

    // Translation Management
    'translations.title': 'Gestion des traductions',
    'translations.description': 'Gérer les traductions pour différentes langues',
    'translations.key': 'Clé de traduction',
    'translations.value': 'Valeur de traduction',
    'translations.language': 'Langue',
    'translations.save': 'Enregistrer la traduction',
    'translations.search': 'Rechercher des traductions...',
    'translations.filter': 'Filtrer',
    'translations.filterByLanguage': 'Filtrer par langue',
    'translations.refresh': 'Actualiser les traductions',
  },
  no: {
    // Navigation
    'nav.dashboard': 'Dashbord',
    'nav.workOrders': 'Arbeidsordrer',
    'nav.purchaseOrders': 'Innkjøpsordrer',
    'nav.requests': 'Forespørsler',
    'nav.assets': 'Eiendeler',
    'nav.inventory': 'Lager',
    'nav.procedures': 'Prosedyrer',
    'nav.meters': 'Målere',
    'nav.locations': 'Lokasjoner',
    'nav.reporting': 'Rapportering',
    'nav.messages': 'Meldinger',
    'nav.users': 'Brukere',
    'nav.organization': 'Organisasjon',
    'nav.subscriptions': 'Abonnementer',
    'nav.translations': 'Oversettelser',

    // Sidebar groups
    'sidebar.overview': 'Oversikt',
    'sidebar.operations': 'Operasjoner',
    'sidebar.resources': 'Ressurser',
    'sidebar.collaboration': 'Samarbeid',
    'sidebar.administration': 'Administrasjon',

    // Organization
    'organization.title': 'Organisasjonsinnstillinger',
    'organization.description': 'Administrer organisasjonsinnstillinger, merkevarebygging, medlemmer og fakturering',
    'organization.tabs.settings': 'Innstillinger',
    'organization.tabs.branding': 'Merkevarebygging',
    'organization.tabs.members': 'Medlemmer',
    'organization.tabs.subscription': 'Abonnement',
    'organization.tabs.billing': 'Fakturering',
    'organization.settings.general': 'Generelle innstillinger',

    // Common
    'common.save': 'Lagre',
    'common.cancel': 'Avbryt',
    'common.edit': 'Rediger',
    'common.delete': 'Slett',
    'common.add': 'Legg til',
    'common.search': 'Søk',
    'common.filter': 'Filter',
    'common.actions': 'Handlinger',
    'common.status': 'Status',
    'common.date': 'Dato',
    'common.name': 'Navn',
    'common.description': 'Beskrivelse',
    'common.loading': 'Laster...',
    'common.error': 'Feil',
    'common.success': 'Suksess',

    // Work Orders
    'workOrders.title': 'Arbeidsordrer',
    'workOrders.new': 'Ny arbeidsordre',
    'workOrders.status.open': 'Åpen',
    'workOrders.status.inProgress': 'Pågår',
    'workOrders.status.completed': 'Fullført',
    'workOrders.status.cancelled': 'Avbrutt',

    // Procedures
    'procedures.title': 'Prosedyrer',
    'procedures.new': 'Ny prosedyre',
    'procedures.steps': 'Trinn',
    'procedures.duration': 'Varighet',

    // Translation Management
    'translations.title': 'Oversettelsesadministrasjon',
    'translations.description': 'Administrer oversettelser for forskjellige språk',
    'translations.key': 'Oversettelsesnøkkel',
    'translations.value': 'Oversettelsesverdi',
    'translations.language': 'Språk',
    'translations.save': 'Lagre oversettelse',
    'translations.search': 'Søk oversettelser...',
    'translations.filter': 'Filter',
    'translations.filterByLanguage': 'Filtrer etter språk',
    'translations.refresh': 'Oppdater oversettelser',
  },
};
