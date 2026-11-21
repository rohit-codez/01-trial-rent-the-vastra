import { Category } from '../types';

export const categories: Category[] = [
  // Women's Categories
  {
    id: "cat-w-lehenga",
    name: "Lehenga",
    slug: "women-lehenga",
    gender: "women",
    description: "Discover our exquisite collection of bridal and designer lehengas for weddings and grand celebrations.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    subcategories: ["Bridal", "Bridesmaid", "Engagement", "Sangeet", "Contemporary"]
  },
  {
    id: "cat-w-saree",
    name: "Saree",
    slug: "women-saree",
    gender: "women",
    description: "Timeless elegance with our curated range of Kanjeevaram, Banarasi, and contemporary designer sarees.",
    image: "https://images.unsplash.com/photo-1610189013532-6ba989ceb80a?w=800&q=80",
    subcategories: ["Traditional", "Contemporary", "Cocktail", "Bridal", "Pre-draped"]
  },
  {
    id: "cat-w-gown",
    name: "Gown",
    slug: "women-gown",
    gender: "women",
    description: "Make a statement with our stunning evening gowns, perfect for receptions and cocktail parties.",
    image: "https://images.unsplash.com/photo-1583391733975-573516584282?w=800&q=80",
    subcategories: ["Evening Wear", "Ball Gowns", "Mermaid", "Indo-Western Gowns"]
  },
  {
    id: "cat-w-indowestern",
    name: "Indo-Western",
    slug: "women-indo-western",
    gender: "women",
    description: "Blend tradition with modern trends through our stylish Indo-western ensembles and cape sets.",
    image: "https://images.unsplash.com/photo-1614741364531-1502f5a01bc2?w=800&q=80",
    subcategories: ["Sets", "Jumpsuits", "Drape Sarees", "Capes"]
  },
  {
    id: "cat-w-anarkali",
    name: "Anarkali",
    slug: "women-anarkali",
    gender: "women",
    description: "Graceful and regal Anarkali suits suitable for pujas, daytime functions, and festivities.",
    image: "https://images.unsplash.com/photo-1585489066440-621e25e9ee9b?w=800&q=80",
    subcategories: ["Traditional", "Floor Length", "Jacket Style"]
  },
  
  // Men's Categories
  {
    id: "cat-m-sherwani",
    name: "Sherwani",
    slug: "men-sherwani",
    gender: "men",
    description: "Majestic sherwanis designed to make the groom stand out on his special day.",
    image: "https://images.unsplash.com/photo-1593032483866-f40ecf325608?w=800&q=80",
    subcategories: ["Bridal", "Reception", "Achkan", "Jodhpuri"]
  },
  {
    id: "cat-m-indowestern",
    name: "Indo-Western",
    slug: "men-indo-western",
    gender: "men",
    description: "Contemporary asymmetric kurtas and jackets for a dashing, modern look.",
    image: "https://images.unsplash.com/photo-1620244799014-998818816c4c?w=800&q=80",
    subcategories: ["Asymmetric", "Drape", "Sets"]
  },
  {
    id: "cat-m-bandhgala",
    name: "Bandhgala",
    slug: "men-bandhgala",
    gender: "men",
    description: "Classic Jodhpuri Bandhgalas for formal and royal elegance.",
    image: "https://images.unsplash.com/photo-1583391733958-69df8b1bdff0?w=800&q=80",
    subcategories: ["Traditional", "Velvet", "Printed"]
  },
  {
    id: "cat-m-kurtaset",
    name: "Kurta Set",
    slug: "men-kurta-set",
    gender: "men",
    description: "Comfortable and vibrant kurta sets ideal for Haldi, Mehendi, and pujas.",
    image: "https://images.unsplash.com/photo-1610189013532-6ba989ceb80a?w=800&q=80",
    subcategories: ["Festive", "Pre-wedding", "Mirror Work", "Chikankari"]
  },
  {
    id: "cat-m-tuxedo",
    name: "Tuxedo",
    slug: "men-tuxedo",
    gender: "men",
    description: "Sharp and sophisticated western tuxedos and formal suits for receptions, cocktails, and black-tie galas.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    subcategories: ["Classic Black", "Navy Blue", "Double Breasted", "Velvet Lapel"]
  },

  // Kids & Little Ones Categories
  {
    id: "cat-k-baby",
    name: "Baby & Toddler Wear",
    slug: "baby-toddler-wear",
    gender: "kids",
    description: "Ultra-soft, skin-friendly miniature festive rompers, baby dhoti kurtas, and peplum ghagras designed for infants and toddlers (0-24 months).",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80",
    subcategories: ["Baby Dhoti Kurta", "Infant Peplum Ghagra", "Tiny Prince Suit", "Cute Rompers & Onesies"]
  },
  {
    id: "cat-k-saree",
    name: "Kids Saree",
    slug: "kids-saree",
    gender: "kids",
    description: "Adorable ready-to-wear, pre-stitched miniature sarees with elastic waistbands, stitched blouses, and stylish belts for little girls.",
    image: "https://images.unsplash.com/photo-1621600411688-4be93cd68504?w=800&q=80",
    subcategories: ["Pre-Draped Silk Saree", "Organza Ruffle Saree", "Patola Drape Saree", "Ready-to-Wear Banarasi"]
  },
  {
    id: "cat-k-costumes",
    name: "School Functions & Costumes",
    slug: "school-costumes",
    gender: "kids",
    description: "Complete fancy dress costumes for school annual days: Indian Army & Armed Forces uniforms, freedom fighters, classical dance outfits, astronauts, doctors, and fairytale characters.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80",
    subcategories: ["Indian Army & Commando", "Freedom Fighters", "Classical Dance", "Fairytale & Angels", "Community Helpers"]
  },
  {
    id: "cat-k-lehenga",
    name: "Kids Lehenga",
    slug: "kids-lehenga",
    gender: "kids",
    description: "Adorable miniature designer lehengas and cholis crafted with soft linings for weddings and celebrations.",
    image: "https://images.unsplash.com/photo-1621600411688-4be93cd68504?w=800&q=80",
    subcategories: ["Floral Choli", "Mirror Work", "Silk Lehenga", "Festive"]
  },
  {
    id: "cat-k-sherwani",
    name: "Kids Sherwani",
    slug: "kids-sherwani",
    gender: "kids",
    description: "Little royalty! Majestic and comfortable boys sherwanis and achkans with soft breathable lining.",
    image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80",
    subcategories: ["Royal Sherwani", "Jodhpuri", "Brocade"]
  },
  {
    id: "cat-k-kurtaset",
    name: "Kids Kurta Set",
    slug: "kids-kurta-set",
    gender: "kids",
    description: "Vibrant and comfortable kurta-dhoti and kurta-pajama sets for young boys during festivals and weddings.",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80",
    subcategories: ["Nehru Jacket Set", "Dhoti Kurta", "Cotton Silk"]
  },
  {
    id: "cat-k-gown",
    name: "Kids Gown",
    slug: "kids-gown",
    gender: "kids",
    description: "Princess gowns, butterfly frocks, and fairy-tale ruffle dresses designed for birthdays, weddings, and parties.",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80",
    subcategories: ["Princess Gown", "Butterfly Frock", "Rainbow Shimmer", "Ruffle Gown"]
  },
  {
    id: "cat-k-indowestern",
    name: "Kids Indo-Western",
    slug: "kids-indo-western",
    gender: "kids",
    description: "Chic fusion wear for boys and girls that blends effortless comfort with festive glamour.",
    image: "https://images.unsplash.com/photo-1543332164-6e82f355badc?w=800&q=80",
    subcategories: ["Cape Sets", "Peplum Sharara", "Tiny Tuxedos", "Asymmetric Kurta"]
  },

  // Travel & Hiking Categories
  {
    id: "cat-th-outerwear",
    name: "Trekking Jackets",
    slug: "trekking-jackets",
    gender: "unisex",
    description: "High-performance waterproof hardshells, 800-fill down puffer jackets, and thermal windbreakers for Himalayan expeditions and mountain trails.",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    subcategories: ["Gore-Tex Hardshell", "Down Puffer", "Trail Windbreaker", "Fleece Mid-Layer"]
  },
  {
    id: "cat-th-pants",
    name: "Hiking Pants",
    slug: "hiking-pants",
    gender: "unisex",
    description: "Quick-dry convertible cargo pants, thermal softshell snow trousers, and moisture-wicking stretch trail bottoms.",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&q=80",
    subcategories: ["Convertible Cargo", "Thermal Softshell", "Trail Tights", "Waterproof Rain Pants"]
  },
  {
    id: "cat-th-footwear",
    name: "Hiking Footwear",
    slug: "hiking-footwear",
    gender: "unisex",
    description: "Vibram-grip waterproof high-ankle trekking boots, snow crampons, anti-blister merino wool socks, and trail gaiters.",
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80",
    subcategories: ["High-Ankle Boots", "Trail Gaiters", "Ice Crampons", "Merino Socks"]
  },
  {
    id: "cat-th-gear",
    name: "Trekking Gear & Backpacks",
    slug: "trekking-gear",
    gender: "unisex",
    description: "Ergonomic 65L expedition rucksacks, 25L summit daypacks, carbon fiber shock-absorbing trekking poles, and sub-zero sleeping bags.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    subcategories: ["65L Rucksacks", "Daypacks", "Trekking Poles", "Sleeping Bags"]
  },
  {
    id: "cat-th-essentials",
    name: "Hiking Essentials & Tech",
    slug: "hiking-essentials",
    gender: "unisex",
    description: "Category-4 glacier polarized sunglasses, 1000-lumen waterproof headlamps, solar power banks, touchscreen thermal gloves, and first-aid kits.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    subcategories: ["Headlamps & Solar", "Glacier Sunglasses", "Thermal Gloves", "Emergency Medical Kit"]
  },

  // Accessories
  {
    id: "cat-a-jewelry",
    name: "Jewelry",
    slug: "accessories-jewelry",
    gender: "women",
    description: "Complete your look with our luxury Kundan, Polki, and contemporary jewelry rentals.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    subcategories: ["Necklaces", "Earrings", "Maang Tikka", "Bangles", "Sets"]
  },
  {
    id: "cat-a-bags",
    name: "Bags & Clutches",
    slug: "accessories-bags",
    gender: "women",
    description: "Designer potli bags and embroidered clutches to carry your essentials in style.",
    image: "https://images.unsplash.com/photo-1583391733958-69df8b1bdff0?w=800&q=80",
    subcategories: ["Potli", "Clutch", "Sling"]
  },
  {
    id: "cat-a-mensacc",
    name: "Men's Accessories",
    slug: "accessories-mens",
    gender: "men",
    description: "Safas, brooches, dupattas, and mojadis to elevate the traditional menswear.",
    image: "https://images.unsplash.com/photo-1593032483866-f40ecf325608?w=800&q=80",
    subcategories: ["Safa", "Brooch", "Dupatta", "Footwear"]
  }
];
