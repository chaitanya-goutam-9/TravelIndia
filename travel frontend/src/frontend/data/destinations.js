export const destinations = [
  {
    id: "india",
    slug: "india",
    title: "India",
    image: "https://placehold.co/600x400?text=India",
    regions: ["North India", "South India", "East India", "West India"]
  },
  {
    id: "spain",
    slug: "spain",
    title: "Spain",
    image: "https://placehold.co/600x400?text=Spain",
    regions: []
  },
  {
    id: "thailand",
    slug: "thailand",
    title: "Thailand",
    image: "https://placehold.co/600x400?text=Thailand",
    regions: []
  }
];

export const getDestinationBySlug = (slug) => destinations.find(d => d.slug === slug);
