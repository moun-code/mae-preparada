/**
 * Copy-base e Dados Estruturados da Landing Page (/guia e /resultado)
 * Seguindo rigorosamente a Seção 8, Seção 9 e Apêndice A do Super Prompt.
 */

export interface RealityScene {
  id: string;
  title: string;
  description: string;
  illustrationType: 'choking' | 'seizure' | 'drowning';
  imageSrc?: string;
}

export const REALITY_SCENES: RealityScene[] = [
  {
    id: 'scene-1',
    title: 'Silêncio na sala.',
    description:
      'Um pedaço de fruta. Ele(a) não tosse, não chora. Cada segundo parece uma hora. Você sabe qual é o primeiro movimento?',
    illustrationType: 'choking',
    imageSrc: '/images/imagem_01_silencio_na_sala.webp',
  },
  {
    id: 'scene-2',
    title: 'Madrugada.',
    description:
      'A febre subiu e o corpinho começa a tremer. Você sabe o que nunca colocar na boca dele(a)?',
    illustrationType: 'seizure',
    imageSrc: '/images/imagem_02_madrugada.webp',
  },
  {
    id: 'scene-3',
    title: 'Só um minuto.',
    description:
      'O telefone tocou. Foram 30 segundos. Você sabe como um afogamento realmente acontece, e que quase nunca faz barulho?',
    illustrationType: 'drowning',
    imageSrc: '/images/imagem_03_so_um_minuto.webp',
  },
];

export interface CounterIntuitiveError {
  id: number;
  wrongAction: string;
  rightDirection: string;
}

export const SIX_ERRORS: CounterIntuitiveError[] = [
  {
    id: 1,
    wrongAction: 'Dar água a quem engasgou',
    rightDirection: 'Não dar; seguir a sequência correta e ligar 192.',
  },
  {
    id: 2,
    wrongAction: 'Pasta de dente ou manteiga na queimadura',
    rightDirection: 'Água corrente fria por 10 a 20 minutos.',
  },
  {
    id: 3,
    wrongAction: 'Provocar vômito após produto de limpeza',
    rightDirection:
      'Não provocar; ligar 0800 722 6001 ou 192 com a embalagem.',
  },
  {
    id: 4,
    wrongAction: 'Pano na boca durante a convulsão',
    rightDirection: 'Nada na boca; deitar de lado e anotar a hora.',
  },
  {
    id: 5,
    wrongAction: 'Esperar a pilha-botão sair sozinha',
    rightDirection: 'Emergência, mesmo sem sintomas.',
  },
  {
    id: 6,
    wrongAction: 'Bater nas costas de quem tosse forte',
    rightDirection: 'Deixar tossir; quem tosse está respirando.',
  },
];

export interface GuideCategory {
  code: 'A' | 'B' | 'C' | 'D';
  title: string;
  summary: string;
  items: string[];
}

// Apêndice A — Situações do guia (para as listas da seção 8.7)
export const GUIDE_CATEGORIES: GuideCategory[] = [
  {
    code: 'A',
    title: 'Asfixia e respiração',
    summary: 'Engasgo, RCP, afogamento, falta de ar…',
    items: [
      'Engasgo grave no(a) bebê',
      'Engasgo grave em criança',
      'Engasgo com leite, água ou comida (tosse)',
      'RCP no(a) bebê (2 páginas)',
      'RCP em criança',
      'Sufocamento no berço e sono seguro',
      'Asfixia mecânica (cordões, sacolas, entalado)',
      'Afogamento',
      'Crise de falta de ar (asma, bronquiolite, crupe)',
      'Posição lateral de segurança',
    ],
  },
  {
    code: 'B',
    title: 'Traumas e lesões',
    summary: 'Queda com pancada na cabeça, fraturas, hemorragia, olhos…',
    items: [
      'Queda com batida na cabeça (checklist)',
      'Suspeita de lesão no pescoço ou coluna',
      'Fraturas e luxações',
      'Hemorragia e cortes profundos',
      'Sangramento nasal',
      'Esmagamento de dedos',
      'Trauma ocular',
    ],
  },
  {
    code: 'C',
    title: 'Acidentes domésticos',
    summary: 'Queimaduras, choque elétrico, intoxicação, pilhas e ímãs…',
    items: [
      'Queimaduras (graus)',
      'Queimadura térmica',
      'Queimadura química e elétrica',
      'Choque elétrico',
      'Intoxicação (limpeza e medicamentos)',
      'Pilhas-botão e ímãs',
      'Moedas e outros objetos engolidos',
      'Objeto no nariz ou no ouvido',
    ],
  },
  {
    code: 'D',
    title: 'Clínicas e externas',
    summary:
      'Convulsão, febre, desidratação, alergia grave, picadas, insolação…',
    items: [
      'Convulsão febril',
      'Febre alta (inclusive à noite)',
      'Desidratação',
      'Reação alérgica grave (anafilaxia)',
      'Picadas de abelha e vespa',
      'Escorpião, aranhas e lagartas',
      'Picada de cobra',
      'Mordida de animais',
      'Insolação',
    ],
  },
];

export interface ValueStackItem {
  number: number;
  title: string;
  description?: string;
  resolves?: string;
  pendingTag?: string;
}

export const VALUE_STACK_ITEMS: ValueStackItem[] = [
  {
    number: 1,
    title: 'Guia principal “Segundos que Salvam”',
    description:
      '35 situações, 44 páginas ilustradas, com “o que não fazer” e “quando ligar 192”.',
    resolves: 'saber o primeiro passo certo.',
  },
  {
    number: 2,
    title: 'Ficha de Emergência da Criança (campos digitáveis)',
    description: 'Peso, alergias, pediatra, contatos, endereço.',
    resolves: 'não precisar lembrar dados no susto.',
  },
  {
    number: 3,
    title: 'Roteiro da ligação para o 192',
    description: 'O que dizer, em ordem.',
    resolves: 'ligar com clareza, mesmo nervosa.',
  },
  {
    number: 4,
    title: 'Checklist do Kit de Primeiros Socorros da casa',
    resolves: 'ter o que precisa antes de precisar.',
  },
  {
    number: 5,
    title: 'Checklist Casa Segura por cômodo',
    resolves: 'evitar o acidente antes dele.',
  },
  {
    number: 6,
    title: 'Autoteste com gabarito',
    resolves: 'treinar a memória a cada 6 meses.',
  },
  {
    number: 7,
    title: 'Versão otimizada para impressão',
  },
  {
    number: 8,
    title: 'Bônus: Guia rápido de 1 página para avós e babás',
    resolves: 'quem cuida dele(a) também sabe agir.',
    pendingTag: '⟦a produzir: Guia rápido de 1 página para avós e babás⟧',
  },
  {
    number: 9,
    title: 'Bônus: Cartaz de emergência rápida',
    pendingTag: '⟦a produzir: Cartaz de emergência rápida⟧',
  },
  {
    number: 10,
    title: 'Atualizações do guia',
    pendingTag: '⟦definir política: ex. gratuitas por X meses⟧',
  },
];

export interface ComparisonRow {
  criterion: string;
  nothing: string;
  loosePosts: string;
  inPersonCourse: string;
  guide: string;
  courseWins?: boolean;
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    criterion: 'Organizado por situação',
    nothing: 'Não',
    loosePosts: 'Espalhado e conflitante',
    inPersonCourse: 'Sim (durante a aula)',
    guide: 'Sim, 35 situações em índice clicável',
  },
  {
    criterion: 'Consulta rápida na hora',
    nothing: 'Não',
    loosePosts: 'Lento (anúncios e textos longos)',
    inPersonCourse: 'Depende da memória',
    guide: 'Sim, acha em 2 toques no celular',
  },
  {
    criterion: 'Ilustrado passo a passo',
    nothing: 'Não',
    loosePosts: 'Raramente padronizado',
    inPersonCourse: 'Apostila teórica',
    guide: 'Sim, estilo manual de montagem',
  },
  {
    criterion: '“O que NÃO fazer” destacado',
    nothing: 'Não',
    loosePosts: 'Muitas vezes ensina mitos',
    inPersonCourse: 'Sim',
    guide: 'Sim, caixa de alerta em toda página',
  },
  {
    criterion: 'Serve a avó / babá',
    nothing: 'Não',
    loosePosts: 'Difícil elas assistirem tudo',
    inPersonCourse: 'Exige que elas também façam o curso',
    guide: 'Sim, envia no celular e imprime se quiser',
  },
  {
    criterion: 'Treino prático com instrutor e manequim',
    nothing: 'Não',
    loosePosts: 'Não',
    inPersonCourse: 'Sim (Vence neste ponto!)',
    guide: 'Não (apoio visual de consulta)',
    courseWins: true,
  },
];

export interface FAQItem {
  qIndex: number;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    qIndex: 1,
    question: 'Substitui um curso de primeiros socorros?',
    answer:
      'Não. Recomendamos fortemente fazer um curso prático presencial sempre que puder. O guia funciona como memória de apoio e consulta rápida na hora do susto, quando o nervosismo apaga o que você estudou.',
  },
  {
    qIndex: 2,
    question: 'Para qual idade serve?',
    answer:
      'O foco principal é em bebês e crianças pequenas (0 a 5 anos), diferenciando claramente as condutas para menores de 1 ano e crianças maiores, sendo útil até a idade escolar.',
  },
  {
    qIndex: 3,
    question: 'Como recebo?',
    answer:
      'Por e-mail e pela área de membros da Cakto, logo após a confirmação do pagamento (no Pix ou cartão, a liberação leva poucos instantes).',
  },
  {
    qIndex: 4,
    question: 'Posso imprimir?',
    answer:
      'Sim! O guia já acompanha versão pensada para impressão e você pode preencher a Ficha de Emergência da Criança para ter sempre à mão.',
  },
  {
    qIndex: 5,
    question: 'Funciona offline?',
    answer:
      'Sim. Como é um arquivo PDF interativo, depois de salvar no celular você abre a qualquer momento, mesmo sem internet ou sinal de rede.',
  },
  {
    qIndex: 6,
    question: 'Os campos da ficha são digitáveis?',
    answer:
      'Sim, em leitores de PDF compatíveis no celular ou computador você pode digitar peso, alergias, telefone do pediatra e endereço antes mesmo de imprimir.',
  },
  {
    qIndex: 7,
    question: 'Quem fez?',
    answer:
      'É uma publicação da Mãe Preparada — Educação em Segurança e Saúde Infantil, estruturada a partir das diretrizes públicas da SBP, Ministério da Saúde, AHA/ERC, Anvisa e centros de intoxicação (listadas na seção de autoria).',
  },
  {
    qIndex: 8,
    question: 'E se não gostar?',
    answer:
      'Você tem garantia incondicional de 7 dias (direito de arrependimento, art. 49 do CDC). Pode abrir, ler e folhear; se achar que não é para você, basta pedir o reembolso e devolvemos 100% do valor.',
  },
  {
    qIndex: 9,
    question: 'Eu preciso estar calma para conseguir usar?',
    answer:
      'Não — ele foi desenhado justamente para quem está nervosa e precisa agir. Frases curtas, letras grandes, ilustrações em traço limpo com foco no movimento e a mesma regra de ouro em toda página: Calma. Respire. Ligue 192.',
  },
  {
    qIndex: 10,
    question: 'Posso compartilhar com a avó ou babá?',
    answer:
      'Sim, o uso familiar com quem cuida diretamente do seu filho (avós, pai, babá) é incentivado para que toda a rede de apoio da criança saiba o primeiro passo.',
  },
];

export const PUBLIC_GUIDELINE_SOURCES = [
  {
    name: 'Sociedade Brasileira de Pediatria (SBP)',
    topic: 'Manuais de Prevenção de Acidentes e Primeiros Socorros na Infância',
    url: 'https://www.sbp.com.br/',
  },
  {
    name: 'Ministério da Saúde / SAMU 192',
    topic: 'Protocolos de Suporte Básico de Vida e Lei Lucas (Lei nº 13.722)',
    url: 'https://www.gov.br/saude/',
  },
  {
    name: 'American Heart Association (AHA) / ERC',
    topic: 'Diretrizes de RCP e Atendimento Cardiovascular de Emergência Pediátrica',
    url: 'https://cpr.heart.org/',
  },
  {
    name: 'Anvisa / RENACIAT (0800 722 6001)',
    topic: 'Orientações Nacionais de Intoxicações Domésticas Agudas',
    url: 'https://www.gov.br/anvisa/',
  },
];

export interface TestimonialItem {
  id: number;
  name: string;
  subtitle: string;
  avatar: string;
  text: string;
  rating: number;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    name: 'Mariana Castro',
    subtitle: 'Mãe do Theo (2 anos) · Compra verificada',
    avatar: '/images/reviews/perfil_2.webp',
    text: 'Gente, eu tava com medo de ser aquele material cheio de texto que ninguém lê. Mas não! Abri no celular, procurei a situação e em dois toques já tava na página certa. É tudo bem curtinho e com desenho, tipo manual de montar móvel. Até eu, que sou super nervosa, consegui entender de primeira. Isso pra mim foi o que mais pesou.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Camila Albuquerque',
    subtitle: 'Mãe da Alice (11 meses) · Compra verificada',
    avatar: '/images/reviews/perfil_6.webp',
    text: 'Eu não compro isso esperando usar, graças a Deus. Mas só de saber que eu tenho o passo a passo no celular e que sei por onde começar, eu fiquei bem mais leve. Antes eu vivia com aquele medinho de ‘e se acontecer e eu não souber?’. Hoje, não é que o medo sumiu, mas eu sinto que tô mais preparada. Já vale pela paz de espírito.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Renata Silveira',
    subtitle: 'Mãe do Bernardo (1 ano e meio) · Compra verificada',
    avatar: '/images/reviews/perfil_3.webp',
    text: 'Mandei pra minha mãe e pra babá no mesmo dia. Minha mãe ficou com meu bebê a semana toda e eu não conseguia relaxar sabendo que ela podia não saber o que fazer. Agora as duas leram, e a gente até conversou sobre o que cada uma faria. Foi um peso a menos nas minhas costas. Recomendo pra quem deixa o filho com alguém.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Beatriz Mendes',
    subtitle: 'Mãe da Maitê (8 meses) · Compra verificada',
    avatar: '/images/reviews/perfil_5.webp',
    text: 'Fiquei chocada com uma coisa: eu sempre achei que pasta de dente ajudava em queimadura, minha avó fazia isso! No guia mostra que não é bem assim e o que fazer no lugar. Também vi a parte do que NÃO fazer na convulsão. Eu faria tudo errado. Ainda bem que li antes de precisar, e não depois.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Juliana Freitas',
    subtitle: 'Mãe do Lucas (10 meses) · Compra verificada',
    avatar: '/images/reviews/perfil_4.webp',
    text: 'Pensei bastante antes de comprar, porque sempre tem aquele ‘ah, dá pra achar na internet’. Mas o que eu achava era tudo solto, um dizendo uma coisa e outro dizendo outra. Aqui tá tudo junto, organizado e fácil de achar. Quando eu parei pra pensar no que eu ia ter na mão, o valor ficou pequeno perto de tudo que o guia traz.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Cláudia Rocha',
    subtitle: 'Mãe da Sofia e avó do Lucca · Compra verificada',
    avatar: '/images/reviews/perfil_1.webp',
    text: 'O que mais me impressionou foi o capricho. Os desenhos são limpinhos, o texto é direto e tem a parte do que não fazer em cada situação, que eu achei genial. Dá pra imprimir a ficha e colar na geladeira, o que eu fiz na hora. Dá pra ver que foi feito com cuidado, não é aquele PDF jogado de qualquer jeito.',
    rating: 5,
  },
];

