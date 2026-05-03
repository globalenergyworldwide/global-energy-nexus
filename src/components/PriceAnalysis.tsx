import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

interface PriceTick {
  time: string;
  Brent: number;
  WTI: number;
  Diesel: number;
  JetFuel: number;
}

const seedSeries = (): PriceTick[] => {
  const now = Date.now();
  const arr: PriceTick[] = [];
  let brent = 85.4;
  let wti = 82.3;
  let diesel = 92.1;
  let jet = 98.5;
  for (let i = 23; i >= 0; i--) {
    brent += (Math.random() - 0.5) * 0.6;
    wti += (Math.random() - 0.5) * 0.6;
    diesel += (Math.random() - 0.5) * 0.5;
    jet += (Math.random() - 0.5) * 0.7;
    const d = new Date(now - i * 60 * 60 * 1000);
    arr.push({
      time: `${d.getHours()}:00`,
      Brent: +brent.toFixed(2),
      WTI: +wti.toFixed(2),
      Diesel: +diesel.toFixed(2),
      JetFuel: +jet.toFixed(2),
    });
  }
  return arr;
};

const products = [
  { key: "Brent", label: "Crude - Brent", color: "hsl(var(--primary))" },
  { key: "WTI", label: "Crude - WTI", color: "hsl(var(--gold))" },
  { key: "Diesel", label: "Diesel ULS", color: "hsl(220 70% 50%)" },
  { key: "JetFuel", label: "Jet Fuel A1", color: "hsl(160 60% 45%)" },
] as const;

const marketDepth = [
  { product: "Brent", buy: 320000, sell: 285000 },
  { product: "WTI", buy: 410000, sell: 365000 },
  { product: "Diesel", buy: 215000, sell: 240000 },
  { product: "Jet Fuel", buy: 95000, sell: 110000 },
  { product: "LPG", buy: 48000, sell: 52000 },
  { product: "Naphtha", buy: 72000, sell: 65000 },
];

export default function PriceAnalysis() {
  const [series, setSeries] = useState<PriceTick[]>(() => seedSeries());

  useEffect(() => {
    const t = setInterval(() => {
      setSeries((prev) => {
        const last = prev[prev.length - 1];
        const next: PriceTick = {
          time: "now",
          Brent: +(last.Brent + (Math.random() - 0.5) * 0.4).toFixed(2),
          WTI: +(last.WTI + (Math.random() - 0.5) * 0.4).toFixed(2),
          Diesel: +(last.Diesel + (Math.random() - 0.5) * 0.3).toFixed(2),
          JetFuel: +(last.JetFuel + (Math.random() - 0.5) * 0.5).toFixed(2),
        };
        return [...prev.slice(1), next];
      });
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const latest = series[series.length - 1];
  const first = series[0];

  return (
    <div className="space-y-6">
      {/* Price tickers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {products.map((p) => {
          const cur = latest[p.key as keyof PriceTick] as number;
          const prev = first[p.key as keyof PriceTick] as number;
          const change = cur - prev;
          const pct = (change / prev) * 100;
          const up = change >= 0;
          return (
            <Card key={p.key} className="border-border">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">{p.label}</p>
                <p className="text-2xl font-bold text-primary">${cur.toFixed(2)}</p>
                <Badge
                  variant="secondary"
                  className={`mt-1 text-xs ${up ? "text-green-600" : "text-red-600"}`}
                >
                  {up ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {up ? "+" : ""}
                  {change.toFixed(2)} ({pct.toFixed(2)}%)
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Price chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Activity className="h-5 w-5 text-gold" />
            24h Price Movement (USD per barrel)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={series} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                  }}
                />
                <Legend />
                {products.map((p) => (
                  <Line
                    key={p.key}
                    type="monotone"
                    dataKey={p.key}
                    stroke={p.color}
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Market depth */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Market Depth — Buy vs Sell Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketDepth} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="product" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                  }}
                />
                <Legend />
                <Bar dataKey="buy" name="Buy Orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="sell" name="Sell Orders" fill="hsl(var(--gold))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}