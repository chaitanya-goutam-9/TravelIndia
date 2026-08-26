export const tours = [
  {
    id: "ancient-temples-to-tiger-trails",
    slug: "ancient-temples-to-tiger-trails",
    title: "Ancient Temples to Tiger Trails",
    subtitle: "Madhya Pradesh",
    image: "https://placehold.co/600x400?text=Madhya+Pradesh",
    price: 35000,
    duration: "7 Days / 6 Nights",
    location: "Madhya Pradesh",
    rating: 4.8,
    reviews: 124,
    description: "Experience the spiritual grandeur of ancient temples and the thrilling wilderness of tiger reserves in Madhya Pradesh.",
    itinerary: [
      { day: 1, title: "Arrival in Khajuraho", description: "Arrive in Khajuraho, explore the Western Group of Temples." },
      { day: 2, title: "Khajuraho to Bandhavgarh", description: "Drive to Bandhavgarh National Park. Evening at leisure." },
      { day: 3, title: "Bandhavgarh Safari", description: "Morning and evening jungle safaris in search of the Royal Bengal Tiger." },
      { day: 4, title: "Bandhavgarh to Kanha", description: "Drive to Kanha National Park." },
      { day: 5, title: "Kanha Safari", description: "Explore the lush sal and bamboo forests on morning and evening safaris." },
      { day: 6, title: "Kanha to Jabalpur", description: "Drive to Jabalpur. Visit Bhedaghat and Dhuandhar Falls." },
      { day: 7, title: "Departure", description: "Transfer to Jabalpur airport/railway station for onward journey." }
    ]
  },
  {
    id: "kerala",
    slug: "kerala",
    title: "Kerala",
    subtitle: "Backwaters & Green Paradise",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop",
    price: 45500,
    duration: "5 Days / 4 Nights",
    location: "Kerala",
    rating: 4.9,
    reviews: 210,
    description: "Discover lush green landscapes, misty hills, cascading waterfalls.",
    itinerary: []
  },
  {
    id: "meghalaya",
    slug: "meghalaya",
    title: "Meghalaya",
    subtitle: "Waterfalls & Living Roots",
    image: "https://images.unsplash.com/photo-1647416345915-d3ec41c0e8ba?q=80&w=600&auto=format&fit=crop",
    price: 22999,
    duration: "6 Days / 5 Nights",
    location: "Meghalaya",
    rating: 4.8,
    reviews: 180,
    description: "Explore the wettest place on earth, living root bridges, and crystal clear rivers.",
    itinerary: []
  },
  {
    id: "munnar",
    slug: "munnar",
    title: "Munnar",
    subtitle: "Tea Gardens & Misty Hills",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600&auto=format&fit=crop",
    price: 29999,
    duration: "4 Days / 3 Nights",
    location: "Kerala",
    rating: 4.7,
    reviews: 150,
    description: "A perfect short getaway to the hills of Munnar.",
    itinerary: []
  },
  {
    id: "coorg",
    slug: "coorg",
    title: "Coorg",
    subtitle: "Coffee Estates & Nature",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=600&auto=format&fit=crop",
    price: 29999,
    duration: "4 Days / 3 Nights",
    location: "Karnataka",
    rating: 4.6,
    reviews: 112,
    description: "Coffee plantations, spice gardens, and beautiful waterfalls.",
    itinerary: []
  },
  {
    id: "goa",
    slug: "goa",
    title: "Goa",
    subtitle: "Beaches & Monsoon Vibes",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600&auto=format&fit=crop",
    price: 24999,
    duration: "5 Days / 4 Nights",
    location: "Goa",
    rating: 4.5,
    reviews: 320,
    description: "Experience the vibrant monsoon vibes of Goa.",
    itinerary: []
  },
  {
    id: "mahabaleshwar",
    slug: "mahabaleshwar",
    title: "Mahabaleshwar",
    subtitle: "Valleys & Waterfalls",
    image: "https://images.unsplash.com/photo-1570146039433-874f6ab7f58a?q=80&w=600&auto=format&fit=crop",
    price: 28999,
    duration: "3 Days / 2 Nights",
    location: "Maharashtra",
    rating: 4.7,
    reviews: 134,
    description: "Stunning valley views, strawberries, and waterfalls.",
    itinerary: []
  }
];

export const getTourBySlug = (slug) => tours.find(t => t.slug === slug);
export const getTopSellingTours = () => tours.slice(0, 3);
