import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Briefcase, Clock } from "lucide-react";

const ExperienceSection = ({ data }) => {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Professional Experience
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Every step of my journey has contributed to my understanding of human connection, 
            business, and the importance of holistic wellness.
          </p>
        </div>

        <div className="grid gap-8 max-w-4xl mx-auto">
          {data.map((experience, index) => (
            <Card 
              key={experience.id}
              className="bg-gradient-to-r from-white to-slate-50 border-l-4 border-emerald-500 hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-100 p-3 rounded-full">
                      <Briefcase className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-800 mb-1">
                        {experience.role}
                      </CardTitle>
                      <p className="text-emerald-600 font-semibold mb-2">
                        {experience.organization}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="flex items-center space-x-1 bg-emerald-100 text-emerald-800 self-start md:self-center"
                  >
                    <Clock className="w-3 h-3" />
                    <span>{experience.duration}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed">
                  {experience.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              From Diverse Backgrounds to Holistic Wellness
            </h3>
            <p className="text-slate-700 max-w-4xl mx-auto leading-relaxed">
              My unique journey - from teaching children to building a business, and now 
              guiding adults in wellness - has given me a rare perspective on human connection, 
              patience, and the courage to pursue one's calling. This diverse background allows 
              me to connect with people from all walks of life and understand their unique wellness needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;