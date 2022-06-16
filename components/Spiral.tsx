import { Graphics } from '@inlet/react-pixi';
import { Graphics as PixiGraphics } from "pixi.js"

interface props {
    geometry: PixiGraphics
    distance: number
    rotation: number
    count: number
    turns: number
}

export default function Spiral({ geometry, distance, rotation, count, turns }: props) {
    return <>{
        new Array(count).fill("").map((_, i) => (
            <Graphics
                key={i}
                scale={2}
                // @ts-ignore
                geometry={geometry}
                x={
                    Math.cos(i * ((360 * turns) / count) * (Math.PI / 180)) *
                    distance
                }
                y={
                    Math.sin(i * ((360 * turns) / count) * (Math.PI / 180)) *
                    distance
                }
                rotation={
                    Math.sin((Math.PI * 4) / count * i) *
                    rotation
                }
            />
        ))
    }</>
}
