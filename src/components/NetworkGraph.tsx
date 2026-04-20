"use client";

import { motion } from "framer-motion";
import { NETWORK_NODES, NETWORK_EDGES } from "@/lib/mock-data";
import { useEffect, useState } from "react";

const riskColors = {
  low: "#10B981",
  medium: "#F59E0B",
  high: "#EF4444",
};

export default function NetworkGraph() {
  const [activeEdge, setActiveEdge] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEdge((prev) => (prev + 1) % NETWORK_EDGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">
          Network Topology
        </h3>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Low Risk
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Medium
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            High
          </span>
        </div>
      </div>

      <svg
        viewBox="0 0 550 500"
        className="w-full h-auto"
        style={{ maxHeight: "400px" }}
      >
        {/* Edges */}
        {NETWORK_EDGES.map((edge, i) => {
          const fromNode = NETWORK_NODES.find((n) => n.id === edge.from);
          const toNode = NETWORK_NODES.find((n) => n.id === edge.to);
          if (!fromNode || !toNode) return null;

          const isAnimated = i === activeEdge;

          return (
            <g key={`${edge.from}-${edge.to}`}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={riskColors[edge.risk]}
                strokeWidth={isAnimated ? 3 : 1.5}
                strokeOpacity={isAnimated ? 0.8 : 0.25}
                strokeDasharray={edge.active ? "none" : "6 4"}
              />
              {isAnimated && (
                <motion.circle
                  r={4}
                  fill={riskColors[edge.risk]}
                  initial={{ cx: fromNode.x, cy: fromNode.y }}
                  animate={{ cx: toNode.x, cy: toNode.y }}
                  transition={{
                    duration: 2,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  <animate
                    attributeName="opacity"
                    values="1;0.3;1"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </motion.circle>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {NETWORK_NODES.map((node) => (
          <g key={node.id}>
            {/* Glow */}
            <circle
              cx={node.x}
              cy={node.y}
              r={20}
              fill={riskColors[node.risk]}
              fillOpacity={0.08}
            />
            {/* Node */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={12}
              fill="#0B0F19"
              stroke={riskColors[node.risk]}
              strokeWidth={2}
              whileHover={{ r: 15 }}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={4}
              fill={riskColors[node.risk]}
            />
            {/* Label */}
            <text
              x={node.x}
              y={node.y + 28}
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="11"
              fontFamily="var(--font-sans), system-ui"
            >
              {node.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
