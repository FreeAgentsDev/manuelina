export const SITE = {
  name: "Manuelina",
  tagline: "Pasta Fresca · Manizales",
  city: "Manizales",
  publicUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://manuelina.freeagentsdev.com",
  whatsapp: "573114596193",
  whatsappDisplay: "+57 311 459 6193",
  instagram: "https://instagram.com/manuelina_mz",
  instagramHandle: "@manuelina_mz",
  mapsUrl:
    process.env.NEXT_PUBLIC_MAPS_URL ??
    "https://maps.app.goo.gl/4thyPQdXFECzRkH57",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.2731251429163!2d-75.487719!3d5.059414599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4765ef9dcbe46f%3A0x5edc011cd77dc065!2sManuelina!5e0!3m2!1ses!2sco!4v1787850500389!5m2!1ses!2sco",
  mapsAddress: "Cl. 61 #23-07",
  mapsDirections:
    "https://www.google.com/maps/dir/?api=1&destination=Manuelina,+Cl.+61+%2323-07,+Manizales,+Caldas",
  owner: "Manuela Gómez",
} as const;

export function whatsappHref(text: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const PEDIDO_HREF = whatsappHref(
  "Hola Manuelina, quiero pedir:",
);

export function qrImageUrl(data: string, size = 280) {
  const params = new URLSearchParams({
    size: `${size}x${size}`,
    data,
    bgcolor: "2a466c",
    color: "ffffff",
    qzone: "1",
  });
  return `https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`;
}

export type MenuItem = {
  name: string;
  price?: string;
  description?: string;
};

export type MenuSection = {
  group: string;
  subgroup?: string;
  note?: string;
  header: "line" | "pill";
  items: MenuItem[];
};

export function menuItemId(section: MenuSection, item: MenuItem) {
  return `${section.group}|${section.subgroup ?? ""}|${item.name}`;
}

export function menuItemPrice(
  section: MenuSection,
  item: MenuItem,
): string | undefined {
  if (item.price) return item.price;
  if (section.note && section.items.every((entry) => !entry.price)) {
    return section.note;
  }
  return undefined;
}

export function parseCop(price?: string): number | null {
  if (!price) return null;
  const n = Number(price.replace(/\./g, ""));
  return Number.isFinite(n) ? n : null;
}

export function formatCop(n: number) {
  return n.toLocaleString("es-CO");
}

export const MENU_FERIA: MenuSection = {
  group: "Hoy en la feria",
  header: "line",
  items: [
    { name: "Sánduche de birria", price: "20.000" },
    {
      name: "Pizza pepperoni-jamón",
      price: "18.000",
    },
    {
      name: "Pizza serrano-bondiola",
      price: "18.000",
    },
    { name: "Pizza margarita", price: "18.000" },
    { name: "Choripán", price: "18.000" },
    { name: "Vino de verano" },
    { name: "Sodas italianas", price: "12.000" },
  ],
};

export const MENU_FERIA_IMAGE = {
  src: "/media/manuelinamenuferia.jpg",
  width: 900,
  height: 1600,
  alt: "Menú de Manuelina en la feria: sánduche de birria, pizza y choripán",
} as const;

export const GALLERY = [
  { src: "/media/manuelina1.jpg", width: 900, height: 1600 },
  { src: "/media/manuelina2.jpg", width: 900, height: 1600 },
  { src: "/media/manuelina3.jpg", width: 900, height: 1600 },
  { src: "/media/manuelina4.jpg", width: 1200, height: 1600 },
  { src: "/media/manuelina5.jpg", width: 900, height: 1600 },
  { src: "/media/manuelina6.jpg", width: 900, height: 1600 },
  { src: "/media/manuelina7.jpg", width: 1200, height: 1600 },
  { src: "/media/manuelina8.jpg", width: 1200, height: 1600 },
  { src: "/media/manuelina9.jpg", width: 1086, height: 1448 },
  { src: "/media/manuelina10.jpg", width: 900, height: 1600 },
  { src: "/media/manuelina11.jpg", width: 900, height: 1600 },
] as const;

export const MENU: MenuSection[] = [
  {
    group: "Entradas",
    header: "line",
    items: [
      {
        name: "Patatas",
        price: "16.000",
        description:
          "Patatas con ajo, albahaca y parmesano, acompañadas de dip de salsa brava.",
      },
      {
        name: "Ceviche chicharrón",
        price: "20.000",
        description:
          "Trozos de chicharrón crocante con cebolla morada, cilantro fresco, tomate y limón sobre tapas de pan francés.",
      },
      {
        name: "Focaccia",
        price: "15.000",
        description:
          "Pan focaccia de masa madre acompañado de pesto genovese, alioli y vinagre balsámico.",
      },
    ],
  },
  {
    group: "Pasta fresca",
    subgroup: "Con pollo",
    header: "line",
    items: [
      { name: "Pesto verde o pesto rosso", price: "22.000" },
      {
        name: "Alfredo",
        price: "22.000",
        description: "Pollo en salsa cremosa a base de mantequilla y parmesano.",
      },
      {
        name: "All forno",
        price: "25.000",
        description:
          "Pollo, tocineta y maíz en salsa cremosa de quesos, horneada con una capa de queso parmesano y queso provolone.",
      },
      {
        name: "Manuelina",
        price: "23.000",
        description:
          "Pollo, champiñón y tocineta en salsa cremosa, terminado con lluvia de queso parmesano.",
      },
      {
        name: "Duxelle de champiñón",
        price: "25.000",
        description:
          "Pollo en salsa cremosa de champiñones aromatizada con romero y tomillo. Terminada con lluvia de parmesano.",
      },
    ],
  },
  {
    group: "Pasta fresca",
    subgroup: "De mar",
    header: "line",
    items: [
      {
        name: "Encocado de camarones",
        price: "26.000",
        description:
          "Camarones salteados en salsa cremosa a base de pomodoro y crema de coco, con lluvia de parmesano y coco deshidratado.",
      },
      {
        name: "Tonno e pistacchio",
        price: "28.000",
        description:
          "Atún fresco, pistacho, menta y salsa pomodoro, terminado con lluvia de parmesano.",
      },
      {
        name: "Di mare",
        price: "26.000",
        description: "Mix de mariscos en salsa marinara.",
      },
      {
        name: "Camarones al ajillo",
        price: "32.000",
        description: "Camarones en salsa alfredo con ajo y cilantro fresco.",
      },
    ],
  },
  {
    group: "Res",
    header: "line",
    items: [
      {
        name: "Alla vodka",
        price: "30.000",
        description:
          "Carne de res salteada y flameada con vodka, en salsa cremosa de pomodoro, crema y maní. Terminada con parmesano.",
      },
      {
        name: "Lomo pimienta",
        price: "27.000",
        description:
          "Trozos de lomo salteado y champiñones en mantequilla de ajo, salsa demi-glace, crema y mix de pimientas. Terminado con parmesano.",
      },
      {
        name: "Beef tikka masala",
        price: "27.000",
        description:
          "Carne de res en salsa pomodoro aromatizada con masala (mezcla de especias indias).",
      },
      { name: "Boloñesa", price: "22.000" },
      {
        name: "Amatriciana con burrata",
        price: "27.000",
        description:
          "Trozos de panceta crocante sobre pasta pomodoro, coronada con burrata.",
      },
    ],
  },
  {
    group: "Risotto",
    header: "line",
    items: [
      {
        name: "Salmone affumicato",
        price: "42.000",
        description:
          "Cremosa base de arroz de grano corto hidratado con vino blanco y crema de coco, acompañado de salmón con un toque ahumado y especiado con hierbas italianas.",
      },
      {
        name: "Churrasco",
        description:
          "Corte jugoso de res con grasa a lado y lado sobre una cama de arroz de grano corto cremoso, desglasado en vino tinto y masala.",
      },
    ],
  },
  {
    group: "Parmigiana",
    header: "line",
    items: [
      {
        name: "Parmigiana",
        price: "28.000",
        description:
          "Milanesa de cerdo crispy en panko y parmesano, acompañada de pasta fresca en salsa a elección (vodka, brunello, alfredo, pesto).",
      },
    ],
  },
  {
    group: "Sopa de lasaña",
    header: "line",
    items: [
      {
        name: "Sopa de lasaña",
        price: "25.000",
        description:
          "Crema de tomate, pollo, maíz, tocineta, crema y láminas de pasta, horneada y terminada con mix de quesos y pan focaccia.",
      },
    ],
  },
  {
    group: "Focaccia panini",
    header: "line",
    items: [
      {
        name: "Bondiola BBQ · Pollo pesto · Jamón serrano",
        price: "23.000",
        description:
          "Sánduche de pan de masa madre, proteína a elección, rúgula, tomate, reducción de maracuyá, alioli y quesos.",
      },
    ],
  },
  {
    group: "Brunch & coffee",
    header: "line",
    items: [
      {
        name: "New York Florentina",
        price: "20.000",
        description:
          "Sánduche de gelato italiano a tu elección, bañado en chocolate de alta calidad y frutos rojos artesanales.",
      },
      {
        name: "Hamburguesa de porchetta",
        price: "28.000",
        description:
          "Pan New York, porchetta de cerdo rellena de tomates confitados y pesto, rúgula, queso provolone y papitas.",
      },
      {
        name: "Choripán argentino",
        price: "18.000",
        description: "Pan brioche, chorizo, alioli, rúgula y chimichurri.",
      },
    ],
  },
  {
    group: "Pizza",
    subgroup: "Personale ripiena",
    note: "23.000",
    header: "line",
    items: [
      {
        name: "Toscana",
        description:
          "Jamón serrano, rúgula, pomodoro, burrata, queso crema, pesto y vinagre balsámico.",
      },
      {
        name: "Margharite",
        description: "Tomate fresco, albahaca, pomodoro y mucha mozzarella.",
      },
      {
        name: "Pepperoni",
        description:
          "Mix de quesos, pomodoro, pepperoni, pesto y vinagre balsámico.",
      },
      {
        name: "Roast beef",
        description:
          "Roast beef, tomates confitados, crema agria, rúgula y mozzarella.",
      },
    ],
  },
  {
    group: "Bebidas frías",
    header: "pill",
    items: [
      {
        name: "Soda italiana",
        price: "12.000",
        description: "Pepino y lavanda · Sandía albahaca · Piña picante",
      },
      { name: "Ice latte", price: "9.000" },
      { name: "Chai frío", price: "9.000" },
      { name: "Malteada con gelato", price: "15.000" },
      { name: "Jugo de naranja", price: "7.500" },
      { name: "Limonada hierbabuena", price: "7.000" },
      { name: "Limonada natural", price: "7.000" },
      { name: "Limonada de café", price: "11.000" },
      { name: "Gaseosas", price: "5.000" },
      { name: "Agua" },
    ],
  },
  {
    group: "Bebidas calientes",
    header: "pill",
    items: [
      { name: "Americano", price: "6.500" },
      { name: "Capuccino", price: "7.500" },
      {
        name: "Capuccino saborizado",
        price: "9.000",
        description: "Macadamia · Vainilla · Caramelo",
      },
      { name: "Mocaccino", price: "8.000" },
      { name: "Doppio", price: "9.000" },
      { name: "Té chai", price: "8.500" },
      { name: "Chocolate con masmelos", price: "10.000" },
      { name: "Macchiato", price: "6.500" },
      { name: "Infusión de Jamaica y jengibre", price: "7.000" },
      { name: "Infusión de frutos rojos y amarillos", price: "7.000" },
      { name: "Milo", price: "8.000" },
      { name: "Chocolate", price: "8.000" },
    ],
  },
  {
    group: "Cocteles de autor",
    note: "19.000",
    header: "pill",
    items: [
      {
        name: "Amore Amaro",
        price: "19.000",
        description:
          "Campari, fresas con mandarina, vinagre balsámico, limón mandarino.",
      },
      {
        name: "Mela Speziata",
        price: "19.000",
        description: "Aperitivo frizzantino, manzana verde y canela, vino blanco.",
      },
      {
        name: "Il Campo",
        price: "19.000",
        description: "Ron blanco, melao de lulo, limón mandarino.",
      },
      { name: "Copa de vino" },
      { name: "Tinto de verano" },
      { name: "Vino caliente" },
    ],
  },
  {
    group: "Panadería",
    header: "pill",
    items: [
      { name: "Cuchareable", price: "10.000" },
      { name: "Porción de torta", price: "8.000" },
      { name: "Acordeón", price: "6.000" },
      { name: "Alfajores", price: "8.000" },
      { name: "Rollos de canela", price: "10.000" },
      { name: "Rollos sal", price: "8.000" },
      { name: "New York", price: "10.000" },
    ],
  },
];

export const FEATURED = [
  { section: MENU_FERIA, item: MENU_FERIA.items[0] },
  { section: MENU_FERIA, item: MENU_FERIA.items[3] },
  { section: MENU_FERIA, item: MENU_FERIA.items[4] },
] as const;
