import { Container, Stage } from '@inlet/react-pixi';
import { useControls } from 'leva';
import { Application, Graphics as PixiGraphics } from 'pixi.js';
import { useEffect, useState } from 'react';
import Diamond from '../components/Diamond';
import drawLine from '../components/Line';
import Spiral from '../components/Spiral';

const stageDimensions = 800;

export default function Home() {
  const [app, setApp] = useState<Application>();

  const [running, setRunning] = useState(true)
  const [graphic, setGraphic] = useState<PixiGraphics>()
  const [time, setTime] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [distance, setDistance] = useState(0)
  const [count, setCount] = useState(360 * 2)
  const [turns, setTurns] = useState(1)

  const [, setControls] = useControls(() => ({
    running: {
      value: true,
      onChange: (value) => {
        setRunning(value)
      }
    },
    count: {
      value: 360 * 2,
      step: 1,
      onChange: (value) => setCount(value)
    },
    turns: {
      value: 1,
      step: 1,
      onChange: (value) => setTurns(value)
    },
    time: {
      value: 0,
      step: 10,
      onChange: (value) => {
        setTime(value)
        setRotation(value * Math.PI * .0013)
        setDistance((70 * 2) + easeInOutSine(value * 0.0022) * (75 * 2))
      },
    },
    rotation: {
      value: 0,
      step: .1,
      onChange: (value) => {
        setRotation(value)
      },
    },
    distance: {
      value: 0,
      step: 1,
      onChange: (value) => {
        setDistance(value)
      },
    },
  }))

  useEffect(() => {
    const tick = (dt) => {
      setTime(time => {
        const newTime = time + dt

        const newRotation = newTime * Math.PI * .0013
        setRotation(newRotation)

        const newDistance = (70 * 2) + easeInOutSine(time * 0.0022) * (75 * 2)
        setDistance(newDistance)

        setControls({ time: newTime, distance: newDistance, rotation: newRotation })
        return newTime
      })
    };

    if (app && running) {
      app.ticker.add(tick);

      return () => {
        app.ticker.remove(tick);
      };
    }
  }, [app, running, time]);

  // const rotation = time * Math.PI * .0013
  // const distance = (70 * 2) + easeInOutSine(time * 0.0022) * (75 * 2)

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
        preserveDrawingBuffer: true,
      }}
      onClick={() => {
        const newRunning = !running
        setRunning(newRunning)
        setControls({ running: newRunning })
      }}
    >
      <Diamond
        scale={4}
        position={[stageDimensions / 2, stageDimensions / 2]}
        rotation={Math.PI * 0.25} />
      {
        // @ts-ignore
        <Container
          position={[stageDimensions / 2, stageDimensions / 2]}
          rotation={-rotation * 0.3 * 0}>
          {
            graphic &&
            <Spiral
              geometry={graphic}
              count={count}
              turns={turns}
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
