import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  Heart,
  Users,
  Calendar
} from "lucide-react";
import { useToast } from "../hooks/use-toast";

const ContactSection = ({ data }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock form submission
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", service: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            {data.title}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {data.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-slate-800 flex items-center">
                <Send className="w-6 h-6 text-emerald-600 mr-3" />
                Get In Touch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="bg-white border-emerald-200 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                    className="bg-white border-emerald-200 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Service Interest
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-emerald-200 rounded-md bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                  >
                    <option value="">Select a service...</option>
                    <option value="yoga-beginners">Yoga for Beginners</option>
                    <option value="prenatal-yoga">Prenatal Yoga</option>
                    <option value="postnatal-yoga">Postnatal Yoga</option>
                    <option value="sound-healing">Sound Healing</option>
                    <option value="online-sessions">Online Sessions</option>
                    <option value="studio-collaboration">Studio Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Your Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your wellness goals and how I can help you..."
                    rows={4}
                    required
                    className="bg-white border-emerald-200 focus:border-emerald-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-white border shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-6">
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-emerald-100 p-3 rounded-full">
                      <Mail className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">Email</p>
                      <p className="text-slate-600">{data.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">Phone</p>
                      <p className="text-slate-600">{data.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-violet-100 p-3 rounded-full">
                      <MapPin className="w-5 h-5 text-violet-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">Location</p>
                      <p className="text-slate-600">USA (Online Sessions Available Globally)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-600 to-blue-600 text-white border-0">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Heart className="w-6 h-6 mr-2" />
                  Available Services
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {data.services.map((service, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-white/20 text-white hover:bg-white/30 text-xs"
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-emerald-50 border-emerald-200">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-emerald-800">50+</p>
                  <p className="text-sm text-emerald-700">Happy Clients</p>
                </CardContent>
              </Card>
              
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-800">3+</p>
                  <p className="text-sm text-blue-700">Years Experience</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;