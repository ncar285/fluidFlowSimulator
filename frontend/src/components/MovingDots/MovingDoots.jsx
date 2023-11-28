import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const MovingDots = () => {
    const d3Container = useRef(null);
    const width = 800;
    const height = 200;
    const numDots = 10;
    const dotRadius = 5;

    useEffect(() => {
        if (d3Container.current) {
            // Create SVG container
            const svg = d3.select(d3Container.current)
                          .append('svg')
                          .attr('width', width)
                          .attr('height', height);

            // Create dots
            svg.selectAll('circle')
               .data(d3.range(numDots))
               .enter().append('circle')
               .attr('cx', 0)
               .attr('cy', (d, i) => (height / numDots) * i + dotRadius)
               .attr('r', dotRadius)
               .style('fill', 'blue');

            // Animate dots
            function animateDots() {
                svg.selectAll('circle')
                   .transition()
                   .duration(2000)
                   .attr('cx', width)
                   .on('end', function() {
                       d3.select(this).attr('cx', 0);
                   })
                   .on('start', animateDots);
            }

            animateDots();
        }
    }, []);

    return (
        <div className="moving-dots-container" ref={d3Container}></div>
    );
}

export default MovingDots;