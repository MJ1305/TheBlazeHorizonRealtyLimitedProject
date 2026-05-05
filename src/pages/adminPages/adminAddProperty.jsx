import { useState, useEffect, useRef } from "react";
import AdminLayout from "../adminPages/adminsidebar";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const SectionCard = ({ icon, title, subtitle, children }) => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
    <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-100" style={{ backgroundColor: "#f9faf9" }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#1B3A2D" }}>
        <span style={{ color: "#F5A623" }}>{icon}</span>
      </div>
      <div>
        <h2 className="font-semibold text-sm" style={{ color: "#1B3A2D" }}>{title}</h2>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
    </div>
    <div className="p-6 space-y-5">{children}</div>
  </div>
);

const FieldGroup = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
);

const Field = ({ label, children }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#1B3A2D" }}>{label}</label>
    {children}
  </div>
);

const styledInput = "w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-800 bg-gray-50";
const styledSelect = "w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm h-11 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-800";

const emptyForm = {
  title: "", slug: "", description: "", location: "", full_address: "",
  state: "", country: "Nigeria", property_type: "apartment", type: "sale",
  status: "available", bedrooms: "", bathrooms: "", area_sqft: "",
  year_built: "", parking: "", amenities: "", price: "", show_price: false,
  cover_image: "", images: [],
};

export default function AddPropertyPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [form, setForm] = useState(emptyForm);

  // Always tracks latest form value — prevents stale closure in interval
  const formRef = useRef(form);
  useEffect(() => {
    formRef.current = form;
  }, [form]);

  useEffect(() => {
    const loadDraft = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const { data } = await supabase
          .from("property_drafts")
          .select("draft_data")
          .eq("admin_id", user.id)
          .single();

        // Only restore if draft has real content
        if (data?.draft_data && data.draft_data.title?.trim()) {
          setForm(data.draft_data);
        }
      } catch (err) {
        console.log("No draft found:", err);
      }
    };

    loadDraft();

    // Auto-save every 30 seconds using ref so form is never stale
    const interval = setInterval(async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!formRef.current.title?.trim()) return; // don't save empty drafts
        await supabase.from("property_drafts").upsert({
          admin_id: user.id,
          draft_data: formRef.current,
          last_saved_at: new Date().toISOString(),
        }, { onConflict: "admin_id" });
        setDraftSaved(true);
        setTimeout(() => setDraftSaved(false), 3000);
      } catch (err) {
        console.log("Draft save failed:", err);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "number" && value !== "" && parseInt(value) < 1) return;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    setForm((prev) => ({ ...prev, title, slug }));
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: data });
    const json = await res.json();
    return json.secure_url;
  };

  const handleImageUpload = async (e, isCover = false) => {
    const files = Array.from(e.target.files);
    if (!isCover) {
      const remaining = 4 - form.images.length;
      if (remaining <= 0) { alert("Maximum of 4 gallery images allowed."); return; }
      if (files.length > remaining) {
        alert(`You can only add ${remaining} more image(s). Only the first ${remaining} will be uploaded.`);
        files.splice(remaining);
      }
    }
    setUploadingImages(true);
    try {
      const urls = await Promise.all(files.map(uploadToCloudinary));
      if (isCover) setForm((prev) => ({ ...prev, cover_image: urls[0] }));
      else setForm((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
    } catch { alert("Image upload failed. Please try again."); }
    setUploadingImages(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const payload = {
        ...form,
        amenities: form.amenities.split(",").map((a) => a.trim()).filter(Boolean),
        bedrooms: parseInt(form.bedrooms),
        bathrooms: parseInt(form.bathrooms),
        price: form.price ? parseFloat(form.price) : null,
        created_by: user.id,
        updated_by: user.id,
      };
      const { error } = await supabase.from("properties").insert([payload]);
      if (error) { alert("Error saving property: " + error.message); setLoading(false); return; }
      await supabase.from("property_drafts").delete().eq("admin_id", user.id);
      navigate("/admin/properties");
    } catch (err) {
      alert("Something went wrong.");
    }
    setLoading(false);
  };

  const statusOptions = ["available", "sold", "rented", "off-market"];
  const typeOptions = [["apartment","Apartment"],["house","House"],["land","Land"],["commercial","Commercial"]];

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <button onClick={() => navigate("/admin/properties")} className="text-gray-400 hover:text-gray-600 text-sm flex items-center gap-1 mb-1">
              ← Properties
            </button>
            <h1 className="text-2xl font-bold" style={{ color: "#1B3A2D" }}>Add New Property</h1>
            <p className="text-gray-400 text-sm mt-0.5">Fill in the details to create a new listing</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            {draftSaved && (
              <span className="text-xs text-gray-400 flex items-center gap-1 mr-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1B3A2D" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Draft saved
              </span>
            )}
            {["Basic Info", "Location", "Details", "Pricing", "Images"].map((s, i) => (
              <div key={s} className="flex items-center gap-1">
                <div className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: "#1B3A2D", color: "#F5A623" }}>
                  {i + 1}. {s}
                </div>
                {i < 4 && <span className="text-gray-300 text-xs">›</span>}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <SectionCard
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>}
            title="Basic Information"
            subtitle="Name, description and listing type"
          >
            <FieldGroup>
              <Field label="Property Title">
                <Input className={styledInput} name="title" value={form.title} onChange={handleTitleChange} placeholder="e.g. The Monarch Suite" required />
              </Field>
              <Field label="Slug (auto-generated)">
                <Input className={styledInput} name="slug" value={form.slug} onChange={handleChange} placeholder="the-monarch-suite" required />
              </Field>
            </FieldGroup>
            <Field label="Description">
              <textarea
                name="description" value={form.description} onChange={handleChange} rows={4} required
                placeholder="Describe the property in detail..."
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-800 resize-none"
              />
            </Field>
            <FieldGroup>
              <Field label="Property Type">
                <select name="property_type" value={form.property_type} onChange={handleChange} className={styledSelect}>
                  {typeOptions.map(([val, label]) => <option key={val} value={val}>{label}</option>)}
                </select>
              </Field>
              <Field label="Listing Type">
                <select name="type" value={form.type} onChange={handleChange} className={styledSelect}>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </Field>
            </FieldGroup>
          </SectionCard>

          <SectionCard
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>}
            title="Location"
            subtitle="Where is this property located?"
          >
            <FieldGroup>
              <Field label="Area / Neighbourhood">
                <Input className={styledInput} name="location" value={form.location} onChange={handleChange} placeholder="e.g. Banana Island, Lagos" required />
              </Field>
              <Field label="Full Address">
                <Input className={styledInput} name="full_address" value={form.full_address} onChange={handleChange} placeholder="e.g. 123 Banana Island Way" required />
              </Field>
              <Field label="State">
                <Input className={styledInput} name="state" value={form.state} onChange={handleChange} placeholder="e.g. Lagos" required />
              </Field>
              <Field label="Country">
                <Input className={styledInput} name="country" value={form.country} onChange={handleChange} placeholder="Nigeria" required />
              </Field>
            </FieldGroup>
          </SectionCard>

          <SectionCard
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
            title="Property Details"
            subtitle="Rooms, size and amenities"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Bedrooms", name: "bedrooms", placeholder: "4", type: "number" },
                { label: "Bathrooms", name: "bathrooms", placeholder: "3", type: "number" },
                { label: "Area (sqft)", name: "area_sqft", placeholder: "2,400", type: "text" },
                { label: "Year Built", name: "year_built", placeholder: "2022", type: "text" },
              ].map((f) => (
                <Field key={f.name} label={f.label}>
                  <Input
                    className={styledInput}
                    type={f.type}
                    name={f.name}
                    value={form[f.name]}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    required={f.name !== "year_built"}
                    min={f.type === "number" ? "1" : undefined}
                  />
                </Field>
              ))}
            </div>
            <FieldGroup>
              <Field label="Parking">
                <Input className={styledInput} name="parking" value={form.parking} onChange={handleChange} placeholder="e.g. 2 spaces" />
              </Field>
              <Field label="Status">
                <select name="status" value={form.status} onChange={handleChange} className={styledSelect}>
                  {statusOptions.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </Field>
            </FieldGroup>
            <Field label="Amenities (comma separated)">
              <Input className={styledInput} name="amenities" value={form.amenities} onChange={handleChange} placeholder="Swimming Pool, Gym, 24/7 Security, Elevator, Parking" />
            </Field>
          </SectionCard>

          <SectionCard
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>}
            title="Pricing"
            subtitle="Optional — leave blank to hide price from public"
          >
            <FieldGroup>
              <Field label="Price (₦)">
                <Input className={styledInput} type="number" name="price" value={form.price} onChange={handleChange} placeholder="Leave empty to hide price" min="0" />
              </Field>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    className="relative w-12 h-6 rounded-full transition-colors"
                    style={{ backgroundColor: form.show_price ? "#1B3A2D" : "#d1d5db" }}
                    onClick={() => setForm((prev) => ({ ...prev, show_price: !prev.show_price }))}
                  >
                    <div
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform"
                      style={{ transform: form.show_price ? "translateX(26px)" : "translateX(4px)" }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#1B3A2D" }}>Show price publicly</p>
                    <p className="text-xs text-gray-400">Display on the client-facing website</p>
                  </div>
                </label>
              </div>
            </FieldGroup>
          </SectionCard>

          <SectionCard
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>}
            title="Images"
            subtitle="Upload a cover image and gallery photos via Cloudinary"
          >
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#1B3A2D" }}>Cover Image</p>
              <label className="flex flex-col items-center justify-center w-full h-36 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer hover:border-green-800 transition-colors">
                {form.cover_image ? (
                  <img src={form.cover_image} alt="Cover" className="h-full w-full object-cover rounded-xl" />
                ) : (
                  <div className="text-center">
                    <svg className="mx-auto mb-2 text-gray-300" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    <p className="text-sm text-gray-400">Click to upload cover image</p>
                    <p className="text-xs text-gray-300 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, true)} className="hidden" />
              </label>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#1B3A2D" }}>
                Gallery Images
                <span className="ml-2 font-normal text-gray-400 normal-case">
                  ({form.images.length}/4 uploaded)
                </span>
              </p>
              <label
                className={`flex flex-col items-center justify-center w-full h-24 rounded-xl border-2 border-dashed bg-gray-50 transition-colors
                  ${form.images.length >= 4 ? "border-gray-100 cursor-not-allowed opacity-50" : "border-gray-200 cursor-pointer hover:border-green-800"}`}
              >
                <div className="text-center">
                  <p className="text-sm text-gray-400">
                    {form.images.length >= 4 ? "Maximum images reached" : "Click to upload multiple images"}
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    {form.images.length >= 4 ? "Remove an image to add another" : `${4 - form.images.length} slot(s) remaining`}
                  </p>
                </div>
                <input
                  type="file" accept="image/*" multiple
                  onChange={(e) => handleImageUpload(e, false)}
                  className="hidden"
                  disabled={form.images.length >= 4}
                />
              </label>

              {uploadingImages && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: "#f0f9f4" }}>
                  <svg className="animate-spin w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#1B3A2D" strokeWidth="4"/>
                    <path className="opacity-75" fill="#1B3A2D" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#1B3A2D" }}>Uploading to Cloudinary...</p>
                    <p className="text-xs text-gray-400">This may take a few seconds depending on file size</p>
                  </div>
                </div>
              )}

              {form.images.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {form.images.map((url, i) => (
                    <div key={i} className="relative group">
                      <img src={url} alt={`img-${i}`} className="h-24 w-full object-cover rounded-xl border border-gray-200" />
                      <button
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-xl flex items-center justify-center text-white text-xs font-medium transition-opacity"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </SectionCard>

          <div className="sticky bottom-0 bg-white border-t border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-lg">
            <p className="text-sm text-gray-400">All required fields must be filled before saving.</p>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={async () => {
                  const { data: { user } } = await supabase.auth.getUser();
                  await supabase.from("property_drafts").delete().eq("admin_id", user.id);
                  navigate("/admin/properties");
                }}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="px-8 rounded-xl text-white font-semibold hover:opacity-90" style={{ backgroundColor: "#1B3A2D" }}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Saving...
                  </span>
                ) : "Save Property"}
              </Button>
            </div>
          </div>

        </form>
      </div>
    </AdminLayout>
  );
}