import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowRight } from "lucide-react";

const ServicesSection = ({ data }) => {
  const colorClasses = {
    emerald: "from-emerald-50 to-emerald-100 border-emerald-200",
    rose: "from-rose-50 to-rose-100 border-rose-200",
    violet: "from-violet-50 to-violet-100 border-violet-200",
    blue: "from-blue-50 to-blue-100 border-blue-200"
  };

  const badgeColors = {
    emerald: "bg-emerald-100 text-emerald-800",
    rose: "bg-rose-100 text-rose-800",
    violet: "bg-violet-100 text-violet-800",
    blue: "bg-blue-100 text-blue-800"
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Wellness Services
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Discover healing through movement, breath, and sound. Each service is designed 
            to meet you exactly where you are on your wellness journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {data.map((service) => (
            <Card 
              key={service.id} 
              className={`bg-gradient-to-br ${colorClasses[service.color]} border hover:shadow-xl transition-all duration-300 group`}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{service.icon}</div>
                  <Badge className={badgeColors[service.color]}>
                    Popular
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={scrollToContact}
                  variant="outline"
                  className="w-full group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all duration-300"
                >
                  Book Session
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white border-0 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Looking for Studio Collaborations?
              </h3>
              <p className="text-emerald-50 mb-6">
                I partner with gyms, yoga studios, and wellness centers to bring 
                holistic healing to broader communities. Let's create something beautiful together.
              </p>
              <Button 
                onClick={scrollToContact}
                className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold"
              >
                Discuss Partnership
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;