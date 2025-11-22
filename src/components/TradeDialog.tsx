import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Package, DollarSign, MapPin, Calendar, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Trade {
  id: string;
  product_type: string;
  quantity: number;
  unit: string;
  price_per_unit: number;
  total_amount: number;
  delivery_location: string | null;
  expected_delivery_date: string | null;
}

interface TradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trade: Trade | null;
  userId: string;
}

export default function TradeDialog({ open, onOpenChange, trade, userId }: TradeDialogProps) {
  const [quantity, setQuantity] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  if (!trade) return null;

  const requestedQuantity = parseFloat(quantity) || 0;
  const calculatedTotal = requestedQuantity * trade.price_per_unit;

  const handleSubmit = async () => {
    if (!quantity || parseFloat(quantity) <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    if (!deliveryAddress.trim()) {
      toast.error("Please enter delivery address");
      return;
    }

    setLoading(true);

    try {
      // Update the trade with buyer information
      const { error } = await supabase
        .from('trades')
        .update({
          buyer_id: userId,
          status: 'accepted',
          delivery_location: deliveryAddress,
        })
        .eq('id', trade.id);

      if (error) throw error;

      toast.success("Trade initiated successfully! Escrow process started.");
      setStep(3);
      
      // Close dialog after 2 seconds
      setTimeout(() => {
        onOpenChange(false);
        setStep(1);
        setQuantity("");
        setDeliveryAddress("");
        setNotes("");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to initiate trade. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {step === 1 && "Review Trade Details"}
            {step === 2 && "Confirm & Pay"}
            {step === 3 && "Trade Initiated!"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 && "Review the product details and enter your requirements"}
            {step === 2 && "Confirm your order and proceed with payment"}
            {step === 3 && "Your trade has been successfully initiated"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {step === 1 && (
            <>
              {/* Product Info */}
              <div className="bg-muted rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-primary">{trade.product_type}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="bg-gold/10 text-gold border-gold/30">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified Seller
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        <Lock className="h-3 w-3 mr-1" />
                        Escrow Protected
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gold">${trade.price_per_unit.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">per {trade.unit}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Package className="h-3 w-3" />
                      Available
                    </div>
                    <p className="font-semibold">{trade.quantity.toLocaleString()} {trade.unit}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <MapPin className="h-3 w-3" />
                      Location
                    </div>
                    <p className="font-semibold">{trade.delivery_location || 'Various'}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Calendar className="h-3 w-3" />
                      Delivery
                    </div>
                    <p className="font-semibold">
                      {trade.expected_delivery_date 
                        ? new Date(trade.expected_delivery_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                        : 'TBD'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Form */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="quantity">Quantity ({trade.unit})</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder={`Max: ${trade.quantity}`}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    max={trade.quantity}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Maximum available: {trade.quantity.toLocaleString()} {trade.unit}
                  </p>
                </div>

                <div>
                  <Label htmlFor="delivery">Delivery Address / Port</Label>
                  <Textarea
                    id="delivery"
                    placeholder="Enter your delivery address or port location"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special requirements or notes for the seller"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                  />
                </div>

                {requestedQuantity > 0 && (
                  <div className="bg-navy/10 rounded-lg p-4 border border-navy/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">${calculatedTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Escrow Fee (2%)</span>
                      <span className="font-semibold">${(calculatedTotal * 0.02).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-border">
                      <span className="font-bold">Total</span>
                      <span className="text-xl font-bold text-gold">${(calculatedTotal * 1.02).toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  onClick={() => setStep(2)} 
                  className="flex-1 bg-gold hover:bg-gold/90 text-navy"
                  disabled={!quantity || parseFloat(quantity) <= 0 || !deliveryAddress.trim()}
                >
                  Continue to Payment
                </Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {/* Order Summary */}
              <div className="space-y-4">
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Order Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Product</span>
                      <span className="font-medium">{trade.product_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quantity</span>
                      <span className="font-medium">{requestedQuantity} {trade.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price per unit</span>
                      <span className="font-medium">${trade.price_per_unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery to</span>
                      <span className="font-medium text-right max-w-xs">{deliveryAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Section */}
                <div className="bg-navy/10 rounded-lg p-4 border border-navy/20">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-gold" />
                    Payment Method
                  </h4>
                  <div className="bg-background rounded-lg p-3 border border-gold/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-gold" />
                        </div>
                        <div>
                          <p className="font-semibold">USDT (Crypto)</p>
                          <p className="text-xs text-muted-foreground">Tether USD - Fast & Secure</p>
                        </div>
                      </div>
                      <Badge variant="default">Selected</Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Your payment will be held in escrow until delivery is confirmed by both parties
                  </p>
                </div>

                {/* Total */}
                <div className="bg-gold/10 rounded-lg p-4 border border-gold/30">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total Amount</span>
                    <span className="text-2xl font-bold text-gold">${(calculatedTotal * 1.02).toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Includes 2% escrow protection fee</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  className="flex-1 bg-gold hover:bg-gold/90 text-navy"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Confirm & Pay"}
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <div className="h-16 w-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-gold" />
              </div>
              <h3 className="text-xl font-bold mb-2">Trade Successfully Initiated!</h3>
              <p className="text-muted-foreground mb-6">
                Your payment has been secured in escrow. The seller has been notified.
              </p>
              <div className="bg-muted rounded-lg p-4 text-left space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-gold mt-0.5" />
                  <span>Payment held securely in escrow</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-gold mt-0.5" />
                  <span>Seller will prepare shipment</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-gold mt-0.5" />
                  <span>Track progress in "My Trades" tab</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
