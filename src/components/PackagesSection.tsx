import { PackageCard } from "./PackageCard";

const packages = [
  {
    id: "starter",
    name: "Starter",
    price: "₹8,500",
    tagline: "Perfect Entry Point",
    delivery: "3-4 days",
    features: [
      "Responsive Landing Page",
      "Contact Form integration",
      "Mobile Optimized design",
      "Professional design"
    ],
    popular: false
  },
  {
    id: "business",
    name: "Business",
    price: "₹15,000",
    tagline: "Sweet Spot for Small Businesses",
    delivery: "6-8 days",
    features: [
      "Full website with user login",
      "Authentication system",
      "Simple Database",
      "Mobile responsive design",
      "Contact form with validation"
    ],
    popular: false
  },
  {
    id: "professional",
    name: "Professional",
    price: "₹25,000",
    tagline: "For Growing Businesses",
    delivery: "10-12 days",
    features: [
      "Advanced authentication system",
      "API integrations (1-2 services)",
      "Complex database relationships",
      "Performance optimization",
      "Simple admin panel",
      "Email notification system",
      "Basic SEO optimization"
    ],
    popular: false
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    price: "₹35,000",
    tagline: "Complete Online Store Solution",
    delivery: "15-18 days",
    features: [
      "Complete e-commerce platform",
      "Razorpay payment integration",
       "Customer dashboard",
      "Shopping cart & checkout",
      "Admin panel for orders"
    ],
    popular: true
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹45,000",
    tagline: "Enterprise-Grade E-commerce",
    delivery: "20-25 days",
    features: [
      "Everything in E-commerce package",
      "Advanced admin dashboard",
      "Sales analytics & reports",
      "Multi-user roles system",
      "Email marketing integration",
      "WhatsApp notifications",
      "Advanced inventory management",
      "Customer support system",
      "Performance monitoring"
    ],
    popular: false
  },
  {
    id: "ai-enterprise",
    name: "AI Enterprise",
    price: "Contact Us",
    tagline: "AI-Powered Custom Solutions",
    delivery: "30-45 days",
    features: [
      "AI-powered chatbots & virtual assistants",
      "Natural Language Processing integration",
      "Machine Learning analytics dashboard",
      "AI-driven content generation",
      "Intelligent recommendation systems",
      "Computer vision & image processing",
      "Voice recognition & synthesis",
      "Predictive analytics & forecasting",
      "Custom AI model development",
      "API integrations with OpenAI, Claude, etc.",
      "Real-time data processing",
      "Advanced security & compliance",
      "Scalable cloud infrastructure",
      "24/7 monitoring & support"
    ],
    popular: false
  }
];

export const PackagesSection = () => {
  return (
    <section id="packages" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
            Choose Your Perfect Package
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional web development services designed to meet your specific needs and budget
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Additional Services Available</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/80 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Domain & Hosting Package</h4>
                <p className="text-gray-600 text-sm mb-2">₹10,500 additional</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 1-year premium domain registration</li>
                  <li>• Professional website hosting</li>
                  <li>• Complete testing & optimization</li>
                </ul>
              </div>
              <div className="bg-white/80 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Training & Support</h4>
                <p className="text-gray-600 text-sm mb-2">Included in Domain Package</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 1 month comprehensive training</li>
                  <li>• Debugging & troubleshooting</li>
                  <li>• Documentation & tutorials</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
