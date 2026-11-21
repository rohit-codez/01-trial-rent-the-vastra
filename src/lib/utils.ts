export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPriceRange(min: number, max: number): string {
  return `${formatPrice(min)} - ${formatPrice(max)}`;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function calculateRentalTotal(
  rentalPrice: number,
  accessoriesTotal: number = 0,
  duration: 3 | 5 | 7,
  baseDeposit: number
) {
  const durationMultiplier = duration === 3 ? 1 : duration === 5 ? 1.3 : 1.6;
  const rental = (rentalPrice + accessoriesTotal) * durationMultiplier;
  
  return {
    rental: Math.round(rental),
    deposit: baseDeposit,
    total: Math.round(rental + baseDeposit)
  };
}

export function getDiscountPercentage(retailPrice: number, rentalPrice: number): number {
  if (!retailPrice || retailPrice <= 0) return 0;
  return Math.round(((retailPrice - rentalPrice) / retailPrice) * 100);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function getInitials(name: string): string {
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function generateBookingReference(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `RTV-${year}-${random}`;
}
