export function SectionHeader({ title, subtitle, centered = false }: { title: string; subtitle?: string; centered?: boolean }) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-deep-green mb-4 relative inline-block">
        {title}
        <div className={`h-1 bg-corporate-green w-1/3 mt-2 ${centered ? "mx-auto" : ""}`}></div>
      </h2>
      {subtitle && <p className="text-muted-gray max-w-2xl text-lg mt-4">{centered && <span className="mx-auto block text-center" />}{subtitle}</p>}
    </div>
  );
}
