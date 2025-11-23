import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag, TrendingUp, DollarSign, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    activeTrades: 0,
    totalOrders: 0,
    investments: 0,
    pendingItems: 0
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    if (!user) return;
    
    setLoadingStats(true);
    try {
      // Fetch active trades where user is seller or buyer
      const { data: trades } = await supabase
        .from('trades')
        .select('id')
        .or(`seller_id.eq.${user.id},buyer_id.eq.${user.id}`)
        .in('status', ['pending', 'active']);

      // Fetch orders
      const { data: orders } = await supabase
        .from('orders')
        .select('id')
        .eq('user_id', user.id);

      // Fetch investment applications
      const { data: investments } = await supabase
        .from('investment_applications')
        .select('id')
        .eq('user_id', user.id);

      // Calculate pending items
      const { data: pendingOrders } = await supabase
        .from('orders')
        .select('id')
        .eq('user_id', user.id)
        .eq('order_status', 'pending');

      const { data: pendingInvestments } = await supabase
        .from('investment_applications')
        .select('id')
        .eq('user_id', user.id)
        .eq('status', 'pending');

      setStats({
        activeTrades: trades?.length || 0,
        totalOrders: orders?.length || 0,
        investments: investments?.length || 0,
        pendingItems: (pendingOrders?.length || 0) + (pendingInvestments?.length || 0)
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">Welcome Back!</h1>
            <p className="text-muted-foreground">Manage your trading, orders, and investments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Trades</CardTitle>
                <TrendingUp className="h-4 w-4 text-gold" />
              </CardHeader>
              <CardContent>
                {loadingStats ? (
                  <Skeleton className="h-8 w-16 mb-2" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">{stats.activeTrades}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.activeTrades === 0 ? 'No active trades yet' : 'Trades in progress'}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingBag className="h-4 w-4 text-gold" />
              </CardHeader>
              <CardContent>
                {loadingStats ? (
                  <Skeleton className="h-8 w-16 mb-2" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">{stats.totalOrders}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.totalOrders === 0 ? 'No orders yet' : 'Orders placed'}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Investments</CardTitle>
                <DollarSign className="h-4 w-4 text-gold" />
              </CardHeader>
              <CardContent>
                {loadingStats ? (
                  <Skeleton className="h-8 w-16 mb-2" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">{stats.investments}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.investments === 0 ? 'No investments yet' : 'Investment applications'}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Items</CardTitle>
                <Package className="h-4 w-4 text-gold" />
              </CardHeader>
              <CardContent>
                {loadingStats ? (
                  <Skeleton className="h-8 w-16 mb-2" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">{stats.pendingItems}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.pendingItems === 0 ? 'All caught up!' : 'Awaiting action'}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Start Trading</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Access the P2P platform and start trading energy products globally
                </p>
                <Link to="/p2p-platform">
                  <Button className="w-full">Go to P2P Platform</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shop Products</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Browse our marketplace for petroleum products and equipment
                </p>
                <Link to="/shop">
                  <Button className="w-full">Browse Shop</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Explore Investments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  View investment opportunities and partnership programs
                </p>
                <Link to="/investors">
                  <Button className="w-full">View Opportunities</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
