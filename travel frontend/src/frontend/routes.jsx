import Home from './pages/Home';
import TourDetails from './pages/TourDetails';
import ContactUs from './pages/contactus';
import AboutUs from './pages/aboutus';
import AboutCsr from './pages/aboutcsr';
import GuestPhotos from './pages/guestphotos';
import VisaServices from './pages/visaservice';
import PrivacyPolicy from './pages/privacy';
import TermsAndConditions from './pages/TermsAndConditions';
import RefundPolicy from './pages/RefundPolicy';
import FAQSection from './pages/faq';
import CareersPage from './pages/CareersPage';
import BlogPage from './pages/BlogPage';

import LocationPage from './pages/IndiaPage';
import WorldPage from './pages/WorldPage';
import DestinationDetails from './pages/IndiaDestinationDetails';
import review from './components/GoogleReviews';
import NewsletterSection  from './pages/NewsletterSection';

/**
 * Frontend public routes config.
 * Add new pages here — App.jsx ko touch karne ki zarurat nahi.
 *
 * Shape: { path: string, element: JSX, index?: boolean }
 */
const frontendRoutes = [
  { index: true, element: <Home /> },
  { path: 'tour/:slug', element: <TourDetails /> },
  { path: 'location/world', element: <WorldPage /> },
  { path: 'location/world/:countrySlug', element: <WorldPage /> },
  { path: 'location/india', element: <LocationPage /> },
  { path: 'location/india/:stateSlug', element: <DestinationDetails /> },
  { path: 'location/:destId', element: <DestinationDetails /> },
  { path: 'about-us', element: <AboutUs /> },
  { path: 'csr-initiative', element: <AboutCsr /> },
  { path: 'guest-photos', element: <GuestPhotos /> },
  { path: 'contact', element: <ContactUs /> },
  { path: 'visa-services', element: <VisaServices /> },
  { path: 'privacy-policy', element: <PrivacyPolicy /> },
  { path: 'terms', element: <TermsAndConditions /> },
  { path: 'cancellation', element: <RefundPolicy /> },
  { path: 'faq', element: <FAQSection /> },
  { path: 'carrers', element: <CareersPage /> },
  { path: 'blog', element: <BlogPage /> },
  { path: 'google-reviews', element: <review /> }
];

export default frontendRoutes;