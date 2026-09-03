import { useState } from "react";
import { ChevronLeft, ChevronRight, Info, Star } from "lucide-react";

/* =========================================================
   REVIEWS DATA
========================================================= */

const reviews = [
  {
    id: 1,
    name: "Akshita singh baghel",
    age: "1 year ago",
    text: "I have been on many trips with Travel India Tourism, with the most recent one being a week-long tour to Rameshwaram and Madurai and they have never failed ...",
    avatar: "AS",
    avatarClass: "bg-[#b7b2aa]",
  },
  {
    id: 2,
    name: "Shalini Shrivastava",
    age: "1 year ago",
    text: "Good Service. 👍 👍\nGood Experience 👍 👍",
    avatar: "S",
    avatarClass: "bg-[#684a43]",
  },
  {
    id: 3,
    name: "Shivam Singh",
    age: "1 year ago",
    text: "Amazing service, staff and management is very friendly and supportive.",
    avatar: "S",
    avatarClass: "bg-[#ef7200]",
  },
  {
    id: 4,
    name: "Akanksha Singh",
    age: "1 year ago",
    text: "Amazing team. Very professional and helpful staff. Everything went very smooth let be the Visa, finding hotels, booking tickets, customising itineraries, they gav...",
    avatar: "AS",
    avatarClass: "bg-[#59655e]",
  },
  {
    id: 5,
    name: "Hira Menghwani",
    age: "1 year ago",
    text: "Excellent job done by Meenakshi Ramani madam who is knowledgeable, sincere and polite. Best services rendered by Travel India...",
    avatar: "HM",
    avatarClass: "bg-[#aeb9c8]",
  },
  {
    id: 6,
    name: "yaseen khan",
    age: "1 year ago",
    text: "Excellent services and very supportive staff.",
    avatar: "YK",
    avatarClass: "bg-[#c6b8b0]",
  },
  {
    id: 7,
    name: "Anupma Sharma",
    age: "2 years ago",
    text: "A very well planned trip .Thanks .",
    avatar: "AS",
    avatarClass: "bg-[#9caaa1]",

    // Agar actual image hai to yaha URL daal sakte ho
    // avatarUrl: "YOUR_IMAGE_URL",
  },
];

/* =========================================================
   GOOGLE LOGO
========================================================= */

function GoogleLogo() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 48 48"
      aria-label="Google"
    >
      <path
        fill="#4285F4"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.66 30.47 0 24 0 14.61 0 6.52 5.38 2.56 13.22l7.98 6.19C12.43 13.25 17.74 9.5 24 9.5z"
      />

      <path
        fill="#34A853"
        d="M46.5 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.65c-.54 2.9-2.18 5.36-4.65 7.01l7.53 5.84C43.91 37.49 46.5 31.56 46.5 24.5z"
      />

      <path
        fill="#FBBC05"
        d="M10.54 28.59A14.47 14.47 0 0 1 9.5 24c0-1.59.37-3.12 1.04-4.59l-7.98-6.19A23.93 23.93 0 0 0 0 24c0 3.89.93 7.58 2.56 10.78l7.98-6.19z"
      />

      <path
        fill="#EA4335"
        d="M24 48c6.48 0 11.91-2.14 15.87-5.82l-7.53-5.84c-2.09 1.4-4.76 2.23-8.34 2.23-6.26 0-11.57-3.75-13.46-9.09l-7.98 6.19C6.52 42.62 14.61 48 24 48z"
      />
    </svg>
  );
}

/* =========================================================
   VERIFIED BADGE
========================================================= */

function VerifiedBadge() {
  return (
    <span
      className="
        ml-2
        flex
        h-[19px]
        w-[19px]
        items-center
        justify-center
        rounded-full
        bg-[#4285F4]
        text-white
      "
      title="Verified review"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m5 12 4 4L19 6" />
      </svg>
    </span>
  );
}

/* =========================================================
   REVIEW STARS
========================================================= */

function ReviewStars() {
  return (
    <div
      className="flex items-center"
      aria-label="5 out of 5 stars"
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={21}
          fill="#FBBC04"
          strokeWidth={0}
          className="text-[#FBBC04]"
        />
      ))}

      <VerifiedBadge />
    </div>
  );
}

/* =========================================================
   REVIEW CARD
========================================================= */

function ReviewCard({ review }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article
      className="
        min-h-[220px]
        w-full
        overflow-hidden
        rounded-[16px]
        border
        border-[#d9d9d9]
        bg-white
        px-5
        py-4
        transition-all
        duration-300
        hover:shadow-md
      "
    >
      {/* ================================================
          TOP HEADER
      ================================================= */}

      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-4">

          {/* Avatar */}

          <div
            className={`
              flex
              h-[50px]
              w-[50px]
              flex-shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-full
              text-sm
              font-semibold
              text-white
              ${review.avatarClass}
            `}
          >
            {review.avatarUrl ? (
              <img
                src={review.avatarUrl}
                alt={review.name}
                className="h-full w-full object-cover"
              />
            ) : (
              review.avatar
            )}
          </div>

          {/* Name + Date */}

          <div className="min-w-0">
            <h3
              className="
                truncate
                text-[17px]
                font-semibold
                leading-tight
                text-[#111111]
              "
            >
              {review.name}
            </h3>

            <p className="mt-1 text-[15px] text-[#888888]">
              {review.age}
            </p>
          </div>
        </div>

        {/* Google Logo */}

        <div className="flex-shrink-0">
          <GoogleLogo />
        </div>
      </div>

      {/* ================================================
          STARS
      ================================================= */}

      <div className="mt-3">
        <ReviewStars />
      </div>

      {/* ================================================
          REVIEW TEXT
      ================================================= */}

      <p
        className={`mt-3 overflow-hidden whitespace-pre-line text-[15px] leading-[1.45] text-[#111111] ${
          isExpanded ? 'line-clamp-none' : 'line-clamp-3'
        }`}
      >
        {review.text}
      </p>

      {/* ================================================
          READ MORE
      ================================================= */}

      {review.text.includes("...") && (
        <button
          type="button"
          onClick={() => setIsExpanded((expanded) => !expanded)}
          aria-expanded={isExpanded}
          className="mt-auto pt-2 text-left text-[14px] text-[#777777] transition-colors hover:text-[#333333]"
        >
          {isExpanded ? 'Hide' : 'Read more'}
        </button>
      )}
    </article>
  );
}

/* =========================================================
   MAIN GOOGLE REVIEWS COMPONENT
========================================================= */

export default function GoogleReviews() {
  const [page, setPage] = useState(0);

  // Desktop par 3 cards
  const cardsPerPage = 3;

  const pageCount = Math.ceil(
    reviews.length / cardsPerPage
  );

  const visibleReviews = reviews.slice(
    page * cardsPerPage,
    page * cardsPerPage + cardsPerPage
  );

  /* ================================================
     PREVIOUS
  ================================================= */

  const handlePrevious = () => {
    setPage((currentPage) =>
      currentPage > 0
        ? currentPage - 1
        : pageCount - 1
    );
  };

  /* ================================================
     NEXT
  ================================================= */

  const handleNext = () => {
    setPage((currentPage) =>
      currentPage < pageCount - 1
        ? currentPage + 1
        : 0
    );
  };

  return (
    <section
      className="bg-white py-6 sm:py-8"
      aria-labelledby="google-reviews-title"
    >
      <div
        className="
          mx-auto
          flex
          max-w-[1400px]
          flex-col
          gap-4
          px-5
          lg:flex-row
          lg:items-center
          lg:gap-6
          lg:px-8
        "
      >

        {/* =================================================
            LEFT GOOGLE SUMMARY
        ================================================= */}

        <div
          className="
            w-full
            text-center
            lg:w-[20%]
            lg:shrink-0
          "
        >
          {/* Heading */}

          <h2
            id="google-reviews-title"
            className="
              text-2xl
              font-semibold
              text-[#111111]
              sm:text-2xl
            "
          >
            EXCELLENT
          </h2>

          {/* Overall Stars */}

          <div
            className="
              mt-3
              flex
              justify-center
              gap-0.5
            "
            aria-label="4 out of 5 stars"
          >
            {[1, 2, 3, 4].map((star) => (
              <Star
                key={star}
                size={30}
                fill="#FBBC04"
                strokeWidth={0}
                className="text-[#FBBC04]"
              />
            ))}

            <Star
              size={30}
              fill="#c9c9c9"
              strokeWidth={0}
              className="text-[#c9c9c9]"
            />
          </div>

          {/* Reviews Count */}

          <p className="mt-2 text-base text-[#111111]">
            Based on <strong>73 reviews</strong>
          </p>

          {/* Google Text */}

          <div
            className="
              mt-1
              text-3xl
              font-semibold
              tracking-tight
            "
            aria-label="Google"
          >
            <span className="text-[#4285f4]">G</span>
            <span className="text-[#ea4335]">o</span>
            <span className="text-[#fbbc04]">o</span>
            <span className="text-[#4285f4]">g</span>
            <span className="text-[#34a853]">l</span>
            <span className="text-[#ea4335]">e</span>
          </div>
        </div>

        {/* =================================================
            RIGHT REVIEWS
        ================================================= */}

        <div className="min-w-0 flex-1">

          <div className="relative">

            {/* =============================================
                REVIEW CARDS
            ============================================= */}

            <div
              className="
                grid
                grid-cols-1
                gap-5
                md:grid-cols-2
                xl:grid-cols-3
              "
            >
              {visibleReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                />
              ))}
            </div>

            {/* =============================================
                PREVIOUS BUTTON
            ============================================= */}

            <button
              type="button"
              onClick={handlePrevious}
              aria-label="Previous reviews"
              className="
                absolute
                -left-5
                top-1/2
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-[#d9d9d9]
                bg-white
                text-[#555555]
                shadow-sm
                transition-all
                duration-200
                hover:bg-[#f5f5f5]
                hover:shadow-md
              "
            >
              <ChevronLeft size={20} />
            </button>

            {/* =============================================
                NEXT BUTTON
            ============================================= */}

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next reviews"
              className="
                absolute
                -right-5
                top-1/2
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-[#d9d9d9]
                bg-white
                text-[#555555]
                shadow-sm
                transition-all
                duration-200
                hover:bg-[#f5f5f5]
                hover:shadow-md
              "
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* =================================================
              BOTTOM INFO
          ================================================= */}

          <div
            className="
              mt-4
              flex
              items-center
              justify-between
              gap-2
              px-1
              text-base
              text-[#111111]
            "
          >
            <span>
              Showing our latest reviews
            </span>

            <span
              className="
                inline-flex
                items-center
                gap-1
                rounded
                bg-[#d9f5e9]
                px-4
                py-1
                text-sm
                font-semibold
              "
            >
              Verified by Trustindex
              <Info size={12} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}