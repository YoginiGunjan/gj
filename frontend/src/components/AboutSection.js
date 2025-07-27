import React from "react";
import { Card } from "./ui/card";
import { MapPin, Heart, Star, BookOpen } from "lucide-react";

const AboutSection = ({ data }) => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            {data.title}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {data.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6">
              My Professional Journey
            </h3>
            {data.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Star className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                <p className="text-slate-700 font-medium">{highlight}</p>
              </div>
            ))}
          </div>

          <Card className="p-8 bg-gradient-to-br from-emerald-50 to-blue-50 border-0 shadow-lg">
            <div className="flex items-center mb-6">
              <MapPin className="w-6 h-6 text-emerald-600 mr-3" />
              <h3 className="text-xl font-semibold text-slate-800">Current Focus</h3>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              {data.currentFocus}
            </p>
            <div className="flex items-center justify-center mt-6">
              <Heart className="w-5 h-5 text-rose-500 mr-2" />
              <span className="text-sm text-slate-600 italic">
                "Wellness is not a destination, but a way of living."
              </span>
              <Heart className="w-5 h-5 text-rose-500 ml-2" />
            </div>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-emerald-100 via-white to-blue-100 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <BookOpen className="w-12 h-12 text-emerald-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Continuous Learning & Growth
            </h3>
            <p className="text-slate-700 max-w-3xl mx-auto">
              Currently expanding my expertise through AI tools training with Outskills, 
              demonstrating my commitment to staying current and leveraging technology 
              to better serve my wellness community. This blend of ancient wisdom and 
              modern innovation allows me to offer uniquely comprehensive wellness solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;