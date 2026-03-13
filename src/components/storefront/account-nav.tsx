import Link from "next/link";

const items = [
  { href: "/account", label: "Mon compte" },
  { href: "/account/orders", label: "Mes commandes" },
  { href: "/wishlist", label: "Wishlist" },
];

export function AccountNav() {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <h2 className="text-lg font-semibold text-gray-900">Espace client</h2>
      <div className="mt-4 grid gap-3 text-sm">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700 transition hover:bg-[#3AB7A5]/10 hover:text-[#3AB7A5]">
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
