export interface Order {
  order_id: string;
  pickup_location: string;
  drop_location: string;
  priority: "normal" | "express";
  package_type: "standard" | "fragile" | "heavy";
  timestamp: string;
  status: "processing" | "in_transit" | "delayed" | "rerouted" | "delivered";
  risk_score: number; // 0-100
  estimated_delay: number; // minutes
  route?: string[];
}

export interface MetricsData {
  totalOrders: number;
  highRiskRoutes: number;
  avgDelay: number;
  activeShipments: number;
  deliveredCount: number;
  reroutedCount: number;
}

export interface RouteNode {
  id: string;
  name: string;
  x: number;
  y: number;
  risk: "low" | "medium" | "high";
}

export interface RouteEdge {
  from: string;
  to: string;
  risk: "low" | "medium" | "high";
  active: boolean;
}
