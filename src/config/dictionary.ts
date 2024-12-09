export const dictionaryGlobal = {
  passwordErrors: {
    digit: {
      EN: "Passwords must have at least one digit ('0'-'9').",
      ES: "Las contraseñas deben tener al menos un dígito ('0'-'9').",
      FR: "Les mots de passe doivent contenir au moins un chiffre ('0'-'9').",
    },
    nonAlphanumeric: {
      EN: "Passwords must have at least one non-alphanumeric character.",
      ES: "Las contraseñas deben tener al menos un carácter no alfanumérico.",
      FR: "Les mots de passe doivent contenir au moins un caractère non alphanumérique.",
    },
    uppercase: {
      EN: "Passwords must have at least one uppercase letter ('A'-'Z').",
      ES: "Las contraseñas deben tener al menos una letra mayúscula ('A'-'Z').",
      FR: "Les mots de passe doivent contenir au moins une lettre majuscule ('A'-'Z').",
    },
    lowercase: {
      EN: "Passwords must have at least one lowercase letter ('a'-'z').",
      ES: "Las contraseñas deben tener al menos una letra minúscula ('a'-'z').",
      FR: "Les mots de passe doivent contenir au moins une lettre minuscule ('a'-'z').",
    },
    minLength: {
      EN: "Passwords must be at least 6 characters.",
      ES: "Las contraseñas deben tener al menos 6 caracteres.",
      FR: "Les mots de passe doivent contenir au moins 6 caractères.",
    },
  },
  all: {
    EN: "All",
    ES: "Todos",
    FR: "Tous",
  },
  filtered: {
    EN: "Filtered",
    ES: "Filtrado",
    FR: "Filtré",
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
    },
    label: {
      EN: "Filter by Status:",
      ES: "Filtrar por Estado:",
      FR: "Filtrer par statut :",
    },
  },
  creatorFilter: {
    label: {
      EN: "Filter by Creators:",
      ES: "Filtrar por creadoras:",
      FR: "Filtrer par créateurs :",
    },
  },
  timeFormat: {
    now: {
      EN: "now",
      ES: "ahora",
      FR: "maintenant",
    },
    dayAgo: {
      EN: "${number} day${s} ago",
      ES: "hace ${number} día${s}",
      FR: "il y a ${number} jour${s}",
    },
    hourAgo: {
      EN: "${number} hour${s} ago",
      ES: "hace ${number} hora${s}",
      FR: "il y a ${number} heure${s}",
    },
    minuteAgo: {
      EN: "${number} minute${s} ago",
      ES: "hace ${number} minuto${s}",
      FR: "il y a ${number} minute${s}",
    },
    secondAgo: {
      EN: "${number} second${s} ago",
      ES: "hace ${number} segundo${s}",
      FR: "il y a ${number} seconde${s}",
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
  },
};

export const dictionaryLanding = {
  dashboard: { EN: "Dashboard", ES: "Panel", FR: "Tableau de bord" },
  contact: { EN: "Contact Us", ES: "Contáctenos", FR: "Contactez-nous" },
  signin: { EN: "Sign In", ES: "Iniciar sesión", FR: "Se connecter" },
  account: { EN: "My Account", ES: "Mi cuenta", FR: "Mon compte" },
  logout: { EN: "Logout", ES: "Cerrar sesión", FR: "Se déconnecter" },
  hero: {
    title: {
      EN: "Empower Your Business with Secure and Compliant Crypto Payments",
      ES: "Potencie su negocio con pagos criptográficos seguros y compatibles",
      FR: "Dynamisez votre entreprise avec des paiements cryptographiques sécurisés et conformes",
    },
    subtitle: {
      EN: "At Stratis Money Service, we bridge the gap between traditional finance and the digital world. Regulated by the Bank of Spain (SEPBLAC) with a VASP registration, we provide a secure platform that allows your customers to pay in crypto, ensuring compliance and eliminating uncertainty.",
      ES: "En Stratis Money Service, cerramos la brecha entre las finanzas tradicionales y el mundo digital. Regulados por el Banco de España (SEPBLAC) y con registro VASP, ofrecemos una plataforma segura que permite a sus clientes pagar en criptomonedas, garantizando el cumplimiento normativo y eliminando la incertidumbre.",
      FR: "Chez Stratis Money Service, nous comblons le fossé entre la finance traditionnelle et le monde numérique. Réglementé par la Banque d'Espagne (SEPBLAC) avec un enregistrement VASP, nous fournissons une plateforme sécurisée permettant à vos clients de payer en crypto, garantissant la conformité et éliminant l'incertitude.",
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
    },
  },
  feature: {
    title: { EN: "Why Choose Us", ES: "¿Por qué elegirnos?", FR: "Pourquoi nous choisir ?" },
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
    },
  },
  process: {
    title: {
      EN: "How our platform works",
      ES: "Cómo funciona nuestra plataforma",
      FR: "Comment fonctionne notre plateforme",
    },
    subtitle: {
      EN: "Start accepting crypto payments in just a few simple steps. Our streamlined process ensures your business is up and running quickly, with no hassle and full regulatory compliance.",
      ES: "Comience a aceptar pagos con criptomonedas en tan solo unos sencillos pasos. Nuestro proceso simplificado garantiza que su negocio esté en funcionamiento rápidamente, sin complicaciones y con pleno cumplimiento normativo.",
      FR: "Commencez à accepter les paiements en crypto en quelques étapes simples. Notre processus simplifié garantit que votre entreprise est opérationnelle rapidement, sans tracas et en pleine conformité réglementaire.",
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
          key: "Registre su negocio",
          text: "Regístrate y crea tu cuenta empresarial con nosotros en solo unos minutos",
        },
        {
          icon: "solar:check-circle-outline",
          key: "Verifica tu negocio",
          text: "Complete la verificación Conozca su Negocio para garantizar el cumplimiento de las regulaciones.",
        },
        {
          icon: "iconoir:link",
          key: "Generar enlace de pago",
          text: "Crea un enlace de pago a través de nuestra plataforma, lo compartiremos con tu cliente.",
        },
        {
          icon: "hugeicons:dollar-receive-01",
          key: "Recibir pagos y transferir fondos",
          text: "Una vez que su cliente paga, los fondos se liquidan instantáneamente y están listos para ser retirados a su cuenta bancaria comercial.",
        },
      ],
      FR: [
        {
          icon: "iconoir:square-cursor",
          key: "Enregistrer votre entreprise",
          text: "Inscrivez-vous et créez votre compte professionnel avec nous en quelques minutes",
        },
        {
          icon: "solar:check-circle-outline",
          key: "Vérifiez votre entreprise",
          text: "Terminez la vérification Know Your Business pour garantir la conformité avec les réglementations.",
        },
        {
          icon: "iconoir:link",
          key: "Générer un lien de paiement",
          text: "Créez un lien de paiement via notre plateforme, nous le partagerons avec votre client.",
        },
        {
          icon: "hugeicons:dollar-receive-01",
          key: "Recevez le paiement et transférez les fonds",
          text: "Une fois que votre client paie, les fonds sont immédiatement liquidés et prêts à être transférés sur votre compte bancaire professionnel.",
        },
      ],
    },
  },
  conclusion: {
    title: {
      EN: "Ready to Accept Crypto Payments?",
      ES: "¿Listo para aceptar pagos en criptomonedas?",
      FR: "Prêt à accepter les paiements en crypto ?",
    },
    subtitle: {
      EN: "Join the growing number of businesses embracing the future of payments. Get started with a secure, compliant solution today.",
      ES: "Únase al creciente número de empresas que adoptan el futuro de los pagos. Comience hoy mismo con una solución segura y que cumple con las normas.",
      FR: "Rejoignez le nombre croissant d'entreprises adoptant l'avenir des paiements. Commencez dès aujourd'hui avec une solution sécurisée et conforme.",
    },
    signup: { EN: "Sign Up Now", ES: "Regístrate ahora", FR: "Inscrivez-vous maintenant" },
  },
  term: { EN: "Terms & Conditions", ES: "Términos y condiciones", FR: "Conditions générales" },
  privacy: { EN: "Privacy Policy", ES: "política de privacidad", FR: "Politique de confidentialité" },
  copy: {
    EN: "© 2024 All right reserved",
    ES: "© 2024 Todos los derechos reservados",
    FR: "© 2024 Tous droits réservés",
  },
  logoutSuccess: {
    EN: "Logout successfully.",
    ES: "Cierre de sesión exitoso.",
    FR: "Déconnexion réussie.",
  },
};

export const dictionaryAuth = {
  login: {
    title: { EN: "Sign In Your Account", ES: "Iniciar sesión en su cuenta", FR: "Connectez-vous à votre compte" },
    subtitle: {
      EN: "Welcome to stratis money service. Enjoy now!",
      ES: "Bienvenido al servicio de dinero Stratis. ¡Disfrútelo ahora!",
      FR: "Bienvenue sur le service Stratis Money. Profitez-en maintenant !",
    },
    forgot: { EN: "Forgot Password?", ES: "¿Has olvidado tu contraseña?", FR: "Mot de passe oublié ?" },
    button: { EN: "Login with Email", ES: "Iniciar sesión con correo electrónico", FR: "Connexion par e-mail" },
    donhave: { EN: `Don't have your account?`, ES: "¿No tienes cuenta?", FR: "Vous n'avez pas de compte ?" },
    signup: { EN: "Sign Up", ES: "Regístrate", FR: "S'inscrire" },
    emailPlace: { EN: "Email Address", ES: "Dirección de correo electrónico", FR: "Adresse e-mail" },
    pwdPlace: { EN: "Password", ES: "Contraseña", FR: "Mot de passe" },
    errorRequire: { EN: "This field required.", ES: "Este campo es obligatorio.", FR: "Ce champ est requis." },
    errorInvalid: { EN: "Invalid email.", ES: "Correo electrónico no válido.", FR: "E-mail invalide." },
    emailNotFound: {
      EN: "Email not found.",
      ES: "Correo no encontrado.",
      FR: "E-mail non trouvé.",
    },
    incorrectPassword: {
      EN: "Incorrect password.",
      ES: "Contraseña incorrecta.",
      FR: "Mot de passe incorrect.",
    },
    toast: {
      success: {
        EN: "Logged in successfully.",
        ES: "Inicio de sesión exitoso.",
        FR: "Connexion réussie.",
      },
      failure: {
        EN: "Login failed.",
        ES: "Error al iniciar sesión.",
        FR: "Échec de la connexion.",
      },
      generalError: {
        EN: "Something went wrong.",
        ES: "Algo salió mal.",
        FR: "Une erreur s'est produite.",
      },
    },
  },
  register: {
    title: {
      EN: "Create Your Account",
      ES: "Crea tu cuenta",
      FR: "Créez votre compte",
    },
    subtitle: {
      EN: "Setting up an account takes only a few minutes.",
      ES: "Configurar una cuenta solo toma unos minutos.",
      FR: "Créer un compte ne prend que quelques minutes.",
    },
    placeholders: {
      name: {
        EN: "Company Name",
        ES: "Nombre de la empresa",
        FR: "Nom de l'entreprise",
      },
      industry: {
        EN: "Industry or Sector",
        ES: "Industria o Sector",
        FR: "Secteur ou industrie",
      },
      activity: {
        EN: "Type of Activity",
        ES: "Tipo de actividad",
        FR: "Type d'activité",
      },
      volume: {
        EN: "Expected Monthly Volume",
        ES: "Volumen mensual esperado",
        FR: "Volume mensuel attendu",
      },
      country: {
        EN: "Country",
        ES: "País",
        FR: "Pays",
      },
      phone: {
        EN: "Mobile Number",
        ES: "Número de teléfono móvil",
        FR: "Numéro de téléphone mobile",
      },
      email: {
        EN: "Email Address",
        ES: "Dirección de correo electrónico",
        FR: "Adresse e-mail",
      },
      password: {
        EN: "Password",
        ES: "Contraseña",
        FR: "Mot de passe",
      },
      confirmPassword: {
        EN: "Confirm Password",
        ES: "Confirmar contraseña",
        FR: "Confirmez le mot de passe",
      },
    },
    errors: {
      emailInvalid: {
        EN: "Invalid email.",
        ES: "Correo electrónico no válido.",
        FR: "E-mail invalide.",
      },
      emailRequired: {
        EN: "Email required.",
        ES: "Correo electrónico requerido.",
        FR: "E-mail requis.",
      },
      nameRequired: {
        EN: "Name required.",
        ES: "Nombre requerido.",
        FR: "Nom requis.",
      },
      fieldRequired: {
        EN: "This field required.",
        ES: "Este campo es obligatorio.",
        FR: "Ce champ est requis.",
      },
      countryRequired: {
        EN: "Country required.",
        ES: "País requerido.",
        FR: "Pays requis.",
      },
      phoneRequired: {
        EN: "Mobile phone required.",
        ES: "Teléfono móvil requerido.",
        FR: "Téléphone portable requis.",
      },
      phoneInvalid: {
        EN: "Incorrect phone number.",
        ES: "Número de teléfono incorrecto.",
        FR: "Numéro de téléphone incorrect.",
      },
      passwordRequired: {
        EN: "Password required.",
        ES: "Contraseña requerida.",
        FR: "Mot de passe requis.",
      },
      passwordInvalid: {
        EN: "Invalid password.",
        ES: "Contraseña no válida.",
        FR: "Mot de passe invalide.",
      },
      passwordMismatch: {
        EN: "Password confirmation does not match.",
        ES: "La confirmación de la contraseña no coincide.",
        FR: "La confirmation du mot de passe ne correspond pas.",
      },
      duplicateUser: {
        EN: "User is already exist.",
        ES: "El usuario ya existe.",
        FR: "L'utilisateur existe déjà.",
      },
    },
    button: {
      EN: "Register",
      ES: "Registrarse",
      FR: "S'inscrire",
    },
    alreadyHaveAccount: {
      EN: "Already have an account?",
      ES: "¿Ya tienes una cuenta?",
      FR: "Vous avez déjà un compte ?",
    },
    login: {
      EN: "Login",
      ES: "Iniciar sesión",
      FR: "Se connecter",
    },
  },
  forgotPassword: {
    title: {
      EN: "Forgot Password?",
      ES: "¿Olvidaste tu contraseña?",
      FR: "Mot de passe oublié ?",
    },
    subtitle: {
      EN: "Please enter your email address and we will send you a link to reset your password.",
      ES: "Por favor, introduce tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña.",
      FR: "Veuillez entrer votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.",
    },
    placeholders: {
      email: {
        EN: "Email Address",
        ES: "Dirección de correo electrónico",
        FR: "Adresse e-mail",
      },
    },
    errors: {
      emailRequired: {
        EN: "Email required.",
        ES: "Correo electrónico requerido.",
        FR: "E-mail requis.",
      },
      emailInvalid: {
        EN: "Invalid email.",
        ES: "Correo electrónico no válido.",
        FR: "E-mail invalide.",
      },
    },
    success: {
      emailSent: {
        EN: "Password reset email sent.",
        ES: "Correo de restablecimiento de contraseña enviado.",
        FR: "E-mail de réinitialisation du mot de passe envoyé.",
      },
    },
    noti: {
      success: {
        EN: "Password reset email sent.",
        ES: "Correo de restablecimiento de contraseña enviado.",
        FR: "E-mail de réinitialisation du mot de passe envoyé.",
      },
      fail: {
        EN: "Something went wrong.",
        ES: "Algo salió mal.",
        FR: "Une erreur s'est produite.",
      },
    },
    button: {
      EN: "Send Link",
      ES: "Enviar enlace",
      FR: "Envoyer le lien",
    },
  },
  verifySend: {
    title: {
      EN: "Verify Your Email",
      ES: "Verifica tu correo electrónico",
      FR: "Vérifiez votre e-mail",
    },
    subtitle0: {
      EN: "A verification email has been sent to ",
      ES: "Se ha enviado un correo electrónico de verificación a ",
      FR: "Un e-mail de vérification a été envoyé à ",
    },
    subtitle1: {
      EN: ". Please check your email inbox and click the link to verify your email.",
      ES: ". Por favor, revisa tu bandeja de entrada y haz clic en el enlace para verificar tu correo electrónico.",
      FR: ". Veuillez vérifier votre boîte de réception et cliquer sur le lien pour vérifier votre e-mail.",
    },
    resendInfo: {
      EN: "If you do not receive the email within the next 5 minutes, use the button below to resend the verification email.",
      ES: "Si no recibes el correo electrónico en los próximos 5 minutos, utiliza el botón de abajo para reenviar el correo de verificación.",
      FR: "Si vous ne recevez pas l'e-mail dans les 5 prochaines minutes, utilisez le bouton ci-dessous pour renvoyer l'e-mail de vérification.",
    },
    buttons: {
      resendEmail: {
        EN: "Resend Email",
        ES: "Reenviar correo electrónico",
        FR: "Renvoyer l'e-mail",
      },
    },
    errors: {
      emailNotExist: {
        EN: "Email not exist.",
        ES: "El correo electrónico no existe.",
        FR: "L'e-mail n'existe pas.",
      },
      somethingWentWrong: {
        EN: "Something went wrong.",
        ES: "Algo salió mal.",
        FR: "Une erreur s'est produite.",
      },
    },
    toastMessages: {
      emailSent: {
        EN: "Sent an email successfully.",
        ES: "Correo electrónico enviado con éxito.",
        FR: "E-mail envoyé avec succès.",
      },
    },
  },
  verifyEmail: {
    loading: {
      title: {
        EN: "We are checking your email.",
        ES: "Estamos verificando tu correo electrónico.",
        FR: "Nous vérifions votre e-mail.",
      },
    },
    success: {
      title: {
        EN: "Your email has been verified successfully.",
        ES: "Tu correo electrónico ha sido verificado con éxito.",
        FR: "Votre e-mail a été vérifié avec succès.",
      },
      button: {
        EN: "Go To Dashboard",
        ES: "Ir al Panel",
        FR: "Accéder au tableau de bord",
      },
    },
    failure: {
      title: {
        EN: "Email verification failed.",
        ES: "La verificación del correo electrónico falló.",
        FR: "La vérification de l'e-mail a échoué.",
      },
      button: {
        EN: "Go To Home",
        ES: "Ir a la página principal",
        FR: "Aller à la page d'accueil",
      },
    },
    errors: {
      somethingWentWrong: {
        EN: "Something went wrong.",
        ES: "Algo salió mal.",
        FR: "Une erreur s'est produite.",
      },
    },
    toastMessages: {
      success: {
        EN: "Email has been verified.",
        ES: "El correo electrónico ha sido verificado.",
        FR: "L'e-mail a été vérifié.",
      },
      failure: {
        EN: "Email verification failed.",
        ES: "La verificación del correo electrónico falló.",
        FR: "La vérification de l'e-mail a échoué.",
      },
    },
  },
  resetPassword: {
    title: {
      EN: "Reset Your Password",
      ES: "Restablece tu contraseña",
      FR: "Réinitialisez votre mot de passe",
    },
    subtitle: {
      EN: "Reset your password for the account associated with",
      ES: "Restablece tu contraseña para la cuenta asociada con",
      FR: "Réinitialisez votre mot de passe pour le compte associé à",
    },
    placeholders: {
      password: {
        EN: "Password",
        ES: "Contraseña",
        FR: "Mot de passe",
      },
      confirmPassword: {
        EN: "Confirm Password",
        ES: "Confirmar contraseña",
        FR: "Confirmez le mot de passe",
      },
    },
    errors: {
      passwordRequired: {
        EN: "Password required",
        ES: "Contraseña requerida",
        FR: "Mot de passe requis",
      },
      passwordMismatch: {
        EN: "Password confirmation does not match",
        ES: "La confirmación de la contraseña no coincide",
        FR: "La confirmation du mot de passe ne correspond pas",
      },
    },
    buttons: {
      resetPassword: {
        EN: "Reset Password",
        ES: "Restablecer contraseña",
        FR: "Réinitialiser le mot de passe",
      },
    },
    toastMessages: {
      success: {
        EN: "Password reset completed.",
        ES: "Restablecimiento de contraseña completado.",
        FR: "Réinitialisation du mot de passe terminée.",
      },
      error: {
        EN: "Something went wrong.",
        ES: "Algo salió mal.",
        FR: "Une erreur s'est produite.",
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
      },
      checkDetails: {
        EN: "Check Details",
        ES: "Ver Detalles",
        FR: "Vérifier les détails",
      },
      kybStatus: {
        EN: "KYB Status",
        ES: "Estado de KYB",
        FR: "Statut KYB",
      },
      logout: {
        EN: "Logout",
        ES: "Cerrar sesión",
        FR: "Déconnexion",
      },
    },
    toastMessages: {
      logoutSuccess: {
        EN: "Logout successfully.",
        ES: "Cierre de sesión exitoso.",
        FR: "Déconnexion réussie.",
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
    },
  },
  appSidebar: {
    menu: {
      order: {
        EN: "Order",
        ES: "Pedido",
        FR: "Commande",
      },
      withdraw: {
        EN: "Withdraw",
        ES: "Retirar",
        FR: "Retirer",
      },
      agent: {
        EN: "Agent",
        ES: "Agente",
        FR: "Agent",
      },
      companies: {
        EN: "Companies",
        ES: "Empresas",
        FR: "Entreprises",
      },
      profile: {
        EN: "Profile",
        ES: "Perfil",
        FR: "Profil",
      },
    },
    buttons: {
      logout: {
        EN: "Logout",
        ES: "Cerrar sesión",
        FR: "Déconnexion",
      },
    },
    toastMessages: {
      logoutSuccess: {
        EN: "Logout successfully",
        ES: "Cierre de sesión exitoso",
        FR: "Déconnexion réussie",
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
    },
    profile: {
      EN: "Profile",
      ES: "Perfil",
      FR: "Profil",
    },
    kybStatus: {
      EN: "KYB Status",
      ES: "Estado KYB",
      FR: "Statut KYB",
    },
    complianceStatus: {
      EN: "Compliance Status",
      ES: "Estado de Cumplimiento",
      FR: "Statut de Conformité",
    },
    setting: {
      EN: "Setting",
      ES: "Configuración",
      FR: "Paramètre",
    },
    bankDetail: {
      EN: "Bank Detail",
      ES: "Detalle Bancario",
      FR: "Détail Bancaire",
    },
  },
  profileLabels: {
    userId: {
      EN: "User ID",
      ES: "ID de Usuario",
      FR: "ID Utilisateur",
    },
    email: {
      EN: "Email",
      ES: "Correo Electrónico",
      FR: "E-mail",
    },
    name: {
      EN: "Name",
      ES: "Nombre",
      FR: "Nom",
    },
    role: {
      EN: "Role",
      ES: "Rol",
      FR: "Rôle",
    },
    phoneNumber: {
      EN: "Phone Number",
      ES: "Número de Teléfono",
      FR: "Numéro de Téléphone",
    },
    address: {
      EN: "Address",
      ES: "Dirección",
      FR: "Adresse",
    },
  },
  kybStatusMessages: {
    approved: {
      EN: "Approved",
      ES: "Aprobado",
      FR: "Approuvé",
    },
    declined: {
      EN: "Declined",
      ES: "Rechazado",
      FR: "Refusé",
    },
    notStarted: {
      EN: "Not Started",
      ES: "No Comenzado",
      FR: "Non Commencé",
    },
    timedOut: {
      EN: "Timed Out",
      ES: "Tiempo Agotado",
      FR: "Temps Écoulé",
    },
    startKyb: {
      EN: "Start KYB",
      ES: "Iniciar KYB",
      FR: "Commencer KYB",
    },
  },
  complianceStatusMessages: {
    approved: {
      EN: "Approved",
      ES: "Aprobado",
      FR: "Approuvé",
    },
    disapproved: {
      EN: "Disapproved",
      ES: "Rechazado",
      FR: "Non Approuvé",
    },
    pending: {
      EN: "Pending",
      ES: "Pendiente",
      FR: "En Attente",
    },
  },
  settings: {
    acceptNonStablecoin: {
      EN: "Accept non-stable coin for payment",
      ES: "Aceptar monedas no estables para el pago",
      FR: "Accepter les cryptomonnaies non stables pour le paiement",
    },
    tooltip: {
      EN: "Enable this option to allow customers to pay with any cryptocurrency, including non-stable coins that may experience significant price volatility. When disabled, only stablecoins with more stable values are accepted for payments.",
      ES: "Habilite esta opción para permitir que los clientes paguen con cualquier criptomoneda, incluidas las monedas no estables que pueden experimentar una volatilidad significativa en el precio. Cuando está deshabilitado, solo se aceptan monedas estables con valores más estables para los pagos.",
      FR: "Activez cette option pour permettre aux clients de payer avec n'importe quelle cryptomonnaie, y compris les cryptomonnaies non stables pouvant subir une volatilité importante des prix. Lorsqu'elle est désactivée, seules les cryptomonnaies stables sont acceptées pour les paiements.",
    },
  },
  bankDetail: {
    connectBank: {
      EN: "Connect Bank",
      ES: "Conectar Banco",
      FR: "Connecter une Banque",
    },
    accountName: {
      EN: "Account Name",
      ES: "Nombre de la Cuenta",
      FR: "Nom du Compte",
    },
    iban: {
      EN: "IBAN",
      ES: "IBAN",
      FR: "IBAN",
    },
    bic: {
      EN: "BIC",
      ES: "BIC",
      FR: "BIC",
    },
  },
  toastMessages: {
    serverError: {
      EN: "Server error.",
      ES: "Error del servidor.",
      FR: "Erreur du serveur.",
    },
    bankConnected: {
      EN: "Bank connected successfully",
      ES: "Banco conectado con éxito",
      FR: "Banque connectée avec succès",
    },
    settingChanged: {
      EN: "Setting changed successfully",
      ES: "Configuración cambiada con éxito",
      FR: "Paramètre modifié avec succès",
    },
  },
  bankModal: {
    title: {
      EN: "Your Bank Details",
      ES: "Tus Detalles Bancarios",
      FR: "Vos Détails Bancaires",
    },
    labels: {
      bankAccount: {
        EN: "Bank Account",
        ES: "Cuenta Bancaria",
        FR: "Compte Bancaire",
      },
      bankIBAN: {
        EN: "Bank IBAN",
        ES: "IBAN Bancario",
        FR: "IBAN Bancaire",
      },
      bankBIC: {
        EN: "Bank BIC",
        ES: "BIC Bancario",
        FR: "BIC Bancaire",
      },
    },
    errors: {
      fieldRequired: {
        EN: "This field required.",
        ES: "Este campo es obligatorio.",
        FR: "Ce champ est requis.",
      },
      invalidIBAN: {
        EN: "Invalid Bank IBAN.",
        ES: "IBAN Bancario no válido.",
        FR: "IBAN Bancaire invalide.",
      },
      invalidBIC: {
        EN: "Invalid Bank BIC.",
        ES: "BIC Bancario no válido.",
        FR: "BIC Bancaire invalide.",
      },
    },
    buttons: {
      save: {
        EN: "Save",
        ES: "Guardar",
        FR: "Sauvegarder",
      },
    },
  },
};

export const dictionaryOrder = {
  agent: {
    EN: "Agent",
    ES: "Agente",
    FR: "Agent",
  },
  headings: {
    paymentOrders: {
      EN: "Payment Orders",
      ES: "Órdenes de Pago",
      FR: "Ordres de Paiement",
    },
  },
  placeholders: {
    search: {
      EN: "Search by payer and reference",
      ES: "Buscar por pagador y referencia",
      FR: "Rechercher par payeur et référence",
    },
  },
  tableHeaders: {
    payer: {
      EN: "Payer",
      ES: "Pagador",
      FR: "Payeur",
    },
    amount: {
      EN: "Amount",
      ES: "Monto",
      FR: "Montant",
    },
    reference: {
      EN: "Reference",
      ES: "Referencia",
      FR: "Référence",
    },
    state: {
      EN: "State",
      ES: "Estado",
      FR: "État",
    },
    date: {
      EN: "Date",
      ES: "Fecha",
      FR: "Date",
    },
    creator: {
      EN: "Creator",
      ES: "Creador",
      FR: "Créateur",
    },
    actions: {
      EN: "Actions",
      ES: "Acciones",
      FR: "Actions",
    },
  },
  messages: {
    noOrders: {
      EN: "No Order Links",
      ES: "No hay enlaces de órdenes",
      FR: "Aucun lien de commande",
    },
    generatedSuccess: {
      EN: "Generated new link successfully.",
      ES: "Enlace nuevo generado exitosamente.",
      FR: "Nouveau lien généré avec succès.",
    },
    orderDeleted: {
      EN: "Order deleted successfully.",
      ES: "Orden eliminada con éxito.",
      FR: "Commande supprimée avec succès.",
    },
    orderCancelled: {
      EN: "Order cancelled successfully.",
      ES: "Orden cancelada con éxito.",
      FR: "Commande annulée avec succès.",
    },
    serverError: {
      EN: "Server error.",
      ES: "Error del servidor.",
      FR: "Erreur du serveur.",
    },
  },
  buttons: {
    generateNew: {
      EN: "Generate New",
      ES: "Generar Nuevo",
      FR: "Générer Nouveau",
    },
  },
  controlModal: {
    title: {
      EN: "Generate New Order Link",
      ES: "Generar Nuevo Enlace de Orden",
      FR: "Générer un Nouveau Lien de Commande",
    },
    labels: {
      amount: {
        EN: "Amount",
        ES: "Monto",
        FR: "Montant",
      },
      currency: {
        EN: "Currency",
        ES: "Moneda",
        FR: "Devise",
      },
      reference: {
        EN: "Order Reference",
        ES: "Referencia de Orden",
        FR: "Référence de Commande",
      },
      firstName: {
        EN: "Customer First Name",
        ES: "Nombre del Cliente",
        FR: "Prénom du Client",
      },
      lastName: {
        EN: "Customer Last Name",
        ES: "Apellido del Cliente",
        FR: "Nom de Famille du Client",
      },
      dob: {
        EN: "Customer Date of Birth",
        ES: "Fecha de Nacimiento del Cliente",
        FR: "Date de Naissance du Client",
      },
      pob: {
        EN: "Customer Place of Birth",
        ES: "Lugar de Nacimiento del Cliente",
        FR: "Lieu de Naissance du Client",
      },
      email: {
        EN: "Customer Email",
        ES: "Correo Electrónico del Cliente",
        FR: "E-mail du Client",
      },
      address: {
        EN: "Customer Address",
        ES: "Dirección del Cliente",
        FR: "Adresse du Client",
      },
    },
    placeholders: {
      amount: {
        EN: "0",
        ES: "0",
        FR: "0",
      },
      reference: {
        EN: "Reference",
        ES: "Referencia",
        FR: "Référence",
      },
      firstName: {
        EN: "Customer First Name",
        ES: "Nombre del Cliente",
        FR: "Prénom du Client",
      },
      lastName: {
        EN: "Customer Last Name",
        ES: "Apellido del Cliente",
        FR: "Nom de Famille du Client",
      },
      dob: {
        EN: "Customer Date of Birth",
        ES: "Fecha de Nacimiento del Cliente",
        FR: "Date de Naissance du Client",
      },
      pob: {
        EN: "Customer Place of Birth",
        ES: "Lugar de Nacimiento del Cliente",
        FR: "Lieu de Naissance du Client",
      },
      email: {
        EN: "Email address",
        ES: "Dirección de correo electrónico",
        FR: "Adresse e-mail",
      },
      address: {
        EN: "Customer Address",
        ES: "Dirección del Cliente",
        FR: "Adresse du Client",
      },
    },
    errors: {
      required: {
        EN: "This field required.",
        ES: "Este campo es obligatorio.",
        FR: "Ce champ est requis.",
      },
      invalidEmail: {
        EN: "Invalid email.",
        ES: "Correo electrónico no válido.",
        FR: "E-mail invalide.",
      },
    },
    buttons: {
      generate: {
        EN: "Generate",
        ES: "Generar",
        FR: "Générer",
      },
    },
  },
  deleteModal: {
    delete: {
      EN: "Are you sure you want to delete this item?",
      ES: "¿Estás segura de que quieres eliminar este artículo?",
      FR: "Êtes-vous sûr de vouloir supprimer cet élément ?",
    },
    cancel: {
      EN: "Are you sure you want to cancel this item?",
      ES: "¿Estás segura de que deseas cancelar este artículo?",
      FR: "Êtes-vous sûr de vouloir annuler cet élément ?",
    },
    buttons: {
      delete: {
        EN: "Delete",
        ES: "Eliminar",
        FR: "Supprimer",
      },
      cancelOrder: {
        EN: "Cancel Order",
        ES: "Cancelar Orden",
        FR: "Annuler la Commande",
      },
    },
  },
  orderDetail: {
    headings: {
      transactionDetail: {
        EN: "Transaction Detail",
        ES: "Detalle de la Transacción",
        FR: "Détail de la Transaction",
      },
      summary: {
        EN: "Summary",
        ES: "Resumen",
        FR: "Résumé",
      },
      description: {
        EN: "Description",
        ES: "Descripción",
        FR: "Description",
      },
      payerInfo: {
        EN: "Payer Info",
        ES: "Información del Pagador",
        FR: "Informations du Payeur",
      },
      transactionStatus: {
        EN: "Transaction Status",
        ES: "Estado de la Transacción",
        FR: "Statut de la Transaction",
      },
    },
    labels: {
      orderId: {
        EN: "Order ID",
        ES: "ID de la Orden",
        FR: "ID de Commande",
      },
      orderLink: {
        EN: "Order Link",
        ES: "Enlace de la Orden",
        FR: "Lien de Commande",
      },
      amount: {
        EN: "Amount",
        ES: "Monto",
        FR: "Montant",
      },
      createdAt: {
        EN: "Created At",
        ES: "Creado En",
        FR: "Créé Le",
      },
      createdBy: {
        EN: "Created By",
        ES: "Creado Por",
        FR: "Créé Par",
      },
      email: {
        EN: "Email",
        ES: "Correo Electrónico",
        FR: "E-mail",
      },
      name: {
        EN: "Name",
        ES: "Nombre",
        FR: "Nom",
      },
      address: {
        EN: "Address",
        ES: "Dirección",
        FR: "Adresse",
      },
      dob: {
        EN: "Date of Birth",
        ES: "Fecha de Nacimiento",
        FR: "Date de Naissance",
      },
      pob: {
        EN: "Place of Birth",
        ES: "Lugar de Nacimiento",
        FR: "Lieu de Naissance",
      },
      status: {
        EN: "Status",
        ES: "Estado",
        FR: "Statut",
      },
      paymentAddress: {
        EN: "Payment Address",
        ES: "Dirección de Pago",
        FR: "Adresse de Paiement",
      },
      paymentAmount: {
        EN: "Payment Amount",
        ES: "Monto del Pago",
        FR: "Montant du Paiement",
      },
      transactionId: {
        EN: "Transaction ID",
        ES: "ID de la Transacción",
        FR: "ID de Transaction",
      },
    },
    messages: {
      loading: {
        EN: "Loading...",
        ES: "Cargando...",
        FR: "Chargement...",
      },
      error: {
        EN: "Something went wrong. Please check the link again.",
        ES: "Algo salió mal. Por favor revisa el enlace nuevamente.",
        FR: "Une erreur s'est produite. Veuillez vérifier à nouveau le lien.",
      },
      na: {
        EN: "N/A",
        ES: "N/D",
        FR: "N/A",
      },
      serverError: {
        EN: "Server error.",
        ES: "Error del servidor.",
        FR: "Erreur du serveur.",
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
      },
      balances: {
        EN: "My Balances",
        ES: "Mis Saldos",
        FR: "Mes Soldes",
      },
    },
    tableHeaders: {
      withdrawId: {
        EN: "Withdraw ID",
        ES: "ID de Retiro",
        FR: "ID de Retrait",
      },
      amount: {
        EN: "Amount",
        ES: "Monto",
        FR: "Montant",
      },
      fee: {
        EN: "Fee",
        ES: "Comisión",
        FR: "Frais",
      },
      status: {
        EN: "Status",
        ES: "Estado",
        FR: "Statut",
      },
      date: {
        EN: "Date",
        ES: "Fecha",
        FR: "Date",
      },
      actions: {
        EN: "Actions",
        ES: "Acciones",
        FR: "Actions",
      },
    },
    buttons: {
      withdraw: {
        EN: "Withdraw",
        ES: "Retirar",
        FR: "Retirer",
      },
    },
    messages: {
      noHistory: {
        EN: "No History",
        ES: "Sin Historial",
        FR: "Aucun Historique",
      },
      loading: {
        EN: "Loading...",
        ES: "Cargando...",
        FR: "Chargement...",
      },
      statusChanged: {
        EN: "Status changed successfully.",
        ES: "Estado cambiado con éxito.",
        FR: "Statut modifié avec succès.",
      },
      serverError: {
        EN: "Server error.",
        ES: "Error del servidor.",
        FR: "Erreur du serveur.",
      },
    },
    pagination: {
      prev: {
        EN: "Previous",
        ES: "Anterior",
        FR: "Précédent",
      },
      next: {
        EN: "Next",
        ES: "Siguiente",
        FR: "Suivant",
      },
    },
  },
  requestModal: {
    title: {
      EN: "Request Withdraw",
      ES: "Solicitar Retiro",
      FR: "Demander un Retrait",
    },
    labels: {
      currency: {
        EN: "Currency",
        ES: "Moneda",
        FR: "Devise",
      },
      amount: {
        EN: "Amount",
        ES: "Monto",
        FR: "Montant",
      },
    },
    placeholders: {
      selectCurrency: {
        EN: "Select Currency",
        ES: "Seleccionar Moneda",
        FR: "Sélectionner une Devise",
      },
    },
    errors: {
      currencyRequired: {
        EN: "Currency required.",
        ES: "Moneda requerida.",
        FR: "Devise requise.",
      },
      amountRequired: {
        EN: "Amount required.",
        ES: "Monto requerido.",
        FR: "Montant requis.",
      },
      insufficientBalance: {
        EN: "Sufficient balance.",
        ES: "Saldo insuficiente.",
        FR: "Solde insuffisant.",
      },
      connectBank: {
        EN: "Please connect your bank detail first.",
        ES: "Por favor, conecta los detalles de tu banco primero.",
        FR: "Veuillez d'abord connecter les détails de votre banque.",
      },
      somethingWrong: {
        EN: "Something went wrong.",
        ES: "Algo salió mal.",
        FR: "Une erreur s'est produite.",
      },
    },
    buttons: {
      connectBank: {
        EN: "Connect Bank",
        ES: "Conectar Banco",
        FR: "Connecter une Banque",
      },
      requestWithdraw: {
        EN: "Request Withdraw",
        ES: "Solicitar Retiro",
        FR: "Demander un Retrait",
      },
    },
    messages: {
      withdrawSuccess: {
        EN: "Withdraw requested successfully.",
        ES: "Retiro solicitado con éxito.",
        FR: "Retrait demandé avec succès.",
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
      },
    },
    placeholders: {
      search: {
        EN: "Search by name and email",
        ES: "Buscar por nombre y correo electrónico",
        FR: "Rechercher par nom et e-mail",
      },
    },
    buttons: {
      inviteAgent: {
        EN: "Invite agent",
        ES: "Invitar agente",
        FR: "Inviter un agent",
      },
    },
    tableHeaders: {
      name: {
        EN: "Name",
        ES: "Nombre",
        FR: "Nom",
      },
      email: {
        EN: "Email",
        ES: "Correo Electrónico",
        FR: "E-mail",
      },
      location: {
        EN: "Location",
        ES: "Ubicación",
        FR: "Emplacement",
      },
      phone: {
        EN: "Phone",
        ES: "Teléfono",
        FR: "Téléphone",
      },
      actions: {
        EN: "Actions",
        ES: "Acciones",
        FR: "Actions",
      },
    },
    messages: {
      noAgents: {
        EN: "No Agents",
        ES: "No hay Agentes",
        FR: "Aucun Agent",
      },
      agentRemoved: {
        EN: "Agent removed successfully.",
        ES: "Agente eliminado con éxito.",
        FR: "Agent supprimé avec succès.",
      },
      agentRestored: {
        EN: "Agent re-enabled successfully.",
        ES: "Agente restaurado con éxito.",
        FR: "Agent réactivé avec succès.",
      },
      serverError: {
        EN: "Server error.",
        ES: "Error del servidor.",
        FR: "Erreur du serveur.",
      },
    },
  },
  activeModal: {
    message: {
      EN: "Are you sure you want to activate this agent?",
      ES: "¿Estás seguro de que deseas activar a este agente?",
      FR: "Êtes-vous sûr de vouloir activer cet agent ?",
    },
    buttons: {
      activate: {
        EN: "Activate Agent",
        ES: "Activar Agente",
        FR: "Activer l'Agent",
      },
    },
  },
  deleteModal: {
    message: {
      EN: "Are you sure you want to remove this agent?",
      ES: "¿Estás seguro de que deseas eliminar a este agente?",
      FR: "Êtes-vous sûr de vouloir supprimer cet agent ?",
    },
    buttons: {
      remove: {
        EN: "Remove Agent",
        ES: "Eliminar Agente",
        FR: "Supprimer l'Agent",
      },
    },
  },
  inviteModal: {
    title: {
      EN: "Invite agent",
      ES: "Invitar agente",
      FR: "Inviter un agent",
    },
    labels: {
      agentEmail: {
        EN: "Agent email",
        ES: "Correo del agente",
        FR: "E-mail de l'agent",
      },
    },
    placeholders: {
      agentEmail: {
        EN: "Agent email",
        ES: "Correo del agente",
        FR: "E-mail de l'agent",
      },
    },
    errors: {
      emailRequired: {
        EN: "Agent email required.",
        ES: "Correo del agente requerido.",
        FR: "E-mail de l'agent requis.",
      },
      invalidEmail: {
        EN: "Invalid email.",
        ES: "Correo electrónico no válido.",
        FR: "E-mail invalide.",
      },
      connectBank: {
        EN: "Please connect your bank detail first.",
        ES: "Por favor, conecta los detalles de tu banco primero.",
        FR: "Veuillez d'abord connecter les détails de votre banque.",
      },
      somethingWrong: {
        EN: "Something went wrong.",
        ES: "Algo salió mal.",
        FR: "Une erreur s'est produite.",
      },
    },
    messages: {
      invitationSent: {
        EN: "Invitation email sent successfully.",
        ES: "Correo de invitación enviado con éxito.",
        FR: "E-mail d'invitation envoyé avec succès.",
      },
    },
    buttons: {
      connectBank: {
        EN: "Connect Bank",
        ES: "Conectar Banco",
        FR: "Connecter une Banque",
      },
      sendInvite: {
        EN: "Send Invite Email",
        ES: "Enviar Correo de Invitación",
        FR: "Envoyer l'E-mail d'Invitation",
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
    },
    copied: {
      EN: "Copied successfullly.",
      ES: "Copiado exitosamente.",
      FR: "Copié avec succès.",
    },
    transactionExpired: {
      EN: "This transaction has been expired.",
      ES: "Esta transacción ha expirado.",
      FR: "Cette transaction a expiré.",
    },
    transactionCompleted: {
      EN: "Transaction completed successfully.",
      ES: "Transacción completada con éxito.",
      FR: "Transaction terminée avec succès.",
    },
  },
  status: {
    requested: {
      EN: "Payment is requested",
      ES: "Se ha solicitado el pago",
      FR: "Le paiement est demandé",
    },
    received: {
      EN: "Payment is received, awaiting confirmation",
      ES: "El pago ha sido recibido, esperando confirmación",
      FR: "Le paiement a été reçu, en attente de confirmation",
    },
    completed: {
      EN: "Payment completed",
      ES: "Pago completado",
      FR: "Paiement terminé",
    },
    expired: {
      EN: "This transaction already has been expired!",
      ES: "¡Esta transacción ya ha expirado!",
      FR: "Cette transaction a déjà expiré !",
    },
    cancelled: {
      EN: "This transaction already has been cancelled!",
      ES: "¡Esta transacción ya ha sido cancelada!",
      FR: "Cette transaction a déjà été annulée !",
    },
  },
  labels: {
    transactionHash: {
      EN: "Transaction Hash",
      ES: "Hash de la transacción",
      FR: "Hash de la transaction",
    },
    network: {
      EN: "Network",
      ES: "Red",
      FR: "Réseau",
    },
    amount: {
      EN: "Amount",
      ES: "Cantidad",
      FR: "Montant",
    },
    depositAddress: {
      EN: "Deposit Address",
      ES: "Dirección de depósito",
      FR: "Adresse de dépôt",
    },
    confirmations: {
      EN: "Confirmations",
      ES: "Confirmaciones",
      FR: "Confirmations",
    },
    selectCurrency: {
      EN: "Select currency you want to pay",
      ES: "Seleccione la moneda que desea pagar",
      FR: "Sélectionnez la devise que vous souhaitez payer",
    },
    selectNetwork: {
      EN: "Select Network",
      ES: "Seleccione la red",
      FR: "Sélectionnez le réseau",
    },
    warning: {
      EN: "Be careful when choosing a network and currency when sending cryptocurrency. If you send cryptocurrency over the wrong network or wrong currency, then your money will not be credited or returned.",
      ES: "Tenga cuidado al elegir una red y moneda al enviar criptomonedas. Si envía criptomonedas a través de la red o moneda equivocada, su dinero no será acreditado ni devuelto.",
      FR: "Soyez prudent lors du choix d'un réseau et d'une devise lors de l'envoi de cryptomonnaies. Si vous envoyez des cryptomonnaies sur le mauvais réseau ou la mauvaise devise, votre argent ne sera ni crédité ni remboursé.",
    },
  },
  buttons: {
    continue: {
      EN: "Continue",
      ES: "Continuar",
      FR: "Continuer",
    },
    goBack: {
      EN: "Go Back",
      ES: "Volver",
      FR: "Retourner",
    },
  },
  transactionCompletedMessage: {
    EN: "Transaction has been completed successfully!",
    ES: "¡La transacción se ha completado con éxito!",
    FR: "La transaction a été réalisée avec succès !",
  },
  paymentDescription: {
    hasRequested: {
      EN: "has requested",
      ES: "ha solicitado a",
      FR: "a demandé",
    },
    toPay: {
      EN: "to pay",
      ES: "pagar",
      FR: "payer",
    },
    EN: "${payeeName} has requested ${customerName} to pay ${amount} ${currencySymbol}.",
    ES: "${payeeName} ha solicitado a ${customerName} pagar ${amount} ${currencySymbol}.",
    FR: "${payeeName} a demandé à ${customerName} de payer ${amount} ${currencySymbol}.",
  },
  paymentDetails: {
    paid: {
      EN: "You have paid",
      ES: "Has pagado",
      FR: "Vous avez payé",
    },
    to: {
      EN: "to",
      ES: "a",
      FR: "à",
    },
    EN: "You have paid {amount} {currencySymbol} to {payeeName}.",
    ES: "Has pagado {amount} {currencySymbol} a {payeeName}.",
    FR: "Vous avez payé {amount} {currencySymbol} à {payeeName}.",
  },
};

export const dictionaryInvitation = {
  title: {
    EN: "Agent Invitation",
    ES: "Invitación de Agente",
    FR: "Invitation d'Agent",
  },
  subtitle1: {
    EN: "You were invited by",
    ES: "Has sido invitado por",
    FR: "Vous avez été invité par",
  },
  subtitle2: {
    EN: ". Please complete this form to be an agent.",
    ES: ". Por favor, completa este formulario para ser un agente.",
    FR: ". Veuillez compléter ce formulaire pour devenir un agent.",
  },
  status: {
    expired: {
      EN: "This invitation has been expired.",
      ES: "Esta invitación ha expirado.",
      FR: "Cette invitation a expiré.",
    },
    completed: {
      EN: "This invitation was already completed.",
      ES: "Esta invitación ya ha sido completada.",
      FR: "Cette invitation a déjà été complétée.",
    },
  },
  fields: {
    agentName: {
      EN: "Agent Name",
      ES: "Nombre del Agente",
      FR: "Nom de l'Agent",
    },
    country: {
      EN: "Country",
      ES: "País",
      FR: "Pays",
    },
    phone: {
      EN: "Mobile Number",
      ES: "Número de Móvil",
      FR: "Numéro de Téléphone",
    },
    email: {
      EN: "Email Address",
      ES: "Dirección de Correo Electrónico",
      FR: "Adresse E-mail",
    },
    password: {
      EN: "Password",
      ES: "Contraseña",
      FR: "Mot de Passe",
    },
    confirmPassword: {
      EN: "Confirm Password",
      ES: "Confirmar Contraseña",
      FR: "Confirmer le Mot de Passe",
    },
  },
  errors: {
    required: {
      EN: "This field required.",
      ES: "Este campo es obligatorio.",
      FR: "Ce champ est requis.",
    },
    invalidEmail: {
      EN: "Invalid email.",
      ES: "Correo electrónico no válido.",
      FR: "E-mail invalide.",
    },
    invalidPhone: {
      EN: "Incorrect phone number",
      ES: "Número de teléfono incorrecto",
      FR: "Numéro de téléphone incorrect",
    },
    passwordMismatch: {
      EN: "Password confirmation does not match.",
      ES: "La confirmación de la contraseña no coincide.",
      FR: "La confirmation du mot de passe ne correspond pas.",
    },
    duplicateUser: {
      EN: "User is already exist.",
      ES: "El usuario ya existe.",
      FR: "L'utilisateur existe déjà.",
    },
    registerFailed: {
      EN: "Register failed.",
      ES: "El registro falló.",
      FR: "L'enregistrement a échoué.",
    },
    generalError: {
      EN: "Something went wrong.",
      ES: "Algo salió mal.",
      FR: "Une erreur s'est produite.",
    },
  },
  toast: {
    invitationCompleted: {
      EN: "Invitation completed successfully.",
      ES: "Invitación completada con éxito.",
      FR: "Invitation complétée avec succès.",
    },
    serverError: {
      EN: "Server error.",
      ES: "Error del servidor.",
      FR: "Erreur du serveur.",
    },
  },
  buttons: {
    continue: {
      EN: "Continue",
      ES: "Continuar",
      FR: "Continuer",
    },
  },
};
