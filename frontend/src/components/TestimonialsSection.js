import React from "react";
import { Card, CardContent } from "./ui/card";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = ({ data }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`} 
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            What My Clients Say
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            The transformations I witness in my clients' lives inspire me every day. 
            Here are some heartfelt words from those I've had the privilege to guide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {data.map((testimonial) => (
            <Card 
              key={testimonial.id}
              className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-emerald-100 p-3 rounded-full flex-shrink-0">
                    <Quote className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-1 mb-3">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-slate-700 leading-relaxed italic mb-6">
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-slate-100 pt-4">
                  <p className="font-semibold text-slate-800">
                    {testimonial.name}
                  </p>
                  <p className="text-emerald-600 text-sm font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-white border border-emerald-200 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Join Our Growing Wellness Community
              </h3>
              <p className="text-slate-600 mb-6">
                Experience the transformation that comes from dedicated practice and 
                compassionate guidance. Your wellness journey starts with a single step.
              </p>
              <div className="flex items-center justify-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center text-xs font-semibold text-emerald-700">S</div>
                  <div className="w-8 h-8 bg-rose-200 rounded-full flex items-center justify-center text-xs font-semibold text-rose-700">M</div>
                  <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-xs font-semibold text-blue-700">L</div>
                  <div className="w-8 h-8 bg-violet-200 rounded-full flex items-center justify-center text-xs font-semibold text-violet-700">D</div>
                </div>
                <span className="text-slate-600 text-sm">
                  And 50+ more happy clients
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;