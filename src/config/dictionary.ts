export const dictionaryGlobal = {
  passwordErrors: {
    digit: {
      EN: "Passwords must have at least one digit ('0'-'9').",
      ES: "Las contraseñas deben tener al menos un dígito ('0'-'9').",
      FR: "Les mots de passe doivent contenir au moins un chiffre ('0'-'9').",
      RO: "Parolele trebuie să conțină cel puțin o cifră ('0'-'9').",
    },
    nonAlphanumeric: {
      EN: "Passwords must have at least one non-alphanumeric character.",
      ES: "Las contraseñas deben tener al menos un carácter no alfanumérico.",
      FR: "Les mots de passe doivent contenir au moins un caractère non alphanumérique.",
      RO: "Parolele trebuie să conțină cel puțin un caracter non-alfanumeric.",
    },
    uppercase: {
      EN: "Passwords must have at least one uppercase letter ('A'-'Z').",
      ES: "Las contraseñas deben tener al menos una letra mayúscula ('A'-'Z').",
      FR: "Les mots de passe doivent contenir au moins une lettre majuscule ('A'-'Z').",
      RO: "Parolele trebuie să conțină cel puțin o literă mare ('A'-'Z').",
    },
    lowercase: {
      EN: "Passwords must have at least one lowercase letter ('a'-'z').",
      ES: "Las contraseñas deben tener al menos una letra minúscula ('a'-'z').",
      FR: "Les mots de passe doivent contenir au moins une lettre minuscule ('a'-'z').",
      RO: "Parolele trebuie să conțină cel puțin o literă mică ('a'-'z').",
    },
    minLength: {
      EN: "Passwords must be at least 6 characters.",
      ES: "Las contraseñas deben tener al menos 6 caracteres.",
      FR: "Les mots de passe doivent contenir au moins 6 caractères.",
      RO: "Parolele trebuie să aibă cel puțin 6 caractere.",
    },
  },
  all: {
    EN: "All",
    ES: "Todos",
    FR: "Tous",
    RO: "Toate",
  },
  filtered: {
    EN: "Filtered",
    ES: "Filtrado",
    FR: "Filtré",
    RO: "Filtrate",
  },
  statusFilter: {
    statusFilterItems: {
      EN: [
        { id: 0, text: "In Process" },
        { id: 1, text: "Completed" },
        { id: 2, text: "Expired" },
        { id: 3, text: "Cancelled" },
      ],
      ES: [
        { id: 0, text: "En Proceso" },
        { id: 1, text: "Completado" },
        { id: 2, text: "Expirado" },
        { id: 3, text: "Cancelado" },
      ],
      FR: [
        { id: 0, text: "En cours" },
        { id: 1, text: "Terminé" },
        { id: 2, text: "Expiré" },
        { id: 3, text: "Annulé" },
      ],
      RO: [
        { id: 0, text: "În Proces" },
        { id: 1, text: "Completat" },
        { id: 2, text: "Expirat" },
        { id: 3, text: "Anulat" },
      ],
    },
    label: {
      EN: "Filter by Status:",
      ES: "Filtrar por Estado:",
      FR: "Filtrer par statut :",
      RO: "Filtrați după stare:",
    },
  },
  creatorFilter: {
    label: {
      EN: "Filter by Creators:",
      ES: "Filtrar por creadoras:",
      FR: "Filtrer par créateurs :",
      RO: "Filtrați după creatori:",
    },
  },
  timeFormat: {
    now: {
      EN: "now",
      ES: "ahora",
      FR: "maintenant",
      RO: "acum",
    },
    dayAgo: {
      EN: "${number} day${s} ago",
      ES: "hace ${number} día${s}",
      FR: "il y a ${number} jour${s}",
      RO: "acum ${number} zi${s}",
    },
    hourAgo: {
      EN: "${number} hour${s} ago",
      ES: "hace ${number} hora${s}",
      FR: "il y a ${number} heure${s}",
      RO: "acum ${number} oră${s}",
    },
    minuteAgo: {
      EN: "${number} minute${s} ago",
      ES: "hace ${number} minuto${s}",
      FR: "il y a ${number} minute${s}",
      RO: "acum ${number} minut${s}",
    },
    secondAgo: {
      EN: "${number} second${s} ago",
      ES: "hace ${number} segundo${s}",
      FR: "il y a ${number} seconde${s}",
      RO: "acum ${number} secundă${s}",
    },
  },
  paymentStatus: {
    EN: {
      5: "Cancelled",
      10: "Requested",
      20: "LinkCreated",
      30: "KycNewUser",
      40: "KycExistingUser",
      50: "Require Deposit Address",
      55: "Expired",
      60: "Awaiting Deposit",
      70: "AddressComplianceCheck",
      80: "ReferComplianceTeam",
      90: "ComplianceCheckPassed",
      100: "AwaitTransactionConfirmation",
      110: "AwaitConversion",
      120: "InitiateFiatTransfer",
      130: "FiatTransferComplete",
      200: "Completed",
    },
    ES: {
      5: "Cancelado",
      10: "Solicitado",
      20: "EnlaceCreado",
      30: "KycNuevoUsuario",
      40: "KycUsuarioExistente",
      50: "Requiere Dirección de Depósito",
      55: "Expirado",
      60: "Esperando Depósito",
      70: "Verificación de Cumplimiento de Dirección",
      80: "Referir al Equipo de Cumplimiento",
      90: "Verificación de Cumplimiento Aprobada",
      100: "Esperando Confirmación de Transacción",
      110: "Esperando Conversión",
      120: "Iniciar Transferencia Fiat",
      130: "Transferencia Fiat Completada",
      200: "Completado",
    },
    FR: {
      5: "Annulé",
      10: "Demandé",
      20: "LienCréé",
      30: "KycNouvelUtilisateur",
      40: "KycUtilisateurExistant",
      50: "Adresse de dépôt requise",
      55: "Expiré",
      60: "En attente de dépôt",
      70: "Vérification de conformité d'adresse",
      80: "Référer à l'équipe de conformité",
      90: "Conformité approuvée",
      100: "En attente de confirmation de transaction",
      110: "En attente de conversion",
      120: "Initier un transfert fiat",
      130: "Transfert fiat complété",
      200: "Terminé",
    },
    RO: {
      5: "Anulat",
      10: "Solicitat",
      20: "LinkCreat",
      30: "KycUtilizatorNou",
      40: "KycUtilizatorExistent",
      50: "Necesită Adresă de Depozit",
      55: "Expirat",
      60: "În așteptarea Depozitului",
      70: "Verificare Conformitate Adresă",
      80: "Referire la Echipa de Conformitate",
      90: "Verificare Conformitate Aprobată",
      100: "În așteptarea Confirmării Tranzacției",
      110: "În așteptarea Conversiei",
      120: "Inițiere Transfer Fiat",
      130: "Transfer Fiat Completat",
      200: "Finalizat",
    },
  },
  roles: {
    EN: {
      Admin: "Admin",
      Business: "Business",
      Compliance: "Compliance",
      Agent: "Agent",
      Guest: "Guest",
    },
    ES: {
      Admin: "Administrador",
      Business: "Negocio",
      Compliance: "Cumplimiento",
      Agent: "Agente",
      Guest: "Invitado",
    },
    FR: {
      Admin: "Administrateur",
      Business: "Entreprise",
      Compliance: "Conformité",
      Agent: "Agent",
      Guest: "Invité",
    },
    RO: {
      Admin: "Administrator",
      Business: "Afacere",
      Compliance: "Conformitate",
      Agent: "Agent",
      Guest: "Vizitator",
    },
  },
  withdrawStatus: {
    EN: {
      0: "Pending",
      1: "Completed",
      2: "Cancelled",
    },
    ES: {
      0: "Pendiente",
      1: "Completado",
      2: "Cancelado",
    },
    FR: {
      0: "En attente",
      1: "Terminé",
      2: "Annulé",
    },
    RO: {
      0: "În așteptare",
      1: "Finalizat",
      2: "Anulat",
    },
  },
};

export const dictionaryLanding = {
  dashboard: { EN: "Dashboard", ES: "Panel", FR: "Tableau de bord", RO: "Tablou de bord" },
  contact: { EN: "Contact Us", ES: "Contáctenos", FR: "Contactez-nous", RO: "Contactați-ne" },
  signin: { EN: "Sign In", ES: "Iniciar sesión", FR: "Se connecter", RO: "Autentificare" },
  account: { EN: "My Account", ES: "Mi cuenta", FR: "Mon compte", RO: "Contul meu" },
  logout: { EN: "Logout", ES: "Cerrar sesión", FR: "Se déconnecter", RO: "Deconectare" },
  hero: {
    title: {
      EN: "Empower Your Business with Secure and Compliant Crypto Payments",
      ES: "Potencie su negocio con pagos criptográficos seguros y compatibles",
      FR: "Dynamisez votre entreprise avec des paiements cryptographiques sécurisés et conformes",
      RO: "Împuterniciți afacerea dvs. cu plăți criptografice sigure și conforme",
    },
    subtitle: {
      EN: "At Stratis Money Service, we bridge the gap between traditional finance and the digital world. Regulated by the Bank of Spain (SEPBLAC) with a VASP registration, we provide a secure platform that allows your customers to pay in crypto, ensuring compliance and eliminating uncertainty.",
      ES: "En Stratis Money Service, cerramos la brecha entre las finanzas tradicionales y el mundo digital. Regulados por el Banco de España (SEPBLAC) y con registro VASP, ofrecemos una plataforma segura que permite a sus clientes pagar en criptomonedas, garantizando el cumplimiento normativo y eliminando la incertidumbre.",
      FR: "Chez Stratis Money Service, nous comblons le fossé entre la finance traditionnelle et le monde numérique. Réglementé par la Banque d'Espagne (SEPBLAC) avec un enregistrement VASP, nous fournissons une plateforme sécurisée permettant à vos clients de payer en crypto, garantissant la conformité et éliminant l'incertitude.",
      RO: "La Stratis Money Service, înlăturăm diferențele dintre finanțele tradiționale și lumea digitală. Reglementați de Banca Spaniei (SEPBLAC) cu o înregistrare VASP, oferim o platformă sigură care permite clienților dvs. să plătească în cripto, asigurând conformitatea și eliminând incertitudinea.",
    },
    featurePoints: {
      EN: [
        { key: "Instant Settlement", text: "crypto-assets are immediately liquidated and credited to your account" },
        { key: "Withdraw Fiat", text: "to your business banking account" },
        { key: "Simplified Payments", text: "effortlessly share payment links via Email or SMS" },
      ],
      ES: [
        {
          key: "Liquidación Instantánea",
          text: "los criptoactivos se liquidan inmediatamente y se acreditan en su cuenta",
        },
        { key: "Retirar Fiat", text: "a su cuenta bancaria comercial" },
        { key: "Pagos Simplificados", text: "Comparta enlaces de pago sin esfuerzo por correo electrónico o SMS" },
      ],
      FR: [
        {
          key: "Règlement instantané",
          text: "les crypto-actifs sont immédiatement liquidés et crédités sur votre compte",
        },
        { key: "Retirer en Fiat", text: "vers votre compte bancaire professionnel" },
        { key: "Paiements simplifiés", text: "partagez facilement des liens de paiement par e-mail ou SMS" },
      ],
      RO: [
        {
          key: "Decontare Instantanee",
          text: "activele criptografice sunt lichidate imediat și creditate în contul dvs.",
        },
        { key: "Retragere Fiat", text: "în contul dvs. bancar de afaceri" },
        { key: "Plăți Simplificate", text: "distribuiți cu ușurință linkuri de plată prin e-mail sau SMS" },
      ],
    },
  },
  feature: {
    title: {
      EN: "Why Choose Us",
      ES: "¿Por qué elegirnos?",
      FR: "Pourquoi nous choisir ?",
      RO: "De ce să ne alegeți?",
    },
    featurePoints: {
      EN: [
        { title: "Regulatory Compliance", text: "Trust in a solution regulated by the Bank of Spain" },
        {
          title: "Hassle-Free Integration",
          text: "No complex setup required, start accepting crypto payments instantly",
        },
        { title: "Rapid Settlement", text: "Crypto-assets are immediately liquidated, removing risk of volatility" },
      ],
      ES: [
        { title: "Cumplimiento normativo", text: "Confíe en una solución regulada por el Banco de España" },
        {
          title: "Integración sin complicaciones",
          text: "No se requiere una configuración compleja, comience a aceptar pagos con criptomonedas al instante",
        },
        {
          title: "Solución rápida",
          text: "Los criptoactivos se liquidan inmediatamente, lo que elimina el riesgo de volatilidad.",
        },
      ],
      FR: [
        {
          title: "Conformité réglementaire",
          text: "Faites confiance à une solution réglementée par la Banque d'Espagne",
        },
        {
          title: "Intégration facile",
          text: "Aucune configuration complexe requise, commencez à accepter les paiements en crypto immédiatement",
        },
        {
          title: "Règlement rapide",
          text: "Les crypto-actifs sont immédiatement liquidés, éliminant le risque de volatilité",
        },
      ],
      RO: [
        { title: "Conformitate Reglementară", text: "Aveți încredere într-o soluție reglementată de Banca Spaniei" },
        {
          title: "Integrare Fără Complicații",
          text: "Fără configurare complexă, începeți să acceptați plăți cripto instantaneu",
        },
        {
          title: "Decontare Rapidă",
          text: "Activele criptografice sunt lichidate imediat, eliminând riscul de volatilitate",
        },
      ],
    },
  },
  process: {
    title: {
      EN: "How our platform works",
      ES: "Cómo funciona nuestra plataforma",
      FR: "Comment fonctionne notre plateforme",
      RO: "Cum funcționează platforma noastră",
    },
    subtitle: {
      EN: "Start accepting crypto payments in just a few simple steps. Our streamlined process ensures your business is up and running quickly, with no hassle and full regulatory compliance.",
      ES: "Comience a aceptar pagos con criptomonedas en tan solo unos sencillos pasos. Nuestro proceso simplificado garantiza que su negocio esté en funcionamiento rápidamente, sin complicaciones y con pleno cumplimiento normativo.",
      FR: "Commencez à accepter les paiements en crypto en quelques étapes simples. Notre processus simplifié garantit que votre entreprise est opérationnelle rapidement, sans tracas et en pleine conformité réglementaire.",
      RO: "Începeți să acceptați plăți cripto în doar câțiva pași simpli. Procesul nostru simplificat asigură că afacerea dvs. funcționează rapid, fără complicații și în deplină conformitate cu reglementările.",
    },
    processStep: {
      EN: [
        {
          icon: "iconoir:square-cursor",
          key: "Register your Business",
          text: "Sign up and create your business account with us in just a few minutes",
        },
        {
          icon: "solar:check-circle-outline",
          key: "Verify your Business",
          text: "Complete the Know your Business verification to ensure compliance with regulations.",
        },
        {
          icon: "iconoir:link",
          key: "Generate Payment Link",
          text: "Create a payment link through our platform, we will share it with your customer.",
        },
        {
          icon: "hugeicons:dollar-receive-01",
          key: "Receive Payment & Transfer Funds",
          text: "Once your customer pays, funds are instantly liquidated and ready to be withdrawn to your business bank account",
        },
      ],
      ES: [
        {
          icon: "iconoir:square-cursor",
          key: "Registre su Negocio",
          text: "Regístrese y cree su cuenta de negocio con nosotros en solo unos minutos",
        },
        {
          icon: "solar:check-circle-outline",
          key: "Verifique su Negocio",
          text: "Complete la verificación Know Your Business para garantizar el cumplimiento de las normativas.",
        },
        {
          icon: "iconoir:link",
          key: "Genere un Enlace de Pago",
          text: "Cree un enlace de pago a través de nuestra plataforma, lo compartiremos con su cliente.",
        },
        {
          icon: "hugeicons:dollar-receive-01",
          key: "Reciba el Pago y Transfiera los Fondos",
          text: "Una vez que su cliente pague, los fondos se liquidan al instante y están listos para ser retirados a su cuenta bancaria de negocio.",
        },
      ],
      FR: [
        {
          icon: "iconoir:square-cursor",
          key: "Enregistrez votre Entreprise",
          text: "Inscrivez-vous et créez votre compte d'entreprise avec nous en quelques minutes",
        },
        {
          icon: "solar:check-circle-outline",
          key: "Vérifiez votre Entreprise",
          text: "Complétez la vérification Know Your Business pour garantir la conformité aux réglementations.",
        },
        {
          icon: "iconoir:link",
          key: "Générez un Lien de Paiement",
          text: "Créez un lien de paiement via notre plateforme, nous le partagerons avec votre client.",
        },
        {
          icon: "hugeicons:dollar-receive-01",
          key: "Recevez le Paiement et Transférez les Fonds",
          text: "Une fois que votre client a payé, les fonds sont instantanément liquidés et prêts à être transférés sur votre compte bancaire professionnel.",
        },
      ],
      RO: [
        {
          icon: "iconoir:square-cursor",
          key: "Înregistrați-vă Afacerea",
          text: "Înscrieți-vă și creați un cont de afaceri cu noi în doar câteva minute",
        },
        {
          icon: "solar:check-circle-outline",
          key: "Verificați Afacerea",
          text: "Completați verificarea Know Your Business pentru a asigura conformitatea cu reglementările.",
        },
        {
          icon: "iconoir:link",
          key: "Generați Link de Plată",
          text: "Creați un link de plată prin platforma noastră, îl vom partaja cu clientul dvs.",
        },
        {
          icon: "hugeicons:dollar-receive-01",
          key: "Primiți Plata și Transferați Fondurile",
          text: "După ce clientul dvs. plătește, fondurile sunt lichidate imediat și pregătite pentru retragere.",
        },
      ],
    },
  },
  conclusion: {
    title: {
      EN: "Ready to Accept Crypto Payments?",
      ES: "¿Listo para aceptar pagos en criptomonedas?",
      FR: "Prêt à accepter les paiements en crypto ?",
      RO: "Pregătit să acceptați plăți cripto?",
    },
    subtitle: {
      EN: "Join the growing number of businesses embracing the future of payments. Get started with a secure, compliant solution today.",
      ES: "Únase al creciente número de empresas que adoptan el futuro de los pagos. Comience hoy mismo con una solución segura y que cumple con las normas.",
      FR: "Rejoignez le nombre croissant d'entreprises adoptant l'avenir des paiements. Commencez dès aujourd'hui avec une solution sécurisée et conforme.",
      RO: "Alăturați-vă numărului în creștere de afaceri care adoptă viitorul plăților. Începeți acum cu o soluție sigură și conformă.",
    },
    signup: { EN: "Sign Up Now", ES: "Regístrate ahora", FR: "Inscrivez-vous maintenant", RO: "Înscrie-te acum" },
  },
  term: {
    EN: "Terms & Conditions",
    ES: "Términos y condiciones",
    FR: "Conditions générales",
    RO: "Termeni și condiții",
  },
  privacy: {
    EN: "Privacy Policy",
    ES: "Política de privacidad",
    FR: "Politique de confidentialité",
    RO: "Politica de confidențialitate",
  },
  copy: {
    EN: "© 2024 All right reserved",
    ES: "© 2024 Todos los derechos reservados",
    FR: "© 2024 Tous droits réservés",
    RO: "© 2024 Toate drepturile rezervate",
  },
  logoutSuccess: {
    EN: "Logout successfully.",
    ES: "Cierre de sesión exitoso.",
    FR: "Déconnexion réussie.",
    RO: "Deconectare reușită.",
  },
};

export const dictionaryAuth = {
  login: {
    title: {
      EN: "Sign In Your Account",
      ES: "Iniciar sesión en su cuenta",
      FR: "Connectez-vous à votre compte",
      RO: "Autentificați-vă în contul dvs.",
    },
    subtitle: {
      EN: "Welcome to stratis money service. Enjoy now!",
      ES: "Bienvenido al servicio de dinero Stratis. ¡Disfrútelo ahora!",
      FR: "Bienvenue sur le service Stratis Money. Profitez-en maintenant !",
      RO: "Bun venit la serviciul de bani Stratis. Bucurați-vă acum!",
    },
    forgot: {
      EN: "Forgot Password?",
      ES: "¿Has olvidado tu contraseña?",
      FR: "Mot de passe oublié ?",
      RO: "Ați uitat parola?",
    },
    button: {
      EN: "Login with Email",
      ES: "Iniciar sesión con correo electrónico",
      FR: "Connexion par e-mail",
      RO: "Autentificare cu e-mail",
    },
    donhave: {
      EN: `Don't have your account?`,
      ES: "¿No tienes cuenta?",
      FR: "Vous n'avez pas de compte ?",
      RO: "Nu aveți un cont?",
    },
    signup: { EN: "Sign Up", ES: "Regístrate", FR: "S'inscrire", RO: "Înregistrare" },
    emailPlace: {
      EN: "Email Address",
      ES: "Dirección de correo electrónico",
      FR: "Adresse e-mail",
      RO: "Adresă de e-mail",
    },
    pwdPlace: { EN: "Password", ES: "Contraseña", FR: "Mot de passe", RO: "Parolă" },
    errorRequire: {
      EN: "This field required.",
      ES: "Este campo es obligatorio.",
      FR: "Ce champ est requis.",
      RO: "Acest câmp este obligatoriu.",
    },
    errorInvalid: {
      EN: "Invalid email.",
      ES: "Correo electrónico no válido.",
      FR: "E-mail invalide.",
      RO: "E-mail invalid.",
    },
    emailNotFound: {
      EN: "Email not found.",
      ES: "Correo no encontrado.",
      FR: "E-mail non trouvé.",
      RO: "E-mailul nu a fost găsit.",
    },
    incorrectPassword: {
      EN: "Incorrect password.",
      ES: "Contraseña incorrecta.",
      FR: "Mot de passe incorrect.",
      RO: "Parolă incorectă.",
    },
    toast: {
      success: {
        EN: "Logged in successfully.",
        ES: "Inicio de sesión exitoso.",
        FR: "Connexion réussie.",
        RO: "Autentificare reușită.",
      },
      failure: {
        EN: "Login failed.",
        ES: "Error al iniciar sesión.",
        FR: "Échec de la connexion.",
        RO: "Autentificare eșuată.",
      },
      generalError: {
        EN: "Something went wrong.",
        ES: "Algo salió mal.",
        FR: "Une erreur s'est produite.",
        RO: "Ceva nu a mers bine.",
      },
    },
  },
  register: {
    title: {
      EN: "Create Your Account",
      ES: "Crea tu cuenta",
      FR: "Créez votre compte",
      RO: "Creați-vă contul",
    },
    subtitle: {
      EN: "Setting up an account takes only a few minutes.",
      ES: "Configurar una cuenta solo toma unos minutos.",
      FR: "Créer un compte ne prend que quelques minutes.",
      RO: "Crearea unui cont durează doar câteva minute.",
    },
    placeholders: {
      name: {
        EN: "Company Name",
        ES: "Nombre de la empresa",
        FR: "Nom de l'entreprise",
        RO: "Numele companiei",
      },
      industry: {
        EN: "Industry or Sector",
        ES: "Industria o Sector",
        FR: "Secteur ou industrie",
        RO: "Industrie sau sector",
      },
      activity: {
        EN: "Type of Activity",
        ES: "Tipo de actividad",
        FR: "Type d'activité",
        RO: "Tip de activitate",
      },
      volume: {
        EN: "Expected Monthly Volume",
        ES: "Volumen mensual esperado",
        FR: "Volume mensuel attendu",
        RO: "Volumul lunar estimat",
      },
      country: {
        EN: "Country",
        ES: "País",
        FR: "Pays",
        RO: "Țară",
      },
      phone: {
        EN: "Mobile Number",
        ES: "Número de teléfono móvil",
        FR: "Numéro de téléphone mobile",
        RO: "Număr de telefon mobil",
      },
      email: {
        EN: "Email Address",
        ES: "Dirección de correo electrónico",
        FR: "Adresse e-mail",
        RO: "Adresă de e-mail",
      },
      password: {
        EN: "Password",
        ES: "Contraseña",
        FR: "Mot de passe",
        RO: "Parolă",
      },
      confirmPassword: {
        EN: "Confirm Password",
        ES: "Confirmar contraseña",
        FR: "Confirmez le mot de passe",
        RO: "Confirmați parola",
      },
    },
    errors: {
      emailInvalid: {
        EN: "Invalid email.",
        ES: "Correo electrónico no válido.",
        FR: "E-mail invalide.",
        RO: "E-mail invalid.",
      },
      emailRequired: {
        EN: "Email required.",
        ES: "Correo electrónico requerido.",
        FR: "E-mail requis.",
        RO: "E-mail obligatoriu.",
      },
      nameRequired: {
        EN: "Name required.",
        ES: "Nombre requerido.",
        FR: "Nom requis.",
        RO: "Numele este obligatoriu.",
      },
      fieldRequired: {
        EN: "This field required.",
        ES: "Este campo es obligatorio.",
        FR: "Ce champ est requis.",
        RO: "Acest câmp este obligatoriu.",
      },
      countryRequired: {
        EN: "Country required.",
        ES: "País requerido.",
        FR: "Pays requis.",
        RO: "Țara este obligatorie.",
      },
      phoneRequired: {
        EN: "Mobile phone required.",
        ES: "Teléfono móvil requerido.",
        FR: "Téléphone portable requis.",
        RO: "Telefonul mobil este obligatoriu.",
      },
      phoneInvalid: {
        EN: "Incorrect phone number.",
        ES: "Número de teléfono incorrecto.",
        FR: "Numéro de téléphone incorrect.",
        RO: "Număr de telefon incorect.",
      },
      passwordRequired: {
        EN: "Password required.",
        ES: "Contraseña requerida.",
        FR: "Mot de passe requis.",
        RO: "Parola este obligatorie.",
      },
      passwordInvalid: {
        EN: "Invalid password.",
        ES: "Contraseña no válida.",
        FR: "Mot de passe invalide.",
        RO: "Parolă invalidă.",
      },
      passwordMismatch: {
        EN: "Password confirmation does not match.",
        ES: "La confirmación de la contraseña no coincide.",
        FR: "La confirmation du mot de passe ne correspond pas.",
        RO: "Confirmarea parolei nu corespunde.",
      },
      duplicateUser: {
        EN: "User is already exist.",
        ES: "El usuario ya existe.",
        FR: "L'utilisateur existe déjà.",
        RO: "Utilizatorul există deja.",
      },
    },
    button: {
      EN: "Register",
      ES: "Registrarse",
      FR: "S'inscrire",
      RO: "Înregistrare",
    },
    alreadyHaveAccount: {
      EN: "Already have an account?",
      ES: "¿Ya tienes una cuenta?",
      FR: "Vous avez déjà un compte ?",
      RO: "Aveți deja un cont?",
    },
    login: {
      EN: "Login",
      ES: "Iniciar sesión",
      FR: "Se connecter",
      RO: "Autentificare",
    },
    industries: {
      EN: [
        {
          group: "Retail",
          items: ["E-commerce", "Brick-and-Mortar", "Fashion & Apparel", "Electronics", "Grocery"],
        },
        {
          group: "Services",
          items: [
            "Professional Services (Legal, Accounting, etc.)",
            "Hospitality (Hotels, Restaurants, etc.)",
            "Entertainment and Leisure (Nightclub, Bars, etc.)",
            "Luxury Services (Yacht Charter, Security etc.)",
            "Healthcare",
            "Education",
            "IT & Software",
          ],
        },
        {
          group: "Finance",
          items: ["Banking", "Insurance", "Investment & Asset Management", "Financial Technology (Fintech)"],
        },
        {
          group: "Entertainment",
          items: ["Media & Publishing", "Gaming", "Music & Arts", "Events Management"],
        },
        {
          group: "Manufacturing",
          items: ["Consumer Goods", "Industrial Goods", "Automotive", "Pharmaceuticals"],
        },
        {
          group: "Non-Profit",
          items: ["Charities", "Educational Institutions", "Religious Organizations"],
        },
        {
          group: "Government & Public Sector",
          items: ["Government Agencies", "Public Utilities"],
        },
        {
          group: "Real Estate",
          items: ["Commercial Real Estate", "Residential Real Estate"],
        },
        {
          group: "Transportation & Logistics",
          items: ["Shipping & Delivery", "Public Transportation", "Warehousing"],
        },
      ],
      ES: [
        {
          group: "Venta Minorista",
          items: ["Comercio Electrónico", "Tiendas Físicas", "Moda y Vestimenta", "Electrónica", "Supermercados"],
        },
        {
          group: "Servicios",
          items: [
            "Servicios Profesionales (Legales, Contabilidad, etc.)",
            "Hospitalidad (Hoteles, Restaurantes, etc.)",
            "Entretenimiento y Ocio (Discotecas, Bares, etc.)",
            "Servicios de Lujo (Charter de Yates, Seguridad, etc.)",
            "Salud",
            "Educación",
            "TI y Software",
          ],
        },
        {
          group: "Finanzas",
          items: ["Banca", "Seguros", "Gestión de Inversiones y Activos", "Tecnología Financiera (Fintech)"],
        },
        {
          group: "Entretenimiento",
          items: ["Medios y Publicaciones", "Videojuegos", "Música y Artes", "Gestión de Eventos"],
        },
        {
          group: "Manufactura",
          items: ["Bienes de Consumo", "Bienes Industriales", "Automotriz", "Farmacéutica"],
        },
        {
          group: "Sin Fines de Lucro",
          items: ["Organizaciones Benéficas", "Instituciones Educativas", "Organizaciones Religiosas"],
        },
        {
          group: "Gobierno y Sector Público",
          items: ["Agencias Gubernamentales", "Servicios Públicos"],
        },
        {
          group: "Bienes Raíces",
          items: ["Bienes Raíces Comerciales", "Bienes Raíces Residenciales"],
        },
        {
          group: "Transporte y Logística",
          items: ["Envíos y Entregas", "Transporte Público", "Almacenamiento"],
        },
      ],
      FR: [
        {
          group: "Commerce de Détail",
          items: ["E-commerce", "Boutiques", "Mode & Vêtements", "Électronique", "Épicerie"],
        },
        {
          group: "Services",
          items: [
            "Services Professionnels (Juridique, Comptabilité, etc.)",
            "Hôtellerie (Hôtels, Restaurants, etc.)",
            "Divertissement et Loisirs (Boîtes de Nuit, Bars, etc.)",
            "Services de Luxe (Location de Yacht, Sécurité, etc.)",
            "Santé",
            "Éducation",
            "IT & Logiciels",
          ],
        },
        {
          group: "Finance",
          items: ["Banque", "Assurance", "Gestion d'Investissements et Actifs", "Technologie Financière (Fintech)"],
        },
        {
          group: "Divertissement",
          items: ["Médias & Édition", "Jeux", "Musique & Arts", "Gestion d'Événements"],
        },
        {
          group: "Fabrication",
          items: ["Biens de Consommation", "Biens Industriels", "Automobile", "Pharmaceutique"],
        },
        {
          group: "Organisations à But Non Lucratif",
          items: ["Associations Caritatives", "Institutions Éducatives", "Organisations Religieuses"],
        },
        {
          group: "Gouvernement et Secteur Public",
          items: ["Agences Gouvernementales", "Services Publics"],
        },
        {
          group: "Immobilier",
          items: ["Immobilier Commercial", "Immobilier Résidentiel"],
        },
        {
          group: "Transport et Logistique",
          items: ["Expédition et Livraison", "Transports Publics", "Entrepôt"],
        },
      ],
      RO: [
        {
          group: "Retail",
          items: ["Comerț electronic", "Magazine Fizice", "Modă & Îmbrăcăminte", "Electronice", "Alimente"],
        },
        {
          group: "Servicii",
          items: [
            "Servicii Profesionale (Juridic, Contabilitate, etc.)",
            "Ospitalitate (Hoteluri, Restaurante, etc.)",
            "Divertisment și Timp Liber (Cluburi, Baruri, etc.)",
            "Servicii de Lux (Închiriere Yacht, Securitate, etc.)",
            "Sănătate",
            "Educație",
            "IT & Software",
          ],
        },
        {
          group: "Finanțe",
          items: ["Bănci", "Asigurări", "Management de Investiții și Active", "Tehnologie Financiară (Fintech)"],
        },
        {
          group: "Divertisment",
          items: ["Media & Publicații", "Gaming", "Muzică & Arte", "Management Evenimente"],
        },
        {
          group: "Producție",
          items: ["Bunuri de Consum", "Bunuri Industriale", "Automotive", "Farmaceutice"],
        },
        {
          group: "Non-profit",
          items: ["Caritate", "Instituții Educaționale", "Organizații Religioase"],
        },
        {
          group: "Guvern și Sector Public",
          items: ["Agenții Guvernamentale", "Servicii Publice"],
        },
        {
          group: "Imobiliare",
          items: ["Imobiliare Comerciale", "Imobiliare Rezidențiale"],
        },
        {
          group: "Transport și Logistică",
          items: ["Livrări și Transport", "Transport Public", "Depozitare"],
        },
      ],
    },
    activities: {
      EN: [
        { group: "Sales of Goods", items: ["Physical Goods", "Digital Goods"] },
        {
          group: "Service Provision",
          items: [
            "Professional Services",
            "Subscription Services",
            "Consulting",
            "Accommodation Services",
            "Dining and Catering",
            "Event Hosting",
          ],
        },
        {
          group: "Entertainment and Leisure",
          items: ["Nightlife Management", "Live Performances", "Tours and Excursions"],
        },
        {
          group: "Luxury Services",
          items: ["Yacht Rentals", "VIP Services", "Spa and Wellness"],
        },
        {
          group: "Financial Services",
          items: ["Lending", "Insurance", "Payment Processing"],
        },
        {
          group: "Content Creation",
          items: ["Digital Media", "Education & Training"],
        },
        {
          group: "Non-Profit Activities",
          items: ["Fundraising", "Membership Fees"],
        },
      ],
      ES: [
        { group: "Venta de Bienes", items: ["Bienes Físicos", "Bienes Digitales"] },
        {
          group: "Prestación de Servicios",
          items: [
            "Servicios Profesionales",
            "Servicios de Suscripción",
            "Consultoría",
            "Servicios de Alojamiento",
            "Comidas y Catering",
            "Organización de Eventos",
          ],
        },
        {
          group: "Entretenimiento y Ocio",
          items: ["Gestión de Vida Nocturna", "Espectáculos en Vivo", "Tours y Excursiones"],
        },
        {
          group: "Servicios de Lujo",
          items: ["Alquiler de Yates", "Servicios VIP", "Spa y Bienestar"],
        },
        {
          group: "Servicios Financieros",
          items: ["Préstamos", "Seguros", "Procesamiento de Pagos"],
        },
        {
          group: "Creación de Contenidos",
          items: ["Medios Digitales", "Educación y Formación"],
        },
        {
          group: "Actividades Sin Fines de Lucro",
          items: ["Recaudación de Fondos", "Cuotas de Membresía"],
        },
      ],
      FR: [
        { group: "Vente de Biens", items: ["Biens Physiques", "Biens Numériques"] },
        {
          group: "Prestation de Services",
          items: [
            "Services Professionnels",
            "Services d'Abonnement",
            "Consulting",
            "Services d'Hébergement",
            "Restauration et Traiteur",
            "Organisation d'Événements",
          ],
        },
        {
          group: "Divertissement et Loisirs",
          items: ["Gestion de Vie Nocturne", "Performances Live", "Excursions et Tours"],
        },
        {
          group: "Services de Luxe",
          items: ["Location de Yacht", "Services VIP", "Spa et Bien-être"],
        },
        {
          group: "Services Financiers",
          items: ["Prêts", "Assurances", "Traitement des Paiements"],
        },
        {
          group: "Création de Contenu",
          items: ["Médias Numériques", "Éducation et Formation"],
        },
        {
          group: "Activités Sans But Lucratif",
          items: ["Collecte de Fonds", "Cotisations"],
        },
      ],
      RO: [
        { group: "Vânzarea de Bunuri", items: ["Bunuri Fizice", "Bunuri Digitale"] },
        {
          group: "Furnizare de Servicii",
          items: [
            "Servicii Profesionale",
            "Servicii de Abonament",
            "Consultanță",
            "Servicii de Cazare",
            "Catering și Restaurante",
            "Organizare de Evenimente",
          ],
        },
        {
          group: "Divertisment și Timp Liber",
          items: ["Management Nocturn", "Spectacole Live", "Excursii și Tururi"],
        },
        {
          group: "Servicii de Lux",
          items: ["Închiriere Yachturi", "Servicii VIP", "Spa și Wellness"],
        },
        {
          group: "Servicii Financiare",
          items: ["Împrumuturi", "Asigurări", "Procesare Plăți"],
        },
        {
          group: "Creare de Conținut",
          items: ["Media Digitală", "Educație și Training"],
        },
        {
          group: "Activități Non-Profit",
          items: ["Strângere de Fonduri", "Taxe de Membru"],
        },
      ],
    },
    volumes: {
      EN: [
        {
          group: "",
          items: [
            "Less than €10,000",
            "€10,000 - €50,000",
            "€50,000 - €100,000",
            "€100,000 - €500,000",
            "€500,000 - €1,000,000",
            "More than €1,000,000",
          ],
        },
      ],
      ES: [
        {
          group: "",
          items: [
            "Menos de €10,000",
            "€10,000 - €50,000",
            "€50,000 - €100,000",
            "€100,000 - €500,000",
            "€500,000 - €1,000,000",
            "Más de €1,000,000",
          ],
        },
      ],
      FR: [
        {
          group: "",
          items: [
            "Moins de 10 000 €",
            "10 000 € - 50 000 €",
            "50 000 € - 100 000 €",
            "100 000 € - 500 000 €",
            "500 000 € - 1 000 000 €",
            "Plus de 1 000 000 €",
          ],
        },
      ],
      RO: [
        {
          group: "",
          items: [
            "Mai puțin de 10.000 €",
            "10.000 € - 50.000 €",
            "50.000 € - 100.000 €",
            "100.000 € - 500.000 €",
            "500.000 € - 1.000.000 €",
            "Mai mult de 1.000.000 €",
          ],
        },
      ],
    },
    toast: {
      successRegister: {
        EN: "Registered successfully.",
        ES: "Registrado con éxito.",
        FR: "Enregistré avec succès.",
        RO: "Înregistrat cu succes.",
      },
      registerFailed: {
        EN: "Register failed.",
        ES: "El registro falló.",
        FR: "L'enregistrement a échoué.",
        RO: "Înregistrarea a eșuat.",
      },
      somethingWrong: {
        EN: "Something went wrong.",
        ES: "Algo salió mal.",
        FR: "Quelque chose s'est mal passé.",
        RO: "Ceva nu a mers bine.",
      },
    },
  },
  forgotPassword: {
    title: {
      EN: "Forgot Password?",
      ES: "¿Olvidaste tu contraseña?",
      FR: "Mot de passe oublié ?",
      RO: "Ai uitat parola?",
    },
    subtitle: {
      EN: "Please enter your email address and we will send you a link to reset your password.",
      ES: "Por favor, introduce tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña.",
      FR: "Veuillez entrer votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.",
      RO: "Vă rugăm să introduceți adresa dvs. de e-mail și vă vom trimite un link pentru a reseta parola.",
    },
    placeholders: {
      email: {
        EN: "Email Address",
        ES: "Dirección de correo electrónico",
        FR: "Adresse e-mail",
        RO: "Adresă de e-mail",
      },
    },
    errors: {
      emailRequired: {
        EN: "Email required.",
        ES: "Correo electrónico requerido.",
        FR: "E-mail requis.",
        RO: "E-mail obligatoriu.",
      },
      emailInvalid: {
        EN: "Invalid email.",
        ES: "Correo electrónico no válido.",
        FR: "E-mail invalide.",
        RO: "E-mail invalid.",
      },
    },
    success: {
      emailSent: {
        EN: "Password reset email sent.",
        ES: "Correo de restablecimiento de contraseña enviado.",
        FR: "E-mail de réinitialisation du mot de passe envoyé.",
        RO: "E-mail pentru resetarea parolei trimis.",
      },
    },
    noti: {
      success: {
        EN: "Password reset email sent.",
        ES: "Correo de restablecimiento de contraseña enviado.",
        FR: "E-mail de réinitialisation du mot de passe envoyé.",
        RO: "E-mail pentru resetarea parolei trimis.",
      },
      fail: {
        EN: "Something went wrong.",
        ES: "Algo salió mal.",
        FR: "Une erreur s'est produite.",
        RO: "Ceva nu a mers bine.",
      },
    },
    button: {
      EN: "Send Link",
      ES: "Enviar enlace",
      FR: "Envoyer le lien",
      RO: "Trimite link-ul",
    },
  },
  verifySend: {
    title: {
      EN: "Verify Your Email",
      ES: "Verifica tu correo electrónico",
      FR: "Vérifiez votre e-mail",
      RO: "Verificați-vă e-mailul",
    },
    subtitle0: {
      EN: "A verification email has been sent to ",
      ES: "Se ha enviado un correo electrónico de verificación a ",
      FR: "Un e-mail de vérification a été envoyé à ",
      RO: "Un e-mail de verificare a fost trimis la ",
    },
    subtitle1: {
      EN: ". Please check your email inbox and click the link to verify your email.",
      ES: ". Por favor, revisa tu bandeja de entrada y haz clic en el enlace para verificar tu correo electrónico.",
      FR: ". Veuillez vérifier votre boîte de réception et cliquer sur le lien pour vérifier votre e-mail.",
      RO: ". Vă rugăm să verificați căsuța dvs. de e-mail și să faceți clic pe link pentru a vă verifica e-mailul.",
    },
    resendInfo: {
      EN: "If you do not receive the email within the next 5 minutes, use the button below to resend the verification email.",
      ES: "Si no recibes el correo electrónico en los próximos 5 minutos, utiliza el botón de abajo para reenviar el correo de verificación.",
      FR: "Si vous ne recevez pas l'e-mail dans les 5 prochaines minutes, utilisez le bouton ci-dessous pour renvoyer l'e-mail de vérification.",
      RO: "Dacă nu primiți e-mailul în următoarele 5 minute, utilizați butonul de mai jos pentru a retrimite e-mailul de verificare.",
    },
    buttons: {
      resendEmail: {
        EN: "Resend Email",
        ES: "Reenviar correo electrónico",
        FR: "Renvoyer l'e-mail",
        RO: "Retrimite e-mailul",
      },
    },
    errors: {
      emailNotExist: {
        EN: "Email not exist.",
        ES: "El correo electrónico no existe.",
        FR: "L'e-mail n'existe pas.",
        RO: "E-mailul nu există.",
      },
      somethingWentWrong: {
        EN: "Something went wrong.",
        ES: "Algo salió mal.",
        FR: "Une erreur s'est produite.",
        RO: "Ceva nu a mers bine.",
      },
    },
    toastMessages: {
      emailSent: {
        EN: "Sent an email successfully.",
        ES: "Correo electrónico enviado con éxito.",
        FR: "E-mail envoyé avec succès.",
        RO: "E-mail trimis cu succes.",
      },
    },
  },
  verifyEmail: {
    loading: {
      title: {
        EN: "We are checking your email.",
        ES: "Estamos verificando tu correo electrónico.",
        FR: "Nous vérifions votre e-mail.",
        RO: "Vă verificăm e-mailul.",
      },
    },
    success: {
      title: {
        EN: "Your email has been verified successfully.",
        ES: "Tu correo electrónico ha sido verificado con éxito.",
        FR: "Votre e-mail a été vérifié avec succès.",
        RO: "E-mailul dvs. a fost verificat cu succes.",
      },
      button: {
        EN: "Go To Dashboard",
        ES: "Ir al Panel",
        FR: "Accéder au tableau de bord",
        RO: "Accesați tabloul de bord",
      },
    },
    failure: {
      title: {
        EN: "Email verification failed.",
        ES: "La verificación del correo electrónico falló.",
        FR: "La vérification de l'e-mail a échoué.",
        RO: "Verificarea e-mailului a eșuat.",
      },
      button: {
        EN: "Go To Home",
        ES: "Ir a la página principal",
        FR: "Aller à la page d'accueil",
        RO: "Mergeți la pagina principală",
      },
    },
    errors: {
      somethingWentWrong: {
        EN: "Something went wrong.",
        ES: "Algo salió mal.",
        FR: "Une erreur s'est produite.",
        RO: "Ceva nu a mers bine.",
      },
    },
    toastMessages: {
      success: {
        EN: "Email has been verified.",
        ES: "El correo electrónico ha sido verificado.",
        FR: "L'e-mail a été vérifié.",
        RO: "E-mailul a fost verificat.",
      },
      failure: {
        EN: "Email verification failed.",
        ES: "La verificación del correo electrónico falló.",
        FR: "La vérification de l'e-mail a échoué.",
        RO: "Verificarea e-mailului a eșuat.",
      },
    },
  },
  resetPassword: {
    title: {
      EN: "Reset Your Password",
      ES: "Restablece tu contraseña",
      FR: "Réinitialisez votre mot de passe",
      RO: "Resetați parola",
    },
    subtitle: {
      EN: "Reset your password for the account associated with",
      ES: "Restablece tu contraseña para la cuenta asociada con",
      FR: "Réinitialisez votre mot de passe pour le compte associé à",
      RO: "Resetați parola pentru contul asociat cu",
    },
    placeholders: {
      password: {
        EN: "Password",
        ES: "Contraseña",
        FR: "Mot de passe",
        RO: "Parolă",
      },
      confirmPassword: {
        EN: "Confirm Password",
        ES: "Confirmar contraseña",
        FR: "Confirmez le mot de passe",
        RO: "Confirmați parola",
      },
    },
    errors: {
      passwordRequired: {
        EN: "Password required",
        ES: "Contraseña requerida",
        FR: "Mot de passe requis",
        RO: "Parola este obligatorie",
      },
      passwordMismatch: {
        EN: "Password confirmation does not match",
        ES: "La confirmación de la contraseña no coincide",
        FR: "La confirmation du mot de passe ne correspond pas",
        RO: "Confirmarea parolei nu corespunde",
      },
    },
    buttons: {
      resetPassword: {
        EN: "Reset Password",
        ES: "Restablecer contraseña",
        FR: "Réinitialiser le mot de passe",
        RO: "Resetați parola",
      },
    },
    toastMessages: {
      success: {
        EN: "Password reset completed.",
        ES: "Restablecimiento de contraseña completado.",
        FR: "Réinitialisation du mot de passe terminée.",
        RO: "Resetarea parolei a fost finalizată.",
      },
      error: {
        EN: "Something went wrong.",
        ES: "Algo salió mal.",
        FR: "Une erreur s'est produite.",
        RO: "Ceva nu a mers bine.",
      },
    },
  },
};

export const dictionaryApp = {
  appLayout: {
    actions: {
      startKyb: {
        EN: "Start KYB",
        ES: "Iniciar KYB",
        FR: "Commencer KYB",
        RO: "Începeți KYB",
      },
      checkDetails: {
        EN: "Check Details",
        ES: "Ver Detalles",
        FR: "Vérifier les détails",
        RO: "Verificați detaliile",
      },
      kybStatus: {
        EN: "KYB Status",
        ES: "Estado de KYB",
        FR: "Statut KYB",
        RO: "Statut KYB",
      },
      logout: {
        EN: "Logout",
        ES: "Cerrar sesión",
        FR: "Déconnexion",
        RO: "Deconectare",
      },
    },
    toastMessages: {
      logoutSuccess: {
        EN: "Logout successfully.",
        ES: "Cierre de sesión exitoso.",
        FR: "Déconnexion réussie.",
        RO: "Deconectare reușită.",
      },
    },
    kybFailMessages: {
      EN: {
        1: {
          title: "You need to pass KYB verification",
          text: "Your KYB application has not yet started. Please complete your KYB verification to continue using our services without interruption",
        },
        2: {
          title: "KYB Application Timed Out",
          text: "Your KYB application has timed out. Please resubmit your application or reach out to support if you need assistance in restarting the process.",
        },
        3: {
          title: "Your KYB Application was Declined",
          text: "Please contact our Compliance Officer for further details regarding the status of your Know Your Business application and guidance on restoring compliance.",
        },
        4: {
          title: "KYB Application Successfully Verified",
          text: "Your KYB application has been successfully verified. Our Compliance Officer will review and approve your applications soon.",
        },
        6: {
          title: "Your compliance check was disapproved",
          text: "Please contact our Compliance Officer for further details regarding the status of your compliance check and guidance on restoring compliance status.",
        },
      },
      ES: {
        1: {
          title: "Debe completar la verificación KYB",
          text: "Su solicitud KYB aún no ha comenzado. Por favor, complete su verificación KYB para continuar utilizando nuestros servicios sin interrupciones.",
        },
        2: {
          title: "La solicitud KYB expiró",
          text: "Su solicitud KYB ha expirado. Por favor, vuelva a enviar su solicitud o comuníquese con soporte si necesita ayuda para reiniciar el proceso.",
        },
        3: {
          title: "Su solicitud KYB fue rechazada",
          text: "Por favor, contacte a nuestro Oficial de Cumplimiento para obtener más detalles sobre el estado de su solicitud de Conozca Su Negocio y orientación sobre cómo restaurar el cumplimiento.",
        },
        4: {
          title: "La solicitud KYB fue verificada con éxito",
          text: "Su solicitud KYB ha sido verificada con éxito. Nuestro Oficial de Cumplimiento revisará y aprobará sus solicitudes pronto.",
        },
        6: {
          title: "La verificación de cumplimiento fue desaprobada",
          text: "Por favor, contacte a nuestro Oficial de Cumplimiento para obtener más detalles sobre el estado de su verificación de cumplimiento y orientación sobre cómo restaurar el estado de cumplimiento.",
        },
      },
      FR: {
        1: {
          title: "Vous devez passer la vérification KYB",
          text: "Votre demande KYB n'a pas encore commencé. Veuillez compléter votre vérification KYB pour continuer à utiliser nos services sans interruption.",
        },
        2: {
          title: "La demande KYB a expiré",
          text: "Votre demande KYB a expiré. Veuillez soumettre à nouveau votre demande ou contacter le support si vous avez besoin d'aide pour redémarrer le processus.",
        },
        3: {
          title: "Votre demande KYB a été refusée",
          text: "Veuillez contacter notre responsable de la conformité pour plus de détails sur l'état de votre demande KYB et des conseils sur la façon de restaurer la conformité.",
        },
        4: {
          title: "La demande KYB a été vérifiée avec succès",
          text: "Votre demande KYB a été vérifiée avec succès. Notre responsable de la conformité examinera et approuvera vos demandes prochainement.",
        },
        6: {
          title: "Votre vérification de conformité a été refusée",
          text: "Veuillez contacter notre responsable de la conformité pour plus de détails sur l'état de votre vérification de conformité et des conseils sur la façon de restaurer le statut de conformité.",
        },
      },
      RO: {
        1: {
          title: "Trebuie să treceți verificarea KYB",
          text: "Aplicația dvs. KYB nu a început încă. Vă rugăm să finalizați verificarea KYB pentru a continua să utilizați serviciile noastre fără întrerupere.",
        },
        2: {
          title: "Aplicația KYB a expirat",
          text: "Aplicația dvs. KYB a expirat. Vă rugăm să trimiteți din nou aplicația sau să contactați asistența dacă aveți nevoie de ajutor pentru a reporni procesul.",
        },
        3: {
          title: "Aplicația dvs. KYB a fost respinsă",
          text: "Vă rugăm să contactați Ofițerul nostru de Conformitate pentru mai multe detalii despre starea aplicației dvs. KYB și pentru îndrumări despre cum să restabiliți conformitatea.",
        },
        4: {
          title: "Aplicația KYB a fost verificată cu succes",
          text: "Aplicația dvs. KYB a fost verificată cu succes. Ofițerul nostru de Conformitate va revizui și va aproba în curând aplicațiile dvs.",
        },
        6: {
          title: "Verificarea dvs. de conformitate a fost respinsă",
          text: "Vă rugăm să contactați Ofițerul nostru de Conformitate pentru mai multe detalii despre starea verificării dvs. de conformitate și pentru îndrumări despre cum să restabiliți statutul de conformitate.",
        },
      },
    },
  },
  appSidebar: {
    menu: {
      order: {
        EN: "Order",
        ES: "Órden",
        FR: "Ordres",
        RO: "Ordine",
      },
      withdraw: {
        EN: "Withdraw",
        ES: "Retirar",
        FR: "Retirer",
        RO: "Retragere",
      },
      agent: {
        EN: "Agent",
        ES: "Agente",
        FR: "Agent",
        RO: "Agent",
      },
      companies: {
        EN: "Companies",
        ES: "Empresas",
        FR: "Entreprises",
        RO: "Companii",
      },
      profile: {
        EN: "Profile",
        ES: "Perfil",
        FR: "Profil",
        RO: "Profil",
      },
    },
    buttons: {
      logout: {
        EN: "Logout",
        ES: "Cerrar sesión",
        FR: "Déconnexion",
        RO: "Deconectare",
      },
    },
    toastMessages: {
      logoutSuccess: {
        EN: "Logout successfully",
        ES: "Cierre de sesión exitoso",
        FR: "Déconnexion réussie",
        RO: "Deconectare reușită",
      },
    },
  },
};

export const dictionaryProfile = {
  headings: {
    myAccount: {
      EN: "My Account",
      ES: "Mi Cuenta",
      FR: "Mon Compte",
      RO: "Contul Meu",
    },
    profile: {
      EN: "Profile",
      ES: "Perfil",
      FR: "Profil",
      RO: "Profil",
    },
    kybStatus: {
      EN: "KYB Status",
      ES: "Estado KYB",
      FR: "Statut KYB",
      RO: "Statut KYB",
    },
    complianceStatus: {
      EN: "Compliance Status",
      ES: "Estado de Cumplimiento",
      FR: "Statut de Conformité",
      RO: "Statut de Conformitate",
    },
    setting: {
      EN: "Setting",
      ES: "Configuración",
      FR: "Paramètre",
      RO: "Setări",
    },
    bankDetail: {
      EN: "Bank Detail",
      ES: "Detalle Bancario",
      FR: "Détail Bancaire",
      RO: "Detalii Bancare",
    },
  },
  profileLabels: {
    userId: {
      EN: "User ID",
      ES: "ID de Usuario",
      FR: "ID Utilisateur",
      RO: "ID Utilizator",
    },
    email: {
      EN: "Email",
      ES: "Correo Electrónico",
      FR: "E-mail",
      RO: "E-mail",
    },
    name: {
      EN: "Name",
      ES: "Nombre",
      FR: "Nom",
      RO: "Nume",
    },
    role: {
      EN: "Role",
      ES: "Rol",
      FR: "Rôle",
      RO: "Rol",
    },
    phoneNumber: {
      EN: "Phone Number",
      ES: "Número de Teléfono",
      FR: "Numéro de Téléphone",
      RO: "Număr de Telefon",
    },
    address: {
      EN: "Address",
      ES: "Dirección",
      FR: "Adresse",
      RO: "Adresă",
    },
  },
  kybStatusMessages: {
    approved: {
      EN: "Approved",
      ES: "Aprobado",
      FR: "Approuvé",
      RO: "Aprobat",
    },
    declined: {
      EN: "Declined",
      ES: "Rechazado",
      FR: "Refusé",
      RO: "Respins",
    },
    notStarted: {
      EN: "Not Started",
      ES: "No Comenzado",
      FR: "Non Commencé",
      RO: "Neînceput",
    },
    timedOut: {
      EN: "Timed Out",
      ES: "Tiempo Agotado",
      FR: "Temps Écoulé",
      RO: "Expirat",
    },
    startKyb: {
      EN: "Start KYB",
      ES: "Iniciar KYB",
      FR: "Commencer KYB",
      RO: "Începeți KYB",
    },
  },
  complianceStatusMessages: {
    approved: {
      EN: "Approved",
      ES: "Aprobado",
      FR: "Approuvé",
      RO: "Aprobat",
    },
    disapproved: {
      EN: "Disapproved",
      ES: "Rechazado",
      FR: "Non Approuvé",
      RO: "Respins",
    },
    pending: {
      EN: "Pending",
      ES: "Pendiente",
      FR: "En Attente",
      RO: "În Așteptare",
    },
  },
  settings: {
    acceptNonStablecoin: {
      EN: "Accept non-stable coin for payment",
      ES: "Aceptar monedas no estables para el pago",
      FR: "Accepter les cryptomonnaies non stables pour le paiement",
      RO: "Acceptați monede instabile pentru plată",
    },
    tooltip: {
      EN: "Enable this option to allow customers to pay with any cryptocurrency, including non-stable coins that may experience significant price volatility. When disabled, only stablecoins with more stable values are accepted for payments.",
      ES: "Habilite esta opción para permitir que los clientes paguen con cualquier criptomoneda, incluidas las monedas no estables que pueden experimentar una volatilidad significativa en el precio. Cuando está deshabilitado, solo se aceptan monedas estables con valores más estables para los pagos.",
      FR: "Activez cette option pour permettre aux clients de payer avec n'importe quelle cryptomonnaie, y compris les cryptomonnaies non stables pouvant subir une volatilité importante des prix. Lorsqu'elle est désactivée, seules les cryptomonnaies stables sont acceptées pour les paiements.",
      RO: "Activați această opțiune pentru a permite clienților să plătească cu orice criptomonedă, inclusiv monede instabile care pot experimenta o volatilitate semnificativă a prețului. Când este dezactivată, sunt acceptate doar monedele stabile cu valori mai stabile pentru plăți.",
    },
  },
  bankDetail: {
    connectBank: {
      EN: "Connect Bank",
      ES: "Conectar Banco",
      FR: "Connecter une Banque",
      RO: "Conectați Banca",
    },
    accountName: {
      EN: "Account Name",
      ES: "Nombre de la Cuenta",
      FR: "Nom du Compte",
      RO: "Numele Contului",
    },
    iban: {
      EN: "IBAN",
      ES: "IBAN",
      FR: "IBAN",
      RO: "IBAN",
    },
    bic: {
      EN: "BIC",
      ES: "BIC",
      FR: "BIC",
      RO: "BIC",
    },
  },
  toastMessages: {
    serverError: {
      EN: "Server error.",
      ES: "Error del servidor.",
      FR: "Erreur du serveur.",
      RO: "Eroare de server.",
    },
    bankConnected: {
      EN: "Bank connected successfully",
      ES: "Banco conectado con éxito",
      FR: "Banque connectée avec succès",
      RO: "Banca conectată cu succes",
    },
    settingChanged: {
      EN: "Setting changed successfully",
      ES: "Configuración cambiada con éxito",
      FR: "Paramètre modifié avec succès",
      RO: "Setare modificată cu succes",
    },
  },
  bankModal: {
    title: {
      EN: "Your Bank Details",
      ES: "Tus Detalles Bancarios",
      FR: "Vos Détails Bancaires",
      RO: "Detaliile Băncii Tale",
    },
    labels: {
      bankAccount: {
        EN: "Bank Account",
        ES: "Cuenta Bancaria",
        FR: "Compte Bancaire",
        RO: "Cont Bancar",
      },
      bankIBAN: {
        EN: "Bank IBAN",
        ES: "IBAN Bancario",
        FR: "IBAN Bancaire",
        RO: "IBAN Bancar",
      },
      bankBIC: {
        EN: "Bank BIC",
        ES: "BIC Bancario",
        FR: "BIC Bancaire",
        RO: "BIC Bancar",
      },
    },
    errors: {
      fieldRequired: {
        EN: "This field required.",
        ES: "Este campo es obligatorio.",
        FR: "Ce champ est requis.",
        RO: "Acest câmp este obligatoriu.",
      },
      invalidIBAN: {
        EN: "Invalid Bank IBAN.",
        ES: "IBAN Bancario no válido.",
        FR: "IBAN Bancaire invalide.",
        RO: "IBAN Bancar invalid.",
      },
      invalidBIC: {
        EN: "Invalid Bank BIC.",
        ES: "BIC Bancario no válido.",
        FR: "BIC Bancaire invalide.",
        RO: "BIC Bancar invalid.",
      },
    },
    buttons: {
      save: {
        EN: "Save",
        ES: "Guardar",
        FR: "Sauvegarder",
        RO: "Salvează",
      },
    },
  },
};

export const dictionaryOrder = {
  agent: {
    EN: "Agent",
    ES: "Agente",
    FR: "Agent",
    RO: "Agent",
  },
  headings: {
    paymentOrders: {
      EN: "Payment Orders",
      ES: "Órdenes de Pago",
      FR: "Ordres de Paiement",
      RO: "Ordine de Plată",
    },
  },
  placeholders: {
    search: {
      EN: "Search by payer and reference",
      ES: "Buscar por pagador y referencia",
      FR: "Rechercher par payeur et référence",
      RO: "Căutați după plătitor și referință",
    },
  },
  tableHeaders: {
    payer: {
      EN: "Payer",
      ES: "Pagador",
      FR: "Payeur",
      RO: "Plătitor",
    },
    amount: {
      EN: "Amount",
      ES: "Monto",
      FR: "Montant",
      RO: "Sumă",
    },
    reference: {
      EN: "Reference",
      ES: "Referencia",
      FR: "Référence",
      RO: "Referință",
    },
    state: {
      EN: "State",
      ES: "Estado",
      FR: "État",
      RO: "Stare",
    },
    date: {
      EN: "Date",
      ES: "Fecha",
      FR: "Date",
      RO: "Data",
    },
    creator: {
      EN: "Creator",
      ES: "Creador",
      FR: "Créateur",
      RO: "Creator",
    },
    actions: {
      EN: "Actions",
      ES: "Acciones",
      FR: "Actions",
      RO: "Acțiuni",
    },
  },
  messages: {
    noOrders: {
      EN: "No Order Links",
      ES: "No hay enlaces de órdenes",
      FR: "Aucun lien de commande",
      RO: "Nu există linkuri pentru comenzi",
    },
    generatedSuccess: {
      EN: "Generated new link successfully.",
      ES: "Enlace nuevo generado exitosamente.",
      FR: "Nouveau lien généré avec succès.",
      RO: "Link nou generat cu succes.",
    },
    orderDeleted: {
      EN: "Order deleted successfully.",
      ES: "Orden eliminada con éxito.",
      FR: "Commande supprimée avec succès.",
      RO: "Comandă ștearsă cu succes.",
    },
    orderCancelled: {
      EN: "Order cancelled successfully.",
      ES: "Orden cancelada con éxito.",
      FR: "Commande annulée avec succès.",
      RO: "Comandă anulată cu succes.",
    },
    serverError: {
      EN: "Server error.",
      ES: "Error del servidor.",
      FR: "Erreur du serveur.",
      RO: "Eroare de server.",
    },
  },
  buttons: {
    generateNew: {
      EN: "Generate New",
      ES: "Generar Nuevo",
      FR: "Générer Nouveau",
      RO: "Generați Nou",
    },
  },
  controlModal: {
    title: {
      EN: "Generate New Order Link",
      ES: "Generar Nuevo Enlace de Orden",
      FR: "Générer un Nouveau Lien de Commande",
      RO: "Generați un Nou Link pentru Comandă",
    },
    labels: {
      amount: {
        EN: "Amount",
        ES: "Monto",
        FR: "Montant",
        RO: "Sumă",
      },
      currency: {
        EN: "Currency",
        ES: "Moneda",
        FR: "Devise",
        RO: "Monedă",
      },
      language: {
        EN: "Language",
        ES: "Idioma",
        FR: "Langue",
        RO: "Limbă",
      },
      reference: {
        EN: "Order Reference",
        ES: "Referencia de Orden",
        FR: "Référence de Commande",
        RO: "Referință Comandă",
      },
      firstName: {
        EN: "Customer First Name",
        ES: "Nombre del Cliente",
        FR: "Prénom du Client",
        RO: "Prenume Client",
      },
      lastName: {
        EN: "Customer Last Name",
        ES: "Apellido del Cliente",
        FR: "Nom de Famille du Client",
        RO: "Nume Client",
      },
      dob: {
        EN: "Customer Date of Birth",
        ES: "Fecha de Nacimiento del Cliente",
        FR: "Date de Naissance du Client",
        RO: "Data Nașterii Clientului",
      },
      pob: {
        EN: "Customer Place of Birth",
        ES: "Lugar de Nacimiento del Cliente",
        FR: "Lieu de Naissance du Client",
        RO: "Locul Nașterii Clientului",
      },
      email: {
        EN: "Customer Email",
        ES: "Correo Electrónico del Cliente",
        FR: "E-mail du Client",
        RO: "E-mail Client",
      },
      address: {
        EN: "Customer Address",
        ES: "Dirección del Cliente",
        FR: "Adresse du Client",
        RO: "Adresa Clientului",
      },
    },
    placeholders: {
      amount: {
        EN: "0",
        ES: "0",
        FR: "0",
        RO: "0",
      },
      reference: {
        EN: "Reference",
        ES: "Referencia",
        FR: "Référence",
        RO: "Referință",
      },
      firstName: {
        EN: "Customer First Name",
        ES: "Nombre del Cliente",
        FR: "Prénom du Client",
        RO: "Prenume Client",
      },
      lastName: {
        EN: "Customer Last Name",
        ES: "Apellido del Cliente",
        FR: "Nom de Famille du Client",
        RO: "Nume Client",
      },
      dob: {
        EN: "Customer Date of Birth",
        ES: "Fecha de Nacimiento del Cliente",
        FR: "Date de Naissance du Client",
        RO: "Data Nașterii Clientului",
      },
      pob: {
        EN: "Customer Place of Birth",
        ES: "Lugar de Nacimiento del Cliente",
        FR: "Lieu de Naissance du Client",
        RO: "Locul Nașterii Clientului",
      },
      email: {
        EN: "Email address",
        ES: "Dirección de correo electrónico",
        FR: "Adresse e-mail",
        RO: "Adresă de e-mail",
      },
      address: {
        EN: "Customer Address",
        ES: "Dirección del Cliente",
        FR: "Adresse du Client",
        RO: "Adresa Clientului",
      },
    },
    errors: {
      required: {
        EN: "This field required.",
        ES: "Este campo es obligatorio.",
        FR: "Ce champ est requis.",
        RO: "Acest câmp este obligatoriu.",
      },
      invalidEmail: {
        EN: "Invalid email.",
        ES: "Correo electrónico no válido.",
        FR: "E-mail invalide.",
        RO: "E-mail invalid.",
      },
    },
    buttons: {
      generate: {
        EN: "Generate",
        ES: "Generar",
        FR: "Générer",
        RO: "Generați",
      },
    },
  },
  deleteModal: {
    delete: {
      EN: "Are you sure you want to delete this item?",
      ES: "¿Estás segura de que quieres eliminar este artículo?",
      FR: "Êtes-vous sûr de vouloir supprimer cet élément ?",
      RO: "Sigur doriți să ștergeți acest articol?",
    },
    cancel: {
      EN: "Are you sure you want to cancel this item?",
      ES: "¿Estás segura de que deseas cancelar este artículo?",
      FR: "Êtes-vous sûr de vouloir annuler cet élément ?",
      RO: "Sigur doriți să anulați acest articol?",
    },
    buttons: {
      delete: {
        EN: "Delete",
        ES: "Eliminar",
        FR: "Supprimer",
        RO: "Ștergeți",
      },
      cancelOrder: {
        EN: "Cancel Order",
        ES: "Cancelar Orden",
        FR: "Annuler la Commande",
        RO: "Anulați Comanda",
      },
    },
  },
  orderDetail: {
    headings: {
      transactionDetail: {
        EN: "Transaction Detail",
        ES: "Detalle de la Transacción",
        FR: "Détail de la Transaction",
        RO: "Detalii Tranzacție",
      },
      summary: {
        EN: "Summary",
        ES: "Resumen",
        FR: "Résumé",
        RO: "Rezumat",
      },
      description: {
        EN: "Description",
        ES: "Descripción",
        FR: "Description",
        RO: "Descriere",
      },
      payerInfo: {
        EN: "Payer Info",
        ES: "Información del Pagador",
        FR: "Informations du Payeur",
        RO: "Informații Plătitor",
      },
      transactionStatus: {
        EN: "Transaction Status",
        ES: "Estado de la Transacción",
        FR: "Statut de la Transaction",
        RO: "Stare Tranzacție",
      },
    },
    labels: {
      orderId: {
        EN: "Order ID",
        ES: "ID de la Orden",
        FR: "ID de Commande",
        RO: "ID Comandă",
      },
      orderLink: {
        EN: "Order Link",
        ES: "Enlace de la Orden",
        FR: "Lien de Commande",
        RO: "Link Comandă",
      },
      amount: {
        EN: "Amount",
        ES: "Monto",
        FR: "Montant",
        RO: "Sumă",
      },
      createdAt: {
        EN: "Created At",
        ES: "Creado En",
        FR: "Créé Le",
        RO: "Creat La",
      },
      createdBy: {
        EN: "Created By",
        ES: "Creado Por",
        FR: "Créé Par",
        RO: "Creat De",
      },
      email: {
        EN: "Email",
        ES: "Correo Electrónico",
        FR: "E-mail",
        RO: "E-mail",
      },
      name: {
        EN: "Name",
        ES: "Nombre",
        FR: "Nom",
        RO: "Nume",
      },
      address: {
        EN: "Address",
        ES: "Dirección",
        FR: "Adresse",
        RO: "Adresă",
      },
      dob: {
        EN: "Date of Birth",
        ES: "Fecha de Nacimiento",
        FR: "Date de Naissance",
        RO: "Data Nașterii",
      },
      pob: {
        EN: "Place of Birth",
        ES: "Lugar de Nacimiento",
        FR: "Lieu de Naissance",
        RO: "Locul Nașterii",
      },
      status: {
        EN: "Status",
        ES: "Estado",
        FR: "Statut",
        RO: "Stare",
      },
      paymentAddress: {
        EN: "Payment Address",
        ES: "Dirección de Pago",
        FR: "Adresse de Paiement",
        RO: "Adresă de Plată",
      },
      paymentAmount: {
        EN: "Payment Amount",
        ES: "Monto del Pago",
        FR: "Montant du Paiement",
        RO: "Sumă Plată",
      },
      transactionId: {
        EN: "Transaction ID",
        ES: "ID de la Transacción",
        FR: "ID de Transaction",
        RO: "ID Tranzacție",
      },
    },
    messages: {
      loading: {
        EN: "Loading...",
        ES: "Cargando...",
        FR: "Chargement...",
        RO: "Se încarcă...",
      },
      error: {
        EN: "Something went wrong. Please check the link again.",
        ES: "Algo salió mal. Por favor revisa el enlace nuevamente.",
        FR: "Une erreur s'est produite. Veuillez vérifier à nouveau le lien.",
        RO: "Ceva nu a mers bine. Vă rugăm să verificați din nou linkul.",
      },
      na: {
        EN: "N/A",
        ES: "N/D",
        FR: "N/A",
        RO: "N/A",
      },
      serverError: {
        EN: "Server error.",
        ES: "Error del servidor.",
        FR: "Erreur du serveur.",
        RO: "Eroare de server.",
      },
    },
  },
};

export const dictionaryWithdraw = {
  withdrawPage: {
    headings: {
      title: {
        EN: "Withdraw",
        ES: "Retirar",
        FR: "Retirer",
        RO: "Retragere",
      },
      balances: {
        EN: "My Balances",
        ES: "Mis Saldos",
        FR: "Mes Soldes",
        RO: "Soldurile Mele",
      },
    },
    tableHeaders: {
      withdrawId: {
        EN: "Withdraw ID",
        ES: "ID de Retiro",
        FR: "ID de Retrait",
        RO: "ID Retragere",
      },
      amount: {
        EN: "Amount",
        ES: "Monto",
        FR: "Montant",
        RO: "Sumă",
      },
      fee: {
        EN: "Fee",
        ES: "Comisión",
        FR: "Frais",
        RO: "Taxă",
      },
      status: {
        EN: "Status",
        ES: "Estado",
        FR: "Statut",
        RO: "Stare",
      },
      date: {
        EN: "Date",
        ES: "Fecha",
        FR: "Date",
        RO: "Data",
      },
      actions: {
        EN: "Actions",
        ES: "Acciones",
        FR: "Actions",
        RO: "Acțiuni",
      },
    },
    buttons: {
      withdraw: {
        EN: "Withdraw",
        ES: "Retirar",
        FR: "Retirer",
        RO: "Retragere",
      },
    },
    messages: {
      noHistory: {
        EN: "No History",
        ES: "Sin Historial",
        FR: "Aucun Historique",
        RO: "Fără Istoric",
      },
      loading: {
        EN: "Loading...",
        ES: "Cargando...",
        FR: "Chargement...",
        RO: "Se încarcă...",
      },
      statusChanged: {
        EN: "Status changed successfully.",
        ES: "Estado cambiado con éxito.",
        FR: "Statut modifié avec succès.",
        RO: "Starea a fost modificată cu succes.",
      },
      serverError: {
        EN: "Server error.",
        ES: "Error del servidor.",
        FR: "Erreur du serveur.",
        RO: "Eroare de server.",
      },
    },
    pagination: {
      prev: {
        EN: "Previous",
        ES: "Anterior",
        FR: "Précédent",
        RO: "Anterior",
      },
      next: {
        EN: "Next",
        ES: "Siguiente",
        FR: "Suivant",
        RO: "Următor",
      },
    },
  },
  requestModal: {
    title: {
      EN: "Request Withdraw",
      ES: "Solicitar Retiro",
      FR: "Demander un Retrait",
      RO: "Solicitați Retragere",
    },
    labels: {
      currency: {
        EN: "Currency",
        ES: "Moneda",
        FR: "Devise",
        RO: "Monedă",
      },
      amount: {
        EN: "Amount",
        ES: "Monto",
        FR: "Montant",
        RO: "Sumă",
      },
    },
    placeholders: {
      selectCurrency: {
        EN: "Select Currency",
        ES: "Seleccionar Moneda",
        FR: "Sélectionner une Devise",
        RO: "Selectați Moneda",
      },
    },
    errors: {
      currencyRequired: {
        EN: "Currency required.",
        ES: "Moneda requerida.",
        FR: "Devise requise.",
        RO: "Moneda este obligatorie.",
      },
      amountRequired: {
        EN: "Amount required.",
        ES: "Monto requerido.",
        FR: "Montant requis.",
        RO: "Suma este obligatorie.",
      },
      insufficientBalance: {
        EN: "Sufficient balance.",
        ES: "Saldo insuficiente.",
        FR: "Solde insuffisant.",
        RO: "Sold insuficient.",
      },
      connectBank: {
        EN: "Please connect your bank detail first.",
        ES: "Por favor, conecta los detalles de tu banco primero.",
        FR: "Veuillez d'abord connecter les détails de votre banque.",
        RO: "Vă rugăm să conectați mai întâi detaliile băncii.",
      },
      somethingWrong: {
        EN: "Something went wrong.",
        ES: "Algo salió mal.",
        FR: "Une erreur s'est produite.",
        RO: "Ceva nu a mers bine.",
      },
    },
    buttons: {
      connectBank: {
        EN: "Connect Bank",
        ES: "Conectar Banco",
        FR: "Connecter une Banque",
        RO: "Conectați Banca",
      },
      requestWithdraw: {
        EN: "Request Withdraw",
        ES: "Solicitar Retiro",
        FR: "Demander un Retrait",
        RO: "Solicitați Retragere",
      },
    },
    messages: {
      withdrawSuccess: {
        EN: "Withdraw requested successfully.",
        ES: "Retiro solicitado con éxito.",
        FR: "Retrait demandé avec succès.",
        RO: "Retragerea a fost solicitată cu succes.",
      },
    },
  },
};

export const dictionaryAgent = {
  agentsPage: {
    headings: {
      title: {
        EN: "Agents",
        ES: "Agentes",
        FR: "Agents",
        RO: "Agenți",
      },
    },
    placeholders: {
      search: {
        EN: "Search by name and email",
        ES: "Buscar por nombre y correo electrónico",
        FR: "Rechercher par nom et e-mail",
        RO: "Căutați după nume și e-mail",
      },
    },
    buttons: {
      inviteAgent: {
        EN: "Invite agent",
        ES: "Invitar agente",
        FR: "Inviter un agent",
        RO: "Invitați agent",
      },
    },
    tableHeaders: {
      name: {
        EN: "Name",
        ES: "Nombre",
        FR: "Nom",
        RO: "Nume",
      },
      email: {
        EN: "Email",
        ES: "Correo Electrónico",
        FR: "E-mail",
        RO: "E-mail",
      },
      location: {
        EN: "Location",
        ES: "Ubicación",
        FR: "Emplacement",
        RO: "Locație",
      },
      phone: {
        EN: "Phone",
        ES: "Teléfono",
        FR: "Téléphone",
        RO: "Telefon",
      },
      actions: {
        EN: "Actions",
        ES: "Acciones",
        FR: "Actions",
        RO: "Acțiuni",
      },
    },
    messages: {
      noAgents: {
        EN: "No Agents",
        ES: "No hay Agentes",
        FR: "Aucun Agent",
        RO: "Nu există agenți",
      },
      agentRemoved: {
        EN: "Agent removed successfully.",
        ES: "Agente eliminado con éxito.",
        FR: "Agent supprimé avec succès.",
        RO: "Agent eliminat cu succes.",
      },
      agentRestored: {
        EN: "Agent re-enabled successfully.",
        ES: "Agente restaurado con éxito.",
        FR: "Agent réactivé avec succès.",
        RO: "Agent reactivat cu succes.",
      },
      serverError: {
        EN: "Server error.",
        ES: "Error del servidor.",
        FR: "Erreur du serveur.",
        RO: "Eroare de server.",
      },
    },
  },
  activeModal: {
    message: {
      EN: "Are you sure you want to activate this agent?",
      ES: "¿Estás seguro de que deseas activar a este agente?",
      FR: "Êtes-vous sûr de vouloir activer cet agent ?",
      RO: "Sigur doriți să activați acest agent?",
    },
    buttons: {
      activate: {
        EN: "Activate Agent",
        ES: "Activar Agente",
        FR: "Activer l'Agent",
        RO: "Activați Agent",
      },
    },
  },
  deleteModal: {
    message: {
      EN: "Are you sure you want to remove this agent?",
      ES: "¿Estás seguro de que deseas eliminar a este agente?",
      FR: "Êtes-vous sûr de vouloir supprimer cet agent ?",
      RO: "Sigur doriți să eliminați acest agent?",
    },
    buttons: {
      remove: {
        EN: "Remove Agent",
        ES: "Eliminar Agente",
        FR: "Supprimer l'Agent",
        RO: "Eliminați Agent",
      },
    },
  },
  inviteModal: {
    title: {
      EN: "Invite agent",
      ES: "Invitar agente",
      FR: "Inviter un agent",
      RO: "Invitați agent",
    },
    labels: {
      agentEmail: {
        EN: "Agent email",
        ES: "Correo del agente",
        FR: "E-mail de l'agent",
        RO: "E-mail agent",
      },
    },
    placeholders: {
      agentEmail: {
        EN: "Agent email",
        ES: "Correo del agente",
        FR: "E-mail de l'agent",
        RO: "E-mail agent",
      },
    },
    errors: {
      emailRequired: {
        EN: "Agent email required.",
        ES: "Correo del agente requerido.",
        FR: "E-mail de l'agent requis.",
        RO: "E-mailul agentului este obligatoriu.",
      },
      invalidEmail: {
        EN: "Invalid email.",
        ES: "Correo electrónico no válido.",
        FR: "E-mail invalide.",
        RO: "E-mail invalid.",
      },
      connectBank: {
        EN: "Please connect your bank detail first.",
        ES: "Por favor, conecta los detalles de tu banco primero.",
        FR: "Veuillez d'abord connecter les détails de votre banque.",
        RO: "Vă rugăm să conectați mai întâi detaliile băncii.",
      },
      somethingWrong: {
        EN: "Something went wrong.",
        ES: "Algo salió mal.",
        FR: "Une erreur s'est produite.",
        RO: "Ceva nu a mers bine.",
      },
    },
    messages: {
      invitationSent: {
        EN: "Invitation email sent successfully.",
        ES: "Correo de invitación enviado con éxito.",
        FR: "E-mail d'invitation envoyé avec succès.",
        RO: "E-mail de invitație trimis cu succes.",
      },
    },
    buttons: {
      connectBank: {
        EN: "Connect Bank",
        ES: "Conectar Banco",
        FR: "Connecter une Banque",
        RO: "Conectați Banca",
      },
      sendInvite: {
        EN: "Send Invite Email",
        ES: "Enviar Correo de Invitación",
        FR: "Envoyer l'E-mail d'Invitation",
        RO: "Trimiteți e-mail de invitație",
      },
    },
  },
};

export const dictionaryPayment = {
  toast: {
    serverError: {
      EN: "Server error.",
      ES: "Error del servidor.",
      FR: "Erreur du serveur.",
      RO: "Eroare de server.",
    },
    copied: {
      EN: "Copied successfully.",
      ES: "Copiado exitosamente.",
      FR: "Copié avec succès.",
      RO: "Copiat cu succes.",
    },
    transactionExpired: {
      EN: "This transaction has been expired.",
      ES: "Esta transacción ha expirado.",
      FR: "Cette transaction a expiré.",
      RO: "Această tranzacție a expirat.",
    },
    transactionCompleted: {
      EN: "Transaction completed successfully.",
      ES: "Transacción completada con éxito.",
      FR: "Transaction terminée avec succès.",
      RO: "Tranzacția a fost finalizată cu succes.",
    },
  },
  status: {
    requested: {
      EN: "Payment is requested",
      ES: "Se ha solicitado el pago",
      FR: "Le paiement est demandé",
      RO: "Plata este solicitată",
    },
    received: {
      EN: "Payment is received, awaiting confirmation",
      ES: "El pago ha sido recibido, esperando confirmación",
      FR: "Le paiement a été reçu, en attente de confirmation",
      RO: "Plata a fost primită, în așteptarea confirmării",
    },
    completed: {
      EN: "Payment completed",
      ES: "Pago completado",
      FR: "Paiement terminé",
      RO: "Plata finalizată",
    },
    expired: {
      EN: "This transaction already has been expired!",
      ES: "¡Esta transacción ya ha expirado!",
      FR: "Cette transaction a déjà expiré !",
      RO: "Această tranzacție a expirat deja!",
    },
    cancelled: {
      EN: "This transaction already has been cancelled!",
      ES: "¡Esta transacción ya ha sido cancelada!",
      FR: "Cette transaction a déjà été annulée !",
      RO: "Această tranzacție a fost deja anulată!",
    },
  },
  labels: {
    transactionHash: {
      EN: "Transaction Hash",
      ES: "Hash de la transacción",
      FR: "Hash de la transaction",
      RO: "Hash-ul tranzacției",
    },
    network: {
      EN: "Network",
      ES: "Red",
      FR: "Réseau",
      RO: "Rețea",
    },
    amount: {
      EN: "Amount",
      ES: "Cantidad",
      FR: "Montant",
      RO: "Sumă",
    },
    depositAddress: {
      EN: "Deposit Address",
      ES: "Dirección de depósito",
      FR: "Adresse de dépôt",
      RO: "Adresă de depunere",
    },
    confirmations: {
      EN: "Confirmations",
      ES: "Confirmaciones",
      FR: "Confirmations",
      RO: "Confirmări",
    },
    selectCurrency: {
      EN: "Select currency you want to pay",
      ES: "Seleccione la moneda que desea pagar",
      FR: "Sélectionnez la devise que vous souhaitez payer",
      RO: "Selectați moneda cu care doriți să plătiți",
    },
    selectNetwork: {
      EN: "Select Network",
      ES: "Seleccione la red",
      FR: "Sélectionnez le réseau",
      RO: "Selectați Rețeaua",
    },
    warning: {
      EN: "Be careful when choosing a network and currency when sending cryptocurrency. If you send cryptocurrency over the wrong network or wrong currency, then your money will not be credited or returned.",
      ES: "Tenga cuidado al elegir una red y moneda al enviar criptomonedas. Si envía criptomonedas a través de la red o moneda equivocada, su dinero no será acreditado ni devuelto.",
      FR: "Soyez prudent lors du choix d'un réseau et d'une devise lors de l'envoi de cryptomonnaies. Si vous envoyez des cryptomonnaies sur le mauvais réseau ou la mauvaise devise, votre argent ne sera ni crédité ni remboursé.",
      RO: "Fiți atent când alegeți o rețea și o monedă pentru a trimite criptomonede. Dacă trimiteți criptomonede pe rețeaua greșită sau moneda greșită, banii dvs. nu vor fi creditați sau returnați.",
    },
  },
  buttons: {
    continue: {
      EN: "Continue",
      ES: "Continuar",
      FR: "Continuer",
      RO: "Continuați",
    },
    goBack: {
      EN: "Go Back",
      ES: "Volver",
      FR: "Retourner",
      RO: "Înapoi",
    },
    payNow: {
      EN: "Pay Now",
      ES: "Paga ahora",
      FR: "Payez maintenant",
      RO: "Plătește acum",
    },
    connectWallet: {
      EN: "Connect Wallet",
      ES: "Conectar billetera",
      FR: "RetournConnecter le portefeuilleer",
      RO: "Conectează portofelul",
    },
    confirming: {
      EN: "Confirming...",
      ES: "Confirmando…",
      FR: "Confirmation en cours…",
      RO: "Se confirmă…",
    },
  },
  transactionCompletedMessage: {
    EN: "Transaction has been completed successfully!",
    ES: "¡La transacción se ha completado con éxito!",
    FR: "La transaction a été réalisée avec succès !",
    RO: "Tranzacția a fost finalizată cu succes!",
  },
  paymentDescription: {
    hasRequested: {
      EN: "has requested",
      ES: "ha solicitado a",
      FR: "a demandé",
      RO: "a solicitat",
    },
    toPay: {
      EN: "to pay",
      ES: "pagar",
      FR: "payer",
      RO: "să plătească",
    },
    EN: "${payeeName} has requested ${customerName} to pay ${amount} ${currencySymbol}.",
    ES: "${payeeName} ha solicitado a ${customerName} pagar ${amount} ${currencySymbol}.",
    FR: "${payeeName} a demandé à ${customerName} de payer ${amount} ${currencySymbol}.",
    RO: "${payeeName} a solicitat ${customerName} să plătească ${amount} ${currencySymbol}.",
  },
  paymentDetails: {
    paid: {
      EN: "You have paid",
      ES: "Has pagado",
      FR: "Vous avez payé",
      RO: "Ați plătit",
    },
    to: {
      EN: "to",
      ES: "a",
      FR: "à",
      RO: "către",
    },
    EN: "You have paid {amount} {currencySymbol} to {payeeName}.",
    ES: "Has pagado {amount} {currencySymbol} a {payeeName}.",
    FR: "Vous avez payé {amount} {currencySymbol} à {payeeName}.",
    RO: "Ați plătit {amount} {currencySymbol} către {payeeName}.",
  },
};

export const dictionaryInvitation = {
  title: {
    EN: "Agent Invitation",
    ES: "Invitación de Agente",
    FR: "Invitation d'Agent",
    RO: "Invitație pentru Agent",
  },
  subtitle1: {
    EN: "You were invited by",
    ES: "Has sido invitado por",
    FR: "Vous avez été invité par",
    RO: "Ați fost invitat de",
  },
  subtitle2: {
    EN: ". Please complete this form to be an agent.",
    ES: ". Por favor, completa este formulario para ser un agente.",
    FR: ". Veuillez compléter ce formulaire pour devenir un agent.",
    RO: ". Vă rugăm să completați acest formular pentru a deveni agent.",
  },
  status: {
    expired: {
      EN: "This invitation has been expired.",
      ES: "Esta invitación ha expirado.",
      FR: "Cette invitation a expiré.",
      RO: "Această invitație a expirat.",
    },
    completed: {
      EN: "This invitation was already completed.",
      ES: "Esta invitación ya ha sido completada.",
      FR: "Cette invitation a déjà été complétée.",
      RO: "Această invitație a fost deja completată.",
    },
  },
  fields: {
    agentName: {
      EN: "Agent Name",
      ES: "Nombre del Agente",
      FR: "Nom de l'Agent",
      RO: "Nume Agent",
    },
    country: {
      EN: "Country",
      ES: "País",
      FR: "Pays",
      RO: "Țară",
    },
    phone: {
      EN: "Mobile Number",
      ES: "Número de Móvil",
      FR: "Numéro de Téléphone",
      RO: "Număr de Telefon Mobil",
    },
    email: {
      EN: "Email Address",
      ES: "Dirección de Correo Electrónico",
      FR: "Adresse E-mail",
      RO: "Adresă de E-mail",
    },
    password: {
      EN: "Password",
      ES: "Contraseña",
      FR: "Mot de Passe",
      RO: "Parolă",
    },
    confirmPassword: {
      EN: "Confirm Password",
      ES: "Confirmar Contraseña",
      FR: "Confirmer le Mot de Passe",
      RO: "Confirmați Parola",
    },
  },
  errors: {
    required: {
      EN: "This field required.",
      ES: "Este campo es obligatorio.",
      FR: "Ce champ est requis.",
      RO: "Acest câmp este obligatoriu.",
    },
    invalidEmail: {
      EN: "Invalid email.",
      ES: "Correo electrónico no válido.",
      FR: "E-mail invalide.",
      RO: "E-mail invalid.",
    },
    invalidPhone: {
      EN: "Incorrect phone number",
      ES: "Número de teléfono incorrecto",
      FR: "Numéro de téléphone incorrect",
      RO: "Număr de telefon incorect",
    },
    passwordMismatch: {
      EN: "Password confirmation does not match.",
      ES: "La confirmación de la contraseña no coincide.",
      FR: "La confirmation du mot de passe ne correspond pas.",
      RO: "Confirmarea parolei nu corespunde.",
    },
    duplicateUser: {
      EN: "User is already exist.",
      ES: "El usuario ya existe.",
      FR: "L'utilisateur existe déjà.",
      RO: "Utilizatorul există deja.",
    },
    registerFailed: {
      EN: "Register failed.",
      ES: "El registro falló.",
      FR: "L'enregistrement a échoué.",
      RO: "Înregistrarea a eșuat.",
    },
    generalError: {
      EN: "Something went wrong.",
      ES: "Algo salió mal.",
      FR: "Une erreur s'est produite.",
      RO: "Ceva nu a mers bine.",
    },
  },
  toast: {
    invitationCompleted: {
      EN: "Invitation completed successfully.",
      ES: "Invitación completada con éxito.",
      FR: "Invitation complétée avec succès.",
      RO: "Invitația a fost completată cu succes.",
    },
    serverError: {
      EN: "Server error.",
      ES: "Error del servidor.",
      FR: "Erreur du serveur.",
      RO: "Eroare de server.",
    },
  },
  buttons: {
    continue: {
      EN: "Continue",
      ES: "Continuar",
      FR: "Continuer",
      RO: "Continuați",
    },
  },
};
