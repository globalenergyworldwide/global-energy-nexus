import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { CreditCard, MapPin, Package, DollarSign } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  stock_quantity: number;
}

interface OrderDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OrderDialog = ({ product, open, onOpenChange }: OrderDialogProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("usdt");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Confirmation
  
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    country: "",
    zipCode: "",
    phone: "",
    notes: ""
  });

  const handleQuantityChange = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num > 0 && num <= (product?.stock_quantity || 0)) {
      setQuantity(num);
    }
  };

  const totalAmount = product ? product.price * quantity : 0;

  const handleSubmitOrder = async () => {
    if (!user) {
      toast.error("Please login to place an order");
      navigate("/auth");
      return;
    }

    if (!product) return;

    setLoading(true);

    const { error } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        product_id: product.id,
        quantity,
        total_amount: totalAmount,
        payment_method: paymentMethod,
        payment_status: 'pending',
        order_status: 'pending',
        shipping_address: shippingInfo
      });

    if (error) {
      toast.error("Failed to create order");
      console.error(error);
    } else {
      setStep(3);
      toast.success("Order placed successfully!");
      
      // Reset after 3 seconds
      setTimeout(() => {
        onOpenChange(false);
        setStep(1);
        setQuantity(1);
        setShippingInfo({
          address: "",
          city: "",
          country: "",
          zipCode: "",
          phone: "",
          notes: ""
        });
      }, 3000);
    }

    setLoading(false);
  };

  const handleNext = () => {
    if (step === 1) {
      // Validate shipping info
      if (!shippingInfo.address || !shippingInfo.city || !shippingInfo.country || !shippingInfo.phone) {
        toast.error("Please fill in all required fields");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      handleSubmitOrder();
    }
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === 1 && "Shipping Details"}
            {step === 2 && "Payment Information"}
            {step === 3 && "Order Confirmation"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 && "Enter your shipping information"}
            {step === 2 && "Complete your payment"}
            {step === 3 && "Your order has been placed successfully"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{product.name}</h3>
                <span className="text-gold font-bold">${product.price.toLocaleString()}/{product.unit}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label htmlFor="quantity">Quantity ({product.unit})</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={product.stock_quantity}
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Available: {product.stock_quantity} {product.unit}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-2xl font-bold text-gold">${totalAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <MapPin className="h-5 w-5" />
                <span>Shipping Address</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Textarea
                    id="address"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                    placeholder="Enter your full address"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                    placeholder="City"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    value={shippingInfo.country}
                    onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                    placeholder="Country"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                  <Input
                    id="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                    placeholder="ZIP Code"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                    placeholder="Phone"
                    className="mt-1"
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={shippingInfo.notes}
                    onChange={(e) => setShippingInfo({...shippingInfo, notes: e.target.value})}
                    placeholder="Any special delivery instructions"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleNext}>
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Order Total</p>
                  <p className="text-3xl font-bold text-gold">${totalAmount.toLocaleString()}</p>
                </div>
                <Package className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <CreditCard className="h-5 w-5" />
                <span>Payment Method</span>
              </div>

              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="usdt" id="usdt" />
                  <Label htmlFor="usdt" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-6 w-6 text-gold" />
                        <div>
                          <p className="font-semibold">USDT (Tether)</p>
                          <p className="text-sm text-muted-foreground">Cryptocurrency payment</p>
                        </div>
                      </div>
                      <span className="bg-green-500/10 text-green-600 text-xs px-2 py-1 rounded">Available</span>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 border border-border rounded-lg p-4 opacity-50">
                  <RadioGroupItem value="wire_transfer" id="wire" disabled />
                  <Label htmlFor="wire" className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Wire Transfer</p>
                        <p className="text-sm text-muted-foreground">International bank transfer</p>
                      </div>
                      <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">Coming Soon</span>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === "usdt" && (
                <div className="bg-gold/10 border border-gold/20 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold mb-2">USDT Payment Instructions:</p>
                  <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
                    <li>Click "Place Order" to confirm</li>
                    <li>You will receive payment wallet address via email</li>
                    <li>Transfer exact amount in USDT</li>
                    <li>Order will be processed after payment confirmation</li>
                  </ol>
                </div>
              )}
            </div>

            <div className="flex justify-between gap-3">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleNext} disabled={loading}>
                {loading ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-8 space-y-4">
            <div className="h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
              <Package className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold">Order Placed Successfully!</h3>
            <p className="text-muted-foreground">
              Your order for {quantity} {product.unit} of {product.name} has been received.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">What happens next?</p>
              <ol className="text-sm text-left space-y-2 list-decimal list-inside text-muted-foreground">
                <li>You'll receive payment instructions via email</li>
                <li>Complete the USDT payment</li>
                <li>We'll confirm your payment</li>
                <li>Your order will be processed and shipped</li>
                <li>Track your order in the Dashboard</li>
              </ol>
            </div>
            <Button onClick={() => navigate('/dashboard')} className="w-full">
              View My Orders
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
