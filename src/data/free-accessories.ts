export interface FreeAccessory {
  id: string;
  name: string;
  image: string;
  type: string;
  matchGender: 'women' | 'men' | 'kids' | 'unisex';
  matchCategories: string[];
}

export const freeAccessories: FreeAccessory[] = [
  // Women
  { id: 'fa-w-01', name: 'Kundan Earrings', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a', type: 'earrings', matchGender: 'women', matchCategories: ['Lehenga', 'Saree', 'Anarkali'] },
  { id: 'fa-w-02', name: 'Pearl Bangles Set', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a', type: 'bangles', matchGender: 'women', matchCategories: ['Lehenga', 'Saree'] },
  { id: 'fa-w-03', name: 'Maang Tikka', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a', type: 'mang-tikka', matchGender: 'women', matchCategories: ['Lehenga', 'Saree'] },
  { id: 'fa-w-04', name: 'Silver Anklet', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a', type: 'anklet', matchGender: 'women', matchCategories: ['Lehenga', 'Anarkali'] },
  { id: 'fa-w-05', name: 'Statement Ring', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a', type: 'ring', matchGender: 'women', matchCategories: ['Lehenga', 'Gown', 'Saree'] },
  { id: 'fa-w-06', name: 'Embellished Hair Clips', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a', type: 'hair-clip', matchGender: 'women', matchCategories: ['Gown', 'Anarkali'] },
  { id: 'fa-w-07', name: 'Gold Nose Pin', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a', type: 'nose-pin', matchGender: 'women', matchCategories: ['Saree', 'Lehenga'] },
  { id: 'fa-w-08', name: 'Silk Potli Bag', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a', type: 'bag', matchGender: 'women', matchCategories: ['Lehenga', 'Saree', 'Anarkali'] },
  { id: 'fa-w-09', name: 'Designer Bindis Set', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a', type: 'bindi', matchGender: 'women', matchCategories: ['Saree', 'Lehenga'] },
  { id: 'fa-w-10', name: 'Oxidized Silver Jhumkas', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a', type: 'earrings', matchGender: 'women', matchCategories: ['Saree', 'Kurti'] },
  
  // Men
  { id: 'fa-m-01', name: 'Golden Lapel Pin', image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6', type: 'brooch', matchGender: 'men', matchCategories: ['Suit', 'Tuxedo', 'Sherwani'] },
  { id: 'fa-m-02', name: 'Silk Pocket Square', image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6', type: 'pocket-square', matchGender: 'men', matchCategories: ['Suit', 'Tuxedo', 'Blazer'] },
  { id: 'fa-m-03', name: 'Silver Cufflinks Set', image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6', type: 'cufflinks', matchGender: 'men', matchCategories: ['Suit', 'Tuxedo'] },
  { id: 'fa-m-04', name: 'Classic Leather Watch', image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6', type: 'watch', matchGender: 'men', matchCategories: ['Suit', 'Sherwani', 'Kurta'] },
  { id: 'fa-m-05', name: 'Metallic Tie Pin', image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6', type: 'tie-pin', matchGender: 'men', matchCategories: ['Suit', 'Tuxedo'] },
  { id: 'fa-m-06', name: 'Royal Safa Brooch', image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6', type: 'brooch', matchGender: 'men', matchCategories: ['Sherwani'] },
  { id: 'fa-m-07', name: 'Velvet Bow Tie', image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6', type: 'bow-tie', matchGender: 'men', matchCategories: ['Tuxedo', 'Suit'] },
  { id: 'fa-m-08', name: 'Traditional Mala', image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6', type: 'mala', matchGender: 'men', matchCategories: ['Sherwani'] },
  
  // Kids
  { id: 'fa-k-01', name: 'Satin Hair Bow', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338', type: 'hair-clip', matchGender: 'kids', matchCategories: ['Dress', 'Lehenga'] },
  { id: 'fa-k-02', name: 'Tiny Charm Bracelet', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338', type: 'bracelet', matchGender: 'kids', matchCategories: ['Dress', 'Kurta'] },
  { id: 'fa-k-03', name: 'Star Shaped Pin', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338', type: 'brooch', matchGender: 'kids', matchCategories: ['Suit', 'Sherwani'] },
  { id: 'fa-k-04', name: 'Mini Crown Headband', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338', type: 'hairband', matchGender: 'kids', matchCategories: ['Dress'] },
  { id: 'fa-k-05', name: 'Floral Hairband', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338', type: 'hairband', matchGender: 'kids', matchCategories: ['Dress', 'Lehenga'] },
  { id: 'fa-k-06', name: 'Anklet Bells', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338', type: 'anklet', matchGender: 'kids', matchCategories: ['Lehenga'] },
  
  // Unisex
  { id: 'fa-u-01', name: 'Monogrammed Handkerchief', image: 'https://images.unsplash.com/photo-1629814696208-cb5f86641ab3', type: 'handkerchief', matchGender: 'unisex', matchCategories: [] },
  { id: 'fa-u-02', name: 'Aviator Sunglasses', image: 'https://images.unsplash.com/photo-1629814696208-cb5f86641ab3', type: 'sunglasses', matchGender: 'unisex', matchCategories: [] }
];
