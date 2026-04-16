import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { InfluenceNetwork, InfluenceNode, InfluenceEdge } from '../services/gemini';

interface InfluenceGraphProps {
  data: InfluenceNetwork;
}

export const InfluenceGraph: React.FC<InfluenceGraphProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || !data.nodes || !data.edges || !svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 400;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous render

    svg.attr('width', width).attr('height', height);

    // Prepare data for D3 (copy to avoid mutating props)
    const nodes = data.nodes.map(d => ({ ...d }));
    const links = data.edges.map(d => ({ ...d }));

    const colorScale = d3.scaleOrdinal([
      'var(--theme-blue)',
      'var(--theme-red)',
      'var(--theme-green)',
      'var(--theme-yellow)',
      'var(--theme-orange)',
    ]);

    const simulation = d3.forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius(40));

    // Edge colors based on relation type
    const getEdgeColor = (type: string) => {
      switch (type?.toLowerCase()) {
        case 'alliance': return 'var(--theme-green)'; // green
        case 'conflict': return 'var(--theme-red)'; // red
        case 'economic dependency': return 'var(--theme-yellow)'; // orange
        case 'policy alignment': return 'var(--theme-blue)'; // blue
        default: return 'var(--theme-muted)'; // gray
      }
    };

    // Draw links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', (d: any) => getEdgeColor(d.relationType))
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.6);

    // Draw link labels (optional, can be cluttered)
    const linkText = svg.append('g')
      .selectAll('text')
      .data(links)
      .join('text')
      .attr('font-size', '10px')
      .attr('fill', 'var(--theme-muted)')
      .attr('text-anchor', 'middle')
      .text((d: any) => d.relationType);

    // Draw nodes
    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(d3.drag<any, any>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
      );

    node.append('circle')
      .attr('r', (d: any) => d.type === 'Organization' ? 20 : 15)
      .attr('fill', (d: any) => 'var(--theme-panel)')
      .attr('stroke', (d: any) => colorScale(d.group.toString()))
      .attr('stroke-width', 3);

    node.append('text')
      .attr('dy', 25)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', 'var(--theme-ink)')
      .attr('font-family', 'monospace')
      .text((d: any) => d.name);

    // Tooltip
    const tooltip = d3.select(containerRef.current)
      .append('div')
      .attr('class', 'absolute bg-panel border border-line p-2 text-xs text-ink rounded pointer-events-none opacity-0 transition-opacity z-10');

    node.on('mouseover', (event, d: any) => {
      tooltip.transition().duration(200).style('opacity', 1);
      tooltip.html(`<strong>${d.name}</strong><br/>Type: ${d.type}`)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 28) + 'px');
    }).on('mouseout', () => {
      tooltip.transition().duration(500).style('opacity', 0);
    });

    link.on('mouseover', (event, d: any) => {
      tooltip.transition().duration(200).style('opacity', 1);
      tooltip.html(`<strong>${d.relationType}</strong><br/>${d.description}`)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 28) + 'px');
    }).on('mouseout', () => {
      tooltip.transition().duration(500).style('opacity', 0);
    });

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      linkText
        .attr('x', (d: any) => (d.source.x + d.target.x) / 2)
        .attr('y', (d: any) => (d.source.y + d.target.y) / 2 - 5);

      node
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
      tooltip.remove();
    };
  }, [data]);

  return (
    <div ref={containerRef} className="w-full relative overflow-hidden bg-panel rounded border border-line">
      <svg ref={svgRef} className="w-full h-full cursor-move" />
      
      {/* Legend */}
      <div className="absolute top-4 left-4 bg-panel/80 backdrop-blur border border-line p-3 rounded text-[10px] font-mono">
        <div className="text-muted mb-2 uppercase tracking-wider">Edge Types</div>
        <div className="flex items-center gap-2 mb-1"><div className="w-3 h-0.5 bg-green"></div> Alliance</div>
        <div className="flex items-center gap-2 mb-1"><div className="w-3 h-0.5 bg-red"></div> Conflict</div>
        <div className="flex items-center gap-2 mb-1"><div className="w-3 h-0.5 bg-yellow"></div> Economic Dependency</div>
        <div className="flex items-center gap-2"><div className="w-3 h-0.5 bg-blue"></div> Policy Alignment</div>
      </div>
    </div>
  );
};
