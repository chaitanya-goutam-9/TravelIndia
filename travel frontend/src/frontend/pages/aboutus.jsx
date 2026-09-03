import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ChevronLeft,
  ChevronRight,
  Users,
  Star,
} from "lucide-react";

/* Brand icons — inline SVGs since lucide-react no longer ships these */
const FacebookIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={20}
    height={20}
    {...props}
  >
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.24 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06Z" />
  </svg>
);

const YoutubeIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={20}
    height={20}
    {...props}
  >
    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.51 3.5 12 3.5 12 3.5s-7.51 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.49 20.5 12 20.5 12 20.5s7.51 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.6 15.5v-7l6.4 3.5-6.4 3.5Z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width={20}
    height={20}
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={20}
    height={20}
    {...props}
  >
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
);

export default function AboutUs() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [testimonialPage, setTestimonialPage] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
    setFormData({ email: "" });
  };

  const leadership = [
    {
      name: "Mahendra Pratap Singh",
      role: "Founder & Director",
      image:
        "https://travelindiatourism.com/wp-content/uploads/2026/06/Mahendra-Pratap-Singh-768x511.jpeg",
    },
    {
      name: "Neelam Singh",
      role: "Managing Director",
      image:
        "https://travelindiatourism.com/wp-content/uploads/2026/06/Neelam-Singh-768x511.jpeg",
    },
    {
      name: "Shailendra Singh",
      role: "Chief Operating Officer (COO)",
      image:
        "https://travelindiatourism.com/wp-content/uploads/2026/06/Shailendra-Singh-scaled.jpg",
    },
  ];

  const testimonials = [
    {
      text: "Exceptional experience with Travel India Tourism! The Bhopal team orchestrated a flawless 5-night Ladakh tour. Spectacular landscapes, expert guides, and seamless logistics. Unforgettable adventure",
      name: "Aditya Kapoor",
      country: "India",
    },
    {
      text: "Travel India Tourism curated the perfect 4-night Andaman getaway for our family. Beaches, activities, and service exceeded our expectations. A truly memorable experience. Highly recommended",
      name: "Chaitanya",
      country: "India",
    },
    {
      text: "Travel India Tourism crafted a magical 4-night Shimla honeymoon package. From enchanting landscapes to cozy accommodations, every detail was perfect. The personalized service made our trip truly special. Highly recommend for a romantic getaway",
      name: "Rubina",
      country: "India",
    },
    {
      text: "Travel India Tourism curated an incredible 5-night Kerala tour package. From tranquil backwaters to lush greenery, every moment was a delight. The well-planned itinerary and exceptional service made our trip unforgettable. Highly recommended for a memorable Kerala experience",
      name: "Gaurav",
      country: "India",
    },
  ];

  const affiliations = [
    "https://travelindiatourism.com/wp-content/uploads/2023/10/Incredible-India-.png",
    "https://travelindiatourism.com/wp-content/uploads/2023/10/IATO.png",
    "https://travelindiatourism.com/wp-content/uploads/2023/10/MPT.png",
    "https://travelindiatourism.com/wp-content/uploads/2023/10/Madhya-Pradesh.png",
    "https://travelindiatourism.com/wp-content/uploads/2026/06/FICCI_logo.svg.png",
    "https://travelindiatourism.com/wp-content/uploads/2023/10/ADTOI.png",
    "https://travelindiatourism.com/wp-content/uploads/2023/10/IATA.png",
    "https://travelindiatourism.com/wp-content/uploads/2023/10/TAAI.png",
    "https://travelindiatourism.com/wp-content/uploads/2023/10/OTOAI.png",
    "https://travelindiatourism.com/wp-content/uploads/2026/06/Pacific_Asia_Travel_Association_Logo.png",
    "https://travelindiatourism.com/wp-content/uploads/2026/06/RTSOI-Logo-Web.jpg.webp",
  ];

  return (
    <div className="w-full font-sans">
      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[1450px] mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://travelindiatourism.com/wp-content/uploads/2026/06/TIT-Team-All.jpeg"
                alt="Travel India Tourism Team"
                className="w-full h-[450px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-[2.5rem] font-bold text-[#1a2b48] mb-6 leading-tight">
                About
                  Travel India Tourism
                
              </h2>
              <div className="space-y-4 text-gray-600 text-md leading-relaxed">
                <p>
                  <strong className="text-gray-600">
                    Travel India Tourism Pvt. Ltd.
                  </strong>{" "}
                  is a leading travel management and destination solutions
                  company dedicated to creating seamless journeys for
                  individuals, families, businesses, and organizations. With
                  expertise spanning corporate travel, MICE, inbound tourism,
                  outbound holidays, visa assistance, and customized travel
                  experiences, we deliver comprehensive solutions tailored to
                  every travel need.
                </p>
                <p>
                  Founded by{" "}
                  <strong className="text-gray-600">
                    Mr. Mahendra Pratap Singh
                  </strong>
                  , a seasoned travel industry professional with over two
                  decades of experience, the company was built on a vision of
                  combining professional travel management with personalized
                  service. Today, Travel India Tourism has earned the trust of
                  corporate clients, government organizations, educational
                  institutions, and leisure travelers through its commitment to
                  reliability, transparency, and operational excellence.
                </p>
                <p>
                  At Travel India Tourism, we believe travel is more than
                  reaching a destination — it is about creating meaningful
                  experiences, lasting memories, and connections that inspire.
                  Guided by the spirit of hospitality and service, we continue
                  to help travelers explore the world with confidence, comfort,
                  and peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-[#f7f8fa]">
        <div className="max-w-[1350px] mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-black-100">
              <h3 className="text-2xl md:text-3xl font-bold text-[#1a2b48] mb-4 text-center">
                Our Vision
              </h3>
              <p className="text-gray-600 text-md leading-relaxed">
                We look beyond the horizon to anticipate change. We are
                passionate about shaping the next generation of business travel
                by being the most trusted and respected Travel Agency & Tour
                Operator recognized by our clients for delivering excellence.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-black-100">
              <h3 className="text-2xl md:text-3xl font-bold text-[#1a2b48] mb-4 text-center">
                Our Mission
              </h3>
              <p className="text-gray-600 text-md leading-relaxed">
                To serve our clients with enhanced travel experience by
                providing quality service that address their travel needs
                through the most efficient arrangements so that customer
                loyalty, superior financial result and excellent customer
                satisfaction can be achieved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="bg-white py-14 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <div className="mb-8 text-center sm:mb-10">
            <h2 className="mb-3 text-[2rem] font-bold text-[#0a1b33] sm:text-[2.2rem] italic font-serif">
              Our Services
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            <a
              href="/location/india"
              className="about-services-card group flex min-h-[255px] flex-col items-center justify-between border border-[#d7b16b] bg-[#f8f8f8] px-4 py-10 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ animationDelay: "0ms" }}
            >
              <img
                src="https://travelindiatourism.com/wp-content/uploads/2026/05/Stylized-gold-map-of-India.png.webp"
                alt="India Tour"
                className="h-35 w-35 object-contain transition-transform group-hover:scale-110"
              />
              <h3 className="text-base font-bold text-[#0a1b33]">India Tour</h3>
            </a>
            <a
              href="/location/world"
              className="about-services-card group flex min-h-[255px] flex-col items-center justify-between border border-[#d7b16b] bg-[#f8f8f8] px-4 py-10 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ animationDelay: "120ms" }}
            >
              <img
                src="https://travelindiatourism.com/wp-content/uploads/2026/05/Gold-Earth-and-airplane-icon.png.webp"
                alt="International Tour"
                className="h-35 w-35 object-contain transition-transform group-hover:scale-110"
              />
              <h3 className="text-base font-bold text-[#0a1b33]">
                International Tour
              </h3>
            </a>
            <div className="about-services-card group flex min-h-[255px] flex-col items-center justify-between border border-[#d7b16b] bg-[#f8f8f8] px-4 py-10 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ animationDelay: "240ms" }}>
              <img
                src="https://travelindiatourism.com/wp-content/uploads/2026/05/Gold-airplane-ticket-icon-on-gray-checkered-background.png.webp"
                alt="Air Ticket"
                className="h-35 w-35 object-contain transition-transform group-hover:scale-110"
              />
              <h3 className="text-base font-bold text-[#0a1b33]">Air Ticket</h3>
            </div>
            <a
              href="/visa-services"
              className="about-services-card group flex min-h-[255px] flex-col items-center justify-between border border-[#d7b16b] bg-[#f8f8f8] px-4 py-10 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ animationDelay: "360ms" }}
            >
              <img
                src="https://travelindiatourism.com/wp-content/uploads/2026/05/Golden-passport-and-ID-card-icons.png.webp"
                alt="Visa Services"
                className="h-35 w-35 object-contain transition-transform group-hover:scale-110"
              />
              <h3 className="text-base font-bold text-[#0a1b33]">
                Visa Services
              </h3>
            </a>
            <div className="about-services-card group flex min-h-[255px] flex-col items-center justify-between border border-[#d7b16b] bg-[#f8f8f8] px-4 py-10 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ animationDelay: "480ms" }}>
              <img
                src="https://travelindiatourism.com/wp-content/uploads/2026/05/Golden-moon-with-floating-hearts.png.webp"
                alt="Honeymoon Package"
                className="h-35 w-35 object-contain transition-transform group-hover:scale-110"
              />
              <h3 className="text-base font-bold text-[#0a1b33]">
                Honeymoon Package
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Our Leadership Team */}
      <section className="py-16 bg-[#f7f8fa]">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-[2rem] font-bold text-[#1a2b48] mb-3 italic font-serif">
              Our Leadership Team
            
            </h2>
          
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadership.map((member, i) => (
              <div
                key={i}
                className={`bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 ${
                  i === leadership.length - 1
                    ? "md:col-span-2 md:w-1/2 md:justify-self-center"
                    : ""
                }`}
              >
                <div className="h-[320px] overflow-hidden bg-gray-50">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-[#1a2b48] text-lg mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognized By */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center gap-4 sm:gap-8">
            <span className="h-10 w-1 bg-orange-500" aria-hidden="true" />
            <h3 className="font-serif text-2xl font-bold text-[#0a1b33] sm:text-4xl md:text-4xl">
              Recognized By
            </h3>
            <img
              src="https://travelindiatourism.com/wp-content/uploads/2026/05/Ministry_of_Tourism_India.svg"
              alt="Ministry of Tourism India"
              className="h-auto w-36 object-contain sm:ml-8"
            />
          </div>
          <div className="space-y-5 text-base leading-relaxed text-gray-500 md:text-md">
                <p>
                  Travel India Tourism Pvt. Ltd. is a prestigious travel agency,
                  proudly approved by the{" "}
                  <strong className="text-gray-600">Ministry of Tourism, Government of India</strong>, and
                  the Madhya Pradesh Tourism Board. With a commitment to
                  excellence, we offer a wide range of travel services that
                  promise to transform your journeys into unforgettable
                  experiences.
                </p>
                <p>
                  As a distinguished player in the travel industry, we hold
                  accreditations and active memberships with renowned
                  organizations such as MOT-GOI, IATA, TAAI, ADTOI, IATO, OTOAI,
                  MPSTDC, and MPT MP Tours. This recognition underscores our
                  dedication to upholding the highest standards in the travel
                  and tourism sector.
                </p>
                <p>
                  Our expertise extends to serving B2B markets worldwide,
                  catering to a diverse clientele. We specialize in curating
                  Group Tours, MICE Tours (Meetings, Incentives, Conferences,
                  and Exhibitions), Student Tours, Educational Tours, and VIP
                  Travels. Whether you're a seasoned traveler or embarking on
                  your first adventure, our team of experienced professionals is
                  committed to ensuring that every aspect of your journey is
                  meticulously planned and executed.
                </p>
                <p>
                  At Travel India Tourism, we believe that travel is not just
                  about reaching a destination but also about discovering the
                  essence of a place, its culture, and its people. With us, you
                  can expect nothing less than top-notch services that allow you
                  to immerse yourself in the rich tapestry of India's diverse
                  landscapes, traditions, and heritage.
                </p>
          </div>
        </div>
      </section>


        {/* Team Photo Section */}
      <section className="py-0 bg-white">
        <p className="text-gray-600 text-1xl md:text-2xl font- text-center px-4 mb-4">
          life at Travel India Tourism
        </p>
        <h3 className="text-gray-800 text-3xl md:text-4xl font-bold text-center px-4 mb-5">
          The Travel India Tourism family!
        </h3>
        <div className="relative h-[600px]">
          <img
            src="https://travelindiatourism.com/wp-content/uploads/2026/06/TIT-Teams-one.jpeg"
            alt="Travel India Tourism Family"
            className="mx-auto h-[600px] w-[90%] object-cover"
          />
          <div className="absolute inset-0  flex items-center justify-center"></div>
        </div>
      </section>

      {/* Our Affiliations */}
      <section className="py-16 bg-[#f7f8fa]">
        <div className="max-w-[1300px] mx-auto px-5 lg:px-8 border border-gray-100 rounded-3xl shadow-sm bg-white">
          <div className="text-center mb-12">
            <h2 className="text-[2rem] font-bold text-[#1a2b48] mb-3 italic font-serif">
              Our  Affiliations
            
            </h2>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-400">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center border border-gray-200 p-6 rounded-3xl">
              {affiliations.map((logo, i) => (
                <div key={i} className="flex items-center justify-center p-4">
                  <img
                    src={logo}
                    alt={`Affiliation ${i + 1}`}
                    className="max-w-full max-h-16 object-contain hover:opacity-80 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    

      {/* Our Offices */}
      <section className="py-16 bg-white relative">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-[2rem] text-[#1a2b48]">
              <span className="italic font-serif font-bold">Our
             Offices </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: Office details */}
            <div className="space-y-5 pt-2">
              <div className="flex gap-3">
                <MapPin
                  className="text-orange-500 flex-shrink-0 mt-0.5"
                  size={18}
                />
                <p className="text-gray-700 text-[15px] leading-relaxed">
                  <span className="font-bold text-[#1a2b48]">Head Office</span>{" "}
                  : Vande Matram Square, C-27 Parijat Complex Bittan Market,
                  E-5, Arera Colony, Bhopal, Madhya Pradesh 462016
                </p>
              </div>

              <div className="flex gap-3">
                <MapPin
                  className="text-orange-500 flex-shrink-0 mt-0.5"
                  size={18}
                />
                <p className="text-gray-700 text-[15px] leading-relaxed">
                  <span className="font-bold text-[#1a2b48]">
                    Branch Office
                  </span>
                  : 1sr Floor, Guru Bakshish Arced, Danapani Rd, opposite
                  Priyadarshini Adhishthan, Bawadiya Kalan, Pallavi Nagar,
                  Bhopal, Madhya Pradesh
                </p>
              </div>

              <div className="space-y-2 pl-1">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                  <a
                    href="tel:+919893574731"
                    className="flex items-center gap-2.5 text-gray-700 text-[15px] hover:text-blue-600 transition-colors"
                  >
                    <Phone className="text-orange-500" size={17} />
                    +91 98935 74731
                  </a>
                  <a
                    href="tel:+919893225370"
                    className="flex items-center gap-2.5 text-gray-700 text-[15px] hover:text-blue-600 transition-colors"
                  >
                    <Phone className="text-orange-500" size={17} />
                    +91 98932 25370
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                  <a
                    href="tel:+919893121733"
                    className="flex items-center gap-2.5 text-gray-700 text-[15px] hover:text-blue-600 transition-colors"
                  >
                    <Phone className="text-orange-500" size={17} />
                    +91 98931 21733
                  </a>
                  <a
                    href="mailto:info@travelindiatourism.com"
                    className="flex items-center gap-2.5 text-gray-700 text-[15px] hover:text-blue-600 transition-colors"
                  >
                    <Mail className="text-orange-500" size={17} />
                    info@travelindiatourism.com
                  </a>
                </div>

                <a
                  href="https://wa.me/919893539555"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-gray-700 text-[15px] hover:text-green-600 transition-colors"
                >
                  <WhatsAppIcon size={17} className="text-orange-500" />
                  Messege on Whatsapp &gt;&gt;
                </a>
              </div>
            </div>

            {/* Right: Location map image */}
            <div className="rounded-md overflow-hidden shadow-md">
              <img
                src="https://travelindiatourism.com/wp-content/uploads/2026/05/Screenshot-2026-05-26-151638.png"
                alt="Travel India Tourism Pvt Location Map"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Follow Us */}
      <section className="py-14 bg-[#fdf9e9] border-t border-b border-[#d7b16b]">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8 text-center ">
          <h3 className="text-[1.9rem] italic font-serif font-bold text-[#1a2b48] mb-3">
            Follow Us
          </h3>
          <p className="text-gray-500 text-xl mb-8">
            Stay connected with us for latest travel updates, offers, and
            destination inspiration.
          </p>
          <div className="flex items-center justify-center gap-8">
            <a
              href="https://www.facebook.com/TravelIndiaTourism"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-[#3b5998] hover:opacity-90 transition-opacity"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.youtube.com/@travelindiatourism1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-[#e02b2b] hover:opacity-90 transition-opacity"
            >
              <YoutubeIcon />
            </a>
            <a
              href="https://www.instagram.com/travelindiatourismpvtltd/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] hover:opacity-90 transition-opacity"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.linkedin.com/company/travel-india-tourism-pvt-ltd-/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-[#0a66c2] hover:opacity-90 transition-opacity"
            >
              <LinkedinIcon />
            </a>
            <a
              href="https://wa.me/919893539555"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-[#25D366] hover:opacity-90 transition-opacity"
            >
              <WhatsAppIcon size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* What Our Clients Say */}
      <section className="bg-[#f7f8fa] py-10 sm:py-12">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
          <div className="relative mb-7 text-center">
            <h2 className="font-serif text-[1.65rem] font-bold italic text-[#0a1b33] sm:text-3xl">
              What Our Clients Say
            </h2>
            <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 gap-3 sm:flex">
              <button
                type="button"
                onClick={() => setTestimonialPage((page) => (page - 1 + testimonials.length) % testimonials.length)}
                aria-label="Previous testimonials"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-100"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={() => setTestimonialPage((page) => (page + 1) % testimonials.length)}
                aria-label="Next testimonials"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-100"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {testimonials
              .map((_, offset) => testimonials[(testimonialPage + offset) % testimonials.length])
              .slice(0, 3)
              .map((item, i) => (
              <article
                key={`${testimonialPage}-${item.name}-${i}`}
                className="about-testimonial-card flex min-h-[220px] flex-col rounded-xl border border-gray-100 bg-white px-5 py-5 shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
              >
                <p className="text-base leading-relaxed text-gray-500 sm:text-md">
                  {item.text}
                </p>
                <div className="mt-auto pt-5">
                  <div className="mb-3 flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={18}
                        className="fill-[#ff765f] text-[#ff765f]"
                      />
                    ))}
                  </div>
                  <p className="font-serif text-base text-[#222222]">{item.name}</p>
                  <p className="mt-1 text-sm text-gray-500">{item.country}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-3" aria-label="Testimonial pages">
            {testimonials.map((_, page) => (
              <button
                key={page}
                type="button"
                onClick={() => setTestimonialPage(page)}
                aria-label={`Show testimonial page ${page + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${testimonialPage === page ? "bg-blue-600" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function WhatsAppIcon({ size = 24, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M20.52 3.449A11.815 11.815 0 0 0 12.04 0C5.495 0 .164 5.33.161 11.876c0 2.092.547 4.134 1.588 5.933L.057 24l6.335-1.664a11.9 11.9 0 0 0 5.643 1.424h.005c6.542 0 11.875-5.33 11.878-11.876a11.82 11.82 0 0 0-3.398-8.435zM12.04 21.76h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.759.986 1.003-3.666-.235-.376a9.86 9.86 0 0 1-1.511-5.236C2.145 6.45 6.579 2.016 12.04 2.016a9.82 9.82 0 0 1 6.987 2.898 9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.877-9.88 9.877z" />
    </svg>
  );
}
