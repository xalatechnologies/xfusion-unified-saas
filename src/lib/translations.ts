
export const translations = {
  en: {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.workOrders": "Work Orders",
    "nav.procedures": "Procedures",
    "nav.users": "Users",
    "nav.subscriptions": "Subscriptions",
    "nav.purchaseOrders": "Purchase Orders",
    "nav.requests": "Requests",
    "nav.assets": "Assets",
    "nav.inventory": "Inventory",
    "nav.meters": "Meters",
    "nav.locations": "Locations",
    "nav.reporting": "Reporting",
    "nav.messages": "Messages",
    "nav.organization": "Organization",

    // Authentication
    "auth.login": "Sign In",
    "auth.signup": "Sign Up",
    "auth.logout": "Sign Out",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.firstName": "First Name",
    "auth.lastName": "Last Name",
    "auth.company": "Company",
    "auth.forgotPassword": "Forgot your password?",
    "auth.dontHaveAccount": "Don't have an account?",
    "auth.alreadyHaveAccount": "Already have an account?",
    "auth.signInWithEmail": "Sign in with email",
    "auth.signUpWithEmail": "Sign up with email",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.welcome": "Welcome to SupplyMantix",
    "dashboard.overview": "Overview",

    // Work Orders
    "workOrders.title": "Work Orders",
    "workOrders.description": "Manage and track maintenance work orders",

    // Procedures
    "procedures.title": "Procedures",
    "procedures.description": "Standardized maintenance procedures and checklists",

    // Organization
    "organization.title": "Organization Settings",
    "organization.description": "Manage your organization settings, members, and billing",
    "organization.tabs.settings": "Settings",
    "organization.tabs.branding": "Branding",
    "organization.tabs.members": "Members",
    "organization.tabs.subscription": "Subscription",
    "organization.tabs.billing": "Billing",
    "organization.settings.general": "General Settings",

    // Common
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.add": "Add",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",

    // Language
    "language.selectLanguage": "Select Language",
    "language.english": "English",
    "language.spanish": "Español",
    "language.french": "Français",
    "language.german": "Deutsch",
    "language.chinese": "中文",
    "language.japanese": "日本語",
  },
  es: {
    // Navigation
    "nav.dashboard": "Panel de Control",
    "nav.workOrders": "Órdenes de Trabajo",
    "nav.procedures": "Procedimientos",
    "nav.users": "Usuarios",
    "nav.subscriptions": "Suscripciones",
    "nav.purchaseOrders": "Órdenes de Compra",
    "nav.requests": "Solicitudes",
    "nav.assets": "Activos",
    "nav.inventory": "Inventario",
    "nav.meters": "Medidores",
    "nav.locations": "Ubicaciones",
    "nav.reporting": "Reportes",
    "nav.messages": "Mensajes",
    "nav.organization": "Organización",

    // Authentication
    "auth.login": "Iniciar Sesión",
    "auth.signup": "Registrarse",
    "auth.logout": "Cerrar Sesión",
    "auth.email": "Correo Electrónico",
    "auth.password": "Contraseña",
    "auth.confirmPassword": "Confirmar Contraseña",
    "auth.firstName": "Nombre",
    "auth.lastName": "Apellido",
    "auth.company": "Empresa",
    "auth.forgotPassword": "¿Olvidaste tu contraseña?",
    "auth.dontHaveAccount": "¿No tienes una cuenta?",
    "auth.alreadyHaveAccount": "¿Ya tienes una cuenta?",
    "auth.signInWithEmail": "Iniciar sesión con correo",
    "auth.signUpWithEmail": "Registrarse con correo",

    // Dashboard
    "dashboard.title": "Panel de Control",
    "dashboard.welcome": "Bienvenido a SupplyMantix",
    "dashboard.overview": "Resumen",

    // Work Orders
    "workOrders.title": "Órdenes de Trabajo",
    "workOrders.description": "Gestionar y rastrear órdenes de trabajo de mantenimiento",

    // Procedures
    "procedures.title": "Procedimientos",
    "procedures.description": "Procedimientos de mantenimiento estandarizados y listas de verificación",

    // Organization
    "organization.title": "Configuración de Organización",
    "organization.description": "Gestiona la configuración, miembros y facturación de tu organización",
    "organization.tabs.settings": "Configuración",
    "organization.tabs.branding": "Marca",
    "organization.tabs.members": "Miembros",
    "organization.tabs.subscription": "Suscripción",
    "organization.tabs.billing": "Facturación",
    "organization.settings.general": "Configuración General",

    // Common
    "common.save": "Guardar",
    "common.cancel": "Cancelar",
    "common.edit": "Editar",
    "common.delete": "Eliminar",
    "common.add": "Agregar",
    "common.search": "Buscar",
    "common.filter": "Filtrar",
    "common.loading": "Cargando...",
    "common.error": "Error",
    "common.success": "Éxito",

    // Language
    "language.selectLanguage": "Seleccionar Idioma",
    "language.english": "English",
    "language.spanish": "Español",
    "language.french": "Français",
    "language.german": "Deutsch",
    "language.chinese": "中文",
    "language.japanese": "日本語",
  }
};

export type TranslationKeys = keyof typeof translations.en;
