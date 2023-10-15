import { memo } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Engine } from "tsparticles-engine";

const Background = memo(() => {
  async function particlesInit(engine: Engine) {
    await loadFull(engine);
  }

  return (
    <Particles
      className="fixed -z-10 w-full"
      init={particlesInit}
      options={{
        background: {
          color: "#0b0c10",
        },
        particles: {
          color: {
            value: "#66fcf1",
          },
          links: {
            color: "#66fcf1",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
          },
          number: {
            density: {
              enable: true,
              area: 800,
              factor: 1000,
            },
            limit: 0,
            value: 100,
          },
          opacity: {
            random: {
              enable: true,
              minimumValue: 0.3,
            },
            value: {
              min: 0.3,
              max: 0.8,
            },
            animation: {
              count: 0,
              enable: true,
              speed: 0.5,
              sync: false,
              destroy: "none",
              startValue: "random",
              minimumValue: 0.3,
            },
          },
          size: {
            random: {
              enable: true,
              minimumValue: 1,
            },
            value: {
              min: 1,
              max: 3,
            },
            animation: {
              count: 0,
              enable: true,
              speed: 3,
              sync: false,
              destroy: "none",
              startValue: "random",
              minimumValue: 1,
            },
          },
        },
      }}
    />
  );
});

export default Background;
