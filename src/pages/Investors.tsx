import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, FileText, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Investment {
  id: string;
  title: string;
  description: string;
  investment_type: string;
  minimum_investment: number;
  expected_return: string | null;
  duration: string | null;
  status: string;
}

const investmentTypes: Record<string, string> = {
  equity: 'Equity Investment',
  expansion: 'Expansion Project',
  partnership: 'Strategic Partnership',
  project: 'Project Financing'
};

const Investors = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [kycVerified, setKycVerified] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      checkKycStatus();
      fetchInvestments();
    } else {
      setLoading(false);
    }
  }, [user]);

  const checkKycStatus = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('kyc_verified')
      .eq('id', user!.id)
      .single();
    
    setKycVerified(data?.kyc_verified || false);
  };

  const fetchInvestments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('investments')
      .select('*')
      .eq('status', 'open');
    
    if (error) {
      toast.error('Failed to load investment opportunities');
    } else {
      setInvestments(data || []);
    }
    setLoading(false);
  };

  const handleApply = (investmentId: string) => {
    if (!user) {
      toast.error('Please sign in to apply for investments');
      navigate('/auth');
      return;
    }
    
    if (!kycVerified) {
      toast.error('KYC verification required to apply for investments');
      return;
    }
    
    toast.info('Application process coming soon');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-20">
        <section className="py-20 bg-gradient-to-br from-navy via-navy-light to-navy text-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Investor Relations</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Partner with us in transforming the global energy landscape. Explore exclusive investment opportunities in oil refining, exploration, and energy trading infrastructure.
            </p>
          </div>
        </section>

        {!user && (
          <section className="py-12 bg-gold/10">
            <div className="container mx-auto px-4 text-center">
              <Lock className="h-12 w-12 text-gold mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
              <p className="text-muted-foreground mb-6">Please sign in to view investment opportunities</p>
              <Button onClick={() => navigate('/auth')} size="lg">
                Sign In
              </Button>
            </div>
          </section>
        )}

        {user && !kycVerified && (
          <section className="py-12 bg-gold/10">
            <div className="container mx-auto px-4 text-center">
              <FileText className="h-12 w-12 text-gold mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">KYC Verification Required</h2>
              <p className="text-muted-foreground mb-6">
                Complete KYC verification to access investment opportunities
              </p>
              <Button size="lg" disabled>
                Complete KYC (Coming Soon)
              </Button>
            </div>
          </section>
        )}

        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold mb-4">Why Invest With Us?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <TrendingUp className="h-12 w-12 text-gold mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Proven Track Record</h3>
                    <p className="text-muted-foreground">20+ years of consistent growth and profitability</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <DollarSign className="h-12 w-12 text-gold mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Strong Returns</h3>
                    <p className="text-muted-foreground">Competitive ROI with strategic market positioning</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <FileText className="h-12 w-12 text-gold mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Full Transparency</h3>
                    <p className="text-muted-foreground">Regular reporting and investor communications</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {user && kycVerified && (
              <>
                <h2 className="text-3xl font-bold mb-8">Current Opportunities</h2>
                {loading ? (
                  <div className="text-center py-12">Loading opportunities...</div>
                ) : investments.length === 0 ? (
                  <Card className="text-center py-12">
                    <CardContent className="pt-6">
                      <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No opportunities available</h3>
                      <p className="text-muted-foreground">Check back soon for new investment opportunities</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {investments.map((investment) => (
                      <Card key={investment.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between items-start mb-2">
                            <Badge variant="default">{investmentTypes[investment.investment_type]}</Badge>
                            <Badge variant="outline">{investment.status}</Badge>
                          </div>
                          <CardTitle className="text-2xl">{investment.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">{investment.description}</p>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Minimum Investment</p>
                              <p className="text-xl font-bold text-gold">
                                ${investment.minimum_investment.toLocaleString()}
                              </p>
                            </div>
                            {investment.expected_return && (
                              <div>
                                <p className="text-sm text-muted-foreground">Expected Return</p>
                                <p className="text-xl font-bold">{investment.expected_return}</p>
                              </div>
                            )}
                            {investment.duration && (
                              <div className="col-span-2">
                                <p className="text-sm text-muted-foreground">Duration</p>
                                <p className="font-semibold">{investment.duration}</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            className="w-full" 
                            onClick={() => handleApply(investment.id)}
                          >
                            Apply Now
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Investors;
