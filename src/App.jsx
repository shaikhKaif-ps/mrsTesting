// // src/App.jsx
// import "./App.css";
// import React, { useState, useEffect } from "react";
// import Homepage from "./pages/home";
// import Aboutpage from "./pages/about";
// import Blogpage from "./pages/blogs";
// import Contact from "./pages/contact";
// import MultiuserWarehousing from "./pages/Services/multiuserWarehousing";
// import RoadRailTransport from "./pages/Services/roadRailTransport";
// import PioneeringWarehousing from "./pages/Services/pioneeringWarehousing";
// import InplantWarehouse from "./pages/Services/inPlantWarehousing";
// import CustomsBrokerageCompliance from "./pages/Services/customsBrokerageCompliance";
// import TechDrivenService from "./pages/Services/TechDrivenLastMileDeliveryServices";
// import PostDetails from "./pages/Blogs/postDetails";
// import postsData from "./pages/Blogs/postsData";
// import BlogArchive from "./pages/Blogs/BlogArchive";
// import CareersPage from "./pages/careers";
// import ArtsPage from "./pages/Sectors/arts";
// import RenewableEnergyPage from "./pages/Sectors/renewableEnergy";
// import IndustrialSectorPage from "./pages/Sectors/industrialSector";
// import ChemicalsPage from "./pages/Sectors/chemicals";
// import EcommercePage from "./pages/Sectors/e-commerce";
// import ManufacturingPage from "./pages/Sectors/manufacturing";
// import Privacypage from "./pages/privacy";
// import SafetyPage from "./pages/safety";
// import ImportanMagement from "./pages/Services/ImportManagement";

// import QuoteForm from "./components/global/popupForm/QuoteForm";

// const App = ({ url }) => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   const openPopup = (e) => {
//     e.preventDefault();
//     setIsPopupOpen(true);
//   };
//   const closePopup = () => setIsPopupOpen(false);

//   const getCurrentPath = () => {
//     if (typeof window !== "undefined") return window.location.pathname;
//     return url || "/";
//   };

//   const renderPostDetails = () => {
//     const currentPath = getCurrentPath();
//     const postSlug = currentPath.split("/").pop();
//     console.log(postSlug);
//     const selectedPost = postsData.find((post) => post.slug === postSlug);

//     if (selectedPost) {
//       return (
//         <PostDetails
//           title={selectedPost.title}
//           content={selectedPost.content}
//           featureImage={selectedPost.featureImage}
//           category={selectedPost.category}
//           metaTitle={selectedPost.metaTitle}
//           metaDescription={selectedPost.metaDescription}
//           ogImage={selectedPost.ogImage}
//           schema={selectedPost.schema}
//           publishDate={selectedPost.publishDate}
//         />
//       );
//     } else {
//       return <div>Post not found</div>;
//     }
//   };

//   const routes = {
//     "/": <Homepage />,
//     "/about": <Aboutpage />,
//     "/careers": <CareersPage />,
//     "/contact-us": <Contact />,
//     "/privacy-policy": <Privacypage />,
//     "/safety-policy": <SafetyPage />,
//     // Services
//     "/services/multiuser-warehousing": <MultiuserWarehousing />,
//     "/services/road-and-rail-transport": <RoadRailTransport />,
//     "/services/pioneering-duty-free-warehousing-solutions": (
//       <PioneeringWarehousing />
//     ),
//     "/services/in-plant-warehouse-management": <InplantWarehouse />,
//     "/services/customs-brokerage-and-regulatory-compliance": (
//       <CustomsBrokerageCompliance />
//     ),
//     "/services/import-management": <ImportanMagement />,
//     "/services/tech-driven-last-mile-delivery-services": <TechDrivenService />,
//     // Sectors
//     "/sector/arts-exhibitions-and-luxury-Goods": <ArtsPage />,
//     "/sector/renewable-energy-and-infrastructure-projects": (
//       <RenewableEnergyPage />
//     ),
//     "/sector/industrial-sector": <IndustrialSectorPage />,
//     "/sector/chemicals-construction-energy-and-agriculture": <ChemicalsPage />,
//     "/sector/e-commerce-and-retail": <EcommercePage />,
//     "/sector/manufacturing-automotive-technology-and-consumer-goods": (
//       <ManufacturingPage />
//     ),
//     // Blogs
//     "/blog": <BlogArchive />,
//     [`/blog/${postsData[0].slug}`]: renderPostDetails(),
//     [`/blog/${postsData[1].slug}`]: renderPostDetails(),
//     [`/blog/${postsData[2].slug}`]: renderPostDetails(),
//     [`/blog/${postsData[3].slug}`]: renderPostDetails(),
//     [`/blog/${postsData[4].slug}`]: renderPostDetails(),
//     [`/blog/${postsData[5].slug}`]: renderPostDetails(),
//     [`/blog/${postsData[6].slug}`]: renderPostDetails(),
//     [`/blog/${postsData[7].slug}`]: renderPostDetails(),
//     [`/blog/${postsData[8].slug}`]: renderPostDetails(),
//     [`/blog/${postsData[9].slug}`]: renderPostDetails(),
//     [`/blog/${postsData[10].slug}`]: renderPostDetails(),
//     [`/blog/${postsData[11].slug}`]: renderPostDetails(),
//     [`/blog/${postsData[12].slug}`]: renderPostDetails(),
//     [`/blog/${postsData[13].slug}`]: renderPostDetails(),
//     [`/blog/${postsData[14].slug}`]: renderPostDetails(),
//     [`/blog/${postsData[15].slug}`]: renderPostDetails(),
//     [`/blog/${postsData[16].slug}`]: renderPostDetails(),
//     [`/blog/${postsData[17].slug}`]: renderPostDetails(),
//     // [`/blog/${postsData[9].slug}`]: renderPostDetails(),
//     // Add more entries for additional posts if needed
//   };

//   return (
//     <>
//       {/* <QuoteForm /> */}
//       <div className="popupParent">
//         <button className="quote-button" onClick={openPopup}>
//           Let's Connect
//         </button>
//       </div>
//       {routes[getCurrentPath()]}
//       <QuoteForm isOpen={isPopupOpen} togglePopup={closePopup} />
//     </>
//   );
// };

// export default App;
// =====================
// =====================
// =====================
// import "./App.css";
// import React, { useState } from "react";
// import { Routes, Route } from "react-router-dom";

// // Pages
// import Homepage from "./pages/home";
// import Aboutpage from "./pages/about";
// import Blogpage from "./pages/blogs";
// import Contact from "./pages/contact";
// import MultiuserWarehousing from "./pages/Services/multiuserWarehousing";
// import RoadRailTransport from "./pages/Services/roadRailTransport";
// import PioneeringWarehousing from "./pages/Services/pioneeringWarehousing";
// import InplantWarehouse from "./pages/Services/inPlantWarehousing";
// import CustomsBrokerageCompliance from "./pages/Services/customsBrokerageCompliance";
// import TechDrivenService from "./pages/Services/TechDrivenLastMileDeliveryServices";
// import ImportanMagement from "./pages/Services/ImportManagement";
// import CareersPage from "./pages/careers";
// import Privacypage from "./pages/privacy";
// import SafetyPage from "./pages/safety";

// // Sectors
// import ArtsPage from "./pages/Sectors/arts";
// import RenewableEnergyPage from "./pages/Sectors/renewableEnergy";
// import IndustrialSectorPage from "./pages/Sectors/industrialSector";
// import ChemicalsPage from "./pages/Sectors/chemicals";
// import EcommercePage from "./pages/Sectors/e-commerce";
// import ManufacturingPage from "./pages/Sectors/manufacturing";

// // Blogs
// import BlogArchive from "./pages/Blogs/BlogArchive";
// import PostDetails from "./pages/Blogs/postDetails";
// import postsData from "./pages/Blogs/postsData";

// // Components
// import QuoteForm from "./components/global/popupForm/QuoteForm";

// const App = () => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   const openPopup = (e) => {
//     e.preventDefault();
//     setIsPopupOpen(true);
//   };
//   const closePopup = () => setIsPopupOpen(false);

//   return (
//     <>
//       <div className="popupParent">
//         <button className="quote-button" onClick={openPopup}>
//           Let's Connect
//         </button>
//       </div>

//       <Routes>
//         {/* Static pages */}
//         <Route path="/" element={<Homepage />} />
//         <Route path="/about" element={<Aboutpage />} />
//         <Route path="/careers" element={<CareersPage />} />
//         <Route path="/contact-us" element={<Contact />} />
//         <Route path="/privacy-policy" element={<Privacypage />} />
//         <Route path="/safety-policy" element={<SafetyPage />} />

//         {/* Services */}
//         <Route
//           path="/services/multiuser-warehousing"
//           element={<MultiuserWarehousing />}
//         />
//         <Route
//           path="/services/road-and-rail-transport"
//           element={<RoadRailTransport />}
//         />
//         <Route
//           path="/services/pioneering-duty-free-warehousing-solutions"
//           element={<PioneeringWarehousing />}
//         />
//         <Route
//           path="/services/in-plant-warehouse-management"
//           element={<InplantWarehouse />}
//         />
//         <Route
//           path="/services/customs-brokerage-and-regulatory-compliance"
//           element={<CustomsBrokerageCompliance />}
//         />
//         <Route
//           path="/services/import-management"
//           element={<ImportanMagement />}
//         />
//         <Route
//           path="/services/tech-driven-last-mile-delivery-services"
//           element={<TechDrivenService />}
//         />

//         {/* Sectors */}
//         <Route
//           path="/sector/arts-exhibitions-and-luxury-Goods"
//           element={<ArtsPage />}
//         />
//         <Route
//           path="/sector/renewable-energy-and-infrastructure-projects"
//           element={<RenewableEnergyPage />}
//         />
//         <Route
//           path="/sector/industrial-sector"
//           element={<IndustrialSectorPage />}
//         />
//         <Route
//           path="/sector/chemicals-construction-energy-and-agriculture"
//           element={<ChemicalsPage />}
//         />
//         <Route
//           path="/sector/e-commerce-and-retail"
//           element={<EcommercePage />}
//         />
//         <Route
//           path="/sector/manufacturing-automotive-technology-and-consumer-goods"
//           element={<ManufacturingPage />}
//         />

//         {/* Blogs */}
//         <Route path="/blog" element={<BlogArchive />} />
//         <Route
//           path="/blog/:slug"
//           element={<PostDetails postsData={postsData} />}
//         />
//       </Routes>

//       <QuoteForm isOpen={isPopupOpen} togglePopup={closePopup} />
//     </>
//   );
// };

// export default App;
// ==================
// ==================
// ==================
// src/App.jsx
// import "./App.css";
// import React, { useState } from "react";
// import { Routes, Route } from "react-router-dom";

// // ✅ Pages
// import Homepage from "./pages/home";
// import Aboutpage from "./pages/about";
// import Blogpage from "./pages/blogs";
// import Contact from "./pages/contact";
// import MultiuserWarehousing from "./pages/Services/multiuserWarehousing";
// import RoadRailTransport from "./pages/Services/roadRailTransport";
// import PioneeringWarehousing from "./pages/Services/pioneeringWarehousing";
// import InplantWarehouse from "./pages/Services/inPlantWarehousing";
// import CustomsBrokerageCompliance from "./pages/Services/customsBrokerageCompliance";
// import TechDrivenService from "./pages/Services/TechDrivenLastMileDeliveryServices";
// import ImportanMagement from "./pages/Services/ImportManagement";
// import CareersPage from "./pages/careers";
// import Privacypage from "./pages/privacy";
// import SafetyPage from "./pages/safety";

// // ✅ Sectors
// import ArtsPage from "./pages/Sectors/arts";
// import RenewableEnergyPage from "./pages/Sectors/renewableEnergy";
// import IndustrialSectorPage from "./pages/Sectors/industrialSector";
// import ChemicalsPage from "./pages/Sectors/chemicals";
// import EcommercePage from "./pages/Sectors/e-commerce";
// import ManufacturingPage from "./pages/Sectors/manufacturing";

// // ✅ Blogs
// import BlogArchive from "./pages/Blogs/BlogArchive";
// import PostDetails from "./pages/Blogs/postDetails";
// import postsData from "./pages/Blogs/postsData";

// // ✅ Components
// import QuoteForm from "./components/global/popupForm/QuoteForm";

// const App = () => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   const openPopup = (e) => {
//     e.preventDefault();
//     setIsPopupOpen(true);
//   };
//   const closePopup = () => setIsPopupOpen(false);

//   return (
//     <>
//       <div className="popupParent">
//         <button className="quote-button" onClick={openPopup}>
//           Let's Connect
//         </button>
//       </div>

//       <Routes>
//         {/* 🌐 Main Routes */}
//         <Route path="/" element={<Homepage />} />
//         <Route path="/about" element={<Aboutpage />} />
//         <Route path="/careers" element={<CareersPage />} />
//         <Route path="/contact-us" element={<Contact />} />
//         <Route path="/privacy-policy" element={<Privacypage />} />
//         <Route path="/safety-policy" element={<SafetyPage />} />

//         {/* ⚙️ Services */}
//         <Route
//           path="/services/multiuser-warehousing"
//           element={<MultiuserWarehousing />}
//         />
//         <Route
//           path="/services/road-and-rail-transport"
//           element={<RoadRailTransport />}
//         />
//         <Route
//           path="/services/pioneering-duty-free-warehousing-solutions"
//           element={<PioneeringWarehousing />}
//         />
//         <Route
//           path="/services/in-plant-warehouse-management"
//           element={<InplantWarehouse />}
//         />
//         <Route
//           path="/services/customs-brokerage-and-regulatory-compliance"
//           element={<CustomsBrokerageCompliance />}
//         />
//         <Route
//           path="/services/import-management"
//           element={<ImportanMagement />}
//         />
//         <Route
//           path="/services/tech-driven-last-mile-delivery-services"
//           element={<TechDrivenService />}
//         />

//         {/* 🏭 Sectors */}
//         <Route
//           path="/sector/arts-exhibitions-and-luxury-Goods"
//           element={<ArtsPage />}
//         />
//         <Route
//           path="/sector/renewable-energy-and-infrastructure-projects"
//           element={<RenewableEnergyPage />}
//         />
//         <Route
//           path="/sector/industrial-sector"
//           element={<IndustrialSectorPage />}
//         />
//         <Route
//           path="/sector/chemicals-construction-energy-and-agriculture"
//           element={<ChemicalsPage />}
//         />
//         <Route
//           path="/sector/e-commerce-and-retail"
//           element={<EcommercePage />}
//         />
//         <Route
//           path="/sector/manufacturing-automotive-technology-and-consumer-goods"
//           element={<ManufacturingPage />}
//         />

//         {/* 📰 Blogs */}
//         <Route path="/blog" element={<BlogArchive />} />
//         <Route
//           path="/blog/:slug"
//           element={<DynamicPostDetails postsData={postsData} />}
//         />
//       </Routes>

//       <QuoteForm isOpen={isPopupOpen} togglePopup={closePopup} />
//     </>
//   );
// };

// // ✅ Helper component for dynamic blog detail rendering
// const DynamicPostDetails = ({ postsData }) => {
//   const { slug } = React.useParams();
//   const post = postsData.find((p) => p.slug === slug);

//   if (!post) return <div>Post not found</div>;

//   return (
//     <PostDetails
//       title={post.title}
//       content={post.content}
//       featureImage={post.featureImage}
//       category={post.category}
//       metaTitle={post.metaTitle}
//       metaDescription={post.metaDescription}
//       ogImage={post.ogImage}
//       schema={post.schema}
//       publishDate={post.publishDate}
//     />
//   );
// };

// export default App;
// ======================
// ======================
// ======================
// src/App.jsx
import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// ✅ Pages
import Homepage from "./pages/home";
import Aboutpage from "./pages/about";
import Blogpage from "./pages/blogs";
import Contact from "./pages/contact";
import MultiuserWarehousing from "./pages/Services/multiuserWarehousing";
import RoadRailTransport from "./pages/Services/roadRailTransport";
import PioneeringWarehousing from "./pages/Services/pioneeringWarehousing";
import InplantWarehouse from "./pages/Services/inPlantWarehousing";
import CustomsBrokerageCompliance from "./pages/Services/customsBrokerageCompliance";
import TechDrivenService from "./pages/Services/TechDrivenLastMileDeliveryServices";
import ImportanMagement from "./pages/Services/ImportManagement";
import CareersPage from "./pages/careers";
import Privacypage from "./pages/privacy";
import SafetyPage from "./pages/safety";

// ✅ Sectors
import ArtsPage from "./pages/Sectors/arts";
import RenewableEnergyPage from "./pages/Sectors/renewableEnergy";
import IndustrialSectorPage from "./pages/Sectors/industrialSector";
import ChemicalsPage from "./pages/Sectors/chemicals";
import EcommercePage from "./pages/Sectors/e-commerce";
import ManufacturingPage from "./pages/Sectors/manufacturing";

// ✅ Blogs
import BlogArchive from "./pages/Blogs/BlogArchive";
import PostDetails from "./pages/Blogs/postDetails";
import postsData from "./pages/Blogs/postsData";

import { useParams } from "react-router-dom";

// ✅ Components
import QuoteForm from "./components/global/popupForm/QuoteForm";

const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (e) => {
    e.preventDefault();
    setIsPopupOpen(true);
  };
  const closePopup = () => setIsPopupOpen(false);

  return (
    <>
      <div className="popupParent">
        <button className="quote-button" onClick={openPopup}>
          Let's Connect
        </button>
      </div>

      <Routes>
        {/* 🌐 Main Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/privacy-policy" element={<Privacypage />} />
        <Route path="/safety-policy" element={<SafetyPage />} />

        {/* ⚙️ Services */}
        <Route
          path="/services/multiuser-warehousing"
          element={<MultiuserWarehousing />}
        />
        <Route
          path="/services/road-and-rail-transport"
          element={<RoadRailTransport />}
        />
        <Route
          path="/services/pioneering-duty-free-warehousing-solutions"
          element={<PioneeringWarehousing />}
        />
        <Route
          path="/services/in-plant-warehouse-management"
          element={<InplantWarehouse />}
        />
        <Route
          path="/services/customs-brokerage-and-regulatory-compliance"
          element={<CustomsBrokerageCompliance />}
        />
        <Route
          path="/services/import-management"
          element={<ImportanMagement />}
        />
        <Route
          path="/services/tech-driven-last-mile-delivery-services"
          element={<TechDrivenService />}
        />

        {/* 🏭 Sectors */}
        <Route
          path="/sector/arts-exhibitions-and-luxury-Goods"
          element={<ArtsPage />}
        />
        <Route
          path="/sector/renewable-energy-and-infrastructure-projects"
          element={<RenewableEnergyPage />}
        />
        <Route
          path="/sector/industrial-sector"
          element={<IndustrialSectorPage />}
        />
        <Route
          path="/sector/chemicals-construction-energy-and-agriculture"
          element={<ChemicalsPage />}
        />
        <Route
          path="/sector/e-commerce-and-retail"
          element={<EcommercePage />}
        />
        <Route
          path="/sector/manufacturing-automotive-technology-and-consumer-goods"
          element={<ManufacturingPage />}
        />

        {/* 📰 Blogs */}
        <Route path="/blog" element={<BlogArchive />} />
        <Route
          path="/blog/:slug"
          element={<DynamicPostDetails postsData={postsData} />}
        />
      </Routes>

      <QuoteForm isOpen={isPopupOpen} togglePopup={closePopup} />
    </>
  );
};

// ✅ Helper component for dynamic blog detail rendering
const DynamicPostDetails = ({ postsData }) => {
  // const { slug } = React.useParams();
  const { slug } = useParams();
  const post = postsData.find((p) => p.slug === slug);

  if (!post) return <div>Post not found</div>;

  return (
    <PostDetails
      title={post.title}
      content={post.content}
      featureImage={post.featureImage}
      category={post.category}
      metaTitle={post.metaTitle}
      metaDescription={post.metaDescription}
      ogImage={post.ogImage}
      schema={post.schema}
      publishDate={post.publishDate}
    />
  );
};

export default App;
