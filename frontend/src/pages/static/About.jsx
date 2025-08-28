import { CheckCircle, Users, Globe, Award, Recycle, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: CheckCircle,
      title: "Quality First",
      description:
        "Every device goes through our rigorous 50-point inspection process to ensure it meets our high standards.",
    },
    {
      icon: Recycle,
      title: "Sustainability",
      description:
        "We're committed to reducing electronic waste by giving quality devices a second life.",
    },
    {
      icon: Heart,
      title: "Customer Focus",
      description:
        "Your satisfaction is our priority. We provide exceptional support and hassle-free returns.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "Industry-leading refurbishment standards and comprehensive warranties on all products.",
    },
  ];

  const team = [
    {
      name: "Alex Rodriguez",
      role: "CEO & Founder",
      bio: "15+ years in technology and sustainable business practices.",
      image: "👨‍💼",
    },
    {
      name: "Sarah Kim",
      role: "Head of Quality",
      bio: "Former engineer at major tech companies, ensuring every device meets standards.",
      image: "👩‍🔬",
    },
    {
      name: "Michael Chen",
      role: "Customer Success",
      bio: "Dedicated to providing exceptional customer service and support.",
      image: "👨‍💻",
    },
    {
      name: "Emily Johnson",
      role: "Operations Director",
      bio: "Supply chain expert focused on efficiency and sustainability.",
      image: "👩‍💼",
    },
  ];

  const milestones = [
    {
      year: "2018",
      event:
        "Founded Refurb Tech with a mission to make quality tech accessible",
    },
    {
      year: "2019",
      event: "Reached 1,000 satisfied customers and expanded product line",
    },
    {
      year: "2020",
      event: "Launched certification program and 2-year warranty",
    },
    {
      year: "2021",
      event: "Opened second facility and achieved carbon-neutral operations",
    },
    {
      year: "2022",
      event: "Reached 25,000 customers and introduced business solutions",
    },
    {
      year: "2023",
      event: "Launched sustainability program and expanded nationwide",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-base to-brand-hover text-text-invert py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading font-bold text-4xl lg:text-6xl mb-6">
              About Refurb Tech
            </h1>
            <p className="text-xl lg:text-2xl opacity-90 mb-8">
              We're on a mission to make high-quality technology accessible to
              everyone while building a more sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-text-invert bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">50,000+</div>
                <div className="text-lg opacity-80">Happy Customers</div>
              </div>
              <div className="bg-text-invert bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">100,000+</div>
                <div className="text-lg opacity-80">Devices Refurbished</div>
              </div>
              <div className="bg-text-invert bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">500 Tons</div>
                <div className="text-lg opacity-80">E-Waste Prevented</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-surface-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-text-base mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-text-muted">
                <p>
                  Founded in 2018, Refurb Tech began with a simple yet powerful
                  vision: to make high-quality technology accessible to everyone
                  while promoting environmental sustainability.
                </p>
                <p>
                  Our founder, Alex Rodriguez, noticed that millions of
                  perfectly functional devices were being discarded simply
                  because they were no longer "new." This waste troubled him,
                  especially knowing that many people couldn't afford new
                  technology.
                </p>
                <p>
                  Today, we've grown into a trusted leader in the refurbished
                  technology space, serving customers nationwide with our
                  commitment to quality, affordability, and sustainability.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-text-invert">
              <div className="text-center">
                <Globe size={64} className="mx-auto mb-4" />
                <h3 className="font-heading font-bold text-2xl mb-4">
                  Environmental Impact
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm opacity-80">Tons E-Waste Saved</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">70%</div>
                    <div className="text-sm opacity-80">Carbon Reduction</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">100K+</div>
                    <div className="text-sm opacity-80">Devices Saved</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">Carbon</div>
                    <div className="text-sm opacity-80">Neutral Operations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-surface-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-text-base mb-4">
              Our Values
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              These core principles guide everything we do, from the devices we
              refurbish to the service we provide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const IconComponent = value.icon;
              return (
                <div key={value.title} className="text-center">
                  <div className="w-16 h-16 bg-brand-base rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="text-text-invert" size={32} />
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-4">
                    {value.title}
                  </h3>
                  <p className="text-text-muted">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-surface-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-text-base mb-4">
              Meet Our Team
            </h2>
            <p className="text-text-muted text-lg">
              The passionate people behind Refurb Tech's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="card text-center">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {member.name}
                </h3>
                <div className="text-brand-base font-medium mb-3">
                  {member.role}
                </div>
                <p className="text-text-muted text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-20 bg-surface-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-text-base mb-4">
              Our Journey
            </h2>
            <p className="text-text-muted text-lg">
              Key milestones in our mission to revolutionize refurbished
              technology
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-brand-base h-full"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8"
                    }`}
                  >
                    <div className="card">
                      <div className="text-brand-base font-bold text-xl mb-2">
                        {milestone.year}
                      </div>
                      <p className="text-text-muted">{milestone.event}</p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-brand-base rounded-full border-4 border-surface-card"></div>
                  </div>

                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-brand-base to-brand-hover text-text-invert">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Help us build a more sustainable future while getting amazing
            technology at great prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-secondary text-brand-base bg-text-invert hover:bg-gray-100">
              Shop Now
            </button>
            <button className="btn btn-ghost border border-text-invert hover:bg-text-invert hover:bg-opacity-10">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
