import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  HelpCircle,
  Headphones,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      category: "general",
    });
    alert("Thank you for your message! We'll get back to you soon.");
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email anytime",
      contact: "support@refurbtech.com",
      available: "24/7",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our team",
      contact: "+1 (555) 123-4567",
      available: "Mon-Fri 9AM-6PM EST",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with us instantly",
      contact: "Available on website",
      available: "Mon-Fri 9AM-6PM EST",
    },
    {
      icon: HelpCircle,
      title: "Help Center",
      description: "Find answers quickly",
      contact: "help.refurbtech.com",
      available: "Available 24/7",
    },
  ];

  const officeInfo = {
    address: "123 Tech Street, Digital City, TC 12345",
    phone: "+1 (555) 123-4567",
    email: "support@refurbtech.com",
    hours: {
      weekdays: "Monday - Friday: 9:00 AM - 6:00 PM EST",
      weekend: "Saturday - Sunday: 10:00 AM - 4:00 PM EST",
    },
  };

  const faqs = [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day hassle-free return policy on all products. Items must be in original condition.",
    },
    {
      question: "How long is the warranty?",
      answer:
        "All our refurbished devices come with a comprehensive 2-year warranty covering parts and labor.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Currently, we ship within the United States and Canada. International shipping coming soon!",
    },
    {
      question: "How do I track my order?",
      answer:
        "You'll receive a tracking number via email once your order ships. You can also track orders in your account.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-base to-brand-hover text-text-invert py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading font-bold text-4xl lg:text-6xl mb-6">
              Get in Touch
            </h1>
            <p className="text-xl lg:text-2xl opacity-90 mb-8">
              Have questions? We're here to help! Reach out to our friendly
              support team.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-surface-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-text-base mb-4">
              How Can We Help?
            </h2>
            <p className="text-text-muted text-lg">
              Choose the best way to reach us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method) => {
              const IconComponent = method.icon;
              return (
                <div
                  key={method.title}
                  className="card text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-brand-base rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-text-invert" size={24} />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    {method.title}
                  </h3>
                  <p className="text-text-muted text-sm mb-3">
                    {method.description}
                  </p>
                  <div className="text-brand-base font-medium text-sm mb-2">
                    {method.contact}
                  </div>
                  <div className="text-text-muted text-xs">
                    {method.available}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Info */}
      <section className="py-20 bg-surface-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-heading font-bold text-3xl text-text-base mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-text-base mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input w-full"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-text-base mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input w-full"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-text-base mb-2"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input w-full"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales Question</option>
                    <option value="returns">Returns & Refunds</option>
                    <option value="business">Business Inquiry</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-text-base mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input w-full"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-text-base mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input w-full resize-none"
                    placeholder="Please describe your question or concern..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full flex items-center justify-center"
                >
                  <Send className="mr-2" size={18} />
                  Send Message
                </button>
              </form>
            </div>

            {/* Office Info */}
            <div>
              <h2 className="font-heading font-bold text-3xl text-text-base mb-6">
                Visit Our Office
              </h2>

              <div className="bg-surface-background rounded-2xl p-6 mb-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-brand-base mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-text-base mb-1">
                        Address
                      </h4>
                      <p className="text-text-muted">{officeInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="text-brand-base mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-text-base mb-1">
                        Phone
                      </h4>
                      <p className="text-text-muted">{officeInfo.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="text-brand-base mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-text-base mb-1">
                        Email
                      </h4>
                      <p className="text-text-muted">{officeInfo.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="text-brand-base mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-text-base mb-1">
                        Office Hours
                      </h4>
                      <p className="text-text-muted text-sm">
                        {officeInfo.hours.weekdays}
                      </p>
                      <p className="text-text-muted text-sm">
                        {officeInfo.hours.weekend}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-12 text-text-invert text-center">
                <MapPin size={48} className="mx-auto mb-4" />
                <h3 className="font-heading font-semibold text-xl mb-2">
                  Interactive Map
                </h3>
                <p className="opacity-80">Map integration coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-surface-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-text-base mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-text-muted text-lg">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="card">
                <h3 className="font-semibold text-text-base mb-3">
                  {faq.question}
                </h3>
                <p className="text-text-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-20 bg-gradient-to-r from-brand-base to-brand-hover text-text-invert">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Headphones size={64} className="mx-auto mb-6" />
          <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-6">
            Need Immediate Help?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Our support team is standing by to assist you with any questions or
            concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-secondary text-brand-base bg-text-invert hover:bg-gray-100">
              Start Live Chat
            </button>
            <button className="btn btn-ghost border border-text-invert hover:bg-text-invert hover:bg-opacity-10">
              Call Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
