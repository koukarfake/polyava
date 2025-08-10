"use client"

import React from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent } from "@/components/ui/card"

const chainColors: Record<string, string> = {
  'C Chain': '#EA5C5C',
  'P Chain': '#5B67C6',
  'S Chain': '#F7B731',
  'Subnets': '#2ED573',
};

export default function ChainIncomeChart({ data, chains }: { data: unknown; chains: string[] }) {
  // Type guard for recharts data
  const safeData = Array.isArray(data) ? data : [];
  return (
    <Card className="border-white/5 bg-[#141419]">
      <CardContent className="p-8">
        <h3 className="text-2xl font-semibold mb-4 text-white">Income by Chain</h3>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={safeData}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#71717A', fontSize: 12 }}
                dy={10}
                interval="preserveStartEnd"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#71717A', fontSize: 12 }}
                dx={-10}
                tickFormatter={(value) => `$${(value/1000).toFixed(1)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181B',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                itemStyle={{ color: '#fff', fontSize: '14px' }}
                labelStyle={{ color: '#71717A', marginBottom: '4px', fontSize: '12px' }}
                formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
              />
              <Legend verticalAlign="top" height={36} iconType="circle"/>
              {chains.map((chain) => (
                <Line
                  key={chain}
                  type="monotone"
                  dataKey={chain}
                  stroke={chainColors[chain] || '#EA5C5C'}
                  strokeWidth={2.5}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
