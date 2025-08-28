import { useState } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  ShoppingCart,
  Eye,
  Heart,
} from "lucide-react";

const Products = () => {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState("all");

  // Mock product data
  const products = [
    {
      id: 1,
      name: "Dell Latitude 7420 Laptop",
      category: "laptops",
      price: 899,
      originalPrice: 1299,
      rating: 4.8,
      reviews: 124,
      image: "💻",
      condition: "Excellent",
      specs: {
        processor: "Intel i7-11th Gen",
        memory: "16GB RAM",
        storage: "512GB SSD",
        display: '14" FHD',
      },
      features: ["Business Grade", "Warranty Included", "Free Shipping"],
      inStock: true,
    },
    {
      id: 2,
      name: "HP LaserJet Pro M404n",
      category: "printers",
      price: 199,
      originalPrice: 329,
      rating: 4.6,
      reviews: 89,
      image: "🖨️",
      condition: "Very Good",
      specs: {
        type: "Laser Printer",
        speed: "38 ppm",
        connectivity: "USB, Ethernet",
        paperSize: "A4, Letter",
      },
      features: ["Energy Efficient", "High Speed", "Professional Quality"],
      inStock: true,
    },
    {
      id: 3,
      name: 'MacBook Pro 13" 2020',
      category: "laptops",
      price: 1199,
      originalPrice: 1699,
      rating: 4.9,
      reviews: 203,
      image: "💻",
      condition: "Excellent",
      specs: {
        processor: "Apple M1 Chip",
        memory: "8GB RAM",
        storage: "256GB SSD",
        display: '13.3" Retina',
      },
      features: ["Apple Silicon", "Long Battery Life", "Premium Build"],
      inStock: true,
    },
    {
      id: 4,
      name: "Logitech MX Master 3",
      category: "accessories",
      price: 79,
      originalPrice: 99,
      rating: 4.7,
      reviews: 156,
      image: "🖱️",
      condition: "Like New",
      specs: {
        type: "Wireless Mouse",
        battery: "Up to 70 days",
        connectivity: "Bluetooth, USB-C",
        compatibility: "Multi-device",
      },
      features: ["Ergonomic Design", "Precision Scroll", "Fast Charging"],
      inStock: true,
    },
    {
      id: 5,
      name: "Canon PIXMA TS8320",
      category: "printers",
      price: 149,
      originalPrice: 199,
      rating: 4.4,
      reviews: 67,
      image: "🖨️",
      condition: "Good",
      specs: {
        type: "All-in-One Inkjet",
        functions: "Print, Scan, Copy",
        connectivity: "WiFi, USB",
        photoSupport: "Yes",
      },
      features: ["Photo Printing", "Compact Design", "Mobile Printing"],
      inStock: false,
    },
    {
      id: 6,
      name: "ThinkPad X1 Carbon Gen 8",
      category: "laptops",
      price: 1299,
      originalPrice: 1899,
      rating: 4.8,
      reviews: 178,
      image: "💻",
      condition: "Excellent",
      specs: {
        processor: "Intel i7-10th Gen",
        memory: "16GB RAM",
        storage: "1TB SSD",
        display: '14" 4K',
      },
      features: ["Ultra-Lightweight", "Carbon Fiber", "Business Premium"],
      inStock: true,
    },
  ];

  const categories = [
    { value: "all", label: "All Products" },
    { value: "laptops", label: "Laptops" },
    { value: "printers", label: "Printers" },
    { value: "accessories", label: "Accessories" },
  ];

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Customer Rating" },
    { value: "newest", label: "Newest First" },
  ];

  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-100", label: "Under $100" },
    { value: "100-500", label: "$100 - $500" },
    { value: "500-1000", label: "$500 - $1,000" },
    { value: "1000+", label: "Over $1,000" },
  ];

  // Filter and sort products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    let matchesPrice = true;
    if (priceRange !== "all") {
      const [min, max] = priceRange.includes("+")
        ? [parseInt(priceRange.replace("+", "")), Infinity]
        : priceRange.split("-").map(Number);
      matchesPrice = product.price >= min && product.price <= max;
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const getSavings = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  const ProductCard = ({ product }) => (
    <div className="card group hover:shadow-xl transition-all duration-300">
      {/* Product Image */}
      <div className="relative mb-4">
        <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-6xl">
          {product.image}
        </div>

        {/* Condition Badge */}
        <div className="absolute top-3 left-3">
          <span className="badge-sale">{product.condition}</span>
        </div>

        {/* Savings Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-status-success text-text-invert text-xs font-semibold px-2 py-1 rounded-lg">
            Save {getSavings(product.originalPrice, product.price)}%
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
          <button className="p-3 bg-text-invert rounded-lg hover:bg-gray-100 transition-colors">
            <Eye size={20} className="text-text-base" />
          </button>
          <button className="p-3 bg-text-invert rounded-lg hover:bg-gray-100 transition-colors">
            <Heart size={20} className="text-text-base" />
          </button>
          <button className="p-3 bg-brand-base rounded-lg hover:bg-brand-hover transition-colors">
            <ShoppingCart size={20} className="text-text-invert" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div>
        <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-accent-base fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-text-muted">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        {/* Key Specs */}
        <div className="space-y-1 mb-4">
          {Object.entries(product.specs)
            .slice(0, 2)
            .map(([key, value]) => (
              <div key={key} className="text-sm text-text-muted">
                <span className="capitalize">{key}:</span> {value}
              </div>
            ))}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.features.slice(0, 2).map((feature) => (
            <span
              key={feature}
              className="text-xs bg-brand-subtle text-brand-base px-2 py-1 rounded"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl text-text-base">
                ${product.price}
              </span>
              <span className="text-sm text-text-muted line-through">
                ${product.originalPrice}
              </span>
            </div>
          </div>
          <div className="text-right">
            {product.inStock ? (
              <span className="text-status-success text-sm font-medium">
                In Stock
              </span>
            ) : (
              <span className="text-status-danger text-sm font-medium">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          className={`w-full mt-4 btn ${
            product.inStock
              ? "btn-primary"
              : "btn-secondary opacity-50 cursor-not-allowed"
          }`}
          disabled={!product.inStock}
        >
          {product.inStock ? "Add to Cart" : "Notify When Available"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface-background">
      {/* Header */}
      <div className="bg-surface-card border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-heading font-bold text-3xl lg:text-4xl text-text-base mb-4">
            Refurbished Products
          </h1>
          <p className="text-text-muted text-lg">
            Discover high-quality refurbished laptops, printers, and accessories
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${
                  viewMode === "grid"
                    ? "bg-brand-base text-text-invert"
                    : "text-text-muted hover:text-brand-base"
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg ${
                  viewMode === "list"
                    ? "bg-brand-base text-text-invert"
                    : "text-text-muted hover:text-brand-base"
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="input"
            >
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button className="btn btn-ghost flex items-center justify-center">
              <Filter className="mr-2" size={18} />
              More Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-text-muted">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-heading font-semibold text-xl mb-2">
              No products found
            </h3>
            <p className="text-text-muted mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setPriceRange("all");
              }}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Load More (if pagination is needed) */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn btn-secondary">Load More Products</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
