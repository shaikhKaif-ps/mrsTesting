// src/App.jsx
import "./App.css";
import React, { useState, useEffect } from "react";
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
import PostDetails from "./pages/Blogs/postDetails";
import postsData from "./pages/Blogs/postsData";
import BlogArchive from "./pages/Blogs/BlogArchive";
import CareersPage from "./pages/careers";
import ArtsPage from "./pages/Sectors/arts";
import RenewableEnergyPage from "./pages/Sectors/renewableEnergy";
import IndustrialSectorPage from "./pages/Sectors/industrialSector";
import ChemicalsPage from "./pages/Sectors/chemicals";
import EcommercePage from "./pages/Sectors/e-commerce";
import ManufacturingPage from "./pages/Sectors/manufacturing";
import Privacypage from "./pages/privacy";
import SafetyPage from "./pages/safety";
import ImportanMagement from "./pages/Services/ImportManagement";

import QuoteForm from "./components/global/popupForm/QuoteForm";

const App = ({ url }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (e) => {
    e.preventDefault();
    setIsPopupOpen(true);
  };
  const closePopup = () => setIsPopupOpen(false);

  const getCurrentPath = () => {
    if (typeof window !== "undefined") return window.location.pathname;
    return url || "/";
  };

  const renderPostDetails = () => {
    const currentPath = getCurrentPath();
    const postSlug = currentPath.split("/").pop();
    console.log(postSlug);
    const selectedPost = postsData.find((post) => post.slug === postSlug);

    if (selectedPost) {
      return (
        <PostDetails
          title={selectedPost.title}
          content={selectedPost.content}
          featureImage={selectedPost.featureImage}
          category={selectedPost.category}
          metaTitle={selectedPost.metaTitle}
          metaDescription={selectedPost.metaDescription}
          ogImage={selectedPost.ogImage}
          schema={selectedPost.schema}
          publishDate={selectedPost.publishDate}
        />
      );
    } else {
      return <div>Post not found</div>;
    }
  };

  const routes = {
    "/": <Homepage />,
    "/about": <Aboutpage />,
    "/careers": <CareersPage />,
    "/contact-us": <Contact />,
    "/privacy-policy": <Privacypage />,
    "/safety-policy": <SafetyPage />,
    // Services
    "/services/multiuser-warehousing": <MultiuserWarehousing />,
    "/services/road-and-rail-transport": <RoadRailTransport />,
    "/services/pioneering-duty-free-warehousing-solutions": (
      <PioneeringWarehousing />
    ),
    "/services/in-plant-warehouse-management": <InplantWarehouse />,
    "/services/customs-brokerage-and-regulatory-compliance": (
      <CustomsBrokerageCompliance />
    ),
    "/services/import-management": <ImportanMagement />,
    "/services/tech-driven-last-mile-delivery-services": <TechDrivenService />,
    // Sectors
    "/sector/arts-exhibitions-and-luxury-Goods": <ArtsPage />,
    "/sector/renewable-energy-and-infrastructure-projects": (
      <RenewableEnergyPage />
    ),
    "/sector/industrial-sector": <IndustrialSectorPage />,
    "/sector/chemicals-construction-energy-and-agriculture": <ChemicalsPage />,
    "/sector/e-commerce-and-retail": <EcommercePage />,
    "/sector/manufacturing-automotive-technology-and-consumer-goods": (
      <ManufacturingPage />
    ),
    // Blogs
    "/blog": <BlogArchive />,
    [`/blog/${postsData[0].slug}`]: renderPostDetails(),
    [`/blog/${postsData[1].slug}`]: renderPostDetails(),
    [`/blog/${postsData[2].slug}`]: renderPostDetails(),
    [`/blog/${postsData[3].slug}`]: renderPostDetails(),
    [`/blog/${postsData[4].slug}`]: renderPostDetails(),
    [`/blog/${postsData[5].slug}`]: renderPostDetails(),
    [`/blog/${postsData[6].slug}`]: renderPostDetails(),
    [`/blog/${postsData[7].slug}`]: renderPostDetails(),
    [`/blog/${postsData[8].slug}`]: renderPostDetails(),
    [`/blog/${postsData[9].slug}`]: renderPostDetails(),
    [`/blog/${postsData[10].slug}`]: renderPostDetails(),
    [`/blog/${postsData[11].slug}`]: renderPostDetails(),
    [`/blog/${postsData[12].slug}`]: renderPostDetails(),
    [`/blog/${postsData[13].slug}`]: renderPostDetails(),
    [`/blog/${postsData[14].slug}`]: renderPostDetails(),
    [`/blog/${postsData[15].slug}`]: renderPostDetails(),
    [`/blog/${postsData[16].slug}`]: renderPostDetails(),
    [`/blog/${postsData[17].slug}`]: renderPostDetails(),
    // [`/blog/${postsData[9].slug}`]: renderPostDetails(),
    // Add more entries for additional posts if needed
  };

  return (
    <>
      {/* <QuoteForm /> */}
      <div className="popupParent">
        <button className="quote-button" onClick={openPopup}>
          Let's Connect
        </button>
      </div>
      {routes[getCurrentPath()]}
      <QuoteForm isOpen={isPopupOpen} togglePopup={closePopup} />
    </>
  );
};

export default App;
