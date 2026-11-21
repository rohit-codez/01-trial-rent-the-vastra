import { products } from '@/data/products';
import { ChatMessage } from './types';

export function callSmartFallback(messages: ChatMessage[]): string {
  const userTexts = messages.filter(m => m.role === 'user').map(m => m.content.toLowerCase()).join(' ');

  // 1. Detect Gender & Target Audience
  let gender: 'women' | 'men' | 'kids' | null = null;
  const isCuteOrKids = /\b(cute|little|baby|babies|infant|toddler|toddlers|kid|kids|child|children|son|daughter|junior|frock|princess|cake smash|1st birthday|first birthday|nawab junior|flower girl|little girl|little boy)\b/.test(userTexts);

  if (isCuteOrKids) {
    gender = 'kids';
  } else if (/\b(female|woman|women|girl|bride|bridesmaid|she|her|sister|mother|lehenga|saree|gown|anarkali|sharara)\b/.test(userTexts)) {
    gender = 'women';
  } else if (/\b(male|man|men|boy|groom|groomsman|he|him|brother|father|sherwani|kurta|tuxedo|bandhgala|suit)\b/.test(userTexts)) {
    gender = 'men';
  }

  // 2. Detect Occasion
  let occasion = 'Wedding';
  const isHikingOrTravel = /\b(hike|hiking|trek|trekking|mountain|mountains|trail|camping|camp|kedarkantha|triund|manali|kasol|spiti|ladakh|leh|himalaya|himalayas|snow|outdoor|adventure|backpack|backpacking|travel|trip)\b/.test(userTexts);

  if (isHikingOrTravel) occasion = 'Hiking & Trekking';
  else if (/goa|beach/.test(userTexts)) occasion = 'Goa Trip';
  else if (/birthday|cake smash/.test(userTexts)) occasion = 'Birthday';
  else if (/sangeet/.test(userTexts)) occasion = 'Sangeet';
  else if (/reception/.test(userTexts)) occasion = 'Reception';
  else if (/engagement|roka/.test(userTexts)) occasion = 'Engagement';
  else if (/haldi/.test(userTexts)) occasion = 'Haldi';
  else if (/mehendi|mehndi/.test(userTexts)) occasion = 'Mehendi';
  else if (/navratri|garba|dandiya/.test(userTexts)) occasion = 'Navratri';
  else if (/diwali/.test(userTexts)) occasion = 'Diwali';
  else if (/farewell|college/.test(userTexts)) occasion = 'College Farewell';
  else if (/cocktail/.test(userTexts)) occasion = 'Cocktail Party';
  else if (/date night|dinner/.test(userTexts)) occasion = 'Date Night';
  else if (/corporate|office|gala/.test(userTexts)) occasion = 'Corporate Event';

  // 3. Detect Budget
  let maxBudget = 15000;
  const budgetMatch = userTexts.match(/(?:budget|under|below|around|within|upto|up to|₹|rs\.?|inr)?\s*(\d{3,5})/);
  if (budgetMatch && budgetMatch[1]) {
    const parsed = parseInt(budgetMatch[1]);
    if (parsed >= 300) maxBudget = parsed;
  }

  // 4. Kids Intelligence
  if (isCuteOrKids) {
    // (Keep the same kids logic from the current file - lines 69-108)
    // But upgrade the response format to include the new sections
    const isBoy = /\b(boy|son|prince|gentleman|nephew|little man|bhai)\b/.test(userTexts);
    const isGirl = /\b(girl|daughter|princess|niece|frock|fairy|choli|ghagra)\b/.test(userTexts);

    let cuteItems = products.filter(p => p.gender === 'kids');
    if (isBoy) {
      cuteItems = cuteItems.filter(p => !p.title.toLowerCase().includes('girl') && !p.title.toLowerCase().includes('princess'));
    } else if (isGirl) {
      cuteItems = cuteItems.filter(p => !p.title.toLowerCase().includes('boy') && !p.title.toLowerCase().includes('prince'));
    }

    const featured1 = cuteItems[0] || products.find(p => p.id === 'prod-096')!;
    const featured2 = cuteItems[1] || products.find(p => p.id === 'prod-099')!;
    const featured3 = cuteItems[2] || products.find(p => p.id === 'prod-101')!;
    const featured4 = cuteItems[3] || products.find(p => p.id === 'prod-105')!;

    const recommendedIds = [featured1?.id, featured2?.id, featured3?.id, featured4?.id].filter(Boolean);

    return `### 🎯 Style Analysis
I can see you're looking for adorable outfits for your little one! Children's occasion wear needs to balance three things: **cuteness, comfort, and practicality**. Little ones need soft, breathable fabrics that won't irritate sensitive skin, while looking picture-perfect for photos.

### 🌟 Stylist Recommendation
Here are my hand-picked selections from the RentTheVastra kids collection:

1. **${featured1?.title || 'Baby Dhoti Kurta Set'}** (₹${featured1?.rentalPrice3Day || 350}/3 days) — ${featured1?.description || 'Perfect festive look for little ones'}
2. **${featured2?.title || 'Baby Peplum Ghagra'}** (₹${featured2?.rentalPrice3Day || 399}/3 days) — ${featured2?.description || 'Adorable ethnic wear'}
3. **${featured3?.title || 'Tiny Prince Sherwani'}** (₹${featured3?.rentalPrice3Day || 449}/3 days) — ${featured3?.description || 'Miniature royal elegance'}
4. **${featured4?.title || 'Mini Saree Set'}** (₹${featured4?.rentalPrice3Day || 399}/3 days) — ${featured4?.description || 'Traditional charm for little princesses'}

### ✨ Why This Look Works
Children outgrow formal clothes within 3-6 months, making renting the smartest choice. Every baby garment at RentTheVastra features **100% organic cotton muslin lining**, itch-free seams, and undergoes **hospital-grade organic sanitization** — zero harsh chemicals touching your child's skin.

### 💎 Complete Styling Guide
- **Footwear:** Soft-soled embroidered mojaris or sparkly belly shoes for toddlers
- **Hair Accessories:** Delicate floral headband, tiny crown tiara, or satin bow clips
- **Jewelry:** Lightweight jingle bangles or a dainty pearl necklace (age-appropriate)

### 💄 Grooming Tips
- Apply a gentle moisturizer before dressing to prevent fabric irritation
- Use a soft hairbrush and minimal hair products for a natural, adorable look
- Keep a bib handy for younger babies to protect the outfit

### 🎓 Fashion Stylist Pro Tips
- **Comfort first:** Always check that elastic waistbands aren't too tight
- **Layering:** Carry a lightweight cotton cardigan for AC venues
- **Photography:** Dress your child 15 minutes before photos — kids get restless quickly
- **Diaper access:** Choose outfits with easy bottom openings for quick changes

### 👗 RentTheVastra Picks
Rentals start at just **₹349** for 3 days *(Retail Value: ₹3,000 - ₹6,500)* — **save up to 85%** while dressing your little star in luxury! Every rental includes **2 complimentary accessories** matched to the outfit — absolutely free!

<!-- PRODUCTS: ${JSON.stringify(recommendedIds)} -->
<!-- REPLIES: ["Baby & Toddler (0-2Y)", "Little Princess Gowns", "Tiny Nawab Sherwanis", "1st Birthday Outfits", "Under ₹500"] -->
<!-- SCORE: 99 -->
<!-- PALETTE: ["#FFB6C1", "#FFD700", "#E6E6FA"] -->`;
  }

  // 5. Hiking Intelligence
  if (isHikingOrTravel) {
    // (Keep existing hiking logic but with upgraded response format)
    const isColdOrSnow = /\b(winter|snow|cold|minus|subzero|kedarkantha|chadar|altitude|glacier|freezing)\b/.test(userTexts);

    let recommendedJacket = gender === 'women'
      ? (isColdOrSnow ? products.find(p => p.id === 'prod-075') : products.find(p => p.id === 'prod-074'))
      : (isColdOrSnow ? products.find(p => p.id === 'prod-073') : products.find(p => p.id === 'prod-072'));
    if (!recommendedJacket) recommendedJacket = products.find(p => p.id === 'prod-072') || products[0];

    const recommendedPants = gender === 'women'
      ? (products.find(p => p.id === 'prod-081') || products.find(p => p.id === 'prod-083'))
      : (isColdOrSnow ? products.find(p => p.id === 'prod-080') : products.find(p => p.id === 'prod-079'));

    const boots = products.find(p => p.id === 'prod-084');
    const rucksack = products.find(p => p.id === 'prod-087');
    const poles = products.find(p => p.id === 'prod-089');
    const glasses = products.find(p => p.id === 'prod-092');

    const recommendedIds = [
      recommendedJacket.id, recommendedPants?.id, boots?.id,
      rucksack?.id, poles?.id, glasses?.id
    ].filter(Boolean);

    const totalRental = (recommendedJacket.rentalPrice3Day) +
      (recommendedPants?.rentalPrice3Day || 499) +
      (boots?.rentalPrice3Day || 699) +
      (rucksack?.rentalPrice3Day || 499);
    const totalRetail = (recommendedJacket.retailPrice) +
      (recommendedPants?.retailPrice || 4800) +
      (boots?.retailPrice || 10500) +
      (rucksack?.retailPrice || 8500);
    const savingsPercent = Math.round((1 - totalRental / totalRetail) * 100);

    return `### 🎯 Style Analysis
For mountain trekking and hiking, fashion meets function. Your gear needs to handle unpredictable weather, steep terrain, and long hours of exertion while keeping you dry, warm, and mobile. I would recommend following the professional **3-Layer System** that expedition climbers use.

### 🌟 Stylist Recommendation — Complete Trek Kit
1. **Outer Shell:** **${recommendedJacket.title}** (₹${recommendedJacket.rentalPrice3Day}/3 days) — 100% waterproof & windproof membrane with storm hood for rain, snow, and ridge winds.
2. **Trekking Bottoms:** **${recommendedPants?.title || 'Quick-Dry Cargo Trekking Pants'}** (₹${recommendedPants?.rentalPrice3Day || 499}/3 days) — Stretch ripstop with articulated knees and secure zippered pockets.
3. **Footwear:** **${boots?.title || 'High-Ankle Waterproof Hiking Boots'}** (₹${boots?.rentalPrice3Day || 699}/3 days) — Deep-lug Vibram grip for loose gravel, mud, and snow.
4. **Expedition Pack:** **${rucksack?.title || '65L Ergonomic Trekking Rucksack'}** (₹${rucksack?.rentalPrice3Day || 499}/3 days) — Spinal support + waterproof rain cover included.
5. **Trail Essentials:** **${poles?.title || 'Carbon Fiber Trekking Poles'}** & **${glasses?.title || 'Cat-4 Glacier Sunglasses'}** for knee protection and UV glare shield.

### ✨ Why This Setup Works
Mountain weather changes in minutes. The **3-Layer System** is non-negotiable:
- **Base Layer:** Moisture-wicking Merino thermal keeps you dry
- **Mid Layer:** Fleece or down insulation locks core warmth
- **Outer Layer:** Waterproof, windproof, breathable hardshell deflects elements

This approach prevents hypothermia during rest stops and overheating during climbs.

### 💎 Complete Gear Guide
- **Footwear:** Break in your boots 2-3 days before the trek with your trekking socks
- **Watch:** A GPS altimeter watch helps track elevation and weather changes
- **Eyewear:** Cat-4 glacier sunglasses are essential above 3,500m to prevent snow blindness
- **Bag:** 65L is optimal — 55L underpacks, 75L overpacks for weekend treks

### 💄 Trail Grooming Tips
- Apply SPF 50+ sunscreen every 2 hours — UV intensity doubles at altitude
- Use a moisture-wicking buff/bandana to protect neck and face from wind
- Keep lips protected with SPF lip balm — cracked lips are painful at altitude

### 🎓 Pro Trail Tips
- **Pack a headlamp & power bank** — batteries drain rapidly in sub-zero cold
- **Keep rain protection accessible** in your top lid pocket
- **Start early:** Most mountain weather deteriorates after noon
- **Hydrate actively:** You need 3-4L of water per day at altitude

### 👗 RentTheVastra Picks
**Complete 4-Piece Trek Kit Rental:** **₹${totalRental.toLocaleString('en-IN')}** for 3 days *(Retail: ₹${totalRetail.toLocaleString('en-IN')})* — **Save ₹${(totalRetail - totalRental).toLocaleString('en-IN')} (${savingsPercent}%)** by renting!

All gear is professionally sanitized, waterproof-tested, and delivered to your doorstep in Delhi NCR.

<!-- PRODUCTS: ${JSON.stringify(recommendedIds)} -->
<!-- REPLIES: ["Men's Hiking Jackets", "Women's Trekking Gear", "High-Ankle Boots Only", "65L Backpacks & Poles", "Under ₹1,500 Kit"] -->
<!-- SCORE: 99 -->
<!-- PALETTE: ["#1E3A8A", "#047857", "#111827"] -->`;
  }

  // 6. Missing Info — ask follow-up questions
  if (!gender && !/\b(lehenga|sherwani|saree|tuxedo|gown|anarkali|bandhgala|kurta|jacket|boots)\b/.test(userTexts)) {
    if (occasion === 'Goa Trip') {
      return `Sounds exciting! A Goa trip calls for relaxed silhouettes, breathable fabrics, and vibrant colors that photograph beautifully against the ocean.

To curate the perfect vacation wardrobe from **RentTheVastra**, I would need to know:
1. **Are we styling for Women or Men?**
2. **What is your approximate budget range?**
3. **Beach parties, casual sightseeing, or formal sunset dinners?**

<!-- REPLIES: ["Women's Wear", "Men's Wear", "Budget under ₹2,000", "Beach party outfits", "Sightseeing & Dinners"] -->
<!-- SCORE: 85 -->
<!-- PALETTE: ["#20B2AA", "#FFD700", "#FFF8DC"] -->`;
    }

    if (occasion === 'Wedding') {
      return `A wedding celebration deserves nothing less than regal elegance! At **RentTheVastra**, I have access to curated luxury collections spanning lehengas, sarees, gowns, sherwanis, and Indo-Western fusion.

To give you a perfectly tailored recommendation:
1. **Are we styling Women's, Men's, or Kids' wear?**
2. **What is your approximate budget (e.g., ₹2,000 or ₹5,000)?**
3. **Are you the bride/groom, a close family member, or an attending guest?**

<!-- REPLIES: ["Women's Lehenga / Saree", "Men's Sherwani / Kurta", "Kids Ethnic Wear", "Budget under ₹2,000", "Main Wedding Day"] -->
<!-- SCORE: 88 -->
<!-- PALETTE: ["#800020", "#D4AF37", "#FFFFF0"] -->`;
    }

    return `Welcome to **RentTheVastra**! I would love to curate the perfect look for you — whether it is a grand wedding, a mountain trek, a festive celebration, or an adorable outfit for your little one.

To create a personalized styling consultation, could you share:
1. **Who are we styling today? (Women, Men, or Kids & Babies)**
2. **What is the occasion? (Wedding, Sangeet, Festival, Trek, Goa Trip, Birthday)**
3. **What is your target rental budget? (e.g., ₹1,000, ₹3,000, ₹5,000+)**

<!-- REPLIES: ["Women's Ethnic Wear", "Men's Wedding Wear", "Kids & Baby Wear", "Hiking & Trekking Gear", "Under ₹2,000"] -->
<!-- SCORE: 80 -->
<!-- PALETTE: ["#800020", "#D4AF37", "#50C878"] -->`;
  }

  // 7. Main outfit recommendation with FULL styling consultation
  const matchingOutfits = products.filter(p => {
    if (gender && p.gender !== gender && p.gender !== 'unisex') return false;
    if (p.rentalPrice3Day > maxBudget * 1.25) return false;
    return true;
  });

  const selectedOutfit = matchingOutfits.find(p =>
    p.occasionTags.some(t => t.toLowerCase() === occasion.toLowerCase())
  ) || matchingOutfits[0] || products[0];

  // Find a second recommendation for variety
  const secondOutfit = matchingOutfits.find(p =>
    p.id !== selectedOutfit.id && p.occasionTags.some(t => t.toLowerCase() === occasion.toLowerCase())
  );

  const recommendedIds = [selectedOutfit.id];
  if (secondOutfit) recommendedIds.push(secondOutfit.id);

  const nextReplies = [
    "Show in a different color",
    "Show budget-friendly options",
    "Show matching accessories",
    `More ${selectedOutfit.category} options`,
    "Add complete look to cart"
  ];

  const paletteMap: Record<string, string[]> = {
    Red: ["#DC143C", "#D4AF37", "#FFFFF0"],
    Maroon: ["#800020", "#D4AF37", "#F5F5DC"],
    Pink: ["#FF69B4", "#D4AF37", "#FFFFFF"],
    Gold: ["#D4AF37", "#800020", "#FFFFF0"],
    Navy: ["#000080", "#C0C0C0", "#F0F8FF"],
    Emerald: ["#50C878", "#D4AF37", "#FFFFF0"],
    Purple: ["#800080", "#D4AF37", "#F8F8FF"],
    Black: ["#1A1A1A", "#D4AF37", "#C0C0C0"],
    Ivory: ["#FFFFF0", "#D4AF37", "#800020"],
    Peach: ["#FFDAB9", "#D4AF37", "#FFFFFF"],
    Yellow: ["#FFD700", "#FF69B4", "#FFFFF0"],
  };

  const palette = paletteMap[selectedOutfit.color] || ["#800020", "#D4AF37", "#FFFFF0"];
  const score = Math.floor(Math.random() * 5) + 95;

  // Gender-specific styling details
  const isWomen = gender === 'women' || (!gender && ['Lehenga', 'Saree', 'Gown', 'Anarkali', 'Indo-Western'].includes(selectedOutfit.category));

  const footwearTip = isWomen
    ? 'Pair with embellished block heels or rose gold juttis for a blend of comfort and elegance'
    : 'Complete with tan leather mojaris or polished black Oxfords depending on formality';

  const groomingTip = isWomen
    ? `- **Hairstyle:** A soft textured low bun with loose face-framing tendrils, or Hollywood waves for a contemporary touch\n- **Makeup:** Dewy base with warm bronzer, soft smokey eyes in champagne and brown tones, and a classic nude or berry lip\n- **Perfume:** Opt for warm floral notes (jasmine, rose, sandalwood) for evening; fresh citrus for daytime`
    : `- **Hairstyle:** A clean side-parted look with matte-finish styling clay for a polished appearance\n- **Beard:** Trim and shape for a clean jawline; apply beard oil for a refined, groomed look\n- **Perfume:** Warm oriental notes (oud, sandalwood, vetiver) for evening events; fresh aquatic tones for daytime`;

  const jewelryTip = isWomen
    ? `Statement **kundan chandbalis** or **pearl drop earrings** with a complementary **choker necklace** in antique gold`
    : `A slim **rose gold or silver bracelet watch** and a **crystal lapel brooch** or **pocket square** in a complementary tone`;

  return `### 🎯 Style Analysis
For a ${occasion} celebration, your outfit should radiate ${occasion === 'Wedding' || occasion === 'Reception' ? 'regal grandeur and timeless elegance' : occasion === 'Sangeet' ? 'vibrant energy and dance-ready comfort' : occasion === 'Corporate Event' ? 'sophisticated professionalism with understated luxury' : occasion === 'Date Night' ? 'effortless charm and contemporary style' : 'festive charm and cultural richness'}. The ${selectedOutfit.fabric.toLowerCase()} fabric is an excellent choice for this occasion — it ${selectedOutfit.fabric === 'Velvet' ? 'adds depth and royal texture under ambient lighting' : selectedOutfit.fabric === 'Silk' || selectedOutfit.fabric === 'Raw Silk' ? 'has a natural sheen that photographs beautifully and drapes with graceful weight' : selectedOutfit.fabric === 'Georgette' || selectedOutfit.fabric === 'Chiffon' ? 'flows effortlessly, keeping you comfortable through long ceremonies' : selectedOutfit.fabric === 'Organza' ? 'creates a dreamy, ethereal silhouette with structured volume' : 'offers the perfect balance of luxury and wearability'}.

### 🌟 Stylist Recommendation
I would recommend the **${selectedOutfit.title}** by **${selectedOutfit.designerName}** — an exquisite **${selectedOutfit.fabric}** ensemble featuring delicate **${selectedOutfit.workType}** in a stunning **${selectedOutfit.color}** tone. ${selectedOutfit.description}
${secondOutfit ? `\nAs an alternative, consider the **${secondOutfit.title}** (₹${secondOutfit.rentalPrice3Day.toLocaleString('en-IN')}/3 days) for a different aesthetic within the same occasion.` : ''}

### ✨ Why This Look Works
The **${selectedOutfit.color}** tone ${selectedOutfit.color === 'Red' || selectedOutfit.color === 'Maroon' ? 'symbolizes auspiciousness and bridal grandeur in Indian tradition' : selectedOutfit.color === 'Gold' ? 'represents prosperity and celebration — universally flattering under warm event lighting' : selectedOutfit.color === 'Navy' || selectedOutfit.color === 'Black' ? 'creates a commanding, sophisticated presence ideal for formal occasions' : selectedOutfit.color === 'Pink' || selectedOutfit.color === 'Peach' ? 'creates a soft, romantic aura — particularly stunning for engagement and sangeet ceremonies' : 'creates an elegant presence suited perfectly to the occasion'}. The **${selectedOutfit.workType}** detailing adds dimension without overwhelming the silhouette, while the **${selectedOutfit.fabric.toLowerCase()}** ensures you remain comfortable throughout the celebration.

### 💎 Complete Styling Guide
- **Footwear:** ${footwearTip}
- **Jewelry:** ${jewelryTip}
- **Bag:** ${isWomen ? 'An embroidered **silk potli bag** or **gold box clutch** for evening elegance' : 'A slim **leather card wallet** — avoid bulky items in formal settings'}
- **Watch:** ${isWomen ? 'A delicate **rose gold bracelet watch** adds understated luxury' : 'A classic **silver or rose gold dress watch** — keep it minimal and refined'}

### 💄 Grooming Tips
${groomingTip}

### 🎓 Fashion Stylist Pro Tips
- Never pair more than three dominant colors — keep your palette harmonious
- ${isWomen ? 'When wearing heavy jewelry, keep outfit embellishment minimal — and vice versa' : 'Match your belt color with your footwear for a polished, intentional look'}
- Light colors work best during daytime celebrations; reserve deep jewel tones for evening events
- Always steam or iron your outfit the night before — wrinkled fabric ruins even the finest ensemble

### 👗 RentTheVastra Picks
**${selectedOutfit.title}** — **₹${selectedOutfit.rentalPrice3Day.toLocaleString('en-IN')}** for 3 days *(Retail: ₹${selectedOutfit.retailPrice.toLocaleString('en-IN')} — Save ${Math.round((1 - selectedOutfit.rentalPrice3Day / selectedOutfit.retailPrice) * 100)}%)*

Every RentTheVastra rental includes **2 complimentary accessories** hand-matched to your outfit — absolutely free!

<!-- PRODUCTS: ${JSON.stringify(recommendedIds)} -->
<!-- REPLIES: ${JSON.stringify(nextReplies)} -->
<!-- SCORE: ${score} -->
<!-- PALETTE: ${JSON.stringify(palette)} -->`;
}
