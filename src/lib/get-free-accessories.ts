import { FreeAccessory, freeAccessories } from '../data/free-accessories';
import { Product } from '../types';

export function getFreeAccessories(product: Product): FreeAccessory[] {
  const gender = product.gender;
  let matches: FreeAccessory[] = [];

  // Filter by gender or unisex
  const genderFiltered = freeAccessories.filter(a => a.matchGender === gender || a.matchGender === 'unisex');

  // Find exact category matches
  const categoryMatched = genderFiltered.filter(a => a.matchCategories.includes(product.category));
  
  // If we have enough category matches, use them
  if (categoryMatched.length >= 2) {
    matches = categoryMatched;
  } else {
    // Otherwise fallback to gender matches
    matches = [...categoryMatched, ...genderFiltered.filter(a => !categoryMatched.includes(a))];
  }

  // Shuffle deterministic based on product ID
  const hash = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const selected: FreeAccessory[] = [];
  const count = Math.min(2, matches.length);
  
  // Select 2 items pseudo-randomly but deterministically
  for (let i = 0; i < count; i++) {
    const idx = (hash + i * 17) % matches.length;
    selected.push(matches[idx]);
    matches.splice(idx, 1);
  }

  // Fallback to unisex if still less than 2
  if (selected.length < 2) {
    const unisex = freeAccessories.filter(a => a.matchGender === 'unisex' && !selected.includes(a));
    while (selected.length < 2 && unisex.length > 0) {
      selected.push(unisex.pop() as FreeAccessory);
    }
  }

  return selected;
}
