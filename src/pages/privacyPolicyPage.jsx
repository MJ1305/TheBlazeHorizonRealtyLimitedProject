import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    title: "Information We Collect",
    content: [
      {
        subtitle: "Personal Information",
        text: "When you enquire about a property, book a tour, or contact us, we may collect your name, email address, phone number, and any additional information you voluntarily provide.",
      },
      {
        subtitle: "Usage Data",
        text: "We automatically collect information about how you interact with our website, including pages visited, time spent, referring URLs, browser type, and device information.",
      },
      {
        subtitle: "Cookies",
        text: "We use cookies and similar tracking technologies to enhance your browsing experience, analyse site traffic, and personalise content. You may disable cookies in your browser settings, though some features may be affected.",
      },
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "Property Enquiries & Tours",
        text: "We use your contact details to respond to property enquiries, schedule viewings, and follow up on listings you have expressed interest in.",
      },
      {
        subtitle: "Communication",
        text: "With your consent, we may send you updates on new listings, market insights, and promotional content. You may opt out at any time by clicking the unsubscribe link in any email.",
      },
      {
        subtitle: "Service Improvement",
        text: "Aggregated, anonymised usage data helps us improve our website, listings, and overall user experience.",
      },
    ],
  },
  {
    title: "Sharing of Information",
    content: [
      {
        subtitle: "Third-Party Service Providers",
        text: "We may share your information with trusted service providers (e.g. hosting, analytics, email platforms) who assist in operating our business. They are contractually bound to keep your data confidential.",
      },
      {
        subtitle: "Legal Obligations",
        text: "We may disclose your information where required by law or in response to valid legal requests from public authorities.",
      },
      {
        subtitle: "No Sale of Data",
        text: "We do not sell, trade, or rent your personal information to third parties for their marketing purposes.",
      },
    ],
  },
  {
    title: "Data Retention",
    content: [
      {
        subtitle: "Retention Period",
        text: "We retain your personal data only for as long as necessary to fulfil the purposes outlined in this policy, or as required by applicable law. Enquiry data is typically retained for up to 24 months.",
      },
    ],
  },
  {
    title: "Your Rights",
    content: [
      {
        subtitle: "Access & Correction",
        text: "You have the right to request access to the personal data we hold about you, and to request corrections where information is inaccurate or incomplete.",
      },
      {
        subtitle: "Deletion",
        text: "You may request the deletion of your personal data, subject to any legal obligations we may have to retain it.",
      },
      {
        subtitle: "Withdrawing Consent",
        text: "Where processing is based on consent, you may withdraw that consent at any time without affecting the lawfulness of processing carried out before withdrawal.",
      },
    ],
  },
  {
    title: "Security",
    content: [
      {
        subtitle: "Data Protection Measures",
        text: "We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.",
      },
    ],
  },
  {
    title: "Changes to This Policy",
    content: [
      {
        subtitle: "Updates",
        text: "We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised effective date. Continued use of our website after any changes constitutes acceptance of the updated policy.",
      },
    ],
  },
  {
    title: "Contact Us",
    content: [
      {
        subtitle: "Questions or Concerns",
        text: "If you have any questions about this Privacy Policy or how we handle your data, please contact us at privacy@blazehorizonrealty.com or through the contact form on our website.",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#f9faf9] font-serif">

      {/* Hero */}
      <div className="bg-[#1B3A2D] px-6 pt-20 pb-16 sm:px-8 mt-[4rem]">
        <div className="max-w-3xl mx-auto">
          {/* <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[#F5A623] text-xs font-semibold tracking-[0.08em] uppercase mb-6 hover:opacity-70 transition-opacity bg-transparent border-none cursor-pointer p-0"
          >
            ← Back
          </button> */}
          <p className="text-[#F5A623] text-[11px] tracking-[0.2em] uppercase mb-3">Legal</p>
          <h1 className="text-white text-4xl sm:text-5xl font-bold leading-tight mb-4">
            Privacy Policy
          </h1>
          <div className="h-0.5 w-20 bg-gradient-to-r from-[#F5A623] via-[#e09b30] to-transparent mb-5" />
          <p className="text-white/55 text-sm">
            Effective date: January 1, 2024 · Blaze Horizon Realty Limited
          </p>
        </div>
      </div>

      {/* Intro card */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12">
        <div className="bg-white rounded-2xl border-l-4 border-[#F5A623] shadow-sm px-6 sm:px-8 py-6">
          <p className="text-[#1B3A2D] text-sm sm:text-base leading-[1.8] m-0">
            At <strong>Blaze Horizon Realty Limited</strong>, we are committed to protecting your privacy.
            This policy explains how we collect, use, and safeguard your personal information when you
            use our website or engage with our services. Please read it carefully.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-20 flex flex-col gap-5">
        {sections.map((section, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">

            {/* Section header */}
            <div className="bg-[#1B3A2D] px-5 sm:px-7 py-4 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#F5A623] text-[#1B3A2D] text-[11px] font-bold flex items-center justify-center shrink-0 font-sans">
                {i + 1}
              </span>
              <h2 className="text-white text-sm sm:text-base font-semibold m-0 font-sans">
                {section.title}
              </h2>
            </div>

            {/* Section content */}
            <div className="px-5 sm:px-7 py-6 flex flex-col gap-5">
              {section.content.map((item, j) => (
                <div key={j}>
                  <p className="text-[#F5A623] text-[10px] font-bold tracking-[0.12em] uppercase mb-1.5 font-sans">
                    {item.subtitle}
                  </p>
                  <p className="text-[#444] text-sm sm:text-[14.5px] leading-[1.8] m-0">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <p className="text-center text-[#aaa] text-xs font-sans tracking-[0.04em] mt-6">
          © {new Date().getFullYear()} Blaze Horizon Realty Limited. All rights reserved.
        </p>
      </div>
    </div>
  );
}