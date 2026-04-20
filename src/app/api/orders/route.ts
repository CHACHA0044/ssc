import { NextRequest, NextResponse } from "next/server";
import type { Order } from "@/lib/types";
import { enrichOrder } from "@/lib/mock-data";

// In-memory store (resets on server restart)
const orders: Order[] = [];

export async function GET() {
  return NextResponse.json({ orders, count: orders.length });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const required = ["order_id", "pickup_location", "drop_location", "priority", "package_type", "timestamp"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate enum values
    if (!["normal", "express"].includes(body.priority)) {
      return NextResponse.json(
        { error: "Priority must be 'normal' or 'express'" },
        { status: 400 }
      );
    }

    if (!["standard", "fragile", "heavy"].includes(body.package_type)) {
      return NextResponse.json(
        { error: "Package type must be 'standard', 'fragile', or 'heavy'" },
        { status: 400 }
      );
    }

    // Enrich order with status, risk, and routing
    const enrichedOrder = enrichOrder(body);
    orders.push(enrichedOrder);

    return NextResponse.json(
      {
        success: true,
        order: enrichedOrder,
        message: `Order ${enrichedOrder.order_id} accepted and routed`,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }
}
