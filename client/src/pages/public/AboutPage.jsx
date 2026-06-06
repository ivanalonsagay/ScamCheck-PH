function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-16">
      <div className="card p-8 md:p-12">
        <h1 className="text-4xl font-extrabold text-slate-950">
          About ScamCheck PH
        </h1>

        <p className="mt-5 text-lg leading-8 text-slate-600">
          ScamCheck PH is a community-based online scam awareness and reporting
          system. It helps users report suspicious scam messages, fake online
          sellers, phishing links, fake banking alerts, and other online threats.
        </p>

        <p className="mt-4 text-lg leading-8 text-slate-600">
          The system allows admins to verify reports before they appear as public
          warnings. This helps make the platform more reliable, useful, and safer
          for the community.
        </p>
      </div>
    </section>
  );
}

export default AboutPage;