import React from "react";
import { Button } from "./ui/button";
import { ArrowDown, Heart, Sparkles } from "lucide-react";

const HeroSection = ({ data }) => {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-emerald-200 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-blue-200 rounded-full"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 border border-amber-200 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2 bg-emerald-100 px-4 py-2 rounded-full">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-800 font-medium">Wellness & Healing Guide</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight">
          {data.name}
        </h1>

        <div className="flex items-center justify-center mb-6">
          <Heart className="w-6 h-6 text-rose-500 mr-2" />
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl">
            {data.tagline}
          </p>
          <Heart className="w-6 h-6 text-rose-500 ml-2" />
        </div>

        <p className="text-lg text-slate-600 max-w-4xl mx-auto mb-8 leading-relaxed">
          {data.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            onClick={scrollToContact}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Your Wellness Journey
          </Button>
          <Button
            onClick={scrollToAbout}
            variant="outline"
            className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3 rounded-full text-lg font-medium transition-all duration-300"
          >
            Learn My Story
          </Button>
        </div>

        <div className="animate-bounce">
          <button onClick={scrollToAbout}>
            <ArrowDown className="w-8 h-8 text-emerald-600 mx-auto" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;