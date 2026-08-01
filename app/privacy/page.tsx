import { PageHero } from "@/components/shared/PageHero";

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" />
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none text-muted-gray">
            <h2 className="text-2xl font-bold text-dark-navy mb-4">1. Information Collection</h2>
            <p className="mb-6">At MGC Associates Pvt. Ltd., we collect and manage user data according to strict corporate guidelines.</p>
            {/* Minimal placeholder content */}
          </div>
        </div>
      </section>
    </>
  );
}
