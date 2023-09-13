import React, { useEffect, useState } from 'react';
import './Hourglass.css';
import Matter, { Runner } from 'matter-js';

const Hourglass = ({ currentTime, duration, running }) => {
  const [engine, setEngine] = useState(null);
  const [world, setWorld] = useState(null);
  const [sandParticles, setSandParticles] = useState([]);
  const [runner, setRunner] = useState(null);
  const numberOfParticles = Math.min(currentTime, duration);

  useEffect(() => {
    // Initialize Matter.js engine and world
    const matterEngine = Matter.Engine.create();
    const matterWorld = matterEngine.world;
    setEngine(matterEngine);
    setWorld(matterWorld);

    // Create the upper and lower triangles (unchanged)
    const upperVertices = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 50, y: 100 },
    ];

    const lowerVertices = [
      { x: 0, y: 100 },
      { x: 100, y: 100 },
      { x: 50, y: 0 },
    ];

    const upperTriangle = Matter.Bodies.fromVertices(100, 50, upperVertices, {
      isStatic: true,
    });

    const lowerTriangle = Matter.Bodies.fromVertices(100, 200, lowerVertices, {
      isStatic: true,
    });

    // Add triangles to the world
    Matter.World.add(matterWorld, [upperTriangle, lowerTriangle]);

    // Apply gravity (0 or 1) based on whether the timer is running
    matterWorld.gravity.y = running ? 1 : 0;

    // Create sand particles with fixed initial positions within the top triangle
    const particles = Array.from({ length: numberOfParticles }, (_, index) => {
      const radius = 2;
      const x = 50;
      const y = 25;
      const id = `particle-${index}`;

      const particleBody = Matter.Bodies.circle(x, y, radius, {
        friction: 0.1,
        restitution: 0.5,
      });

      particleBody.label = id;

      return { id, x, y, body: particleBody };
    });

    // Add particle bodies to the world
    Matter.World.add(matterWorld, particles.map((particle) => particle.body));

    setSandParticles(particles);

    // Create a runner for the engine to update physics
    const runner = Runner.create();
    Runner.run(runner, matterEngine);

    // Save the runner in state (to stop it later when necessary)
    setRunner(runner);
  }, [currentTime, duration, running]);

  useEffect(() => {
    // Update particle positions based on the physics simulation
    if (engine && world) {
      sandParticles.forEach((particle) => {
        particle.x = particle.body.position.x;
        particle.y = particle.body.position.y;
      });
    }
  }, [engine, world, sandParticles]);

  useEffect(() => {
    return () => {
      // Stop the runner and clear the engine when unmounting
      if (runner) {
        Runner.stop(runner);
        Matter.Engine.clear(engine);
      }
    };
  }, [engine, runner]);

  return (
    <div className="hourglass">
      <svg className="upper" width="100" height="100">
        <polygon points="0,0 100,0 50,100" fill="#000" />
      </svg>
      <svg className="lower" width="100" height="100">
        <polygon points="0,100 100,100 50,0" fill="#000" />
      </svg>
      <div className="sand-container">
        {sandParticles.map((particle, index) => (
          <div
            key={index}
            className="sand-particle"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Hourglass;
