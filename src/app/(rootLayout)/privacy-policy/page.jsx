import React from 'react';

const PrivacyPolicy = () => {
  const sections = [
    {
      id: 1,
      title: "1. What AI Data Does Crazy Stream Collect?",
      content: "At Crazy Stream, our AI movie recommendation engine collects data points including watch duration, genre affinity, and interaction patterns. This information is processed locally where possible to ensure your cinematic profile is used solely to enhance your streaming discovery experience without being shared with third-party advertisers."
    },
    {
      id: 2,
      title: "2. Algorithmic Processing & Machine Learning",
      content: "We utilize advanced neural networks to suggest content. By interacting with our 'Crazy Stream' interface, you consent to the processing of your watch history by our proprietary ML models. This data is anonymized and used to refine the global recommendation accuracy for all users while keeping your specific identity encrypted."
    },
    {
      id: 3,
      title: "3. Neural Network Accuracy & User Feedback",
      content: "To maintain the 'Crazy' in Crazy Stream, we allow users to reset their recommendation vectors at any time. If our AI suggests a thriller when you're in the mood for a comedy, your 'Not Interested' feedback is processed in real-time to adjust our predictive output for your specific account session."
    },
    {
      id: 4,
      title: "4. Secure Global Data Transfer",
      content: "Crazy Stream operates on a decentralized cloud architecture. Your data may be processed in various global regions to ensure the lowest possible latency for AI-driven features. We adhere to strict international data protection standards (GDPR/CCPA) regardless of where our streaming nodes are located."
    },
    {
      id: 5,
      title: "5. Automated Content Moderation",
      content: "Our platform uses AI vision to ensure content safety. This automated system scans metadata and community reports to prevent the distribution of prohibited content. By using Crazy Stream, you acknowledge that automated systems assist our human moderators in keeping the platform safe for all movie enthusiasts."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-8 lg:px-24 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Privacy Policy & AI Terms
          </h1>
          <p className="text-zinc-500 text-lg">
            Last updated: February 2026 • Discover how Crazy Stream protects your digital cinema experience.
          </p>
        </header>

        {/* Dynamic Content Sections */}
        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.id} className="group">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-zinc-100 group-hover:text-red-600 transition-colors duration-300">
                {section.title}
              </h2>
              <p className="text-zinc-400 leading-relaxed text-base md:text-lg text-justify font-light">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        {/* Footer Note */}
        <footer className="mt-20 pt-8 border-t border-zinc-800 text-zinc-600 text-sm">
          <p>© 2026 Crazy Stream AI. All rights reserved. Your privacy is our priority.</p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;