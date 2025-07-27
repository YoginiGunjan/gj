import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Award, Calendar, BookOpen } from "lucide-react";

const CertificationsSection = ({ data }) => {
  return (
    <section id="certifications" className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Certifications & Qualifications
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Continuous learning and professional development ensure I provide 
            the highest quality wellness services based on proven methodologies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((cert) => (
            <Card 
              key={cert.id}
              className="bg-white border hover:shadow-xl transition-all duration-300 group"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <Award className="w-6 h-6 text-emerald-600" />
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="flex items-center space-x-1 bg-blue-100 text-blue-800"
                  >
                    <Calendar className="w-3 h-3" />
                    <span>{cert.year}</span>
                  </Badge>
                </div>
                <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                  {cert.title}
                </CardTitle>
                <p className="text-emerald-600 font-semibold text-sm">
                  {cert.issuer}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {cert.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <Card className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white border-0">
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 text-white mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">
                Commitment to Excellence
              </h3>
              <p className="text-emerald-50 max-w-3xl mx-auto leading-relaxed">
                Each certification represents not just a milestone in my education, 
                but a commitment to providing safe, effective, and transformative 
                wellness experiences. I continue to expand my knowledge to serve 
                my community with the latest proven techniques in yoga and sound healing.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;