import Image from "next/image";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/storefront/page-hero";
import { StoreContainer } from "@/components/storefront/store-container";
import { getBlogPostBySlug } from "@/lib/queries";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <PageHero title={post.title} description={post.excerpt} eyebrow={post.category} />
      <StoreContainer className="py-12">
        <div className="relative mb-10 h-[420px] overflow-hidden rounded-[2rem]">
          <Image src={post.image} alt={post.title} fill className="object-cover" sizes="100vw" />
        </div>
        <article className="rounded-[2rem] bg-white p-10 leading-8 text-gray-600 shadow-sm ring-1 ring-gray-100">
          {post.content}
        </article>
      </StoreContainer>
    </>
  );
}
