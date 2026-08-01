import { PageHero } from "@/components/shared/PageHero";

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms & Conditions" />
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none text-muted-gray">
            <h2 className="text-2xl font-bold text-dark-navy mb-4">1. Terms of Service</h2>
            <p className="mb-6">By accessing the MGC Associates website, you agree to be bound by these Terms & Conditions.</p>
            {/* Minimal placeholder content */}
          </div>
        </div>
      </section>
    </>
  );
}
