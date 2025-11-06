'use client';

import { useContent } from "../context/ContentContext";
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaEnvelope } from "react-icons/fa";

export default function SocialContact() {
  const { content } = useContent();

  const socialLinks = [
    { name: "Twitter (X)", icon: <FaTwitter size={28} />, url: "https://x.com/MohitSi44211571" },
    { name: "naruka.mohit88@gmail.com", icon: <FaEnvelope size={28} />, url: "mailto:naruka.mohit88@gmail.com" },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-md mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold mb-8">
          {content.name || "Connect With Us"}
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Follow us on social media or reach out directly — we’d love to connect!
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center transition-transform transform hover:scale-110"
            >
              <div className="p-4 rounded-full shadow-md hover:shadow-lg bg-gray-100 text-gray-700">
                {link.icon}
              </div>
              <span className="mt-2 text-sm font-medium">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}




// 'use client';
// import { useContent } from "../context/ContentContext";
// import ContactForm from "../components/ContactForm";

// export default function Contact() {
//   const { content } = useContent();

//   return (
//     <section className="min-h-screen flex items-center justify-center py-20">
//       <div className="max-w-md mx-auto px-4">
//         <h1 className="text-4xl font-bold text-center mb-8">{content.name}</h1>
//         <ContactForm />
//       </div>
//     </section>
//   );
// }