import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Shield,
  Truck,
  Award,
  ArrowRight,
  Star,
  CheckCircle,
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description:
        "All our refurbished devices undergo rigorous testing and come with a comprehensive warranty.",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description:
        "Enjoy free shipping on all orders over $199. Fast and secure delivery to your doorstep.",
    },
    {
      icon: Award,
      title: "Certified Refurbished",
      description:
        "Industry-certified refurbishment process ensuring like-new performance and reliability.",
    },
    {
      icon: ShoppingBag,
      title: "Great Value",
      description:
        "Save up to 70% compared to new devices without compromising on quality or performance.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content:
        "Amazing quality laptops at unbeatable prices. Our entire office is equipped with Refurb Tech computers.",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Student",
      content:
        "Perfect for my studies! Got a high-end laptop for half the price. Excellent customer service too.",
      rating: 5,
    },
    {
      name: "Emma Wilson",
      role: "Freelancer",
      content:
        "The printer I bought works flawlessly. Great value for money and fast delivery.",
      rating: 5,
    },
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "98%", label: "Customer Satisfaction" },
    { number: "2 Years", label: "Warranty Coverage" },
    { number: "24/7", label: "Customer Support" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-base to-brand-hover text-text-invert py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-heading font-bold text-4xl lg:text-6xl leading-tight mb-6">
                Premium Refurbished
                <span className="block text-accent-base">Tech Solutions</span>
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Discover high-quality refurbished laptops and printers at
                unbeatable prices. Sustainable technology that doesn't
                compromise on performance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="btn btn-secondary text-brand-base bg-text-invert hover:bg-gray-100"
                >
                  Shop Now
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link
                  to="/about"
                  className="btn btn-ghost border border-text-invert hover:bg-text-invert hover:bg-opacity-10"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-text-invert bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-text-invert bg-opacity-20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">70%</div>
                    <div className="text-sm opacity-80">Savings</div>
                  </div>
                  <div className="bg-text-invert bg-opacity-20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">2 Year</div>
                    <div className="text-sm opacity-80">Warranty</div>
                  </div>
                  <div className="bg-text-invert bg-opacity-20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">30 Day</div>
                    <div className="text-sm opacity-80">Returns</div>
                  </div>
                  <div className="bg-text-invert bg-opacity-20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold">Free</div>
                    <div className="text-sm opacity-80">Shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-text-base mb-4">
              Why Choose Refurb Tech?
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              We're committed to providing the highest quality refurbished
              technology with exceptional service and unbeatable value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div key={feature.title} className="card text-center">
                  <div className="w-12 h-12 bg-brand-base rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-text-invert" size={24} />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-muted">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-surface-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading font-bold text-3xl lg:text-4xl text-brand-base mb-2">
                  {stat.number}
                </div>
                <div className="text-text-muted font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Preview */}
      <section className="py-20 bg-surface-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-text-base mb-4">
              Shop by Category
            </h2>
            <p className="text-text-muted text-lg">
              Find the perfect refurbished tech for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card group hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-6 flex items-center justify-center">
                <div className="text-6xl">💻</div>
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">
                Refurbished Laptops
              </h3>
              <p className="text-text-muted mb-4">
                High-performance laptops from top brands, perfect for work,
                study, or entertainment.
              </p>
              <Link
                to="/products?category=laptops"
                className="text-brand-base hover:text-brand-hover font-medium inline-flex items-center"
              >
                Shop Laptops <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>

            <div className="card group hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-green-500 to-green-600 rounded-xl mb-6 flex items-center justify-center">
                <div className="text-6xl">🖨️</div>
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">
                Refurbished Printers
              </h3>
              <p className="text-text-muted mb-4">
                Professional-grade printers for home and office use, all tested
                and certified.
              </p>
              <Link
                to="/products?category=printers"
                className="text-brand-base hover:text-brand-hover font-medium inline-flex items-center"
              >
                Shop Printers <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>

            <div className="card group hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mb-6 flex items-center justify-center">
                <div className="text-6xl">⚡</div>
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">
                Accessories
              </h3>
              <p className="text-text-muted mb-4">
                Complete your setup with keyboards, mice, cables, and other
                essential accessories.
              </p>
              <Link
                to="/products?category=accessories"
                className="text-brand-base hover:text-brand-hover font-medium inline-flex items-center"
              >
                Shop Accessories <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-surface-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-text-base mb-4">
              What Our Customers Say
            </h2>
            <p className="text-text-muted text-lg">
              Don't just take our word for it - hear from our satisfied
              customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-surface-background rounded-2xl p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-accent-base fill-current"
                      size={20}
                    />
                  ))}
                </div>
                <p className="text-text-muted mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-text-base">
                    {testimonial.name}
                  </div>
                  <div className="text-text-muted text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-base to-brand-hover text-text-invert">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-6">
            Ready to Upgrade Your Tech?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who've made the smart choice
            with refurbished technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="btn btn-secondary text-brand-base bg-text-invert hover:bg-gray-100"
            >
              Browse Products
            </Link>
            <Link
              to="/auth/register"
              className="btn btn-ghost border border-text-invert hover:bg-text-invert hover:bg-opacity-10"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
