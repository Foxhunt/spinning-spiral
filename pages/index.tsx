import { Container, Stage } from '@inlet/react-pixi';
import { Application, Graphics as PixiGraphics } from 'pixi.js';
import { useEffect, useState } from 'react';
import Diamond from '../components/Diamond';
import drawLine from '../components/Line';
import Spiral from '../components/spiral';

const stageDimensions = 800;

export default function Home() {
  const [app, setApp] = useState<Application>();

  const [running, setRunning] = useState(true)
  const [time, setTime] = useState(0)
  const [graphic, setGraphic] = useState<PixiGraphics>()

  useEffect(() => {
    const tick = (dt) => {
      setTime(time => time + dt)
    };

    if (app && running) {
      app.ticker.add(tick);

      return () => {
        app.ticker.remove(tick);
      };
    }
  }, [app, running]);

  const rotation = time * Math.PI * .0013

  const oscilation = 1 - Math.abs(((time * 0.0024) % 2) - 1);
  const distance = (52 * 2) + easeInOutSine(oscilation) * (90 * 2)

  useEffect(() => {
    const g = drawLine()
    setGraphic(g)

    return () => {
      g.destroy()
    }
  }, [])

  return (
    <Stage
      width={stageDimensions}
      height={stageDimensions}
      onMount={setApp}
      options={{
        antialias: true,
        autoDensity: true,
      }}
      onClick={() => { setRunning(!running) }}
    >
      <Diamond
        scale={4}
        position={[stageDimensions / 2, stageDimensions / 2]}
        rotation={Math.PI * 0.25} />
      {
        // @ts-ignore
        <Container
          position={[stageDimensions / 2, stageDimensions / 2]}
          rotation={-rotation * 0.3}>
          {
            graphic &&
            <Spiral
              geometry={graphic}
              count={360 * 3}
              turns={4}
              distance={distance}
              rotation={rotation}
            />
          }
        </Container>
      }
      <Diamond
        scale={2}
        position={[stageDimensions / 2, stageDimensions / 2]}
        rotation={Math.PI * 0.25} />
    </Stage >
  );
}

function easeInOutSine(x: number): number {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function easeInOutBack(x: number): number {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;

  return x < 0.5
    ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
    : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}
