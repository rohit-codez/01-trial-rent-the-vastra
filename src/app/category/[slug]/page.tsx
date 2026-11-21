import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryRedirectPage({ params }: Props) {
  const { slug } = await params;
  if (['women', 'men', 'kids'].includes(slug.toLowerCase())) {
    redirect(`/browse?gender=${slug.toLowerCase()}`);
  }
  redirect(`/browse?category=${encodeURIComponent(slug)}`);
}
