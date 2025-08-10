"use client"

import React, { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function PortfolioChart() {
  const data = useMemo(() => {
    // Generate realistic-looking portfolio data with an upward trend
    const baseValue = 15000
    const volatility = 0.05
    const upwardBias = 0.02
    const dayCount = 30
    const result = []

    let currentValue = baseValue
    for (let i = dayCount; i >= 0; i--) {
      // Add random variation with upward bias
      const randomChange = (Math.random() - 0.5) * 2 * volatility
      const change = randomChange + upwardBias
      currentValue = currentValue * (1 + change)

      result.push({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        }),
        value: Math.round(currentValue)
      })
    }
    return result
  }, [])

  return (
    <Card className="border-white/5 bg-[#141419]">
      <CardContent className="p-8">
        <h3 className="text-2xl font-semibold mb-4 text-white">Overall Portfolio Value</h3>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EA5C5C" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#EA5C5C" stopOpacity={0.05} />
                </linearGradient>
                <filter id="shadow" height="200%">
                  <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#EA5C5C" floodOpacity="0.2"/>
                </filter>
              </defs>
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
                formatter={(value) => [`$${value.toLocaleString()}`, '']}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#EA5C5C"
                strokeWidth={2}
                fill="url(#colorValue)"
                filter="url(#shadow)"
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
