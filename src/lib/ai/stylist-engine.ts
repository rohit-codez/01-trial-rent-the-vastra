import { products } from '@/data/products';
import { Product } from '@/types/index';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface UserPreferences {
  gender: 'Women' | 'Men' | 'Kids';
  occasion: string;
  location?: string;
  date?: string;
  isOutdoor?: boolean;
  season?: string;
  budget?: number;
  colors?: string[];
  bodyType?: string;
  stylePreference?: string;
}

export interface Recommendation {
  id: string;
  productId: string;
  title: string;
  designer: string;
  reason: string;
  matchScore: number;
  pricePerDay: number;
  totalRental: number;
  suggestedDuration: number;
  image: string;
  type: 'outfit' | 'accessory';
  color: string;
  fabric: string;
  category: string;
}

export interface RecommendationResult {
  outfits: Recommendation[];
  accessories: Recommendation[];
  stylingTips: string[];
  colorAdvice: string;
  totalEstimate: number;
  packingSuggestions?: string[];
  summary: string;
}

// ─── Occasion → Category Mapping ─────────────────────────────────────────────

const occasionCategories: Record<string, { women: string[]; men: string[]; kids: string[] }> = {
  Wedding:          { women: ['Lehenga', 'Saree', 'Gown'],                men: ['Sherwani', 'Bandhgala', 'Indo-Western'], kids: ['Kids Lehenga', 'Kids Sherwani', 'Kids Kurta Set', 'Kids Gown'] },
  Engagement:       { women: ['Lehenga', 'Gown', 'Anarkali'],            men: ['Sherwani', 'Bandhgala', 'Indo-Western'], kids: ['Kids Lehenga', 'Kids Sherwani', 'Kids Gown'] },
  Reception:        { women: ['Gown', 'Saree', 'Indo-Western'],          men: ['Tuxedo', 'Bandhgala', 'Indo-Western'], kids: ['Kids Gown', 'Kids Sherwani', 'Kids Indo-Western'] },
  Sangeet:          { women: ['Indo-Western', 'Lehenga', 'Cocktail Wear'], men: ['Indo-Western', 'Kurta Set', 'Sherwani'], kids: ['Kids Kurta Set', 'Kids Lehenga', 'Kids Indo-Western'] },
  Haldi:            { women: ['Lehenga', 'Anarkali', 'Festival Wear'],    men: ['Kurta Set'], kids: ['Kids Kurta Set', 'Kids Lehenga'] },
  Mehendi:          { women: ['Anarkali', 'Lehenga', 'Indo-Western'],     men: ['Kurta Set', 'Indo-Western'], kids: ['Kids Kurta Set', 'Kids Lehenga'] },
  Birthday:         { women: ['Gown', 'Cocktail Wear', 'Indo-Western'],   men: ['Indo-Western', 'Tuxedo', 'Bandhgala'], kids: ['Kids Gown', 'Kids Kurta Set', 'Kids Indo-Western'] },
  'Corporate Event':{ women: ['Gown', 'Saree'],                          men: ['Tuxedo', 'Bandhgala'], kids: ['Kids Sherwani', 'Kids Gown'] },
  'College Farewell':{ women: ['Gown', 'Cocktail Wear', 'Saree'],        men: ['Tuxedo', 'Indo-Western', 'Bandhgala'], kids: ['Kids Indo-Western', 'Kids Gown'] },
  'Date Night':     { women: ['Cocktail Wear', 'Indo-Western', 'Gown'],  men: ['Indo-Western', 'Bandhgala', 'Tuxedo'], kids: ['Kids Indo-Western', 'Kids Gown'] },
  'Goa Trip':       { women: ['Indo-Western', 'Cocktail Wear', 'Festival Wear'], men: ['Indo-Western', 'Kurta Set'], kids: ['Kids Indo-Western', 'Kids Kurta Set'] },
  Festival:         { women: ['Lehenga', 'Anarkali', 'Festival Wear', 'Saree'], men: ['Kurta Set', 'Sherwani'], kids: ['Kids Kurta Set', 'Kids Lehenga', 'Kids Sherwani'] },
  Diwali:           { women: ['Lehenga', 'Anarkali', 'Saree', 'Festival Wear'], men: ['Kurta Set', 'Sherwani'], kids: ['Kids Kurta Set', 'Kids Lehenga', 'Kids Sherwani'] },
  Navratri:         { women: ['Lehenga', 'Festival Wear', 'Anarkali'],    men: ['Kurta Set'], kids: ['Kids Lehenga', 'Kids Kurta Set'] },
  Holi:             { women: ['Festival Wear', 'Indo-Western'],           men: ['Kurta Set'], kids: ['Kids Kurta Set', 'Kids Indo-Western'] },
  'Family Function':{ women: ['Saree', 'Anarkali', 'Lehenga'],           men: ['Kurta Set', 'Bandhgala', 'Sherwani'], kids: ['Kids Kurta Set', 'Kids Lehenga', 'Kids Sherwani'] },
  Anniversary:      { women: ['Gown', 'Saree', 'Lehenga'],               men: ['Tuxedo', 'Bandhgala', 'Sherwani'], kids: ['Kids Gown', 'Kids Sherwani', 'Kids Lehenga'] },
  'Cocktail Party': { women: ['Cocktail Wear', 'Gown', 'Indo-Western'],  men: ['Tuxedo', 'Bandhgala'], kids: ['Kids Gown', 'Kids Indo-Western'] },
};

// ─── Occasion → Recommended Colors ──────────────────────────────────────────

const occasionColors: Record<string, string[]> = {
  Wedding:          ['Red', 'Maroon', 'Gold', 'Pink', 'Emerald'],
  Engagement:       ['Pink', 'Peach', 'Gold', 'Ivory', 'Maroon'],
  Reception:        ['Navy', 'Emerald', 'Gold', 'Black', 'Silver'],
  Sangeet:          ['Purple', 'Royal Blue', 'Pink', 'Gold', 'Multicolor'],
  Haldi:            ['Gold', 'Peach', 'Ivory'],
  Mehendi:          ['Emerald', 'Pink', 'Gold', 'Multicolor'],
  Birthday:         ['Pink', 'Red', 'Gold', 'Black', 'Royal Blue'],
  'Corporate Event':['Black', 'Navy', 'Silver', 'Ivory'],
  'College Farewell':['Red', 'Black', 'Navy', 'Gold', 'Pink'],
  'Date Night':     ['Red', 'Black', 'Maroon', 'Pink'],
  'Goa Trip':       ['Peach', 'Ivory', 'Multicolor', 'Pink'],
  Festival:         ['Red', 'Gold', 'Emerald', 'Maroon', 'Multicolor'],
  Diwali:           ['Gold', 'Red', 'Maroon', 'Emerald', 'Pink'],
  Navratri:         ['Red', 'Gold', 'Emerald', 'Multicolor', 'Pink'],
  Holi:             ['Multicolor', 'Pink', 'Gold'],
  'Family Function':['Maroon', 'Pink', 'Gold', 'Navy', 'Emerald'],
  Anniversary:      ['Red', 'Gold', 'Maroon', 'Ivory', 'Pink'],
  'Cocktail Party': ['Black', 'Gold', 'Silver', 'Red', 'Navy'],
};

// ─── Season → Fabric Preferences ────────────────────────────────────────────

const seasonFabrics: Record<string, string[]> = {
  Summer:  ['Chiffon', 'Georgette', 'Organza', 'Cotton', 'Crepe'],
  Monsoon: ['Georgette', 'Crepe', 'Silk Blend'],
  Winter:  ['Velvet', 'Raw Silk', 'Banarasi', 'Brocade'],
  Autumn:  ['Silk', 'Raw Silk', 'Georgette', 'Organza'],
  Spring:  ['Organza', 'Chiffon', 'Georgette', 'Cotton'],
};

// ─── Style → Work Type Preferences ─────────────────────────────────────────

const styleWorkTypes: Record<string, string[]> = {
  Traditional:             ['Zardozi', 'Gota Patti', 'Embroidered', 'Thread Work', 'Banarasi Weave'],
  'Modern/Contemporary':   ['Sequin', 'Minimal', 'Geometric', 'Structured'],
  Fusion:                  ['Mirror Work', 'Printed', 'Patch Work', 'Mixed Media'],
  Minimalist:              ['Minimal', 'Chikankari', 'Self Work', 'Plain'],
  'Maximalist/Heavy Work': ['Zardozi', 'Stone Work', 'Heavy Embroidered', 'Gota Patti', 'Sequin'],
};

// ─── Body Type Tips ─────────────────────────────────────────────────────────

const bodyTypeTips: Record<string, string[]> = {
  Pear:               ['A-line silhouettes will beautifully balance your proportions.', 'Opt for embellished necklines and structured blouses to draw attention upward.', 'Flared lehengas and anarkalis are your best friends.'],
  Apple:              ['Empire waist outfits will create a flattering elongated silhouette.', 'V-necklines help create a streamlined look.', 'Anarkalis and flowy gowns drape beautifully on your frame.'],
  Hourglass:          ['Fitted silhouettes like mermaid gowns will accentuate your natural curves.', 'Belted outfits and defined waistlines are ideal.', 'Both traditional and modern silhouettes work wonderfully for you.'],
  Rectangle:          ['Peplum blouses and ruffled details add dimension.', 'Lehengas with heavy ghera (flare) create beautiful curves.', 'Try belted styles and asymmetric cuts for visual interest.'],
  'Inverted Triangle':['A-line and flared bottoms balance your broader shoulders.', 'Avoid heavy work on the shoulders; keep embellishments on the skirt/lehenga.', 'Soft, draped dupatta styles work well for you.'],
};

// ─── Accessory Categories ───────────────────────────────────────────────────

const accessoryCategories = ['Earrings', 'Bracelets', 'Necklaces', 'Potli Bags', 'Clutches', 'Safa', 'Brooches'];

// ─── Color Matching Utilities ───────────────────────────────────────────────

function normalizeColor(color: string): string {
  const map: Record<string, string[]> = {
    Red:     ['Red', 'Crimson', 'Scarlet', 'Ruby', 'Cherry'],
    Maroon:  ['Maroon', 'Wine', 'Burgundy', 'Oxblood', 'Deep Maroon'],
    Pink:    ['Pink', 'Blush', 'Rose', 'Fuchsia', 'Pastel Pink', 'Coral', 'Magenta'],
    Peach:   ['Peach', 'Salmon', 'Apricot', 'Champagne'],
    Gold:    ['Gold', 'Golden', 'Champagne Gold', 'Antique Gold', 'Mustard'],
    Ivory:   ['Ivory', 'Cream', 'Off-White', 'White', 'Pearl'],
    Navy:    ['Navy', 'Midnight Blue', 'Dark Blue'],
    'Royal Blue': ['Royal Blue', 'Cobalt', 'Electric Blue', 'Teal'],
    Emerald: ['Emerald', 'Green', 'Forest Green', 'Sage', 'Mint', 'Olive', 'Turquoise'],
    Purple:  ['Purple', 'Lavender', 'Plum', 'Violet', 'Deep Purple', 'Mauve'],
    Black:   ['Black', 'Charcoal', 'Jet Black', 'Midnight'],
    Silver:  ['Silver', 'Grey', 'Gunmetal', 'Pewter', 'Metallic'],
  };
  for (const [canonical, variants] of Object.entries(map)) {
    if (variants.some(v => color.toLowerCase().includes(v.toLowerCase()))) return canonical;
  }
  return color;
}

function colorMatchScore(productColor: string, preferredColors: string[]): number {
  if (!preferredColors.length || preferredColors.includes('No Preference')) return 50;
  const normalized = normalizeColor(productColor);
  if (preferredColors.includes(normalized)) return 100;
  if (preferredColors.some(pc => normalizeColor(pc) === normalized)) return 90;
  return 20;
}

// ─── Score a Product ────────────────────────────────────────────────────────

function scoreProduct(product: Product, prefs: UserPreferences): number {
  let score = 0;

  // Gender match (absolute requirement)
  const genderKey = prefs.gender.toLowerCase();
  if (product.gender !== genderKey && product.gender !== 'unisex') return -1;

  // Category relevance to occasion
  const catMap = occasionCategories[prefs.occasion];
  const relevantCats = catMap ? (genderKey === 'women' ? catMap.women : genderKey === 'men' ? catMap.men : catMap.kids || []) : [];
  if (relevantCats.length > 0) {
    const catIndex = relevantCats.indexOf(product.category);
    if (catIndex === 0) score += 35;
    else if (catIndex === 1) score += 28;
    else if (catIndex >= 2) score += 20;
    else score += 5; // not in list but still same gender
  } else {
    score += 15; // no rules for this occasion, give baseline
  }

  // Occasion tag match
  if (product.occasionTags.some(tag =>
    tag.toLowerCase().includes(prefs.occasion.toLowerCase()) ||
    prefs.occasion.toLowerCase().includes(tag.toLowerCase())
  )) {
    score += 20;
  }

  // Budget match
  if (prefs.budget) {
    if (product.rentalPrice3Day <= prefs.budget) {
      score += 15;
      if (product.rentalPrice3Day >= prefs.budget * 0.5) score += 5; // near top of budget = better value
    } else if (product.rentalPrice3Day <= prefs.budget * 1.2) {
      score += 8; // slightly over budget
    } else {
      score -= 10; // way over budget
    }
  }

  // Color match
  if (prefs.colors && prefs.colors.length > 0) {
    const cScore = colorMatchScore(product.color, prefs.colors);
    score += Math.round(cScore * 0.15); // max 15 points
  } else {
    // Use occasion-recommended colors
    const occasionCols = occasionColors[prefs.occasion] || [];
    const cScore = colorMatchScore(product.color, occasionCols);
    score += Math.round(cScore * 0.08); // max 8 points
  }

  // Season/fabric match
  if (prefs.season) {
    const preferredFabrics = seasonFabrics[prefs.season] || [];
    if (preferredFabrics.some(f => product.fabric.toLowerCase().includes(f.toLowerCase()))) {
      score += 10;
    }
  }

  // Style preference match
  if (prefs.stylePreference) {
    const preferredWork = styleWorkTypes[prefs.stylePreference] || [];
    if (preferredWork.some(w => product.workType.toLowerCase().includes(w.toLowerCase()))) {
      score += 10;
    }
  }

  // Rating bonus
  score += Math.round(product.rating * 2); // max 10

  return Math.min(score, 100);
}

// ─── Generate WHY Explanation ───────────────────────────────────────────────

function generateReason(product: Product, prefs: UserPreferences, score: number): string {
  const parts: string[] = [];

  // Opening line - why this outfit fits the occasion
  const occasionPhrase = prefs.occasion === 'Wedding' ? 'a grand wedding celebration'
    : prefs.occasion === 'Sangeet' ? 'a lively Sangeet night'
    : prefs.occasion === 'Reception' ? 'an elegant reception'
    : prefs.occasion === 'Engagement' ? 'a beautiful engagement ceremony'
    : prefs.occasion === 'Haldi' ? 'the auspicious Haldi ceremony'
    : prefs.occasion === 'Mehendi' ? 'a vibrant Mehendi celebration'
    : prefs.occasion === 'Diwali' ? 'Diwali festivities'
    : prefs.occasion === 'Navratri' ? 'the colorful Navratri celebrations'
    : prefs.occasion === 'Corporate Event' ? 'a polished corporate event'
    : prefs.occasion === 'College Farewell' ? 'your memorable college farewell'
    : prefs.occasion === 'Date Night' ? 'a romantic date night'
    : prefs.occasion === 'Goa Trip' ? 'your stylish Goa trip'
    : prefs.occasion === 'Cocktail Party' ? 'a chic cocktail party'
    : prefs.occasion === 'Birthday' ? 'a special birthday celebration'
    : prefs.occasion === 'Anniversary' ? 'a romantic anniversary'
    : prefs.occasion === 'Family Function' ? 'a warm family gathering'
    : `your ${prefs.occasion}`;

  parts.push(`This ${product.title} is an excellent choice for ${occasionPhrase}${prefs.location ? ` in ${prefs.location}` : ''}.`);

  // Fabric + season logic
  if (prefs.season) {
    const seasonDesc = prefs.season === 'Winter' ? 'the cold winter weather'
      : prefs.season === 'Summer' ? 'the warm summer months'
      : prefs.season === 'Monsoon' ? 'the monsoon season'
      : `the ${prefs.season.toLowerCase()} season`;

    if (prefs.season === 'Winter' && ['Velvet', 'Raw Silk', 'Banarasi'].some(f => product.fabric.includes(f))) {
      parts.push(`The ${product.fabric.toLowerCase()} fabric will keep you warm and luxurious during ${seasonDesc}.`);
    } else if (prefs.season === 'Summer' && ['Chiffon', 'Georgette', 'Organza', 'Cotton'].some(f => product.fabric.includes(f))) {
      parts.push(`The lightweight ${product.fabric.toLowerCase()} fabric is breathable and perfect for ${seasonDesc}.`);
    } else {
      parts.push(`The ${product.fabric.toLowerCase()} fabric works well for ${seasonDesc}.`);
    }
  }

  // Color reasoning
  const occasionCols = occasionColors[prefs.occasion] || [];
  if (prefs.colors && prefs.colors.length > 0 && prefs.colors.some(c => normalizeColor(product.color) === normalizeColor(c))) {
    parts.push(`The ${product.color.toLowerCase()} shade matches your color preference perfectly.`);
  } else if (occasionCols.some(c => normalizeColor(product.color) === normalizeColor(c))) {
    parts.push(`The ${product.color.toLowerCase()} color is traditionally auspicious and highly recommended for this occasion.`);
  }

  // Work type
  if (product.workType && product.workType !== 'Minimal') {
    parts.push(`The ${product.workType.toLowerCase()} work adds the right level of elegance.`);
  }

  // Body type advice
  if (prefs.bodyType) {
    const catAdvice: Record<string, Record<string, string>> = {
      Pear:       { Lehenga: 'The flared silhouette beautifully balances your proportions.', Gown: 'The A-line cut flatters your pear shape wonderfully.', Anarkali: 'The flowing anarkali drapes elegantly on your frame.' },
      Apple:      { Anarkali: 'The empire waist creates a flattering elongated silhouette for you.', Gown: 'This flowing gown drapes beautifully on your frame.', Saree: 'A well-draped saree creates a streamlined look.' },
      Hourglass:  { Lehenga: 'The fitted choli accentuates your beautiful waistline.', Gown: 'A fitted gown highlights your natural curves perfectly.', Saree: 'A saree draped to show your waist is absolutely stunning.' },
      Rectangle:  { Lehenga: 'The heavy ghera creates beautiful curves and adds dimension.', 'Indo-Western': 'Layered and structured cuts add visual interest to your frame.' },
      'Inverted Triangle': { Lehenga: 'The flared lehenga perfectly balances your broader shoulders.', Anarkali: 'The flowing fabric softens your upper body beautifully.' },
    };
    const advice = catAdvice[prefs.bodyType]?.[product.category];
    if (advice) parts.push(advice);
  }

  // Designer credibility
  if (product.designerName) {
    parts.push(`Designed by ${product.designerName} — known for impeccable craftsmanship.`);
  }

  return parts.join(' ');
}

// ─── Generate Styling Tips ──────────────────────────────────────────────────

function generateStylingTips(prefs: UserPreferences, outfits: Recommendation[]): string[] {
  const tips: string[] = [];
  const outfit = outfits[0];

  if (prefs.gender === 'Kids') {
    tips.push('Ensure comfortable, breathable inner lining so the child can play and dance freely.');
    tips.push('Opt for soft, cushioned juttis or slip-on mojaris that are easy for kids to walk in.');
    tips.push('Pre-stitched or elasticated waists ensure a hassle-free, snug fit for active kids.');
  }

  // Body type tips
  if (prefs.bodyType && bodyTypeTips[prefs.bodyType]) {
    tips.push(bodyTypeTips[prefs.bodyType][0]);
  }

  // Occasion-specific tips
  if (prefs.occasion === 'Wedding') {
    tips.push('Keep your dupatta draped over one shoulder for a modern yet traditional look.');
    tips.push('Opt for comfortable wedge heels — you\'ll be standing for long hours.');
    tips.push('Carry a small potli bag for essentials so your hands stay free for blessings.');
  } else if (prefs.occasion === 'Sangeet') {
    tips.push('Choose a lightweight outfit that lets you dance freely through the night.');
    tips.push('Secure your dupatta with a brooch so it doesn\'t fly off while dancing.');
    tips.push('Statement earrings alone can make a bigger impact than a full jewelry set.');
  } else if (prefs.occasion === 'Reception') {
    tips.push('A sleek updo or side-swept hair lets your outfit and jewelry shine.');
    tips.push('Pair with metallic heels for that extra glamour factor.');
    tips.push('Less jewelry, more elegance — pick one statement piece.');
  } else if (prefs.occasion === 'Corporate Event') {
    tips.push('Keep accessories minimal and sophisticated — think pearl studs or a classic watch.');
    tips.push('A perfectly tailored fit matters more than expensive fabric.');
    tips.push('Carry a structured clutch instead of a casual bag.');
  } else if (prefs.occasion === 'Diwali' || prefs.occasion === 'Navratri' || prefs.occasion === 'Festival') {
    tips.push('Go bright and festive — this is the time to embrace bold colors and heavy jewelry.');
    tips.push('Traditional juttis or kolhapuris complete the festive look perfectly.');
    tips.push('Add a maang tikka for that extra traditional touch.');
  } else if (prefs.occasion === 'Date Night') {
    tips.push('Keep it chic but comfortable — you want to feel confident and relaxed.');
    tips.push('A statement ring or bracelet adds subtle glamour without overdoing it.');
    tips.push('Opt for a fragrance that complements the intimate setting.');
  } else if (prefs.occasion === 'Goa Trip') {
    tips.push('Pack versatile pieces that can transition from day to evening.');
    tips.push('Light fabrics and breathable materials are essential for the beach weather.');
    tips.push('Mix and match accessories to create different looks from fewer outfits.');
  } else if (prefs.occasion === 'College Farewell') {
    tips.push('This is your moment to shine — go bold with your outfit choice.');
    tips.push('Comfortable footwear is key since you\'ll be on your feet all evening.');
    tips.push('A sleek hairstyle with soft waves photographs beautifully.');
  } else {
    tips.push('Coordinate your footwear color with your outfit for a polished look.');
    tips.push('When in doubt, nude heels elongate the silhouette with any outfit.');
    tips.push('Carry a matching clutch or potli bag to complete the ensemble.');
  }

  // Season-specific tip
  if (prefs.season === 'Winter') {
    tips.push('Layer with a velvet or pashmina stole for warmth without compromising style.');
  } else if (prefs.season === 'Summer') {
    tips.push('Set your makeup with a setting spray — humidity can be unforgiving.');
  } else if (prefs.season === 'Monsoon') {
    tips.push('Avoid very long hemlines that might get wet. Mid-calf to ankle length is perfect.');
  }

  // Outdoor tip
  if (prefs.isOutdoor) {
    tips.push('For an outdoor event, choose fabrics that don\'t wrinkle easily and comfortable block heels.');
  }

  return tips.slice(0, 6); // Return max 6 tips
}

// ─── Generate Color Advice ──────────────────────────────────────────────────

function generateColorAdvice(prefs: UserPreferences): string {
  const occasionCols = occasionColors[prefs.occasion] || [];

  if (prefs.colors && prefs.colors.length > 0 && !prefs.colors.includes('No Preference')) {
    const selectedStr = prefs.colors.join(', ');
    const matchesOccasion = prefs.colors.some(c => occasionCols.includes(c));

    if (matchesOccasion) {
      return `Excellent choices! ${selectedStr} ${prefs.colors.length > 1 ? 'are' : 'is'} perfectly suited for a ${prefs.occasion}. ${prefs.season ? `These shades complement ${prefs.season.toLowerCase()} beautifully, ` : ''}In Indian fashion, ${prefs.colors[0].toLowerCase()} symbolises ${getColorMeaning(prefs.colors[0])}, making it ideal for this celebration.`;
    } else {
      return `You've chosen ${selectedStr} — a distinctive choice for a ${prefs.occasion}! While traditional picks for this occasion are ${occasionCols.slice(0, 3).join(', ')}, your selection will help you stand out. ${prefs.season === 'Winter' ? 'Deep, rich tones look especially stunning in winter light.' : prefs.season === 'Summer' ? 'Lighter shades keep you cool while looking elegant.' : 'These colors will photograph beautifully.'}`;
    }
  }

  return `For a ${prefs.occasion}${prefs.location ? ` in ${prefs.location}` : ''}, we recommend ${occasionCols.slice(0, 3).join(', ')} — these are the most popular and auspicious choices. ${prefs.season === 'Winter' ? 'Rich, deep tones like maroon and emerald look stunning in winter.' : prefs.season === 'Summer' ? 'Lighter shades like pastels and ivory keep you cool yet elegant.' : 'These colors are timeless and photograph beautifully.'} In Indian tradition, ${occasionCols[0]?.toLowerCase() || 'red'} signifies ${getColorMeaning(occasionCols[0] || 'Red')}.`;
}

function getColorMeaning(color: string): string {
  const meanings: Record<string, string> = {
    Red: 'love, passion, and prosperity — the quintessential bridal color',
    Maroon: 'royalty, depth, and timeless elegance',
    Pink: 'romance, femininity, and youthful joy',
    Gold: 'prosperity, divine energy, and grandeur',
    Ivory: 'purity, grace, and modern sophistication',
    Navy: 'confidence, depth, and refined taste',
    Emerald: 'new beginnings, fertility, and natural beauty',
    Purple: 'luxury, creativity, and regal charm',
    Black: 'power, sophistication, and modern elegance',
    Silver: 'grace, modernity, and subtle glamour',
    Peach: 'warmth, softness, and gentle romance',
    'Royal Blue': 'majesty, trust, and artistic expression',
  };
  return meanings[color] || 'beauty and celebration';
}

// ─── Packing Suggestions ───────────────────────────────────────────────────

function generatePackingSuggestions(prefs: UserPreferences): string[] | undefined {
  if (prefs.occasion === 'Goa Trip') {
    return [
      'Pack at least 2-3 rental outfits for different occasions (beach dinner, nightlife, sightseeing)',
      'Double-sided fashion tape for breezy weather',
      'Comfortable flats or wedges for walking on uneven terrain',
      'A compact steamer to de-wrinkle outfits at the hotel',
      'Waterproof makeup setting spray',
      'A versatile stole/dupatta that works with multiple outfits',
    ];
  }

  const base = [
    'Double-sided fashion tape for emergencies',
    'Safety pins in various sizes',
    'A comfortable pair of flats for switching after the event',
    'Mini sewing kit for quick fixes',
    'Stain remover wipes for rental garment protection',
  ];

  if (prefs.isOutdoor) {
    base.push('Compact umbrella or stylish shawl for unexpected weather');
    base.push('Blotting papers to manage shine');
  }

  if (prefs.season === 'Winter') {
    base.push('A warm pashmina stole that matches your outfit');
  }

  return base.slice(0, 5);
}

// ─── Main Recommendation Generator ─────────────────────────────────────────

export function generateRecommendations(prefs: UserPreferences): RecommendationResult {
  const genderKey = prefs.gender.toLowerCase() as 'women' | 'men';

  // Score all products
  const scored = products.map(product => ({
    product,
    score: scoreProduct(product, prefs),
  })).filter(s => s.score > 0);

  // Separate outfits and accessories
  const outfitProducts = scored
    .filter(s => !accessoryCategories.includes(s.product.category))
    .sort((a, b) => b.score - a.score);

  const accessoryProducts = scored
    .filter(s => accessoryCategories.includes(s.product.category))
    .sort((a, b) => b.score - a.score);

  // Pick top 3 outfits
  const topOutfits = outfitProducts.slice(0, 3);

  // Pick top 3 accessories
  const topAccessories = accessoryProducts.slice(0, 3);

  // Determine suggested duration
  const duration = prefs.occasion === 'Wedding' ? 5
    : prefs.occasion === 'Goa Trip' ? 7
    : ['Engagement', 'Reception', 'Anniversary'].includes(prefs.occasion) ? 3
    : 3;

  // Build recommendations
  const outfits: Recommendation[] = topOutfits.map((s, i) => ({
    id: `outfit-${i + 1}`,
    productId: s.product.id,
    title: s.product.title,
    designer: s.product.designerName,
    reason: generateReason(s.product, prefs, s.score),
    matchScore: Math.min(Math.max(s.score, 65), 99), // clamp to 65-99
    pricePerDay: Math.round(
      duration === 3 ? s.product.rentalPrice3Day
      : duration === 5 ? s.product.rentalPrice5Day
      : s.product.rentalPrice7Day
    ),
    totalRental: duration === 3 ? s.product.rentalPrice3Day
      : duration === 5 ? s.product.rentalPrice5Day
      : s.product.rentalPrice7Day,
    suggestedDuration: duration,
    image: s.product.images[0] || '',
    type: 'outfit',
    color: s.product.color,
    fabric: s.product.fabric,
    category: s.product.category,
  }));

  const accessories: Recommendation[] = topAccessories.map((s, i) => ({
    id: `acc-${i + 1}`,
    productId: s.product.id,
    title: s.product.title,
    designer: s.product.designerName,
    reason: `Pairs beautifully with your ${outfits[0]?.title || 'outfit'}. ${s.product.color} ${s.product.category.toLowerCase()} ${
      s.product.category === 'Earrings' ? 'will frame your face elegantly' :
      s.product.category === 'Necklaces' ? 'will be the perfect statement piece' :
      s.product.category === 'Clutches' || s.product.category === 'Potli Bags' ? 'completes the ensemble with a functional touch of elegance' :
      s.product.category === 'Safa' ? 'adds the royal finishing touch to the groom\'s look' :
      s.product.category === 'Brooches' ? 'adds a subtle but impactful accent' :
      s.product.category === 'Bracelets' ? 'adds a graceful touch to your wrists' :
      'complements the overall look perfectly'
    }. The deposit is fully refundable upon return.`,
    matchScore: Math.min(Math.max(s.score, 70), 97),
    pricePerDay: s.product.rentalPrice3Day,
    totalRental: s.product.rentalPrice3Day,
    suggestedDuration: duration,
    image: s.product.images[0] || '',
    type: 'accessory',
    color: s.product.color,
    fabric: s.product.fabric,
    category: s.product.category,
  }));

  // Calculate total estimate
  const totalEstimate = outfits.reduce((sum, o) => sum + o.totalRental, 0) +
    accessories.reduce((sum, a) => sum + a.totalRental, 0);

  // Generate summary
  const summary = `Based on your preferences for a ${prefs.occasion}${prefs.location ? ` in ${prefs.location}` : ''}${prefs.season ? ` during ${prefs.season}` : ''}, we've curated ${outfits.length} outfit${outfits.length > 1 ? 's' : ''} and ${accessories.length} matching accessor${accessories.length > 1 ? 'ies' : 'y'} within your ₹${(prefs.budget || 5000).toLocaleString('en-IN')} budget. Each piece has been selected to ensure you look and feel your absolute best.`;

  return {
    outfits,
    accessories,
    stylingTips: generateStylingTips(prefs, outfits),
    colorAdvice: generateColorAdvice(prefs),
    totalEstimate,
    packingSuggestions: generatePackingSuggestions(prefs),
    summary,
  };
}
