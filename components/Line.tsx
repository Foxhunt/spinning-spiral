import { Graphics as PixiGraphics } from 'pixi.js';

export default function drawLine() {
    const g = new PixiGraphics()
    g.clear();

    g.beginFill(0xff00ff, 0.003);
    g.lineStyle(1, 0x00f0ff, 0.04);

    g.drawRect(-30, -30, 60, 60);

    g.lineStyle(.5, 0x00f0ff, .1);
    g.moveTo(-30, -30)
    g.lineTo(30, 30)

    g.beginFill(0xaaaaaa, 0.2);
    g.lineStyle(0);
    g.drawCircle(0, 0, .7);
    g.drawCircle(35, 35, 1);
    g.drawCircle(-35, 35, 1);
    g.drawCircle(-35, -35, 1);
    g.drawCircle(35, -35, 1);

    g.endFill();

    return g
}
