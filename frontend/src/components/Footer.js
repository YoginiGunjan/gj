import React from "react";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">
              Gunjan Jagtiani
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Empowering minds and bodies through ancient wisdom and modern wellness practices. 
              Join me on a journey to discover your inner peace and strength.
            </p>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-rose-400" />
              <span className="text-slate-300 italic">
                "Wellness is not a destination, but a way of living."
              </span>
              <Heart className="w-5 h-5 text-rose-400" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "#home" },
                { name: "About", href: "#about" },
                { name: "Services", href: "#services" },
                { name: "Experience", href: "#experience" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-300 hover:text-emerald-400 transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">gunjan.wellness@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">USA (Online Available)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services Banner */}
        <div className="border-t border-slate-700 pt-8 mb-8">
          <h4 className="text-center text-lg font-semibold text-white mb-4">
            Wellness Services Available
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Yoga for Beginners",
              "Prenatal Yoga",
              "Postnatal Yoga",
              "Sound Healing",
              "Online Sessions",
              "Studio Collaborations"
            ].map((service) => (
              <span 
                key={service}
                className="px-3 py-1 bg-emerald-800 text-emerald-100 rounded-full text-sm"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">
              © {currentYear} Gunjan Jagtiani. All rights reserved. Made with love for wellness.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 text-sm">
                Bringing peace and healing to communities worldwide
              </span>
              <Heart className="w-4 h-4 text-rose-400" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;