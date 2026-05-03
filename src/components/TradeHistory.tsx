import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface HistoryRow {
  id: string;
  time: string;
  product: string;
  side: "BUY" | "SELL";
  qty: number;
  unit: string;
  price: number;
  total: number;
  port: string;
  status: "Completed" | "In Escrow" | "Settled";
}

const products = [
  { name: "Crude Oil - Brent", unit: "bbl", base: 85.4 },
  { name: "Crude Oil - WTI", unit: "bbl", base: 82.3 },
  { name: "Diesel ULS", unit: "bbl", base: 92.1 },
  { name: "Jet Fuel A1", unit: "bbl", base: 98.5 },
  { name: "LPG - Propane", unit: "ton", base: 680 },
  { name: "Naphtha", unit: "bbl", base: 87.3 },
  { name: "Marine Fuel Oil", unit: "ton", base: 520 },
];

const ports = [
  "Rotterdam, NL",
  "Singapore",
  "Houston, USA",
  "Jebel Ali, UAE",
  "Tokyo Bay, JP",
  "Lagos, NG",
  "Santos, BR",
  "Antwerp, BE",
];

const statuses: HistoryRow["status"][] = ["Completed", "Settled", "In Escrow"];

const generateRow = (id: number, minutesAgo: number): HistoryRow => {
  const p = products[Math.floor(Math.random() * products.length)];
  const qty = Math.floor(5000 + Math.random() * 90000);
  const price = +(p.base + (Math.random() - 0.5) * 4).toFixed(2);
  const d = new Date(Date.now() - minutesAgo * 60 * 1000);
  return {
    id: `TX-${(100000 + id).toString()}`,
    time: d.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
    product: p.name,
    side: Math.random() > 0.5 ? "BUY" : "SELL",
    qty,
    unit: p.unit,
    price,
    total: qty * price,
    port: ports[Math.floor(Math.random() * ports.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
  };
};

export default function TradeHistory() {
  const [rows, setRows] = useState<HistoryRow[]>(() =>
    Array.from({ length: 25 }, (_, i) => generateRow(i, i * 7 + Math.floor(Math.random() * 5)))
  );
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"ALL" | "BUY" | "SELL">("ALL");

  // Stream new trades in
  useEffect(() => {
    let counter = 1000;
    const t = setInterval(() => {
      counter++;
      setRows((prev) => [generateRow(counter, 0), ...prev].slice(0, 60));
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const filtered = rows.filter((r) => {
    const matchesQuery =
      !query ||
      r.product.toLowerCase().includes(query.toLowerCase()) ||
      r.port.toLowerCase().includes(query.toLowerCase()) ||
      r.id.toLowerCase().includes(query.toLowerCase());
    const matchesSide = filter === "ALL" || r.side === filter;
    return matchesQuery && matchesSide;
  });

  const totalVolume = rows.reduce((s, r) => s + r.total, 0);
  const buyCount = rows.filter((r) => r.side === "BUY").length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Trades (last hour stream)</p>
            <p className="text-2xl font-bold text-primary">{rows.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Settled Volume (USD)</p>
            <p className="text-2xl font-bold text-gold">${(totalVolume / 1_000_000).toFixed(2)}M</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Buy / Sell Ratio</p>
            <p className="text-2xl font-bold text-primary">
              {buyCount} / {rows.length - buyCount}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <CardTitle className="text-primary">Live Trade History</CardTitle>
            <div className="flex items-center gap-2">
              <div className="flex rounded-md border border-border overflow-hidden">
                {(["ALL", "BUY", "SELL"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1 text-xs font-medium transition-colors ${
                      filter === f
                        ? "bg-gold text-navy"
                        : "bg-background text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search product, port, ID..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-8 h-9 w-full md:w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Trade ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Side</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total (USD)</TableHead>
                  <TableHead>Port</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id} className="text-sm">
                    <TableCell className="text-muted-foreground whitespace-nowrap">{r.time}</TableCell>
                    <TableCell className="font-mono text-xs">{r.id}</TableCell>
                    <TableCell className="font-medium">{r.product}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          r.side === "BUY"
                            ? "text-green-600 border-green-600/30 bg-green-500/10"
                            : "text-red-600 border-red-600/30 bg-red-500/10"
                        }
                      >
                        {r.side === "BUY" ? (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        )}
                        {r.side}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {r.qty.toLocaleString()} {r.unit}
                    </TableCell>
                    <TableCell className="text-right">${r.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-semibold">${r.total.toLocaleString()}</TableCell>
                    <TableCell className="text-muted-foreground">{r.port}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {r.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                      No trades match your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}