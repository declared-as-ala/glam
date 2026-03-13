import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Phone,
  ChevronDown,
  Menu,
  Truck,
  Lock,
  MessageCircle,
  Package,
  Star,
  Instagram,
  Facebook,
  Send,
  Mail,
  MapPin,
  Clock,
  X,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { ProductCard } from "./components/ProductCard";
import logo from "figma:asset/da814afa58faa7a4b264cd307b5f10fa71d27a2f.png";

export default function App() {
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 42,
    seconds: 58,
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const handleAddToCart = (product: any) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.name === product.name,
      );
      if (existingItem) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (
    productName: string,
    change: number,
  ) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.name === productName
            ? {
                ...item,
                quantity: Math.max(0, item.quantity + change),
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (productName: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.name !== productName),
    );
  };

  const cartTotal = cartItems.reduce(
    (sum, item) =>
      sum + (item.promoPrice || item.price) * item.quantity,
    0,
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return {
            ...prev,
            minutes: prev.minutes - 1,
            seconds: 59,
          };
        } else if (prev.hours > 0) {
          return {
            hours: prev.hours - 1,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const heroSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  const brandSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const categories = [
    { name: "Soins Visage", icon: "💧" },
    { name: "Soins Corps", icon: "🧴" },
    { name: "Cheveux", icon: "💇‍♀️" },
    { name: "Solaires", icon: "☀️" },
    { name: "Bébé & Maman", icon: "👶" },
    { name: "Compléments", icon: "💊" },
    { name: "Hygiène", icon: "🧼" },
    { name: "Anti-âge", icon: "✨" },
    { name: "Acné", icon: "🎯" },
  ];

  const featuredProducts = [
    {
      image:
        "https://images.unsplash.com/photo-1686121522357-48dc9ea59281?w=400",
      brand: "Caudalie",
      name: "Sérum Éclat Anti-Taches Premier Cru",
      price: 189.9,
      promoPrice: 149.9,
      rating: 4.8,
      reviews: 245,
      badge: "Promo" as const,
    },
    {
      image:
        "https://images.unsplash.com/photo-1680461494862-754e01607c83?w=400",
      brand: "La Roche Posay",
      name: "Effaclar Duo+ Anti-imperfections",
      price: 79.9,
      promoPrice: 59.9,
      rating: 4.9,
      reviews: 412,
      badge: "Bestseller" as const,
    },
    {
      image:
        "https://images.unsplash.com/photo-1588406641472-635d727857e0?w=400",
      brand: "Bioderma",
      name: "Photoderm MAX Crème Solaire SPF 50+",
      price: 69.9,
      rating: 4.7,
      reviews: 189,
      badge: "New" as const,
    },
    {
      image:
        "https://images.unsplash.com/photo-1764694071508-e4b1efcd39bc?w=400",
      brand: "Nuxe",
      name: "Crème Fraîche de Beauté Hydratante",
      price: 119.9,
      promoPrice: 89.9,
      rating: 4.6,
      reviews: 156,
      badge: "Promo" as const,
    },
  ];

  const flashSaleProducts = [
    {
      image:
        "https://images.unsplash.com/photo-1571782742478-0816a4773a10?w=400",
      brand: "Avène",
      name: "Eau Thermale Apaisante Spray 300ml",
      price: 45.9,
      promoPrice: 29.9,
      rating: 4.9,
      reviews: 567,
    },
    {
      image:
        "https://images.unsplash.com/photo-1643379856186-9b09d83a3e62?w=400",
      brand: "SVR",
      name: "Xerial 30 Crème Corps Hydratante",
      price: 59.9,
      promoPrice: 39.9,
      rating: 4.7,
      reviews: 234,
    },
    {
      image:
        "https://images.unsplash.com/photo-1747858989102-cca0f4dc4a11?w=400",
      brand: "Vichy",
      name: "Dercos Shampoo Énergisant",
      price: 49.9,
      promoPrice: 34.9,
      rating: 4.5,
      reviews: 198,
    },
    {
      image:
        "https://images.unsplash.com/photo-1740592754365-2117f5977528?w=400",
      brand: "Eucerin",
      name: "Hyaluron-Filler Compléments",
      price: 89.9,
      promoPrice: 69.9,
      rating: 4.8,
      reviews: 167,
    },
  ];

  const bestSellingProducts = [
    {
      image:
        "https://images.unsplash.com/photo-1743931787138-7529fc62fd3b?w=400",
      brand: "La Roche Posay",
      name: "Effaclar Gel Moussant Purifiant",
      price: 59.9,
      rating: 4.9,
      reviews: 678,
      badge: "Bestseller" as const,
    },
    {
      image:
        "https://images.unsplash.com/photo-1616529484742-841a0f98f861?w=400",
      brand: "Bioderma",
      name: "Sensibio H2O Solution Micellaire",
      price: 49.9,
      rating: 4.8,
      reviews: 890,
      badge: "Bestseller" as const,
    },
    {
      image:
        "https://images.unsplash.com/photo-1769836215168-2c90327d786d?w=400",
      brand: "Mustela",
      name: "Crème Hydratante Bébé",
      price: 39.9,
      rating: 4.9,
      reviews: 445,
      badge: "Bestseller" as const,
    },
    {
      image:
        "https://images.unsplash.com/photo-1588406641472-635d727857e0?w=400",
      brand: "Daylong",
      name: "Protection Solaire Extrême SPF 50+",
      price: 79.9,
      rating: 4.7,
      reviews: 312,
      badge: "Bestseller" as const,
    },
  ];

  const brands = [
    "Bioderma",
    "Nuxe",
    "SVR",
    "Avène",
    "Mustela",
    "Caudalie",
    "Eucerin",
    "Vichy",
    "La Roche Posay",
    "Uriage",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Announcement Bar */}
      <div className="bg-[#3AB7A5] text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <span>
              Livraison gratuite à partir de 200 TND | Paiement
              à la livraison disponible
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+216 XX XXX XXX</span>
            </div>
            <select className="bg-transparent border-none text-white text-sm cursor-pointer">
              <option>FR</option>
              <option>AR</option>
            </select>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="GLAM Parapharmacie"
                className="h-20"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[#3AB7A5]">
                  Glam
                </span>
                <span className="text-xs text-gray-600 uppercase tracking-wide">
                  Parapharmacie
                </span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un produit, une marque..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3AB7A5] focus:border-transparent"
                />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-6">
              <button className="flex flex-col items-center gap-1 text-gray-700 hover:text-[#3AB7A5] transition-colors">
                <User className="w-6 h-6" />
                <span className="text-xs">Compte</span>
              </button>
              <button className="relative flex flex-col items-center gap-1 text-gray-700 hover:text-[#3AB7A5] transition-colors">
                <Heart className="w-6 h-6" />
                <span className="text-xs">Favoris</span>
                <span className="absolute -top-1 -right-1 bg-[#FF6B9D] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <button
                className="relative flex flex-col items-center gap-1 text-gray-700 hover:text-[#3AB7A5] transition-colors"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="text-xs">Panier</span>
                <span className="absolute -top-1 -right-1 bg-[#3AB7A5] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-4 flex items-center justify-center gap-8 border-t pt-4">
            <a
              href="#"
              className="text-sm font-medium text-[#3AB7A5] hover:text-[#2d9687] transition-colors"
            >
              Accueil
            </a>
            <a
              href="#"
              className="text-sm text-gray-700 hover:text-[#3AB7A5] transition-colors flex items-center gap-1"
            >
              Visage <ChevronDown className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="text-sm text-gray-700 hover:text-[#3AB7A5] transition-colors flex items-center gap-1"
            >
              Corps <ChevronDown className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="text-sm text-gray-700 hover:text-[#3AB7A5] transition-colors flex items-center gap-1"
            >
              Cheveux <ChevronDown className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="text-sm text-gray-700 hover:text-[#3AB7A5] transition-colors"
            >
              Bébé & Maman
            </a>
            <a
              href="#"
              className="text-sm text-gray-700 hover:text-[#3AB7A5] transition-colors"
            >
              Solaires
            </a>
            <a
              href="#"
              className="text-sm text-gray-700 hover:text-[#3AB7A5] transition-colors"
            >
              Compléments Alimentaires
            </a>
            <a
              href="#"
              className="text-sm text-gray-700 hover:text-[#3AB7A5] transition-colors flex items-center gap-1"
            >
              Marques <ChevronDown className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="text-sm font-medium text-[#FF6B9D] hover:text-[#ff4d82] transition-colors"
            >
              Promotions
            </a>
            <a
              href="#"
              className="text-sm font-medium text-[#FFB347] hover:text-[#ff9d1f] transition-colors"
            >
              Nouveautés
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Slider */}
      <section className="max-w-7xl mx-auto px-4 mt-6">
        <Slider {...heroSliderSettings} className="hero-slider">
          {/* Slide 1 - Caudalie */}
          <div className="relative">
            <div className="relative h-[500px] rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFF8F3] to-[#FFE8E0]">
              <div className="absolute inset-0 flex items-center">
                <div className="w-1/2 pl-16">
                  <p className="text-[#3AB7A5] text-sm font-medium tracking-widest uppercase mb-2">
                    Caudalie
                  </p>
                  <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    Votre peau mérite
                    <br />
                    le meilleur
                  </h1>
                  <p className="text-gray-600 mb-8 text-lg">
                    Découvrez notre collection de soins
                    d'exception
                  </p>
                  <button className="bg-[#3AB7A5] text-white px-8 py-4 rounded-full font-medium hover:bg-[#2d9687] transition-colors shadow-lg">
                    Découvrir
                  </button>
                </div>
                <div className="w-1/2 h-full">
                  <img
                    src="https://images.unsplash.com/photo-1613717883524-b0544792de7e?w=800"
                    alt="Caudalie"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 - La Roche Posay */}
          <div className="relative">
            <div className="relative h-[500px] rounded-3xl overflow-hidden bg-gradient-to-r from-[#E8F5F3] to-[#D4EBE8]">
              <div className="absolute inset-0 flex items-center">
                <div className="w-1/2 pl-16">
                  <p className="text-[#3AB7A5] text-sm font-medium tracking-widest uppercase mb-2">
                    La Roche Posay
                  </p>
                  <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    Peaux sensibles
                    <br />
                    Solutions expertes
                  </h1>
                  <p className="text-gray-600 mb-8 text-lg">
                    Recommandé par les dermatologues
                  </p>
                  <button className="bg-[#3AB7A5] text-white px-8 py-4 rounded-full font-medium hover:bg-[#2d9687] transition-colors shadow-lg">
                    Découvrir
                  </button>
                </div>
                <div className="w-1/2 h-full">
                  <img
                    src="https://images.unsplash.com/photo-1680461494862-754e01607c83?w=800"
                    alt="La Roche Posay"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 - Sale */}
          <div className="relative">
            <div className="relative h-[500px] rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFE8F0] to-[#FFD4E5]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[#FF6B9D] text-sm font-medium tracking-widest uppercase mb-2">
                    Offre Spéciale
                  </p>
                  <h1 className="text-6xl font-bold text-gray-900 mb-4">
                    SOLDES PARAPHARMACIE
                  </h1>
                  <p className="text-3xl font-bold text-[#FF6B9D] mb-8">
                    Jusqu'à -30%
                  </p>
                  <button className="bg-[#FF6B9D] text-white px-8 py-4 rounded-full font-medium hover:bg-[#ff4d82] transition-colors shadow-lg">
                    Profitez-en maintenant
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </section>

      {/* Category Icons */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <div className="grid grid-cols-9 gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-gray-50 hover:bg-[#3AB7A5]/10 hover:shadow-md transition-all"
            >
              <div className="text-4xl">{category.icon}</div>
              <span className="text-xs text-center text-gray-700">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Promotions */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Offres Exclusives Web
          </h2>
          <a
            href="#"
            className="text-[#3AB7A5] font-medium hover:underline flex items-center gap-2"
          >
            Voir tout{" "}
            <ChevronDown className="w-4 h-4 -rotate-90" />
          </a>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={index}
              {...product}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
      </section>

      {/* Flash Sales */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <div className="bg-gradient-to-r from-[#FF6B9D]/10 to-[#FFB347]/10 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Ventes Flash
              </h2>
              <p className="text-gray-600 mt-2">
                Profitez de prix imbattables
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Clock className="w-6 h-6 text-[#FF6B9D]" />
              <div className="flex gap-2">
                <div className="bg-white rounded-lg px-4 py-2 text-center shadow-md">
                  <div className="text-2xl font-bold text-gray-900">
                    {String(countdown.hours).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-gray-500">
                    heures
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 flex items-center">
                  :
                </div>
                <div className="bg-white rounded-lg px-4 py-2 text-center shadow-md">
                  <div className="text-2xl font-bold text-gray-900">
                    {String(countdown.minutes).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-gray-500">
                    min
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 flex items-center">
                  :
                </div>
                <div className="bg-white rounded-lg px-4 py-2 text-center shadow-md">
                  <div className="text-2xl font-bold text-gray-900">
                    {String(countdown.seconds).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-gray-500">
                    sec
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {flashSaleProducts.map((product, index) => (
              <ProductCard
                key={index}
                {...product}
                badge="Promo"
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Collections */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Nos Marques Partenaires
        </h2>
        <div className="grid grid-cols-4 gap-6">
          <div className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1596642748852-5596416147ac?w=400"
              alt="Nuxe"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Nuxe
                </h3>
                <p className="text-white/90 text-sm">
                  Huiles et soins naturels
                </p>
              </div>
            </div>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1743931787138-7529fc62fd3b?w=400"
              alt="Bioderma"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Bioderma
                </h3>
                <p className="text-white/90 text-sm">
                  Solutions dermatologiques
                </p>
              </div>
            </div>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1691031319052-80a0fa7396c5?w=400"
              alt="Avène"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Avène
                </h3>
                <p className="text-white/90 text-sm">
                  Eau thermale apaisante
                </p>
              </div>
            </div>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1680461494862-754e01607c83?w=400"
              alt="La Roche Posay"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  La Roche Posay
                </h3>
                <p className="text-white/90 text-sm">
                  Peaux sensibles
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Selling Products */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Produits les plus vendus
          </h2>
          <a
            href="#"
            className="text-[#3AB7A5] font-medium hover:underline flex items-center gap-2"
          >
            Voir tout{" "}
            <ChevronDown className="w-4 h-4 -rotate-90" />
          </a>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {bestSellingProducts.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </section>

      {/* Product Universe */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Explorez nos univers
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1596642748852-5596416147ac?w=600"
              alt="Routine visage"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#3AB7A5]/80 to-transparent flex items-center">
              <div className="p-8">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Routine Visage
                </h3>
                <p className="text-white/90 mb-4">
                  Des soins adaptés à chaque type de peau
                </p>
                <button className="bg-white text-[#3AB7A5] px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Découvrir
                </button>
              </div>
            </div>
          </div>
          <div className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1691031319052-80a0fa7396c5?w=600"
              alt="Protection solaire"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFB347]/80 to-transparent flex items-center">
              <div className="p-8">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Protection Solaire
                </h3>
                <p className="text-white/90 mb-4">
                  Protégez votre peau toute l'année
                </p>
                <button className="bg-white text-[#FFB347] px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Découvrir
                </button>
              </div>
            </div>
          </div>
          <div className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1643379856186-9b09d83a3e62?w=600"
              alt="Soins des mains"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B9D]/80 to-transparent flex items-center">
              <div className="p-8">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Soins des Mains
                </h3>
                <p className="text-white/90 mb-4">
                  Hydratation et protection intense
                </p>
                <button className="bg-white text-[#FF6B9D] px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Découvrir
                </button>
              </div>
            </div>
          </div>
          <div className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1747858989102-cca0f4dc4a11?w=600"
              alt="Soins capillaires"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#3AB7A5]/80 to-transparent flex items-center">
              <div className="p-8">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Soins Capillaires
                </h3>
                <p className="text-white/90 mb-4">
                  Pour des cheveux sains et brillants
                </p>
                <button className="bg-white text-[#3AB7A5] px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Découvrir
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Logos Carousel */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Les Marques de Confiance
        </h2>
        <Slider {...brandSliderSettings}>
          {brands.map((brand, index) => (
            <div key={index} className="px-4">
              <div className="bg-white rounded-xl p-8 flex items-center justify-center h-24 border border-gray-100 hover:border-[#3AB7A5] hover:shadow-md transition-all cursor-pointer">
                <span className="text-xl font-semibold text-gray-700">
                  {brand}
                </span>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Trust Section */}
      <section className="bg-[#F8F9FA] mt-16 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#3AB7A5]/10 flex items-center justify-center mb-4">
                <Truck className="w-8 h-8 text-[#3AB7A5]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Livraison Rapide
              </h3>
              <p className="text-sm text-gray-600">
                Gratuite à partir de 200 TND
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#3AB7A5]/10 flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-[#3AB7A5]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Paiement Sécurisé
              </h3>
              <p className="text-sm text-gray-600">
                100% sécurisé et crypté
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#3AB7A5]/10 flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-[#3AB7A5]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Support WhatsApp
              </h3>
              <p className="text-sm text-gray-600">
                Assistance 7j/7
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#3AB7A5]/10 flex items-center justify-center mb-4">
                <Package className="w-8 h-8 text-[#3AB7A5]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Produits Authentiques
              </h3>
              <p className="text-sm text-gray-600">
                Garantie d'authenticité
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Conseils Beauté & Santé
          </h2>
          <a
            href="#"
            className="text-[#3AB7A5] font-medium hover:underline flex items-center gap-2"
          >
            Voir tous les articles{" "}
            <ChevronDown className="w-4 h-4 -rotate-90" />
          </a>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1743931787138-7529fc62fd3b?w=400"
              alt="Blog"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="text-xs text-[#3AB7A5] font-medium mb-2">
                CONSEILS PEAU
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Comment traiter l'acné efficacement
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Découvrez les meilleurs conseils et produits
                pour une peau nette et saine...
              </p>
              <a
                href="#"
                className="text-[#3AB7A5] text-sm font-medium hover:underline"
              >
                Lire la suite →
              </a>
            </div>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1691031319052-80a0fa7396c5?w=400"
              alt="Blog"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="text-xs text-[#FFB347] font-medium mb-2">
                PROTECTION SOLAIRE
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Routine solaire: les essentiels
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Protégez votre peau du soleil avec les bons
                gestes et produits...
              </p>
              <a
                href="#"
                className="text-[#3AB7A5] text-sm font-medium hover:underline"
              >
                Lire la suite →
              </a>
            </div>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1596642748852-5596416147ac?w=400"
              alt="Blog"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="text-xs text-[#FF6B9D] font-medium mb-2">
                ROUTINE BEAUTÉ
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Ma routine skincare du matin
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Les étapes essentielles pour une peau éclatante
                toute la journée...
              </p>
              <a
                href="#"
                className="text-[#3AB7A5] text-sm font-medium hover:underline"
              >
                Lire la suite →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <div className="bg-gradient-to-r from-[#3AB7A5] to-[#2d9687] rounded-3xl p-12 text-center text-white">
          <Mail className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">
            Recevez nos offres exclusives
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Inscrivez-vous à notre newsletter et bénéficiez de
            -10% sur votre première commande
          </p>
          <div className="flex gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-[#3AB7A5] px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
              S'inscrire <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-4 gap-8 pb-8 border-b border-gray-800">
            {/* Company Info */}
            <div>
              <img
                src={logo}
                alt="GLAM Parapharmacie"
                className="h-12 mb-4"
              />
              <p className="text-sm text-gray-400 mb-4">
                Votre parapharmacie en ligne de confiance pour
                tous vos produits de beauté et santé.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#3AB7A5] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#3AB7A5] transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#3AB7A5] transition-colors"
                >
                  <Send className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold mb-4">
                Parapharmacie Glam
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-[#3AB7A5] transition-colors"
                  >
                    À propos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-[#3AB7A5] transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-[#3AB7A5] transition-colors"
                  >
                    Livraison
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-[#3AB7A5] transition-colors"
                  >
                    Retours
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-[#3AB7A5] transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-4">Catégories</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-[#3AB7A5] transition-colors"
                  >
                    Visage
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-[#3AB7A5] transition-colors"
                  >
                    Corps
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-[#3AB7A5] transition-colors"
                  >
                    Cheveux
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-[#3AB7A5] transition-colors"
                  >
                    Bébé & Maman
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-[#3AB7A5] transition-colors"
                  >
                    Solaires
                  </a>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="font-semibold mb-4">
                Service Client
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-gray-400">
                  <MessageCircle className="w-5 h-5 text-[#3AB7A5] flex-shrink-0" />
                  <span>WhatsApp: +216 XX XXX XXX</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-400">
                  <Phone className="w-5 h-5 text-[#3AB7A5] flex-shrink-0" />
                  <span>Tél: +216 XX XXX XXX</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-400">
                  <Mail className="w-5 h-5 text-[#3AB7A5] flex-shrink-0" />
                  <span>contact@glam.tn</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-400">
                  <MapPin className="w-5 h-5 text-[#3AB7A5] flex-shrink-0" />
                  <span>Tunis, Tunisie</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 text-center">
            <p className="text-sm text-gray-500">
              © 2026 GLAM Parapharmacie. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Mon Panier
                  </h2>
                  <button
                    className="text-gray-500 hover:text-gray-700 p-2"
                    onClick={() => setIsCartOpen(false)}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {cartItems.length > 0 ? (
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.name}
                        className="flex gap-4 pb-6 border-b"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 mb-3">
                            {item.brand}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                onClick={() =>
                                  updateQuantity(item.name, -1)
                                }
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                onClick={() =>
                                  updateQuantity(item.name, 1)
                                }
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              className="text-red-500 hover:text-red-700 p-2"
                              onClick={() =>
                                removeItem(item.name)
                              }
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                          <div className="mt-3">
                            <p className="text-lg font-semibold text-[#3AB7A5]">
                              {(
                                (item.promoPrice ||
                                  item.price) * item.quantity
                              ).toFixed(2)}{" "}
                              TND
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="border-t pt-6 mt-6">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-lg font-medium text-gray-900">
                          Total
                        </span>
                        <span className="text-2xl font-bold text-[#3AB7A5]">
                          {cartTotal.toFixed(2)} TND
                        </span>
                      </div>
                      <button className="w-full bg-[#3AB7A5] text-white px-8 py-4 rounded-full font-medium hover:bg-[#2d9687] transition-colors shadow-lg">
                        Commander maintenant
                      </button>
                      <button
                        className="w-full mt-3 border border-gray-300 text-gray-700 px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-colors"
                        onClick={() => setIsCartOpen(false)}
                      >
                        Continuer mes achats
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-6">
                      Votre panier est vide
                    </p>
                    <button
                      className="bg-[#3AB7A5] text-white px-8 py-3 rounded-full font-medium hover:bg-[#2d9687] transition-colors"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Découvrir nos produits
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}