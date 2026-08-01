export function PageHero({ title, description }: { title: string; description?: string }) {
  return (
    <div className="relative bg-deep-green py-24 border-b-[6px] border-primary-yellow overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-primary-yellow/30 skew-x-12 transform origin-top-right"></div>
        <div className="absolute bottom-0 left-10 w-1/3 h-1/2 bg-dark-green/40 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-yellow-100 max-w-2xl mx-auto font-medium">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
