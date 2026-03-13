import Link from "next/link";

const items = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/brands", label: "Brands" },
  { href: "/admin/hero-slides", label: "Hero slides" },
  { href: "/admin/homepage-sections", label: "Homepage sections" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/coupons", label: "Coupons" },
  { href: "/admin/marketing", label: "Marketing" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminSidebar() {
  return (
    <aside className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <div className="text-sm font-semibold uppercase tracking-[0.3em] text-[#3AB7A5]">
        GLAM Admin
      </div>
      <nav className="mt-6 grid gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-[#3AB7A5]/10 hover:text-[#3AB7A5]"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
