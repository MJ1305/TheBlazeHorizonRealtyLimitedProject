import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    title: "Acceptance of Terms",
    items: [
      {
        subtitle: "Agreement to Terms",
        text: "By accessing or using the Blaze Horizon Realty Limited website and services, you agree to be bound by these Legal Terms. If you do not agree to these terms, please discontinue use of our website immediately.",
      },
      {
        subtitle: "Eligibility",
        text: "You must be at least 18 years of age to use our services. By using this website, you represent that you meet this requirement.",
      },
    ],
  },
  {
    title: "Use of Website",
    items: [
      {
        subtitle: "Permitted Use",
        text: "You may use this website for lawful purposes only — to browse property listings, make enquiries, and engage with our services in good faith.",
      },
      {
        subtitle: "Prohibited Activities",
        text: "You must not misuse our website by introducing malicious software, attempting unauthorised access, scraping content without permission, or engaging in any activity that disrupts or damages the site or its users.",
      },
      {
        subtitle: "Account Responsibility",
        text: "If you are granted admin or user access to any part of our platform, you are responsible for maintaining the confidentiality of your credentials and all activity under your account.",
      },
    ],
  },
  {
    title: "Property Listings & Information",
    items: [
      {
        subtitle: "Accuracy of Listings",
        text: "We strive to ensure all property information on our website is accurate and up to date. However, listing details including price, availability, size, and features are subject to change without notice and should be independently verified.",
      },
      {
        subtitle: "No Binding Offer",
        text: "Property listings on this website do not constitute a binding offer or contract. All transactions are subject to separate, formal agreements between the parties involved.",
      },
      {
        subtitle: "Images & Media",
        text: "Property images, virtual tours, and other media are for illustrative purposes only and may not reflect the exact current condition of the property.",
      },
    ],
  },
  {
    title: "Intellectual Property",
    items: [
      {
        subtitle: "Ownership",
        text: "All content on this website — including text, images, logos, graphics, and code — is the intellectual property of Blaze Horizon Realty Limited or its licensors, unless otherwise stated.",
      },
      {
        subtitle: "Restrictions",
        text: "You may not reproduce, distribute, modify, or use any content from this website for commercial purposes without our prior written consent.",
      },
    ],
  },
  {
    title: "Limitation of Liability",
    items: [
      {
        subtitle: "No Warranties",
        text: "Our website and services are provided on an 'as is' basis. We make no warranties, express or implied, regarding the accuracy, reliability, or availability of the website.",
      },
      {
        subtitle: "Limitation of Damages",
        text: "To the fullest extent permitted by law, Blaze Horizon Realty Limited shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of our website or services.",
      },
      {
        subtitle: "Third-Party Links",
        text: "Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of those sites.",
      },
    ],
  },
  {
    title: "Fees & Transactions",
    items: [
      {
        subtitle: "Agency Fees",
        text: "Any fees associated with property transactions, agency commissions, or professional services will be clearly communicated prior to engagement and governed by a separate service agreement.",
      },
      {
        subtitle: "No Refund Policy",
        text: "Submitting an enquiry or booking a tour does not create a financial obligation. Binding commitments only arise from signed agreements.",
      },
    ],
  },
  {
    title: "Governing Law",
    items: [
      {
        subtitle: "Jurisdiction",
        text: "These terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising shall be subject to the exclusive jurisdiction of the courts of Nigeria.",
      },
    ],
  },
  {
    title: "Changes to These Terms",
    items: [
      {
        subtitle: "Right to Modify",
        text: "We reserve the right to update or modify these Legal Terms at any time. Updated terms will be posted on this page with a revised effective date. Continued use of our website after any changes constitutes your acceptance of the new terms.",
      },
    ],
  },
  {
    title: "Contact Us",
    items: [
      {
        subtitle: "Legal Enquiries",
        text: "If you have questions about these Legal Terms, please contact us at legal@blazehorizonrealty.com or through the contact form on our website. We aim to respond within 3 business days.",
      },
    ],
  },
];

export default function LegalTermsPage() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="min-h-screen bg-[#f4f6f4] font-sans">

      {/* Hero */}
      <div className="bg-[#1B3A2D] px-6 pt-20 pb-16 sm:px-8  mt-[4rem]">
        <div className="max-w-3xl mx-auto">
          {/* <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[#F5A623] text-xs font-semibold tracking-[0.1em] uppercase mb-7 hover:opacity-70 transition-opacity bg-transparent border-none cursor-pointer p-0"
          >
            ← Back
          </button> */}
          <p className="text-[#F5A623] text-[10px] tracking-[0.25em] uppercase mb-2.5">Legal</p>
          <h1 className="text-white text-4xl sm:text-5xl font-bold leading-tight mb-3">
            Terms &amp; Conditions
          </h1>
          <div className="h-0.5 w-20 bg-gradient-to-r from-[#F5A623] via-[#e09b30] to-transparent mb-5" />
          <p className="text-white/45 text-sm">
            Effective date: January 1, 2024 · Blaze Horizon Realty Limited
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-20">

        {/* Intro */}
        <div className="bg-white rounded-xl border-l-4 border-[#1B3A2D] shadow-sm px-6 py-5 mb-7">
          <p className="text-[#333] text-sm leading-[1.85] m-0">
            These Terms &amp; Conditions govern your use of the <strong>Blaze Horizon Realty Limited</strong> website
            and services. Please read them carefully. By continuing to use our website, you acknowledge that
            you have read, understood, and agree to be bound by these terms.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-2">
          {sections.map((section, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">

                {/* Trigger */}
                <button
                  onClick={() => toggle(i)}
                  className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-colors duration-150 border-none cursor-pointer
                    ${isOpen ? "bg-[#1B3A2D]" : "bg-white hover:bg-[#f0f5f2]"}`}
                >
                  <span className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 transition-colors duration-150
                    ${isOpen ? "bg-[#F5A623] text-[#1B3A2D]" : "bg-[#e6ede9] text-[#1B3A2D]"}`}>
                    {i + 1}
                  </span>
                  <span className={`flex-1 text-sm font-semibold transition-colors duration-150
                    ${isOpen ? "text-white" : "text-[#1B3A2D]"}`}>
                    {section.title}
                  </span>
                  <svg
                    className={`w-4 h-4 shrink-0 transition-all duration-200
                      ${isOpen ? "rotate-180 text-[#F5A623]" : "text-gray-400"}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Panel */}
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[1400px]" : "max-h-0"}`}>
                  <div className="px-5 sm:px-6 pt-1 pb-5 flex flex-col gap-4">
                    <div className="h-px bg-[#edf0ed]" />
                    {section.items.map((item, j) => (
                      <div key={j}>
                        <p className="text-[#F5A623] text-[10px] font-bold tracking-[0.15em] uppercase mb-1">
                          {item.subtitle}
                        </p>
                        <p className="text-[#555] text-[13.5px] leading-[1.8] m-0">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        <p className="text-center text-[#bbb] text-[11px] tracking-[0.04em] mt-10">
          © {new Date().getFullYear()} Blaze Horizon Realty Limited. All rights reserved.
        </p>
      </div>
    </div>
  );
}