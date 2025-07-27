import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import CertificationsSection from "./CertificationsSection";
import TestimonialsSection from "./TestimonialsSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get(`${API}/portfolio`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
        setLoading(false);
      }
    };

    fetchPortfolioData();

    // Animation on load
    document.body.style.opacity = "0";
    setTimeout(() => {
      document.body.style.opacity = "1";
      document.body.style.transition = "opacity 0.8s ease-in-out";
    }, 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header />
      <HeroSection data={data.hero} />
      <AboutSection data={data.about} />
      <ServicesSection data={data.services} />
      <ExperienceSection data={data.experience} />
      <CertificationsSection data={data.certifications} />
      <TestimonialsSection data={data.testimonials} />
      <ContactSection data={data.contact} />
      <Footer />
    </div>
  );
};

export default HomePage;