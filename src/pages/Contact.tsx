import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", company: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-navy via-navy-light to-navy py-20 text-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Get in touch with our team for inquiries, partnerships, or investor relations
            </p>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <Mail className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-2">Email Us</h3>
                  <p className="text-muted-foreground mb-2">abdulrazaaqofficial@gmail.com</p>
                  <p className="text-sm text-muted-foreground">Response within 24 hours</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <Phone className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-2">Call Us</h3>
                  <p className="text-muted-foreground mb-2">+966 138 772828</p>
                  <p className="text-sm text-muted-foreground">24/7 Support Available</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <MapPin className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-2">Visit Us</h3>
                  <p className="text-muted-foreground mb-2">Energy Plaza, Suite 1000</p>
                  <p className="text-sm text-muted-foreground">Global Headquarters</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company">Company/Organization</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                      rows={6}
                      className="mt-2"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-gold hover:bg-gold-light text-navy">
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Additional Information */}
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Additional Information</h2>
                
                <Card className="border-border mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-4">Business Hours</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-gold mr-3 mt-0.5" />
                        <div>
                          <p className="text-foreground font-medium">Monday - Friday</p>
                          <p className="text-sm text-muted-foreground">8:00 AM - 6:00 PM (GMT)</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-gold mr-3 mt-0.5" />
                        <div>
                          <p className="text-foreground font-medium">Emergency Support</p>
                          <p className="text-sm text-muted-foreground">24/7 Available</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-4">For Specific Inquiries</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-foreground font-medium">Sales & Trading</p>
                        <p className="text-sm text-muted-foreground">sales@oilenergycorp.com</p>
                      </div>
                      <div>
                        <p className="text-foreground font-medium">Investor Relations</p>
                        <p className="text-sm text-muted-foreground">investors@oilenergycorp.com</p>
                      </div>
                      <div>
                        <p className="text-foreground font-medium">Partnership Opportunities</p>
                        <p className="text-sm text-muted-foreground">partners@oilenergycorp.com</p>
                      </div>
                      <div>
                        <p className="text-foreground font-medium">Technical Support</p>
                        <p className="text-sm text-muted-foreground">support@oilenergycorp.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gold bg-muted">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-3">Regional Offices</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      We maintain regional offices across the Middle East, Africa, Europe, and Asia. 
                      Contact us to connect with your nearest regional representative.
                    </p>
                    <Button variant="outline" className="w-full border-gold text-primary hover:bg-gold/10">
                      Find Your Regional Office
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
