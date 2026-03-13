export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-gradient-to-r from-[#f4fbf9] to-[#fff7ef] py-14">
      <div className="mx-auto max-w-7xl px-4">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#3AB7A5]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">{title}</h1>
        {description ? <p className="mt-4 max-w-2xl text-lg text-gray-600">{description}</p> : null}
      </div>
    </section>
  );
}
