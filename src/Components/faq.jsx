import { useState } from "react";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const faqs = [
    { q: "How do I book?", a: "You can contact us directly." },
    { q: "Do you offer inspections?", a: "Yes, we do scheduled tours." },
  ];

  return (
    <section className="py-24 bg-gray-100 px-6">
      <div className="max-w-3xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        {faqs.map((item, i) => (
          <div key={i} className="mb-4 border rounded-lg p-4 bg-white">
            <button
              className="w-full text-left font-semibold"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {item.q}
            </button>

            {open === i && (
              <p className="mt-2 text-gray-600">{item.a}</p>
            )}
          </div>
        ))}

      </div>
    </section>
  );
}