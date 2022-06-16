import { Graphics, _ReactPixi } from '@inlet/react-pixi';
import { Graphics as PixiGraphics } from 'pixi.js';
import { useCallback } from 'react';

const color = 0xffffff

export default function Diamond(props: _ReactPixi.IGraphics) {
  const draw = useCallback((g: PixiGraphics) => {
    g.clear();

    // g.beginFill(color, 0.3);
    g.lineStyle(2, color, 0.3);

    g.drawRect(-50, -50, 100, 100);

    g.beginFill(0xffffff, 0.7);
    g.lineStyle(0);

    g.drawCircle(0, 0, 1);
    g.drawCircle(30, 30, 1);
    g.drawCircle(-30, 30, 1);
    g.drawCircle(-30, -30, 1);
    g.drawCircle(30, -30, 1);

    g.endFill();
  }, []);

  return <Graphics {...props} draw={draw} />;
}
