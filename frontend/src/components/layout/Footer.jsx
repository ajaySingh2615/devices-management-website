import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Products",
      links: [
        { name: "Refurbished Laptops", path: "/products?category=laptops" },
        { name: "Refurbished Printers", path: "/products?category=printers" },
        { name: "Accessories", path: "/products?category=accessories" },
        { name: "New Arrivals", path: "/products?sort=newest" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Careers", path: "/careers" },
        { name: "Press", path: "/press" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", path: "/help" },
        { name: "Warranty", path: "/warranty" },
        { name: "Returns", path: "/returns" },
        { name: "Shipping Info", path: "/shipping" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Cookie Policy", path: "/cookies" },
        { name: "Refund Policy", path: "/refunds" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "#" },
    { name: "Twitter", icon: Twitter, url: "#" },
    { name: "Instagram", icon: Instagram, url: "#" },
    { name: "LinkedIn", icon: Linkedin, url: "#" },
  ];

  return (
    <footer className="bg-surface-card border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-brand-base rounded-lg flex items-center justify-center">
                <span className="text-text-invert font-bold text-lg">R</span>
              </div>
              <span className="font-heading font-bold text-xl text-text-base">
                Refurb Tech
              </span>
            </div>
            <p className="text-text-muted mb-6 max-w-md">
              Your trusted source for high-quality refurbished laptops and
              printers. Sustainable technology solutions with guaranteed
              performance and warranty.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-text-muted">
                <Mail size={18} />
                <span>support@refurbtech.com</span>
              </div>
              <div className="flex items-center space-x-3 text-text-muted">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-text-muted">
                <MapPin size={18} />
                <span>123 Tech Street, Digital City, TC 12345</span>
              </div>
            </div>
          </div>

          {/* Footer sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="font-heading font-semibold text-text-base mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-text-muted hover:text-brand-base transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="mt-12 pt-8 border-t border-surface-border">
          <div className="max-w-md">
            <h3 className="font-heading font-semibold text-text-base mb-2">
              Stay Updated
            </h3>
            <p className="text-text-muted mb-4">
              Get the latest deals and product updates delivered to your inbox.
            </p>
            <div className="flex space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="input flex-1"
              />
              <button className="btn btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="mt-12 pt-8 border-t border-surface-border flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          {/* Copyright */}
          <div className="text-text-muted text-sm">
            © {currentYear} Refurb Tech. All rights reserved.
          </div>

          {/* Social links */}
          <div className="flex items-center space-x-4">
            <span className="text-text-muted text-sm mr-2">Follow us:</span>
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  className="text-text-muted hover:text-brand-base transition-colors duration-200"
                  aria-label={social.name}
                >
                  <IconComponent size={20} />
                </a>
              );
            })}
          </div>

          {/* Quality badges */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-status-success rounded-full flex items-center justify-center">
                <span className="text-text-invert text-xs font-bold">✓</span>
              </div>
              <span className="text-text-muted text-sm">
                Certified Refurbished
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
