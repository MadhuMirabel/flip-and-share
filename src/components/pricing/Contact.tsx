import { ContactStrip } from "@/components/sections/Contact";

/** "For more pricing questions: Call us at … or email …" strip above the pricing FAQ. */
export function Contact() {
  return <ContactStrip lead={<><b>For more pricing questions:</b> Call us at</>} className="mb-2" />;
}
