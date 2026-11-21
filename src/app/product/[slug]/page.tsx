import { Metadata } from 'next';
import { products } from '@/data/products';
import { notFound } from 'next/navigation';
import ProductClient from '../ProductClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find(p => p.slug === slug);
  
  if (!product) {
    return {
      title: 'Product Not Found | RentTheVastra',
    };
  }

  return {
    title: `${product.title} by ${product.designerName} | Rent Designer Wear | RentTheVastra`,
    description: `Rent the ${product.title} for your next occasion. Starting at ₹${product.rentalPrice3Day} for 3 days. Free delivery in Delhi NCR.`,
    openGraph: {
      title: `${product.title} | RentTheVastra`,
      description: product.description,
      images: [product.images[0]],
    }
  };
}

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find(p => p.slug === slug);
  
  if (!product) {
    notFound();
  }

  return (
    <ProductClient 
      product={product!} 
    />
  );
}
