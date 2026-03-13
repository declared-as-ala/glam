import Image from "next/image";
import Link from "next/link";

export function BlogCards({
  posts,
}: {
  posts: Array<{
    slug: string;
    category: string;
    title: string;
    excerpt: string;
    image: string;
  }>;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="relative h-52">
            <Image src={post.image} alt={post.title} fill className="object-cover" sizes="33vw" />
          </div>
          <div className="p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3AB7A5]">
              {post.category}
            </div>
            <h3 className="mt-2 text-lg font-semibold text-gray-900">{post.title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">{post.excerpt}</p>
            <span className="mt-4 inline-flex text-sm font-semibold text-[#3AB7A5]">
              Lire la suite
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
