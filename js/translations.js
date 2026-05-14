const languages = [
    { code: 'en', name: 'English', flag: 'Reference (Spia)/CountryFlagsIcons/uk.png' },
    { code: 'fr', name: 'Français', flag: 'Reference (Spia)/CountryFlagsIcons/fr.png' },
    { code: 'it', name: 'Italiano', flag: 'Reference (Spia)/CountryFlagsIcons/it.png' },
    { code: 'es', name: 'Español', flag: 'Reference (Spia)/CountryFlagsIcons/es.png' },
    { code: 'pt', name: 'Português', flag: 'Reference (Spia)/CountryFlagsIcons/br.png' }
];

let currentLanguage = 'en';

const translations = {
    en: {
        "nav.home": "Home",
        "nav.kidscorner": "KidsCorner",
        "nav.about": "About",
        "hero.title": "Beneath the noise,",
        "hero.subtitle": "follow the whisper.",
        "hero.description": "In a world of infinite noise, Spia focuses on the signals that matter, the stories that make us feel, think, and grow. Discover carefully curated books, ideas, and perspectives designed to spark wonder across every stage of life.",
        "hero.explore": "Explore",
        "hero.explore-kids": "KidsCorner",
        "hero.refine": "Search",
        "platforms.kidscorner.alt": "KidsCorner",
        "platforms.small": "Small",
        "platforms.books": "Books",
        "platforms.wide": "Wide",
        "platforms.worlds": "Worlds",
        "platforms.spia-first": "<span style=\"font-family: 'Didot Elder Bold', serif; font-weight: bold;\">Spia</span>'s first chapter, ",
        "platforms.kidscorner-name": "KidsCorner.",
        "platforms.stories": "Stories for young readers and those guiding them,",
        "platforms.glance": "where a simple glance can magnify empathy,",
        "platforms.perspective": "perspective, and a love of reading.",
        "about.welcome": "Welcome to a curated digital space built for those who believe stories form who we become.",
        "about.content": "In an age of endless content, intention matters more than volume. Every book, idea, and recommendation you find here is selected with care, designed to inspire curiosity, deepen emotional understanding, and open new ways of seeing the world.",
        "about.spia-role": "<strong>Spia</strong> doesn't just organize content. It connects meaning.",
        "about.built": "Built on three core ideas:",
        "about.feeling": "• <span style=\"color: #BADA55;\">Feeling</span>. Stories that help us understand ourselves and others",
        "about.thinking": "• <span style=\"color: #BADA55;\">Thinking</span>. Ideas that challenge, question, and expand our perspective",
        "about.growing": "• <span style=\"color: #BADA55;\">Growing</span>. Tools that support lifelong learning, from early childhood to adulthood",
        "about.kidscorner.desc": "The first branch, <kc>KidsCorner</kc>, is dedicated to young readers and the adults guiding them. It focuses on books that nurture emotional intelligence, cultural awareness, and a genuine love for reading, without overwhelming choice.",
        "about.expand": "will continue to expand into new domains, always guided by the same principle:",
        "about.less-noise": "Less noise. More meaning.",
        "footer.tagline": "Where Stories Lead.",
        "footer.explore": "Explore",
        "footer.kidscorner": "KidsCorner",
        "footer.platforms": "Platforms",
        "footer.legal": "Legal",
        "footer.disclaimer": "Disclaimer",
        "footer.privacy": "Privacy Policy",
        "footer.affiliate": "Affiliate Disclosure",
        "footer.terms": "Terms & Conditions",
        "footer.about": "About",
        "footer.our-vision": "Vision",
        "footer.contact": "Contact",
        "footer.copyright": "All rights reserved.",
        "kc.hero.title": "Small Books, Wide Worlds.",
        "kc.hero.lead": "A thoughtfully curated collection of children's literature.",
        "kc.hero.desc": "KidsCorner is a treasure trove of children's and tween books chosen for their richness, character, and meaningful storytelling. Stories that invite thought, imagination, and discovery.",
        "kc.hero.tagline": "Here, stories create new worlds and quietly open the way ahead.",
        "kc.browse.title": "Browse Our Collections",
        "kc.age-groups.title": "By Age",
        "kc.values.title": "Values",
        "kc.experience.title": "Experience",
        "kc.languages.title": "Languages",
        "kc.curators-picks.title": "Curator's Picks",
        "kc.categories.age-groups": "Age Groups",
        "kc.categories.values": "Values",
        "kc.categories.experience": "Experience",
        "kc.categories.languages": "Languages",
        "kc.categories.curators-picks": "Curator's Picks",
        "kc.age.0-3": "0-3 Years",
        "kc.age.4-6": "4-6 Years",
        "kc.age.7-9": "7-9 Years",
        "kc.age.9-12": "9-12 Years",
        "kc.age.12+": "12+ Years",
        "kc.values.courage": "Courage",
        "kc.values.creativity": "Creativity",
        "kc.values.thinking": "Thinking",
        "kc.values.empathy": "Empathy",
        "kc.values.intercultural": "Interculturality",
        "kc.experience.format": "Format",
        "kc.experience.world": "World",
        "kc.experience.structure": "Structure",
        "kc.experience.visual": "Visual",
        "kc.languages.english": "English",
        "kc.languages.french": "Français",
        "kc.languages.italian": "Italiano",
        "kc.languages.spanish": "Español",
        "kc.languages.portuguese": "Português",
        "kc.languages.bilingual": "Bilingual",
        "kc.footer.tagline": "Growing Curious Minds.",
        "kc.footer.explore": "Collections",
        "kc.footer.curators": "Curator's Picks",
        "kc.footer.home": "Home",
        "kc.footer.about": "About Spia",
        "legal.title": "Legal Information",
        "legal.subtitle": "Transparency and trust are at the heart of Spia."
    },
    fr: {
        "nav.home": "Accueil",
        "nav.kidscorner": "KidsCorner",
        "nav.about": "À propos",
        "hero.title": "Sous le bruit,",
        "hero.subtitle": "écoute le murmure.",
        "hero.description": "Dans un monde de bruit sans fin, <span style=\"font-family: 'Didot Elder Bold', serif; font-weight: bold;\">Spia</span> se concentre sur l'essentiel, les histoires qui nous font ressentir, réfléchir et grandir. Découvre des livres, des idées et des perspectives choisis avec soin pour émerveiller à chaque étape de la vie.",
        "hero.explore": "Explorer",
        "hero.explore-kids": "KidsCorner",
        "hero.refine": "Rechercher",
        "platforms.kidscorner.alt": "KidsCorner",
        "platforms.small": "Petits",
        "platforms.books": "Livres",
        "platforms.wide": "Grands",
        "platforms.worlds": "Mondes",
        "platforms.spia-first": "Le premier chapitre de <span style=\"font-family: 'Didot Elder Bold', serif; font-weight: bold;\">Spia</span>, ",
        "platforms.kidscorner-name": "KidsCorner.",
        "platforms.stories": "Des histoires pour les jeunes lecteurs et ceux qui les guident,",
        "platforms.glance": "où un simple regard peut magnifier l'empathie,",
        "platforms.perspective": "la curiosité et l'amour de la lecture.",
        "about.welcome": "Bienvenue dans un espace numérique conçu pour ceux qui estiment que les histoires nous façonnent.",
        "about.content": "Chaque livre, idée et recommandation réunis ici ont été choisis avec soin pour éveiller la curiosité, nourrir la compréhension émotionnelle et ouvrir de nouvelles perspectives sur le monde.",
        "about.spia-role": "<span style=\"font-family: 'Didot Elder Bold', serif; font-weight: bold;\">Spia</span> ne se limite pas à organiser du contenu, mais à tisser des liens entre les idées.",
        "about.built": "Fondé sur trois idées essentielles :",
        "about.feeling": "• <span style=\"color: #BADA55;\">Ressentir</span>. Des histoires qui nous aident à nous comprendre et à comprendre les autres",
        "about.thinking": "• <span style=\"color: #BADA55;\">Réfléchir</span>. Des idées qui bousculent, interrogent et élargissent notre vision des choses",
        "about.growing": "• <span style=\"color: #BADA55;\">Grandir</span>. Des outils qui accompagnent l'apprentissage tout au long de la vie, de la petite enfance à l'âge adulte",
        "about.kidscorner.desc": "La première branche, <span style=\"font-family: 'More Sugar', cursive; font-size: 1.2em; color: #E87528;\">KidsCorner</span>, se consacre aux jeunes lecteurs et ceux qui nourrissent leur imaginaire.",
        "about.expand": "continuera à s'ouvrir à de nouveaux domaines, toujours guidée par le même principe :",
        "about.less-noise": "Moins de bruit. Plus de sens.",
        "footer.tagline": "Au fil des histoires.",
        "footer.explore": "Explorer",
        "footer.kidscorner": "KidsCorner",
        "footer.platforms": "Plateformes",
        "footer.legal": "Mentions légales",
        "footer.disclaimer": "Clause de non-responsabilité",
        "footer.privacy": "Politique de confidentialité",
        "footer.affiliate": "Divulgation d'affiliation",
        "footer.terms": "Conditions générales",
        "footer.about": "À propos",
        "footer.our-vision": "Vision",
        "footer.contact": "Contact",
        "footer.copyright": "Tous droits réservés.",
        "kc.hero.title": "Petits Livres, Grands Mondes.",
        "kc.hero.lead": "Une collection exigeante de littérature de jeunesse.",
        "kc.hero.desc": "KidsCorner est un coffre au trésor de livres pour enfants et pré-adolescents, sélectionnés pour leur richesse, la qualité de leurs personnages et la profondeur de leur récit. Des histoires qui invitent à la réflexion, à l'imagination et à la découverte.",
        "kc.hero.tagline": "Ici, les histoires créent de nouveaux mondes et ouvrent secrètement la voie.",
        "kc.browse.title": "Découvrir nos collections",
        "kc.age-groups.title": "Par âge",
        "kc.values.title": "Valeurs",
        "kc.experience.title": "Expérience",
        "kc.languages.title": "Langues",
        "kc.curators-picks.title": "Coups de cœur",
        "kc.categories.age-groups": "Tranches d'âge",
        "kc.categories.values": "Valeurs",
        "kc.categories.experience": "Expérience",
        "kc.categories.languages": "Langues",
        "kc.categories.curators-picks": "Coups de cœur",
        "kc.age.0-3": "0-3 ans",
        "kc.age.4-6": "4-6 ans",
        "kc.age.7-9": "7-9 ans",
        "kc.age.9-12": "9-12 ans",
        "kc.age.12+": "12 ans et +",
        "kc.values.courage": "Courage",
        "kc.values.creativity": "Créativité",
        "kc.values.thinking": "Réflexion",
        "kc.values.empathy": "Empathie",
        "kc.values.intercultural": "Ouverture interculturelle",
        "kc.experience.format": "Format",
        "kc.experience.world": "Monde",
        "kc.experience.structure": "Structure",
        "kc.experience.visual": "Aspect visuel",
        "kc.languages.english": "Anglais",
        "kc.languages.french": "Français",
        "kc.languages.italian": "Italien",
        "kc.languages.spanish": "Espagnol",
        "kc.languages.portuguese": "Portugais",
        "kc.languages.bilingual": "Bilingue",
        "kc.footer.tagline": "Grandir avec curiosité.",
        "kc.footer.explore": "Collections",
        "kc.footer.curators": "Coups de cœur",
        "kc.footer.home": "Accueil",
        "kc.footer.about": "À propos de Spia",
        "legal.title": "Informations légales",
        "legal.subtitle": "La transparence et la confiance sont au cœur de Spia."
    },
    es: {
        "nav.home": "Inicio",
        "nav.kidscorner": "KidsCorner",
        "nav.about": "Acerca de",
        "hero.title": "Bajo el ruido,",
        "hero.subtitle": "sigue el susurro.",
        "hero.description": "En un mundo de ruido infinito, Spia se enfoca en las señales que importan, las historias que nos hacen sentir, pensar y crecer. Descubre libros, ideas y perspectivas cuidadosamente seleccionados para despertar el asombro en cada etapa de la vida.",
        "hero.explore": "Explorar",
        "hero.explore-kids": "KidsCorner",
        "hero.refine": "Refinar",
        "platforms.kidscorner.alt": "KidsCorner",
        "platforms.small": "Pequeños",
        "platforms.books": "Libros",
        "platforms.wide": "Grandes",
        "platforms.worlds": "Mundos",
        "platforms.spia-first": "El primer capítulo de Spia,",
        "platforms.kidscorner-name": "KidsCorner.",
        "platforms.stories": "Historias para jóvenes lectores y quienes los guían,",
        "platforms.glance": "donde una simple mirada puede amplificar la empatía,",
        "platforms.perspective": "la perspectiva y el amor por la lectura.",
        "about.welcome": "Bienvenido a un espacio digital seleccionado para quienes creen que las historias moldean quienes llegamos a ser.",
        "about.content": "En una era de contenido infinito, la intención importa más que el volumen. Cada libro, idea y recomendación que encuentras aquí está seleccionado con cuidado, diseñado para inspirar curiosidad, profundizar la comprensión emocional y abrir nuevas formas de ver el mundo.",
        "about.spia-role": "Spia no solo organiza contenido. Conecta significados.",
        "about.built": "Construido sobre tres ideas centrales:",
        "about.feeling": "• <span style=\"color: #BADA55;\">Sentir</span>. Historias que nos ayudan a entendernos a nosotros mismos y a los demás",
        "about.thinking": "• <span style=\"color: #BADA55;\">Pensar</span>. Ideas que desafían, cuestionan y amplían nuestra perspectiva",
        "about.growing": "• <span style=\"color: #BADA55;\">Crecer</span>. Herramientas que apoyan el aprendizaje lifelong, desde la primera infancia hasta la edad adulta",
        "about.kidscorner.desc": "La primera rama, KidsCorner, está dedicada a jóvenes lectores y los adultos que los guían. Se enfoca en libros que nutren la inteligencia emocional, la conciencia cultural y un genuino amor por la lectura, sin abrumar con opciones.",
        "about.expand": "Spia continuará expandiéndose a nuevos dominios, siempre guiado por el mismo principio:",
        "about.less-noise": "Menos ruido. Más significado.",
        "footer.tagline": "Donde las historias guían.",
        "footer.explore": "Explorar",
        "footer.kidscorner": "KidsCorner",
        "footer.platforms": "Plataformas",
        "footer.legal": "Legal",
        "footer.disclaimer": "Aviso",
        "footer.privacy": "Política de privacidad",
        "footer.affiliate": "Divulgación de afiliación",
        "footer.terms": "Términos y condiciones",
        "footer.about": "Acerca de",
        "footer.our-vision": "Visión",
        "footer.contact": "Contacto",
        "footer.copyright": "Todos los derechos reservados.",
        "kc.hero.title": "Pequeños Libros, Grandes Mundos.",
        "kc.hero.lead": "Una colección cuidadosamente curada de literatura infantil.",
        "kc.hero.desc": "KidsCorner es un tesoro de libros para niños y pre-adolescentes elegido por su riqueza, carácter y narrativa significativa. Historias que invitan al pensamiento, la imaginación y la descubrimiento.",
        "kc.hero.tagline": "Aquí, las historias crean nuevos mundos y silenciosamente abren el camino.",
        "kc.browse.title": "Explora nuestras colecciones",
        "kc.age-groups.title": "Por edad",
        "kc.values.title": "Valores",
        "kc.experience.title": "Experiencia",
        "kc.languages.title": "Idiomas",
        "kc.curators-picks.title": "Selecciones del curador",
        "kc.categories.age-groups": "Grupos de edad",
        "kc.categories.values": "Valores",
        "kc.categories.experience": "Experiencia",
        "kc.categories.languages": "Idiomas",
        "kc.categories.curators-picks": "Selecciones del curador",
        "kc.age.0-3": "0-3 años",
        "kc.age.4-6": "4-6 años",
        "kc.age.7-9": "7-9 años",
        "kc.age.9-12": "9-12 años",
        "kc.age.12+": "12+ años",
        "kc.values.courage": "Valentía",
        "kc.values.creativity": "Creatividad",
        "kc.values.thinking": "Pensamiento",
        "kc.values.empathy": "Empatía",
        "kc.values.intercultural": "Interculturalidad",
        "kc.experience.format": "Formato",
        "kc.experience.world": "Mundo",
        "kc.experience.structure": "Estructura",
        "kc.experience.visual": "Visual",
        "kc.languages.english": "English",
        "kc.languages.french": "Français",
        "kc.languages.italian": "Italiano",
        "kc.languages.spanish": "Español",
        "kc.languages.portuguese": "Português",
        "kc.languages.bilingual": "Bilingüe",
        "kc.footer.tagline": "Cultivando mentes curiosas.",
        "kc.footer.explore": "Colecciones",
        "kc.footer.curators": "Selecciones del curador",
        "kc.footer.home": "Inicio",
        "kc.footer.about": "Acerca de Spia",
        "legal.title": "Información legal",
        "legal.subtitle": "La transparencia y la confianza están en el corazón de Spia."
    },
it: {
        "nav.home": "Home",
        "nav.kidscorner": "KidsCorner",
        "nav.about": "A proposito",
        "hero.title": "Oltre il rumore,",
        "hero.subtitle": "segui il sussurro.",
        "hero.description": "In un mondo di rumore infinito, <span style=\"font-family: 'Didot Elder Bold', serif; font-weight: bold;\">Spia</span> si concentra sui segnali che contano, le storie che ci fanno sentire, riflettere e crescere. Scopri libri, idee e prospettive scelti con cura per accendere lo stupore in ogni fase della vita.",
        "hero.explore": "Esplora",
        "hero.explore-kids": "KidsCorner",
        "hero.refine": "Cerca",
        "platforms.kidscorner.alt": "KidsCorner",
        "platforms.small": "Piccoli",
        "platforms.books": "Libri",
        "platforms.wide": "Grandi",
        "platforms.worlds": "Mondi",
        "platforms.spia-first": "Il primo capitolo di <span style=\"font-family: 'Didot Elder Bold', serif; font-weight: bold;\">Spia</span>, ",
        "platforms.kidscorner-name": "KidsCorner.",
        "platforms.stories": "Storie per giovani lettori e per chi li accompagna,",
        "platforms.glance": "dove un semplice sguardo può amplificare l'empatia,",
        "platforms.perspective": "la curiosità e l'amore per la lettura.",
        "about.welcome": "Benvenuto in uno spazio digitale curato per chi crede che le storie forgino chi diventiamo.",
        "about.content": "In un'epoca di contenuti infiniti, l'intenzione conta più del volume. Ogni libro, idea e raccomandazione qui presenti sono scelti con cura per risvegliare lo sguardo curioso, nutrire la comprensione emotiva e aprire nuove prospettive sul mondo.",
        "about.spia-role": "<span style=\"font-family: 'Didot Elder Bold', serif; font-weight: bold;\">Spia</span> non organizza solo contenuti. Collega i significati.",
        "about.built": "Costruito su tre idee fondamentali:",
        "about.feeling": "• <span style=\"color: #BADA55;\">Sentire</span>. Storie che ci aiutano a comprendere noi stessi e gli altri",
        "about.thinking": "• <span style=\"color: #BADA55;\">Riflettere</span>. Idee che sfidano, interrogano e ampliano il nostro orizzonte",
        "about.growing": "• <span style=\"color: #BADA55;\">Crescere</span>. Strumenti che accompagnano l'apprendimento per tutta la vita, dall'infanzia all'età adulta",
        "about.kidscorner.desc": "Il primo ramo, <span style=\"font-family: 'More Sugar', cursive; font-size: 1.2em; color: #E87528;\">KidsCorner</span>, si dedica ai giovani lettori e a chi ne alimenta l'immaginazione. Si concentra su libri che nutrono l'intelligenza emotiva, la consapevolezza culturale e un genuino amore per la lettura, senza sopraffare con le scelte.",
        "about.expand": "continuerà ad aprirsi a nuovi ambiti, sempre guidata dallo stesso principio:",
        "about.less-noise": "Meno rumore. Più significato.",
        "footer.tagline": "Tra le storie.",
        "footer.explore": "Esplora",
        "footer.kidscorner": "KidsCorner",
        "footer.platforms": "Piattaforme",
        "footer.legal": "Note legali",
        "footer.disclaimer": "Disclaimer",
        "footer.privacy": "Privacy Policy",
        "footer.affiliate": "Disclosure affiliazioni",
        "footer.terms": "Termini e condizioni",
        "footer.about": "A proposito",
        "footer.our-vision": "Visione",
        "footer.contact": "Contatto",
        "footer.copyright": "Tutti i diritti riservati.",
        "kc.hero.title": "Piccoli Libri, Grandi Mondi.",
        "kc.hero.lead": "Una collezione accuratamente curata di letteratura per bambini.",
        "kc.hero.desc": "KidsCorner è un tesoro di libri per bambini e pre-adolescenti scelti per la loro ricchezza, il carattere e la narrazione significativa. Storie che invitano al pensiero, all'immaginazione e alla scoperta.",
        "kc.hero.tagline": "Qui le storie creano nuovi mondi e silenziosamente aprono la strada.",
        "kc.browse.title": "Sfoglia le nostre collezioni",
        "kc.age-groups.title": "Per età",
        "kc.values.title": "Valori",
        "kc.experience.title": "Esperienza",
        "kc.languages.title": "Lingue",
        "kc.curators-picks.title": "Scelte del curatore",
        "kc.categories.age-groups": "Gruppi d'età",
        "kc.categories.values": "Valori",
        "kc.categories.experience": "Esperienza",
        "kc.categories.languages": "Lingue",
        "kc.categories.curators-picks": "Scelte del curatore",
        "kc.age.0-3": "0-3 anni",
        "kc.age.4-6": "4-6 anni",
        "kc.age.7-9": "7-9 anni",
        "kc.age.9-12": "9-12 anni",
        "kc.age.12+": "12+ anni",
        "kc.values.courage": "Coraggio",
        "kc.values.creativity": "Creatività",
        "kc.values.thinking": "Riflessione",
        "kc.values.empathy": "Empatia",
        "kc.values.intercultural": "Interculturalità",
        "kc.experience.format": "Formato",
        "kc.experience.world": "Mondo",
        "kc.experience.structure": "Struttura",
        "kc.experience.visual": "Visivo",
        "kc.languages.english": "English",
        "kc.languages.french": "Français",
        "kc.languages.italian": "Italiano",
        "kc.languages.spanish": "Español",
        "kc.languages.portuguese": "Português",
        "kc.languages.bilingual": "Bilingue",
        "kc.footer.tagline": "Crescere menti curiose.",
        "kc.footer.explore": "Collezioni",
        "kc.footer.curators": "Scelte del curatore",
        "kc.footer.home": "Home",
        "kc.footer.about": "Chi è Spia",
        "legal.title": "Informazioni legali",
        "legal.subtitle": "La trasparenza e la fiducia sono al centro di Spia."
    },
    pt: {
        "nav.home": "Início",
        "nav.kidscorner": "KidsCorner",
        "nav.about": "Sobre",
        "hero.title": "Sob o barulho,",
        "hero.subtitle": "siga o sussurro.",
        "hero.description": "Em um mundo de barulho infinito, Spia se concentra nos sinais que importam, as histórias que nos fazem sentir, pensar e crescer. Descubra livros, ideias e perspectivas cuidadosamente selecionados para despertar o maravilhamento em cada fase da vida.",
        "hero.explore": "Explorar",
        "hero.explore-kids": "KidsCorner",
        "hero.refine": "Refinar",
        "platforms.kidscorner.alt": "KidsCorner",
        "platforms.small": "Pequenos",
        "platforms.books": "Livros",
        "platforms.wide": "Grandes",
        "platforms.worlds": "Mundos",
        "platforms.spia-first": "O primeiro capítulo da Spia,",
        "platforms.kidscorner-name": "KidsCorner.",
        "platforms.stories": "Histórias para jovens leitores e aqueles que os guiam,",
        "platforms.glance": "onde um simples olhar pode amplificar a empatia,",
        "platforms.perspective": "a perspectiva e o amor pela leitura.",
        "about.welcome": "Bem-vindo a um espaço digital selecionado para aqueles que acreditam que as histórias moldam quem nos tornamos.",
        "about.content": "Em uma era de conteúdo infinito, a intenção importa mais do que o volume. Cada livro, ideia e recomendação que você encontra aqui é selecionado com cuidado, projetado para inspirar curiosidade, aprofundar a compreensão emocional e abrir novas formas de ver o mundo.",
        "about.spia-role": "Spia não apenas organiza conteúdo. Conecta significados.",
        "about.built": "Construído sobre três ideias centrais:",
        "about.feeling": "• <span style=\"color: #BADA55;\">Sentir</span>. Histórias que nos ajudam a entender nós mesmos e os outros",
        "about.thinking": "• <span style=\"color: #BADA55;\">Pensar</span>. Ideias que desafiam, questionam e ampliam nossa perspectiva",
        "about.growing": "• <span style=\"color: #BADA55;\">Crescer</span>. Ferramentas que apoiam a aprendizagem ao longo da vida, desde a primeira infância até a idade adulta",
        "about.kidscorner.desc": "O primeiro ramo, KidsCorner, é dedicado a jovens leitores e aos adultos que os guiam. Foca em livros que nutrem inteligência emocional, consciência cultural e um genuíno amor pela leitura, sem sobrecarregar com escolhas.",
        "about.expand": "Spia continuará a se expandir para novos domínios, sempre guiada pelo mesmo princípio:",
        "about.less-noise": "Menos barulho. Mais significado.",
        "footer.tagline": "Onde as histórias guiam.",
        "footer.explore": "Explorar",
        "footer.kidscorner": "KidsCorner",
        "footer.platforms": "Plataformas",
        "footer.legal": "Legal",
        "footer.disclaimer": "Aviso",
        "footer.privacy": "Política de privacidade",
        "footer.affiliate": "Divulgação de afiliação",
        "footer.terms": "Termos e condições",
        "footer.about": "Sobre",
        "footer.our-vision": "Visão",
        "footer.contact": "Contato",
        "footer.copyright": "Todos os direitos reservados.",
        "kc.hero.title": "Pequenos Livros, Grandes Mundos.",
        "kc.hero.lead": "Uma coleção cuidadosamente curada de literatura infantil.",
        "kc.hero.desc": "KidsCorner é um tesouro de livros para crianças e pré-adolescentes escolhido por sua riqueza, caráter e narrativa significativa. Histórias que convidam ao pensamento, imaginação e descoberta.",
        "kc.hero.tagline": "Aqui, as histórias criam novos mundos e silenciosamente abrem o caminho.",
        "kc.browse.title": "Explore nossas coleções",
        "kc.age-groups.title": "Por idade",
        "kc.values.title": "Valores",
        "kc.experience.title": "Experiência",
        "kc.languages.title": "Idiomas",
        "kc.curators-picks.title": "Escolhas do curador",
        "kc.categories.age-groups": "Grupos etários",
        "kc.categories.values": "Valores",
        "kc.categories.experience": "Experiência",
        "kc.categories.languages": "Idiomas",
        "kc.categories.curators-picks": "Escolhas do curador",
        "kc.age.0-3": "0-3 anos",
        "kc.age.4-6": "4-6 anos",
        "kc.age.7-9": "7-9 anos",
        "kc.age.9-12": "9-12 anos",
        "kc.age.12+": "12+ anos",
        "kc.values.courage": "Coragem",
        "kc.values.creativity": "Criatividade",
        "kc.values.thinking": "Pensamento",
        "kc.values.empathy": "Empatia",
        "kc.values.intercultural": "Interculturalidade",
        "kc.experience.format": "Formato",
        "kc.experience.world": "Mundo",
        "kc.experience.structure": "Estrutura",
        "kc.experience.visual": "Visual",
        "kc.languages.english": "English",
        "kc.languages.french": "Français",
        "kc.languages.italian": "Italiano",
        "kc.languages.spanish": "Español",
        "kc.languages.portuguese": "Português",
        "kc.languages.bilingual": "Bilíngue",
        "kc.footer.tagline": "Cultivando mentes curiosas.",
        "kc.footer.explore": "Coleções",
        "kc.footer.curators": "Escolhas do curador",
        "kc.footer.home": "Início",
        "kc.footer.about": "Sobre a Spia",
        "legal.title": "Informações legais",
        "legal.subtitle": "A transparência e a confiança estão no coração da Spia."
    }
};

function setLanguage(lang) {
    if (!translations[lang]) {
        console.error(`Language ${lang} not available`);
        return;
    }
    currentLanguage = lang;
    localStorage.setItem('spia-language', lang);
    applyTranslations();
    updateLanguageSelector();
}

function getTranslation(key) {
    return translations[currentLanguage][key] || translations['en'][key] || key;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        let text = getTranslation(key);
        if (text) {
            text = text.replace(/<kc>(.*?)<\/kc>/g, '<span style="font-family: \'More Sugar\', cursive; font-size: 1.5rem; color: #E87528;">$1</span>');
            el.innerHTML = text;
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const text = getTranslation(key);
        if (text) {
            el.placeholder = text;
        }
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        const text = getTranslation(key);
        if (text) {
            el.title = text;
        }
    });
}

function updateLanguageSelector() {
    const activeLang = languages.find(l => l.code === currentLanguage);
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.lang === currentLanguage);
    });
    const currentDisplay = document.querySelector('.lang-current');
    if (currentDisplay && activeLang) {
        currentDisplay.innerHTML = `<img src="${activeLang.flag}" alt="${activeLang.name}" class="flag-img">`;
    }
}

function initLanguageSwitcher() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let navRight = nav.querySelector('.nav-right');
    if (!navRight) {
        navRight = document.createElement('div');
        navRight.className = 'nav-right';
        nav.appendChild(navRight);
    }

    if (nav.querySelector('.language-switcher')) return;

    const switcher = document.createElement('div');
    switcher.className = 'language-switcher';
    
    const activeLang = languages.find(l => l.code === currentLanguage) || languages[0];
    
    let dropdownHTML = '<div class="lang-dropdown" id="lang-dropdown">';
    for (let i = 0; i < languages.length; i++) {
        const lang = languages[i];
        const isActive = lang.code === currentLanguage ? 'active' : '';
        dropdownHTML += `<button class="lang-option ${isActive}" data-lang="${lang.code}">`;
        dropdownHTML += `<img src="${lang.flag}" alt="${lang.name}" class="flag-img">`;
        dropdownHTML += '</button>';
    }
    dropdownHTML += '</div>';
    
    switcher.innerHTML = `
        <button class="lang-current" id="lang-toggle">
            <img src="${activeLang.flag}" alt="${activeLang.name}" class="flag-img">
        </button>
        ${dropdownHTML}
    `;
    
    navRight.appendChild(switcher);

    const toggle = switcher.querySelector('#lang-toggle');
    const dropdown = switcher.querySelector('#lang-dropdown');

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });

    switcher.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.dataset.lang;
            setLanguage(lang);
            dropdown.classList.remove('show');
        });
    });

    document.addEventListener('click', (e) => {
        if (!switcher.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
}

function detectLanguage() {
    const saved = localStorage.getItem('spia-language');
    if (saved && languages.find(l => l.code === saved)) {
        return saved;
    }
    
    const browserLang = navigator.language.split('-')[0];
    const matched = languages.find(l => l.code === browserLang);
    return matched ? browserLang : 'en';
}

function init() {
    const lang = detectLanguage();
    currentLanguage = lang;
    applyTranslations();
    initLanguageSwitcher();
}

document.addEventListener('DOMContentLoaded', init);