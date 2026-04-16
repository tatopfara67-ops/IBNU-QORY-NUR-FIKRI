import React, { useMemo, useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleLinear } from 'd3';
import { CountryRisk } from '../services/gemini';

// URL to a valid TopoJSON file for the world map with alpha-3 country codes
const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/v2/topojson-maps/world-110m.json";

interface GlobalHeatmapProps {
  data: CountryRisk[];
}

export const GlobalHeatmap: React.FC<GlobalHeatmapProps> = ({ data }) => {
  const [colors, setColors] = useState(["#8C9A86", "#D9B382", "#C27A4E", "#E5E0D8"]);

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    setColors([
      style.getPropertyValue('--theme-green').trim() || "#8C9A86",
      style.getPropertyValue('--theme-yellow').trim() || "#D9B382",
      style.getPropertyValue('--theme-red').trim() || "#C27A4E",
      style.getPropertyValue('--theme-line').trim() || "#E5E0D8"
    ]);
  }, []);

  const colorScale = scaleLinear<string>()
    .domain([0, 5, 10])
    .range([colors[0], colors[1], colors[2]]); // Green to Yellow to Red

  // Create a map for quick lookup by country code
  const riskMap = useMemo(() => {
    const map = new Map<string, CountryRisk>();
    (data || []).forEach(item => {
      // Store by country code (uppercase)
      if (item.countryCode) {
        map.set(item.countryCode.toUpperCase(), item);
      }
      // Also store by country name (lowercase) as fallback
      if (item.countryName) {
        map.set(item.countryName.toLowerCase(), item);
      }
    });
    return map;
  }, [data]);

  return (
    <div className="w-full h-[400px] relative">
      <ComposableMap
        projectionConfig={{
          scale: 140,
          center: [0, 20]
        }}
        width={800}
        height={400}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              // Try to match by ISO_A3, ISO_A2, id, or name
              const isoA3 = geo.properties.ISO_A3?.toUpperCase();
              const isoA2 = geo.properties.ISO_A2?.toUpperCase();
              const name = geo.properties.NAME?.toLowerCase();
              const id = geo.id?.toString().toUpperCase();
              
              const countryData = 
                (isoA3 && riskMap.get(isoA3)) || 
                (isoA2 && riskMap.get(isoA2)) || 
                (id && riskMap.get(id)) || 
                (name && riskMap.get(name));
                
              const riskScore = countryData ? countryData.riskScore : 0;
              
              // Only color countries that have a risk score > 0
              const fillColor = countryData ? colorScale(riskScore) : colors[3];

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fillColor}
                  stroke="var(--theme-bg)"
                  strokeWidth={0.5}
                  style={{
                    default: { fill: fillColor, outline: "none" },
                    hover: { fill: countryData ? colors[1] : colors[3], outline: "none", cursor: countryData ? "pointer" : "default" },
                    pressed: { fill: fillColor, outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-panel/80 backdrop-blur border border-line p-3 rounded flex flex-col gap-2">
        <div className="text-[10px] font-sans text-muted uppercase tracking-wider">Risk Score</div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-sans text-green">0</span>
          <div className="w-24 h-2 rounded bg-gradient-to-r from-green via-yellow to-red"></div>
          <span className="text-xs font-sans text-red">10</span>
        </div>
      </div>
      
      {/* Top Countries List */}
      <div className="absolute top-4 right-4 bg-panel/80 backdrop-blur border border-line p-3 rounded flex flex-col gap-2 max-w-[200px] max-h-[300px] overflow-y-auto">
        <div className="text-[10px] font-sans text-muted uppercase tracking-wider mb-1">Top Risk Areas</div>
        {[...(data || [])].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5).map((country, idx) => (
          <div key={idx} className="flex justify-between items-center gap-4">
            <span className="text-xs text-ink truncate">{country.countryName}</span>
            <span className="text-xs font-sans font-bold" style={{ color: colorScale(country.riskScore) }}>
              {country.riskScore.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
