import bcrypt from "bcryptjs";

import { connectToDatabase } from "../src/lib/db";
import { makeSlug } from "../src/lib/utils";
import { BrandModel } from "../src/models/brand";
import { CartModel } from "../src/models/cart";
import { CategoryModel } from "../src/models/category";
import { CouponModel } from "../src/models/coupon";
import { HeroSlideModel } from "../src/models/hero-slide";
import { HomepageSectionConfigModel } from "../src/models/homepage-section-config";
import { MarketingCampaignModel } from "../src/models/marketing-campaign";
import { NewsletterSubscriberModel } from "../src/models/newsletter-subscriber";
import { OrderModel } from "../src/models/order";
import { ProductModel } from "../src/models/product";
import { ReviewModel } from "../src/models/review";
import { SiteSettingsModel } from "../src/models/site-settings";
import { UserModel } from "../src/models/user";
import { WishlistModel } from "../src/models/wishlist";

process.loadEnvFile?.(".env");

async function run() {
  await connectToDatabase();

  await Promise.all([
    BrandModel.deleteMany({}),
    CartModel.deleteMany({}),
    CategoryModel.deleteMany({}),
    CouponModel.deleteMany({}),
    HeroSlideModel.deleteMany({}),
    HomepageSectionConfigModel.deleteMany({}),
    MarketingCampaignModel.deleteMany({}),
    NewsletterSubscriberModel.deleteMany({}),
    OrderModel.deleteMany({}),
    ProductModel.deleteMany({}),
    ReviewModel.deleteMany({}),
    SiteSettingsModel.deleteMany({}),
    UserModel.deleteMany({}),
    WishlistModel.deleteMany({}),
  ]);

  const adminPassword = await bcrypt.hash("Admin123!", 10);
  const customerPassword = await bcrypt.hash("Client123!", 10);

  const [admin, customerA, customerB] = await UserModel.create([
    {
      name: "Administrateur GLAM",
      email: "admin@glam.tn",
      passwordHash: adminPassword,
      role: "admin",
    },
    {
      name: "Amel Ben Salah",
      email: "amel@example.com",
      passwordHash: customerPassword,
      role: "customer",
    },
    {
      name: "Nour Gharbi",
      email: "nour@example.com",
      passwordHash: customerPassword,
      role: "customer",
    },
  ]);

  const categoryDefinitions = [
    { name: "Soins Visage", icon: "💧", description: "Nettoyants, serums et routines visage." },
    { name: "Soins Corps", icon: "🧴", description: "Hydratation, nutrition et confort cutane." },
    { name: "Cheveux", icon: "💇‍♀️", description: "Shampoings, soins et anti-chute." },
    { name: "Solaires", icon: "☀️", description: "Protection UV, apres-soleil et SPF." },
    { name: "Bebe & Maman", icon: "👶", description: "Soins bebe, change et maternite." },
    { name: "Complements Alimentaires", icon: "💊", description: "Vitamines, collagene et immunite." },
    { name: "Hygiene", icon: "🧼", description: "Dentaires, intimes et corps." },
    { name: "Anti-age", icon: "✨", description: "Rides, fermete et eclat." },
    { name: "Acne", icon: "🎯", description: "Imperfections, sebum et pores." },
  ];

  const categories = await CategoryModel.create(
    categoryDefinitions.map((category, index) => ({
      ...category,
      slug: makeSlug(category.name),
      order: index,
      isActive: true,
      isFeatured: true,
      bannerImage:
        "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200&auto=format&fit=crop&q=80",
    })),
  );

  const categoryMap = Object.fromEntries(categories.map((item) => [item.name, item]));

  const brandDefinitions = [
    { name: "Caudalie", shortText: "Soins eclat et anti-taches." },
    { name: "La Roche Posay", shortText: "Peaux sensibles et routines dermatologiques." },
    { name: "Avène", shortText: "Apaisement et confort cutane." },
    { name: "Bioderma", shortText: "Solutions expertes et micellaires." },
    { name: "SVR", shortText: "Actifs puissants et textures confort." },
    { name: "Nuxe", shortText: "Sensorialite et soins iconiques." },
    { name: "Mustela", shortText: "Soin des bebes et futures mamans." },
    { name: "Eucerin", shortText: "Innovation dermatologique et anti-age." },
    { name: "Vichy", shortText: "Mineraux, hydratation et cheveux." },
    { name: "Daylong", shortText: "Protection solaire haute tolerance." },
    { name: "Uriage", shortText: "Hydratation et barrieres cutanees." },
  ];

  const brands = await BrandModel.create(
    brandDefinitions.map((brand, index) => ({
      ...brand,
      slug: makeSlug(brand.name),
      isActive: true,
      isFeatured: index < 6,
      logo:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&auto=format&fit=crop&q=80",
      bannerImage:
        "https://images.unsplash.com/photo-1680461494862-754e01607c83?w=1200&auto=format&fit=crop&q=80",
    })),
  );

  const brandMap = Object.fromEntries(brands.map((item) => [item.name, item]));

  const productDefinitions: Array<
    [string, string, string, number, number | null, boolean, boolean, boolean]
  > = [
    ["Caudalie", "Soins Visage", "Serum Eclat Vinoperfect", 189.9, 149.9, true, false, false],
    ["La Roche Posay", "Acne", "Effaclar Duo+ Correcteur", 79.9, 59.9, true, true, false],
    ["Bioderma", "Solaires", "Photoderm MAX Creme SPF50+", 69.9, null, false, true, false],
    ["Nuxe", "Soins Visage", "Creme Fraiche de Beaute", 119.9, 89.9, true, false, true],
    ["Avène", "Soins Visage", "Eau Thermale Spray 300ml", 45.9, 29.9, true, false, true],
    ["SVR", "Soins Corps", "Xerial 30 Creme Corps", 59.9, 39.9, false, false, true],
    ["Vichy", "Cheveux", "Dercos Shampooing Energisant", 49.9, 34.9, false, false, true],
    ["Eucerin", "Complements Alimentaires", "Hyaluron-Filler Complements", 89.9, 69.9, false, false, true],
    ["La Roche Posay", "Soins Visage", "Effaclar Gel Moussant Purifiant", 59.9, null, false, true, false],
    ["Bioderma", "Soins Visage", "Sensibio H2O Solution Micellaire", 49.9, null, false, true, false],
    ["Mustela", "Bebe & Maman", "Creme Hydratante Bebe", 39.9, null, false, true, false],
    ["Daylong", "Solaires", "Extreme SPF50+", 79.9, null, false, true, false],
    ["Uriage", "Soins Corps", "Xemose Baume Relipidant", 69.5, 54.9, true, false, false],
    ["Caudalie", "Anti-age", "Premier Cru La Creme", 259.0, 219.0, true, false, false],
    ["Nuxe", "Soins Corps", "Huile Prodigieuse", 99.0, 79.0, true, false, false],
    ["Avène", "Acne", "Cleanance Comedomed", 84.9, null, false, false, false],
    ["SVR", "Acne", "Sebiaclear Serum", 69.0, 54.0, true, false, false],
    ["Eucerin", "Anti-age", "Hyaluron Filler Night", 139.0, 109.0, true, true, false],
    ["Vichy", "Soins Visage", "Mineral 89 Booster", 109.0, 89.0, true, true, false],
    ["Mustela", "Bebe & Maman", "Liniment Change", 32.0, null, false, false, false],
    ["Uriage", "Hygiene", "Gel Surgras Dermatologique", 29.0, null, false, false, false],
    ["Daylong", "Solaires", "Kids Lotion SPF50+", 64.0, 49.0, true, false, true],
    ["Bioderma", "Hygiene", "Atoderm Huile de Douche", 54.0, 44.0, true, false, false],
    ["La Roche Posay", "Anti-age", "Retinol B3 Serum", 149.0, 129.0, true, false, false],
  ];

  const now = Date.now();
  const flashStart = new Date(now - 1000 * 60 * 60);
  const flashEnd = new Date(now + 1000 * 60 * 60 * 42);

  const products = await ProductModel.create(
    productDefinitions.map((definition, index) => {
      const [brandName, categoryName, name, regularPrice, promoPrice, featured, bestseller, flash] =
        definition;
      return {
        name,
        slug: makeSlug(name),
        shortDescription: `${name}, une solution premium pour votre routine quotidienne.`,
        fullDescription:
          "Formule soigneusement selectionnee pour offrir efficacite, confort d'utilisation et resultats visibles dans une experience premium.",
        ingredients: "Eau thermale, niacinamide, acide hyaluronique, glycerine.",
        usageInfo: "Appliquer matin et/ou soir sur peau propre en evitant le contour des yeux.",
        sku: `GLAM-${String(index + 1).padStart(4, "0")}`,
        brand: brandMap[brandName]._id,
        category: categoryMap[categoryName]._id,
        images: [
          {
            url: `https://images.unsplash.com/photo-${[
              "1686121522357-48dc9ea59281",
              "1680461494862-754e01607c83",
              "1588406641472-635d727857e0",
              "1764694071508-e4b1efcd39bc",
              "1571782742478-0816a4773a10",
              "1643379856186-9b09d83a3e62",
              "1747858989102-cca0f4dc4a11",
              "1740592754365-2117f5977528",
            ][index % 8]}?w=1200&auto=format&fit=crop&q=80`,
            alt: name,
            isPrimary: true,
            position: 0,
          },
        ],
        stockQuantity: 8 + (index % 12),
        regularPrice,
        promoPrice: promoPrice ?? undefined,
        promotionLabel: promoPrice ? "Promo" : undefined,
        tags: [categoryName.toLowerCase(), brandName.toLowerCase()],
        isFeatured: featured,
        isBestseller: bestseller,
        isNew: index < 8,
        isActive: true,
        isVisible: true,
        flashSale: {
          isActive: flash,
          startAt: flash ? flashStart : null,
          endAt: flash ? flashEnd : null,
        },
        ratingAverage: 4.6 + (index % 4) * 0.1,
        reviewCount: 0,
        seoTitle: `${name} | GLAM Parapharmacie`,
        seoDescription: `Achetez ${name} sur GLAM Parapharmacie avec livraison rapide en Tunisie.`,
      };
    }),
  );

  const productMap = Object.fromEntries(products.map((item) => [item.name, item]));

  await HeroSlideModel.create([
    {
      title: "Votre peau merite le meilleur",
      subtitle: "Des routines premium pour peaux sensibles, eclat, anti-age et imperfections.",
      ctaText: "Decouvrir",
      ctaLink: "/shop",
      desktopImage:
        "https://images.unsplash.com/photo-1613717883524-b0544792de7e?w=1600&auto=format&fit=crop&q=80",
      order: 0,
      isActive: true,
    },
    {
      title: "Peaux sensibles, solutions expertes",
      subtitle: "Les essentiels recommandes pour apaiser, hydrater et proteger durablement.",
      ctaText: "Voir la selection",
      ctaLink: "/marque/la-roche-posay",
      desktopImage:
        "https://images.unsplash.com/photo-1680461494862-754e01607c83?w=1600&auto=format&fit=crop&q=80",
      order: 1,
      isActive: true,
    },
    {
      title: "Soldes parapharmacie jusqu'a -30%",
      subtitle: "Des offres flash et exclusives sur vos marques preferees.",
      ctaText: "Profitez-en",
      ctaLink: "/promotions",
      desktopImage:
        "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1600&auto=format&fit=crop&q=80",
      order: 2,
      isActive: true,
    },
  ]);

  await HomepageSectionConfigModel.create([
    {
      key: "featured-offers",
      title: "Offres Exclusives Web",
      position: 1,
      isVisible: true,
      productIds: products.filter((item) => item.isFeatured).slice(0, 8).map((item) => item._id),
    },
    {
      key: "best-sellers",
      title: "Produits les plus vendus",
      position: 2,
      isVisible: true,
      productIds: products.filter((item) => item.isBestseller).slice(0, 8).map((item) => item._id),
    },
    {
      key: "flash-sale",
      title: "Ventes Flash",
      position: 3,
      isVisible: true,
      productIds: products.filter((item) => item.flashSale.isActive).map((item) => item._id),
    },
    {
      key: "product-universes",
      title: "Explorez nos univers",
      position: 4,
      isVisible: true,
      banners: [
        {
          title: "Routine Visage",
          description: "Des soins adaptes a chaque type de peau.",
          image:
            "https://images.unsplash.com/photo-1596642748852-5596416147ac?w=1200&auto=format&fit=crop&q=80",
          link: "/categorie/soins-visage",
          accentColor: "#3AB7A5CC",
        },
        {
          title: "Protection Solaire",
          description: "Proteger la peau toute l'annee, en ville comme a la plage.",
          image:
            "https://images.unsplash.com/photo-1691031319052-80a0fa7396c5?w=1200&auto=format&fit=crop&q=80",
          link: "/categorie/solaires",
          accentColor: "#FFB347CC",
        },
        {
          title: "Soins des Mains",
          description: "Hydratation et protection intense au quotidien.",
          image:
            "https://images.unsplash.com/photo-1643379856186-9b09d83a3e62?w=1200&auto=format&fit=crop&q=80",
          link: "/shop?q=mains",
          accentColor: "#FF6B9DCC",
        },
        {
          title: "Soins Capillaires",
          description: "Shampoings, serums et routines pour des cheveux en pleine sante.",
          image:
            "https://images.unsplash.com/photo-1747858989102-cca0f4dc4a11?w=1200&auto=format&fit=crop&q=80",
          link: "/categorie/cheveux",
          accentColor: "#3AB7A5CC",
        },
      ],
    },
  ]);

  await SiteSettingsModel.create({
    announcementBarText:
      "Livraison gratuite a partir de 200 TND | Paiement a la livraison disponible",
    whatsappLabel: "WhatsApp GLAM",
    phone: "+216 70 100 200",
    email: "contact@glam.tn",
    address: "Tunis, Tunisie",
    newsletterTitle: "Recevez nos offres exclusives",
    newsletterDescription:
      "Inscrivez-vous a notre newsletter pour suivre les nouveautes, ventes flash et conseils beaute.",
    trustItems: [
      { title: "Livraison Rapide", description: "Gratuite a partir de 200 TND", icon: "truck" },
      { title: "Paiement Securise", description: "100% securise et crypte", icon: "lock" },
      { title: "Support WhatsApp", description: "Assistance 7j/7", icon: "message" },
      { title: "Produits Authentiques", description: "Garantie d'authenticite", icon: "package" },
    ],
  });

  await CouponModel.create([
    {
      code: "GLAM10",
      title: "Bienvenue -10%",
      description: "Reduction de 10% sur votre premiere commande.",
      type: "percent",
      value: 10,
      minOrderAmount: 120,
      isActive: true,
    },
    {
      code: "FLASH15",
      title: "Flash 15 TND",
      description: "15 TND offerts sur une selection de ventes flash.",
      type: "amount",
      value: 15,
      minOrderAmount: 150,
      isActive: true,
    },
  ]);

  const reviews = await ReviewModel.create([
    {
      product: productMap["Serum Eclat Vinoperfect"]._id,
      user: customerA._id,
      rating: 5,
      title: "Excellent serum",
      content: "Texture tres agreable, peau plus lumineuse apres quelques semaines.",
      status: "approved",
    },
    {
      product: productMap["Effaclar Duo+ Correcteur"]._id,
      user: customerB._id,
      rating: 5,
      title: "Tres efficace",
      content: "M'a aidee a calmer les imperfections rapidement sans agresser la peau.",
      status: "approved",
    },
    {
      product: productMap["Mineral 89 Booster"]._id,
      user: customerA._id,
      rating: 4,
      title: "Hydratation parfaite",
      content: "Je l'utilise tous les matins avant ma creme, resultat top.",
      status: "approved",
    },
  ]);

  for (const product of products) {
    const productReviews = reviews.filter(
      (review) => review.product.toString() === product._id.toString(),
    );
    if (!productReviews.length) continue;
    product.reviewCount = productReviews.length;
    product.ratingAverage =
      productReviews.reduce((sum, review) => sum + review.rating, 0) /
      productReviews.length;
    await product.save();
  }

  const orderA = await OrderModel.create({
    user: customerA._id,
    items: [
      {
        product: productMap["Serum Eclat Vinoperfect"]._id,
        productName: "Serum Eclat Vinoperfect",
        productSlug: "serum-eclat-vinoperfect",
        image: productMap["Serum Eclat Vinoperfect"].images[0].url,
        unitPrice: 149.9,
        quantity: 1,
        lineTotal: 149.9,
      },
      {
        product: productMap["Huile Prodigieuse"]._id,
        productName: "Huile Prodigieuse",
        productSlug: "huile-prodigieuse",
        image: productMap["Huile Prodigieuse"].images[0].url,
        unitPrice: 79,
        quantity: 1,
        lineTotal: 79,
      },
    ],
    subtotal: 228.9,
    shippingFee: 0,
    discountTotal: 10,
    total: 218.9,
    couponCode: "GLAM10",
    status: "confirmed",
    paymentStatus: "unpaid",
    shippingAddress: {
      fullName: "Amel Ben Salah",
      phone: "+216 21 111 111",
      line1: "12 Rue de Marseille",
      city: "Tunis",
      country: "Tunisie",
    },
  });

  const orderB = await OrderModel.create({
    user: customerB._id,
    items: [
      {
        product: productMap["Effaclar Duo+ Correcteur"]._id,
        productName: "Effaclar Duo+ Correcteur",
        productSlug: "effaclar-duo-correcteur",
        image: productMap["Effaclar Duo+ Correcteur"].images[0].url,
        unitPrice: 59.9,
        quantity: 2,
        lineTotal: 119.8,
      },
    ],
    subtotal: 119.8,
    shippingFee: 7.9,
    discountTotal: 0,
    total: 127.7,
    status: "shipped",
    paymentStatus: "unpaid",
    shippingAddress: {
      fullName: "Nour Gharbi",
      phone: "+216 22 222 222",
      line1: "8 Avenue Habib Bourguiba",
      city: "Sousse",
      country: "Tunisie",
    },
  });

  await UserModel.findByIdAndUpdate(customerA._id, {
    totalOrders: 1,
    totalSpent: orderA.total,
  });
  await UserModel.findByIdAndUpdate(customerB._id, {
    totalOrders: 1,
    totalSpent: orderB.total,
  });

  await WishlistModel.create({
    user: customerA._id,
    products: [
      productMap["Effaclar Duo+ Correcteur"]._id,
      productMap["Mineral 89 Booster"]._id,
      productMap["Extreme SPF50+"]._id,
    ],
  });

  await NewsletterSubscriberModel.create([
    { email: "amel@example.com", name: "Amel Ben Salah", isActive: true },
    { email: "nour@example.com", name: "Nour Gharbi", isActive: true },
    { email: "newsletter@glam.tn", name: "GLAM Newsletter", isActive: true },
  ]);

  await MarketingCampaignModel.create({
    title: "Nouvelle vague de nouveautes",
    subject: "Decouvrez les nouveautes GLAM Parapharmacie",
    content:
      "Retrouvez les nouveaux serums, soins anti-age et protections solaires premium tout juste ajoutes a la boutique.",
    audience: "newsletter",
    status: "draft",
  });

  console.log("Seed completed");
  console.log("Admin:", admin.email, "password: Admin123!");
  console.log("Customer:", customerA.email, "password: Client123!");
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
