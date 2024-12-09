export const dictionaryGlobal = {
  passwordErrors: {
    digit: {
      EN: "Passwords must have at least one digit ('0'-'9').",
      ES: "Las contraseñas deben tener al menos un dígito ('0'-'9').",
    },
    nonAlphanumeric: {
      EN: "Passwords must have at least one non-alphanumeric character.",
      ES: "Las contraseñas deben tener al menos un carácter no alfanumérico.",
    },
    uppercase: {
      EN: "Passwords must have at least one uppercase letter ('A'-'Z').",
      ES: "Las contraseñas deben tener al menos una letra mayúscula ('A'-'Z').",
    },
    lowercase: {
      EN: "Passwords must have at least one lowercase letter ('a'-'z').",
      ES: "Las contraseñas deben tener al menos una letra minúscula ('a'-'z').",
    },
    minLength: {
      EN: "Passwords must be at least 6 characters.",
      ES: "Las contraseñas deben tener al menos 6 caracteres.",
    },
  },
  all: {
    EN: "All",
    ES: "Todos",
  },
  filtered: {
    EN: "Filtered",
    ES: "Filtrado",
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
    },
    label: {
      EN: "Filter by Status:",
      ES: "Filtrar por Estado:",
    },
  },
  creatorFilter: {
    label: {
      EN: "Filter by Creators:",
      ES: "Filtrar por creadoras:",
    },
  },
  timeFormat: {
    now: {
      EN: "now",
      ES: "ahora",
    },
    dayAgo: {
      EN: "${number} day${s} ago",
      ES: "hace ${number} día${s}",
    },
    hourAgo: {
      EN: "${number} hour${s} ago",
      ES: "hace ${number} hora${s}",
    },
    minuteAgo: {
      EN: "${number} minute${s} ago",
      ES: "hace ${number} minuto${s}",
    },
    secondAgo: {
      EN: "${number} second${s} ago",
      ES: "hace ${number} segundo${s}",
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
  },
};

export const dictionaryLanding = {
  dashboard: { EN: "Dashboard", ES: "Panel" },
  contact: { EN: "Contact Us", ES: "Contáctenos" },
  signin: { EN: "Sign In", ES: "Iniciar sesión" },
  account: { EN: "My Account", ES: "Mi cuenta" },
  logout: { EN: "Logout", ES: "Cerrar sesión" },
  hero: {
    title: {
      EN: "Empower Your Business with Secure and Compliant Crypto Payments",
      ES: "Potencie su negocio con pagos criptográficos seguros y compatibles",
    },
    subtitle: {
      EN: "At Stratis Money Service, we bridge the gap between traditional finance and the digital world. Regulated by the Bank of Spain (SEPBLAC) with a VASP registration, we provide a secure platform that allows your customers to pay in crypto, ensuring compliance and eliminating uncertainty.",
      ES: "En Stratis Money Service, cerramos la brecha entre las finanzas tradicionales y el mundo digital. Regulados por el Banco de España (SEPBLAC) y con registro VASP, ofrecemos una plataforma segura que permite a sus clientes pagar en criptomonedas, garantizando el cumplimiento normativo y eliminando la incertidumbre.",
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
    },
  },
  feature: {
    title: { EN: "Why Choose Us", ES: "¿Por qué elegirnos?" },
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
          title: "ntegración sin complicaciones",
          text: "No se requiere una configuración compleja, comience a aceptar pagos con criptomonedas al instante",
        },
        {
          title: "Solución rápida",
          text: "Los criptoactivos se liquidan inmediatamente, lo que elimina el riesgo de volatilidad.",
        },
      ],
    },
  },
  process: {
    title: { EN: "How our platform works", ES: "Cómo funciona nuestra plataforma" },
    subtitle: {
      EN: "Start accepting crypto payments in just a few simple steps. Our streamlined process ensures your business is up and running quickly, with no hassle and full regulatory compliance.",
      ES: "Comience a aceptar pagos con criptomonedas en tan solo unos sencillos pasos. Nuestro proceso simplificado garantiza que su negocio esté en funcionamiento rápidamente, sin complicaciones y con pleno cumplimiento normativo.",
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
    },
  },
  conclusion: {
    title: { EN: "Ready to Accept Crypto Payments?", ES: "¿Listo para aceptar pagos en criptomonedas?" },
    subtitle: {
      EN: "Join the growing number of businesses embracing the future of payments. Get started with a secure, compliant solution today.",
      ES: "Únase al creciente número de empresas que adoptan el futuro de los pagos. Comience hoy mismo con una solución segura y que cumple con las normas.",
    },
    signup: {
      EN: "Sign Up Now",
      ES: "Regístrate ahora",
    },
  },
  term: { EN: "Terms & Conditions", ES: "Términos y condiciones" },
  privacy: { EN: "Privacy Policy", ES: "política de privacidad" },
  copy: { EN: "© 2024 All right reserved", ES: "© 2024 Todos los derechos reservados" },
  logoutSuccess: {
    EN: "Logout successfully.",
    ES: "Cierre de sesión exitoso.",
  },
};

export const dictionaryAuth = {
  login: {
    title: { EN: "Sign In Your Account", ES: "Iniciar sesión en su cuenta" },
    subtitle: {
      EN: "Welcome to stratis money service. Enjoy now!",
      ES: "Bienvenido al servicio de dinero Stratis. ¡Disfrútelo ahora!",
    },
    forgot: { EN: "Forgot Password?", ES: "¿Has olvidado tu contraseña?" },
    button: { EN: "Login with Email", ES: "Iniciar sesión con correo electrónico" },
    donhave: { EN: `Don't have your account?`, ES: "¿No tienes cuenta?" },
    signup: { EN: "Sign Up", ES: "Regístrate" },
    emailPlace: { EN: "Email Address", ES: "Dirección de correo electrónico" },
    pwdPlace: { EN: "Password", ES: "Contraseña" },
    errorRequire: { EN: "This field required.", ES: "Este campo es obligatorio." },
    errorInvalid: { EN: "Invalid email.", ES: "Correo electrónico no válido." },
    emailNotFound: {
      EN: "Email not found.",
      ES: "Correo no encontrado.",
    },
    incorrectPassword: {
      EN: "Incorrect password.",
      ES: "Contraseña incorrecta.",
    },
    toast: {
      success: {
        EN: "Logged in successfully.",
        ES: "Inicio de sesión exitoso.",
      },
      failure: {
        EN: "Login failed.",
        ES: "Error al iniciar sesión.",
      },
      generalError: {
        EN: "Something went wrong.",
        ES: "Algo salió mal.",
      },
    },
  },
  register: {
    title: {
      EN: "Create Your Account",
      ES: "Crea tu cuenta",
    },
    subtitle: {
      EN: "Setting up an account takes only a few minutes.",
      ES: "Configurar una cuenta solo toma unos minutos.",
    },
    placeholders: {
      name: {
        EN: "Company Name",
        ES: "Nombre de la empresa",
      },
      industry: {
        EN: "Industry or Sector",
        ES: "Industria o Sector",
      },
      activity: {
        EN: "Type of Activity",
        ES: "Tipo de actividad",
      },
      volume: {
        EN: "Expected Monthly Volume",
        ES: "Volumen mensual esperado",
      },
      country: {
        EN: "Country",
        ES: "País",
      },
      phone: {
        EN: "Mobile Number",
        ES: "Número de teléfono móvil",
      },
      email: {
        EN: "Email Address",
        ES: "Dirección de correo electrónico",
      },
      password: {
        EN: "Password",
        ES: "Contraseña",
      },
      confirmPassword: {
        EN: "Confirm Password",
        ES: "Confirmar contraseña",
      },
    },
    errors: {
      emailInvalid: {
        EN: "Invalid email.",
        ES: "Correo electrónico no válido.",
      },
      emailRequired: {
        EN: "Email required.",
        ES: "Correo electrónico requerido.",
      },
      nameRequired: {
        EN: "Name required.",
        ES: "Nombre requerido.",
      },
      fieldRequired: {
        EN: "This field required.",
        ES: "Este campo es obligatorio.",
      },

      countryRequired: {
        EN: "Country required.",
        ES: "País requerido.",
      },
      phoneRequired: {
        EN: "Mobile phone required.",
        ES: "Teléfono móvil requerido.",
      },
      phoneInvalid: {
        EN: "Incorrect phone number.",
        ES: "Número de teléfono incorrecto.",
      },
      passwordRequired: {
        EN: "Password required.",
        ES: "Contraseña requerida.",
      },
      passwordInvalid: {
        EN: "Invalid password.",
        ES: "Contraseña no válida.",
      },
      passwordMismatch: {
        EN: "Password confirmation does not match.",
        ES: "La confirmación de la contraseña no coincide.",
      },
      duplicateUser: {
        EN: "User is already exist.",
        ES: "El usuario ya existe.",
      },
    },
    button: {
      EN: "Register",
      ES: "Registrarse",
    },
    alreadyHaveAccount: {
      EN: "Already have an account?",
      ES: "¿Ya tienes una cuenta?",
    },
    login: {
      EN: "Login",
      ES: "Iniciar sesión",
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
            "Accommodation Services ",
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
            "More than €1,000,00",
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
    },
    toast: {
      successRegister: {
        EN: "Registered successfully.",
        ES: "Registrado con éxito.",
      },
      registerFailed: {
        EN: "Register failed.",
        ES: "El registro falló.",
      },
      somethingWrong: {
        EN: "Something went wrong.",
        ES: "Algo salió mal.",
      },
    },
  },
  forgotPassword: {
    title: {
      EN: "Forgot Password?",
      ES: "¿Olvidaste tu contraseña?",
    },
    subtitle: {
      EN: "Please enter your email address and we will send you a link to reset your password.",
      ES: "Por favor, introduce tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña.",
    },
    placeholders: {
      email: {
        EN: "Email Address",
        ES: "Dirección de correo electrónico",
      },
    },
    errors: {
      emailRequired: {
        EN: "Email required.",
        ES: "Correo electrónico requerido.",
      },
      emailInvalid: {
        EN: "Invalid email.",
        ES: "Correo electrónico no válido.",
      },
    },
    success: {
      emailSent: {
        EN: "Password reset email sent.",
        ES: "Correo de restablecimiento de contraseña enviado.",
      },
    },
    noti: {
      success: {
        EN: "Password reset email sent.",
        ES: "Correo de restablecimiento de contraseña enviado.",
      },
      fail: {
        EN: "Something went wrong.",
        ES: "Algo salió mal.",
      },
    },
    button: {
      EN: "Send Link",
      ES: "Enviar enlace",
    },
  },
  verifySend: {
    title: {
      EN: "Verify Your Email",
      ES: "Verifica tu correo electrónico",
    },
    subtitle0: {
      EN: "A verification email has been sent to ",
      ES: "Se ha enviado un correo electrónico de verificación a ",
    },
    subtitle1: {
      EN: ". Please check your email inbox and click the link to verify your email.",
      ES: ". Por favor, revisa tu bandeja de entrada y haz clic en el enlace para verificar tu correo electrónico.",
    },
    resendInfo: {
      EN: "If you do not receive the email within the next 5 minutes, use the button below to resend the verification email.",
      ES: "Si no recibes el correo electrónico en los próximos 5 minutos, utiliza el botón de abajo para reenviar el correo de verificación.",
    },
    buttons: {
      resendEmail: {
        EN: "Resend Email",
        ES: "Reenviar correo electrónico",
      },
    },
    errors: {
      emailNotExist: {
        EN: "Email not exist.",
        ES: "El correo electrónico no existe.",
      },
      somethingWentWrong: {
        EN: "Something went wrong.",
        ES: "Algo salió mal.",
      },
    },
    toastMessages: {
      emailSent: {
        EN: "Sent an email successfully.",
        ES: "Correo electrónico enviado con éxito.",
      },
    },
  },
  verifyEmail: {
    loading: {
      title: {
        EN: "We are checking your email.",
        ES: "Estamos verificando tu correo electrónico.",
      },
    },
    success: {
      title: {
        EN: "Your email has been verified successfully.",
        ES: "Tu correo electrónico ha sido verificado con éxito.",
      },
      button: {
        EN: "Go To Dashboard",
        ES: "Ir al Panel",
      },
    },
    failure: {
      title: {
        EN: "Email verification failed.",
        ES: "La verificación del correo electrónico falló.",
      },
      button: {
        EN: "Go To Home",
        ES: "Ir a la página principal",
      },
    },
    errors: {
      somethingWentWrong: {
        EN: "Something went wrong.",
        ES: "Algo salió mal.",
      },
    },
    toastMessages: {
      success: {
        EN: "Email has been verified.",
        ES: "El correo electrónico ha sido verificado.",
      },
      failure: {
        EN: "Email verification failed.",
        ES: "La verificación del correo electrónico falló.",
      },
    },
  },
  resetPassword: {
    title: {
      EN: "Reset Your Password",
      ES: "Restablece tu contraseña",
    },
    subtitle: {
      EN: "Reset your password for the account associated with",
      ES: "Restablece tu contraseña para la cuenta asociada con",
    },
    placeholders: {
      password: {
        EN: "Password",
        ES: "Contraseña",
      },
      confirmPassword: {
        EN: "Confirm Password",
        ES: "Confirmar contraseña",
      },
    },
    errors: {
      passwordRequired: {
        EN: "Password required",
        ES: "Contraseña requerida",
      },
      passwordMismatch: {
        EN: "Password confirmation does not match",
        ES: "La confirmación de la contraseña no coincide",
      },
    },
    buttons: {
      resetPassword: {
        EN: "Reset Password",
        ES: "Restablecer contraseña",
      },
    },
    toastMessages: {
      success: {
        EN: "Password reset completed.",
        ES: "Restablecimiento de contraseña completado.",
      },
      error: {
        EN: "Something went wrong.",
        ES: "Algo salió mal.",
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
      },
      checkDetails: {
        EN: "Check Details",
        ES: "Ver Detalles",
      },
      kybStatus: {
        EN: "KYB Status",
        ES: "Estado de KYB",
      },
      logout: {
        EN: "Logout",
        ES: "Cerrar sesión",
      },
    },
    toastMessages: {
      logoutSuccess: {
        EN: "Logout successfully.",
        ES: "Cierre de sesión exitoso.",
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
    },
  },
  appSidebar: {
    menu: {
      order: {
        EN: "Order",
        ES: "Pedido",
      },
      withdraw: {
        EN: "Withdraw",
        ES: "Retirar",
      },
      agent: {
        EN: "Agent",
        ES: "Agente",
      },
      companies: {
        EN: "Companies",
        ES: "Empresas",
      },
      profile: {
        EN: "Profile",
        ES: "Perfil",
      },
    },
    buttons: {
      logout: {
        EN: "Logout",
        ES: "Cerrar sesión",
      },
    },
    toastMessages: {
      logoutSuccess: {
        EN: "Logout successfully",
        ES: "Cierre de sesión exitoso",
      },
    },
  },
};

export const dictionaryProfile = {
  headings: {
    myAccount: {
      EN: "My Account",
      ES: "Mi Cuenta",
    },
    profile: {
      EN: "Profile",
      ES: "Perfil",
    },
    kybStatus: {
      EN: "KYB Status",
      ES: "Estado KYB",
    },
    complianceStatus: {
      EN: "Compliance Status",
      ES: "Estado de Cumplimiento",
    },
    setting: {
      EN: "Setting",
      ES: "Configuración",
    },
    bankDetail: {
      EN: "Bank Detail",
      ES: "Detalle Bancario",
    },
  },
  profileLabels: {
    userId: {
      EN: "User ID",
      ES: "ID de Usuario",
    },
    email: {
      EN: "Email",
      ES: "Correo Electrónico",
    },
    name: {
      EN: "Name",
      ES: "Nombre",
    },
    role: {
      EN: "Role",
      ES: "Rol",
    },
    phoneNumber: {
      EN: "Phone Number",
      ES: "Número de Teléfono",
    },
    address: {
      EN: "Address",
      ES: "Dirección",
    },
  },
  kybStatusMessages: {
    approved: {
      EN: "Approved",
      ES: "Aprobado",
    },
    declined: {
      EN: "Declined",
      ES: "Rechazado",
    },
    notStarted: {
      EN: "Not Started",
      ES: "No Comenzado",
    },
    timedOut: {
      EN: "Timed Out",
      ES: "Tiempo Agotado",
    },
    startKyb: {
      EN: "Start KYB",
      ES: "Iniciar KYB",
    },
  },
  complianceStatusMessages: {
    approved: {
      EN: "Approved",
      ES: "Aprobado",
    },
    disapproved: {
      EN: "Disapproved",
      ES: "Rechazado",
    },
    pending: {
      EN: "Pending",
      ES: "Pendiente",
    },
  },
  settings: {
    acceptNonStablecoin: {
      EN: "Accept non-stable coin for payment",
      ES: "Aceptar monedas no estables para el pago",
    },
    tooltip: {
      EN: "Enable this option to allow customers to pay with any cryptocurrency, including non-stable coins that may experience significant price volatility. When disabled, only stablecoins with more stable values are accepted for payments.",
      ES: "Habilite esta opción para permitir que los clientes paguen con cualquier criptomoneda, incluidas las monedas no estables que pueden experimentar una volatilidad significativa en el precio. Cuando está deshabilitado, solo se aceptan monedas estables con valores más estables para los pagos.",
    },
  },
  bankDetail: {
    connectBank: {
      EN: "Connect Bank",
      ES: "Conectar Banco",
    },
    accountName: {
      EN: "Account Name",
      ES: "Nombre de la Cuenta",
    },
    iban: {
      EN: "IBAN",
      ES: "IBAN",
    },
    bic: {
      EN: "BIC",
      ES: "BIC",
    },
  },
  toastMessages: {
    serverError: {
      EN: "Server error.",
      ES: "Error del servidor.",
    },
    bankConnected: {
      EN: "Bank connected successfully",
      ES: "Banco conectado con éxito",
    },
    settingChanged: {
      EN: "Setting changed successfully",
      ES: "Configuración cambiada con éxito",
    },
  },
  bankModal: {
    title: {
      EN: "Your Bank Details",
      ES: "Tus Detalles Bancarios",
    },
    labels: {
      bankAccount: {
        EN: "Bank Account",
        ES: "Cuenta Bancaria",
      },
      bankIBAN: {
        EN: "Bank IBAN",
        ES: "IBAN Bancario",
      },
      bankBIC: {
        EN: "Bank BIC",
        ES: "BIC Bancario",
      },
    },
    errors: {
      fieldRequired: {
        EN: "This field required.",
        ES: "Este campo es obligatorio.",
      },
      invalidIBAN: {
        EN: "Invalid Bank IBAN.",
        ES: "IBAN Bancario no válido.",
      },
      invalidBIC: {
        EN: "Invalid Bank BIC.",
        ES: "BIC Bancario no válido.",
      },
    },
    buttons: {
      save: {
        EN: "Save",
        ES: "Guardar",
      },
    },
  },
};

export const dictionaryOrder = {
  agent: {
    EN: "Agent",
    ES: "Agente",
  },
  headings: {
    paymentOrders: {
      EN: "Payment Orders",
      ES: "Órdenes de Pago",
    },
  },
  placeholders: {
    search: {
      EN: "Search by payer and reference",
      ES: "Buscar por pagador y referencia",
    },
  },
  tableHeaders: {
    payer: {
      EN: "Payer",
      ES: "Pagador",
    },
    amount: {
      EN: "Amount",
      ES: "Monto",
    },
    reference: {
      EN: "Reference",
      ES: "Referencia",
    },
    state: {
      EN: "State",
      ES: "Estado",
    },
    date: {
      EN: "Date",
      ES: "Fecha",
    },
    creator: {
      EN: "Creator",
      ES: "Creador",
    },
    actions: {
      EN: "Actions",
      ES: "Acciones",
    },
  },
  messages: {
    noOrders: {
      EN: "No Order Links",
      ES: "No hay enlaces de órdenes",
    },
    generatedSuccess: {
      EN: "Generated new link successfully.",
      ES: "Enlace nuevo generado exitosamente.",
    },
    orderDeleted: {
      EN: "Order deleted successfully.",
      ES: "Orden eliminada con éxito.",
    },
    orderCancelled: {
      EN: "Order cancelled successfully.",
      ES: "Orden cancelada con éxito.",
    },
    serverError: {
      EN: "Server error.",
      ES: "Error del servidor.",
    },
  },
  buttons: {
    generateNew: {
      EN: "Generate New",
      ES: "Generar Nuevo",
    },
  },
  controlModal: {
    title: {
      EN: "Generate New Order Link",
      ES: "Generar Nuevo Enlace de Orden",
    },
    labels: {
      amount: {
        EN: "Amount",
        ES: "Monto",
      },
      currency: {
        EN: "Currency",
        ES: "Moneda",
      },
      reference: {
        EN: "Order Reference",
        ES: "Referencia de Orden",
      },
      firstName: {
        EN: "Customer First Name",
        ES: "Nombre del Cliente",
      },
      lastName: {
        EN: "Customer Last Name",
        ES: "Apellido del Cliente",
      },
      dob: {
        EN: "Customer Date of Birth",
        ES: "Fecha de Nacimiento del Cliente",
      },
      pob: {
        EN: "Customer Place of Birth",
        ES: "Lugar de Nacimiento del Cliente",
      },
      email: {
        EN: "Customer Email",
        ES: "Correo Electrónico del Cliente",
      },
      address: {
        EN: "Customer Address",
        ES: "Dirección del Cliente",
      },
    },
    placeholders: {
      amount: {
        EN: "0",
        ES: "0",
      },
      reference: {
        EN: "Reference",
        ES: "Referencia",
      },
      firstName: {
        EN: "Customer First Name",
        ES: "Nombre del Cliente",
      },
      lastName: {
        EN: "Customer Last Name",
        ES: "Apellido del Cliente",
      },
      dob: {
        EN: "Customer Date of Birth",
        ES: "Fecha de Nacimiento del Cliente",
      },
      pob: {
        EN: "Customer Place of Birth",
        ES: "Lugar de Nacimiento del Cliente",
      },
      email: {
        EN: "Email address",
        ES: "Dirección de correo electrónico",
      },
      address: {
        EN: "Customer Address",
        ES: "Dirección del Cliente",
      },
    },
    errors: {
      required: {
        EN: "This field required.",
        ES: "Este campo es obligatorio.",
      },
      invalidEmail: {
        EN: "Invalid email.",
        ES: "Correo electrónico no válido.",
      },
    },
    buttons: {
      generate: {
        EN: "Generate",
        ES: "Generar",
      },
    },
  },
  deleteModal: {
    delete: {
      EN: "Are you sure you want to delete this item?",
      ES: "¿Estás segura de que quieres eliminar este artículo?",
    },
    cancel: {
      EN: "Are you sure you want to cancel this item?",
      ES: "¿Estás segura de que deseas cancelar este artículo?",
    },

    buttons: {
      delete: {
        EN: "Delete",
        ES: "Eliminar",
      },
      cancelOrder: {
        EN: "Cancel Order",
        ES: "Cancelar Orden",
      },
    },
  },
  orderDetail: {
    headings: {
      transactionDetail: {
        EN: "Transaction Detail",
        ES: "Detalle de la Transacción",
      },
      summary: {
        EN: "Summary",
        ES: "Resumen",
      },
      description: {
        EN: "Description",
        ES: "Descripción",
      },
      payerInfo: {
        EN: "Payer Info",
        ES: "Información del Pagador",
      },
      transactionStatus: {
        EN: "Transaction Status",
        ES: "Estado de la Transacción",
      },
    },
    labels: {
      orderId: {
        EN: "Order ID",
        ES: "ID de la Orden",
      },
      orderLink: {
        EN: "Order Link",
        ES: "Enlace de la Orden",
      },
      amount: {
        EN: "Amount",
        ES: "Monto",
      },
      createdAt: {
        EN: "Created At",
        ES: "Creado En",
      },
      createdBy: {
        EN: "Created By",
        ES: "Creado Por",
      },
      email: {
        EN: "Email",
        ES: "Correo Electrónico",
      },
      name: {
        EN: "Name",
        ES: "Nombre",
      },
      address: {
        EN: "Address",
        ES: "Dirección",
      },
      dob: {
        EN: "Date of Birth",
        ES: "Fecha de Nacimiento",
      },
      pob: {
        EN: "Place of Birth",
        ES: "Lugar de Nacimiento",
      },
      status: {
        EN: "Status",
        ES: "Estado",
      },
      paymentAddress: {
        EN: "Payment Address",
        ES: "Dirección de Pago",
      },
      paymentAmount: {
        EN: "Payment Amount",
        ES: "Monto del Pago",
      },
      transactionId: {
        EN: "Transaction ID",
        ES: "ID de la Transacción",
      },
    },
    messages: {
      loading: {
        EN: "Loading...",
        ES: "Cargando...",
      },
      error: {
        EN: "Something went wrong. Please check the link again.",
        ES: "Algo salió mal. Por favor revisa el enlace nuevamente.",
      },
      na: {
        EN: "N/A",
        ES: "N/D",
      },
      serverError: {
        EN: "Server error.",
        ES: "Error del servidor.",
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
      },
      balances: {
        EN: "My Balances",
        ES: "Mis Saldos",
      },
    },
    tableHeaders: {
      withdrawId: {
        EN: "Withdraw ID",
        ES: "ID de Retiro",
      },
      amount: {
        EN: "Amount",
        ES: "Monto",
      },
      fee: {
        EN: "Fee",
        ES: "Comisión",
      },
      status: {
        EN: "Status",
        ES: "Estado",
      },
      date: {
        EN: "Date",
        ES: "Fecha",
      },
      actions: {
        EN: "Actions",
        ES: "Acciones",
      },
    },
    buttons: {
      withdraw: {
        EN: "Withdraw",
        ES: "Retirar",
      },
    },
    messages: {
      noHistory: {
        EN: "No History",
        ES: "Sin Historial",
      },
      loading: {
        EN: "Loading...",
        ES: "Cargando...",
      },
      statusChanged: {
        EN: "Status changed successfully.",
        ES: "Estado cambiado con éxito.",
      },
      serverError: {
        EN: "Server error.",
        ES: "Error del servidor.",
      },
    },
    pagination: {
      prev: {
        EN: "Previous",
        ES: "Anterior",
      },
      next: {
        EN: "Next",
        ES: "Siguiente",
      },
    },
  },
  requestModal: {
    title: {
      EN: "Request Withdraw",
      ES: "Solicitar Retiro",
    },
    labels: {
      currency: {
        EN: "Currency",
        ES: "Moneda",
      },
      amount: {
        EN: "Amount",
        ES: "Monto",
      },
    },
    placeholders: {
      selectCurrency: {
        EN: "Select Currency",
        ES: "Seleccionar Moneda",
      },
    },
    errors: {
      currencyRequired: {
        EN: "Currency required.",
        ES: "Moneda requerida.",
      },
      amountRequired: {
        EN: "Amount required.",
        ES: "Monto requerido.",
      },
      insufficientBalance: {
        EN: "Sufficient balance.",
        ES: "Saldo insuficiente.",
      },
      connectBank: {
        EN: "Please connect your bank detail first.",
        ES: "Por favor, conecta los detalles de tu banco primero.",
      },
      somethingWrong: {
        EN: "Something went wrong.",
        ES: "Algo salió mal.",
      },
    },
    buttons: {
      connectBank: {
        EN: "Connect Bank",
        ES: "Conectar Banco",
      },
      requestWithdraw: {
        EN: "Request Withdraw",
        ES: "Solicitar Retiro",
      },
    },
    messages: {
      withdrawSuccess: {
        EN: "Withdraw requested successfully.",
        ES: "Retiro solicitado con éxito.",
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
      },
    },
    placeholders: {
      search: {
        EN: "Search by name and email",
        ES: "Buscar por nombre y correo electrónico",
      },
    },
    buttons: {
      inviteAgent: {
        EN: "Invite agent",
        ES: "Invitar agente",
      },
    },
    tableHeaders: {
      name: {
        EN: "Name",
        ES: "Nombre",
      },
      email: {
        EN: "Email",
        ES: "Correo Electrónico",
      },
      location: {
        EN: "Location",
        ES: "Ubicación",
      },
      phone: {
        EN: "Phone",
        ES: "Teléfono",
      },
      actions: {
        EN: "Actions",
        ES: "Acciones",
      },
    },
    messages: {
      noAgents: {
        EN: "No Agents",
        ES: "No hay Agentes",
      },
      agentRemoved: {
        EN: "Agent removed successfully.",
        ES: "Agente eliminado con éxito.",
      },
      agentRestored: {
        EN: "Agent re-enabled successfully.",
        ES: "Agente restaurado con éxito.",
      },
      serverError: {
        EN: "Server error.",
        ES: "Error del servidor.",
      },
    },
  },
  activeModal: {
    message: {
      EN: "Are you sure you want to activate this agent?",
      ES: "¿Estás seguro de que deseas activar a este agente?",
    },
    buttons: {
      activate: {
        EN: "Activate Agent",
        ES: "Activar Agente",
      },
    },
  },
  deleteModal: {
    message: {
      EN: "Are you sure you want to remove this agent?",
      ES: "¿Estás seguro de que deseas eliminar a este agente?",
    },
    buttons: {
      remove: {
        EN: "Remove Agent",
        ES: "Eliminar Agente",
      },
    },
  },
  inviteModal: {
    title: {
      EN: "Invite agent",
      ES: "Invitar agente",
    },
    labels: {
      agentEmail: {
        EN: "Agent email",
        ES: "Correo del agente",
      },
    },
    placeholders: {
      agentEmail: {
        EN: "Agent email",
        ES: "Correo del agente",
      },
    },
    errors: {
      emailRequired: {
        EN: "Agent email required.",
        ES: "Correo del agente requerido.",
      },
      invalidEmail: {
        EN: "Invalid email.",
        ES: "Correo electrónico no válido.",
      },
      connectBank: {
        EN: "Please connect your bank detail first.",
        ES: "Por favor, conecta los detalles de tu banco primero.",
      },
      somethingWrong: {
        EN: "Something went wrong.",
        ES: "Algo salió mal.",
      },
    },
    messages: {
      invitationSent: {
        EN: "Invitation email sent successfully.",
        ES: "Correo de invitación enviado con éxito.",
      },
    },
    buttons: {
      connectBank: {
        EN: "Connect Bank",
        ES: "Conectar Banco",
      },
      sendInvite: {
        EN: "Send Invite Email",
        ES: "Enviar Correo de Invitación",
      },
    },
  },
};

export const dictionaryPayment = {
  toast: {
    serverError: {
      EN: "Server error.",
      ES: "Error del servidor.",
    },
    copied: {
      EN: "Copied successfullly.",
      ES: "copiado exitosamente.",
    },
    transactionExpired: {
      EN: "This transaction has been expired.",
      ES: "Esta transacción ha expirado.",
    },
    transactionCompleted: {
      EN: "Transaction completed successfully.",
      ES: "Transacción completada con éxito.",
    },
  },
  status: {
    requested: {
      EN: "Payment is requested",
      ES: "Se ha solicitado el pago",
    },
    received: {
      EN: "Payment is received, awaiting confirmation",
      ES: "El pago ha sido recibido, esperando confirmación",
    },
    completed: {
      EN: "Payment completed",
      ES: "Pago completado",
    },
    expired: {
      EN: "This transaction already has been expired!",
      ES: "¡Esta transacción ya ha expirado!",
    },
    cancelled: {
      EN: "This transaction already has been cancelled!",
      ES: "¡Esta transacción ya ha sido cancelada!",
    },
  },
  labels: {
    transactionHash: {
      EN: "Transaction Hash",
      ES: "Hash de la transacción",
    },
    network: {
      EN: "Network",
      ES: "Red",
    },
    amount: {
      EN: "Amount",
      ES: "Cantidad",
    },
    depositAddress: {
      EN: "Deposit Address",
      ES: "Dirección de depósito",
    },
    confirmations: {
      EN: "Confirmations",
      ES: "Confirmaciones",
    },
    selectCurrency: {
      EN: "Select currency you want to pay",
      ES: "Seleccione la moneda que desea pagar",
    },
    selectNetwork: {
      EN: "Select Network",
      ES: "Seleccione la red",
    },
    warning: {
      EN: "Be careful when choosing a network and currency when sending cryptocurrency. If you send cryptocurrency over the wrong network or wrong currency, then your money will not be credited or returned.",
      ES: "Tenga cuidado al elegir una red y moneda al enviar criptomonedas. Si envía criptomonedas a través de la red o moneda equivocada, su dinero no será acreditado ni devuelto.",
    },
  },
  buttons: {
    continue: {
      EN: "Continue",
      ES: "Continuar",
    },
    goBack: {
      EN: "Go Back",
      ES: "Volver",
    },
  },
  transactionCompletedMessage: {
    EN: "Transaction has been completed successfully!",
    ES: "¡La transacción se ha completado con éxito!",
  },
  paymentDescription: {
    hasRequested: {
      EN: "has requested",
      ES: "ha solicitado a",
    },
    toPay: {
      EN: "to pay",
      ES: "pagar",
    },
    EN: "${payeeName}  ${customerName} to pay ${amount} ${currencySymbol}.",
    ES: "${payeeName} ha solicitado a ${customerName} pagar ${amount} ${currencySymbol}.",
  },
  paymentDetails: {
    paid: {
      EN: "You have paid",
      ES: "Has pagado",
    },
    to: {
      EN: "to",
      ES: "a",
    },
    EN: "You have paid {amount} {currencySymbol} to {payeeName}.",
    ES: "Has pagado {amount} {currencySymbol} a {payeeName}.",
  },
};

export const dictionaryInvitation = {
  title: {
    EN: "Agent Invitation",
    ES: "Invitación de Agente",
  },
  subtitle1: {
    EN: "You were invited by",
    ES: "Has sido invitado por",
  },
  subtitle2: {
    EN: ". Please complete this form to be an agent.",
    ES: ". Por favor, completa este formulario para ser un agente.",
  },
  status: {
    expired: {
      EN: "This invitation has been expired.",
      ES: "Esta invitación ha expirado.",
    },
    completed: {
      EN: "This invitation was already completed.",
      ES: "Esta invitación ya ha sido completada.",
    },
  },
  fields: {
    agentName: {
      EN: "Agent Name",
      ES: "Nombre del Agente",
    },
    country: {
      EN: "Country",
      ES: "País",
    },
    phone: {
      EN: "Mobile Number",
      ES: "Número de Móvil",
    },
    email: {
      EN: "Email Address",
      ES: "Dirección de Correo Electrónico",
    },
    password: {
      EN: "Password",
      ES: "Contraseña",
    },
    confirmPassword: {
      EN: "Confirm Password",
      ES: "Confirmar Contraseña",
    },
  },
  errors: {
    required: {
      EN: "This field required.",
      ES: "Este campo es obligatorio.",
    },
    invalidEmail: {
      EN: "Invalid email.",
      ES: "Correo electrónico no válido.",
    },
    invalidPhone: {
      EN: "Incorrect phone number",
      ES: "Número de teléfono incorrecto",
    },
    passwordMismatch: {
      EN: "Password confirmation does not match.",
      ES: "La confirmación de la contraseña no coincide.",
    },
    duplicateUser: {
      EN: "User is already exist.",
      ES: "El usuario ya existe.",
    },
    registerFailed: {
      EN: "Register failed.",
      ES: "El registro falló.",
    },
    generalError: {
      EN: "Something went wrong.",
      ES: "Algo salió mal.",
    },
  },
  toast: {
    invitationCompleted: {
      EN: "Invitation completed successfully.",
      ES: "Invitación completada con éxito.",
    },
    serverError: {
      EN: "Server error.",
      ES: "Error del servidor.",
    },
  },
  buttons: {
    continue: {
      EN: "Continue",
      ES: "Continuar",
    },
  },
};
