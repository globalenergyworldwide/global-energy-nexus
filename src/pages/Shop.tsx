import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Package, DollarSign, Building, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import OrderDialog from "@/components/OrderDialog";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  stock_quantity: number;
  image_url: string | null;
}

const categoryNames: Record<string, string> = {
  crude_oil: 'Crude Oil',
  diesel: 'Diesel',
  jet_fuel: 'Jet Fuel',
  lpg: 'LPG',
  lubricants: 'Lubricants',
  equipment: 'Equipment',
  reports: 'Reports & Studies'
};

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    setLoading(true);
    let query = supabase.from('products').select('*').eq('is_active', true);
    
    if (category !== 'all') {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    
    if (error) {
      toast.error('Failed to load products');
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const handleOrderClick = (product: Product) => {
    if (!user) {
      toast.error("Please login to place an order");
      navigate("/auth");
      return;
    }
    setSelectedProduct(product);
    setOrderDialogOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-20">
        <section className="py-12 bg-navy text-background">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">Product Marketplace</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Premium petroleum products, equipment, and industry reports
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Package className="h-6 w-6 text-gold" />
                <h2 className="text-2xl font-bold">Browse Products</h2>
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.entries(categoryNames).map(([key, value]) => (
                    <SelectItem key={key} value={key}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <div className="text-center py-12">Loading products...</div>
            ) : products.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent className="pt-6">
                  <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No products available</h3>
                  <p className="text-muted-foreground">Check back soon for new inventory</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">{categoryNames[product.category]}</Badge>
                        <Badge variant={product.stock_quantity > 0 ? "default" : "destructive"}>
                          {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold text-gold">
                            ${product.price.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">per {product.unit}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        disabled={product.stock_quantity === 0}
                        onClick={() => handleOrderClick(product)}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {product.stock_quantity > 0 ? 'Order Now' : 'Out of Stock'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Payment Methods</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We support multiple payment methods for your convenience
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-semibold mb-2">USDT (Crypto)</h3>
                  <p className="text-sm text-muted-foreground">Primary payment method - Fast & secure</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-muted-foreground/10 flex items-center justify-center mx-auto mb-4">
                    <Building className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Wire Transfer</h3>
                  <p className="text-sm text-muted-foreground">Coming soon - International transfers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-muted-foreground/10 flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Bank Transfer</h3>
                  <p className="text-sm text-muted-foreground">Coming soon - Direct bank payments</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>

      <OrderDialog 
        product={selectedProduct}
        open={orderDialogOpen}
        onOpenChange={setOrderDialogOpen}
      />

      <Footer />
    </div>
  );
};

export default Shop;
