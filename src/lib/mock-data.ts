import { v4 as uuidv4 } from "uuid";
import type { Order, RouteNode, RouteEdge } from "./types";

const LOCATIONS = [
  "Mumbai Warehouse",
  "Delhi Hub",
  "Bangalore DC",
  "Chennai Port",
  "Kolkata Terminal",
  "Hyderabad Depot",
  "Pune Center",
  "Ahmedabad Yard",
  "Jaipur Station",
  "Lucknow Facility",
];

const PACKAGE_TYPES: Order["package_type"][] = ["standard", "fragile", "heavy"];
const PRIORITIES: Order["priority"][] = ["normal", "express"];
const STATUSES: Order["status"][] = [
  "processing",
  "in_transit",
  "delayed",
  "rerouted",
];

export function generateRandomOrder(): Omit<Order, "status" | "risk_score" | "estimated_delay"> {
  const pickup = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
  let drop = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
  while (drop === pickup) {
    drop = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
  }

  return {
    order_id: uuidv4().slice(0, 8).toUpperCase(),
    pickup_location: pickup,
    drop_location: drop,
    priority: PRIORITIES[Math.floor(Math.random() * PRIORITIES.length)],
    package_type: PACKAGE_TYPES[Math.floor(Math.random() * PACKAGE_TYPES.length)],
    timestamp: new Date().toISOString(),
  };
}

export function enrichOrder(
  order: Omit<Order, "status" | "risk_score" | "estimated_delay">
): Order {
  const riskScore = Math.floor(Math.random() * 100);
  const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
  const delay =
    status === "delayed"
      ? Math.floor(Math.random() * 120) + 15
      : status === "rerouted"
      ? Math.floor(Math.random() * 60) + 5
      : Math.floor(Math.random() * 15);

  return {
    ...order,
    status,
    risk_score: riskScore,
    estimated_delay: delay,
    route: generateRoute(order.pickup_location, order.drop_location),
  };
}

function generateRoute(from: string, to: string): string[] {
  const intermediates = LOCATIONS.filter((l) => l !== from && l !== to);
  const hops = Math.floor(Math.random() * 2) + 1;
  const route = [from];
  for (let i = 0; i < hops; i++) {
    const next =
      intermediates[Math.floor(Math.random() * intermediates.length)];
    if (!route.includes(next)) route.push(next);
  }
  route.push(to);
  return route;
}

export function generateInitialOrders(count: number): Order[] {
  return Array.from({ length: count }, () => enrichOrder(generateRandomOrder()));
}

// Network graph data for visualization
export const NETWORK_NODES: RouteNode[] = [
  { id: "mumbai", name: "Mumbai", x: 180, y: 320, risk: "low" },
  { id: "delhi", name: "Delhi", x: 250, y: 100, risk: "medium" },
  { id: "bangalore", name: "Bangalore", x: 220, y: 420, risk: "low" },
  { id: "chennai", name: "Chennai", x: 310, y: 400, risk: "high" },
  { id: "kolkata", name: "Kolkata", x: 420, y: 200, risk: "medium" },
  { id: "hyderabad", name: "Hyderabad", x: 270, y: 310, risk: "low" },
  { id: "pune", name: "Pune", x: 170, y: 290, risk: "low" },
  { id: "ahmedabad", name: "Ahmedabad", x: 140, y: 200, risk: "high" },
];

export const NETWORK_EDGES: RouteEdge[] = [
  { from: "mumbai", to: "delhi", risk: "medium", active: true },
  { from: "mumbai", to: "pune", risk: "low", active: true },
  { from: "delhi", to: "kolkata", risk: "high", active: true },
  { from: "delhi", to: "ahmedabad", risk: "medium", active: true },
  { from: "bangalore", to: "chennai", risk: "high", active: true },
  { from: "bangalore", to: "hyderabad", risk: "low", active: true },
  { from: "hyderabad", to: "mumbai", risk: "low", active: true },
  { from: "kolkata", to: "chennai", risk: "medium", active: false },
  { from: "pune", to: "ahmedabad", risk: "low", active: true },
  { from: "ahmedabad", to: "delhi", risk: "high", active: true },
  { from: "hyderabad", to: "chennai", risk: "medium", active: true },
];

export const PICKUP_LOCATIONS = LOCATIONS;
export const DROP_LOCATIONS = LOCATIONS;
