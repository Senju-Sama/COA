import { useRef, useEffect, useState, useCallback } from 'react';
import { useToolsStore } from '../store/useToolsStore';

type Point = { x: number; y: number };
type Stroke = { points: Point[]; color: string; width: number; isHighlighter: boolean };

export function useWhiteboard(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const { isWhiteboardActive, activeTool, strokeColor, strokeWidth } = useToolsStore();
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const currentStrokeRef = useRef<Stroke | null>(null);

  const drawStroke = useCallback((ctx: CanvasRenderingContext2D, stroke: Stroke) => {
    if (stroke.points.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

    // Simple smoothing
    for (let i = 1; i < stroke.points.length - 2; i++) {
      const xc = (stroke.points[i].x + stroke.points[i + 1].x) / 2;
      const yc = (stroke.points[i].y + stroke.points[i + 1].y) / 2;
      ctx.quadraticCurveTo(stroke.points[i].x, stroke.points[i].y, xc, yc);
    }
    // Curve through the last two points
    if (stroke.points.length > 2) {
      const last = stroke.points.length - 1;
      ctx.quadraticCurveTo(
        stroke.points[last - 1].x,
        stroke.points[last - 1].y,
        stroke.points[last].x,
        stroke.points[last].y
      );
    }

    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (stroke.isHighlighter) {
      ctx.globalAlpha = 0.3;
      ctx.globalCompositeOperation = 'source-over'; // standard alpha blending
    } else {
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = 'source-over';
    }

    ctx.stroke();
    ctx.globalAlpha = 1.0; // reset
  }, []);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    strokes.forEach(stroke => drawStroke(ctx, stroke));
    if (currentStrokeRef.current) {
      drawStroke(ctx, currentStrokeRef.current);
    }
  }, [strokes, drawStroke, canvasRef]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      redraw();
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [canvasRef, redraw]);

  useEffect(() => {
    redraw();
  }, [redraw, isWhiteboardActive]); // redraw when toggled in case canvas was cleared

  const getCoordinates = (e: MouseEvent | TouchEvent): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const onPointerDown = (e: MouseEvent | TouchEvent) => {
    if (!isWhiteboardActive) return;
    const pt = getCoordinates(e);
    if (!pt) return;

    if (activeTool === 'eraser') {
       // Simple eraser: clears strokes near click
       setStrokes(prev => prev.filter(stroke => {
          return !stroke.points.some(p => Math.hypot(p.x - pt.x, p.y - pt.y) < 20);
       }));
       return;
    }

    setIsDrawing(true);
    currentStrokeRef.current = {
      points: [pt],
      color: strokeColor,
      width: activeTool === 'highlighter' ? strokeWidth * 3 : strokeWidth,
      isHighlighter: activeTool === 'highlighter'
    };
  };

  const onPointerMove = (e: MouseEvent | TouchEvent) => {
    if (!isDrawing || !isWhiteboardActive || !currentStrokeRef.current) return;
    const pt = getCoordinates(e);
    if (!pt) return;
    currentStrokeRef.current.points.push(pt);
    redraw(); // Real-time preview
  };

  const onPointerUp = () => {
    if (!isDrawing || !currentStrokeRef.current) return;
    setIsDrawing(false);
    setStrokes(prev => [...prev, currentStrokeRef.current!]);
    currentStrokeRef.current = null;
  };

  const clearCanvas = () => {
    setStrokes([]);
  };

  const undo = () => {
    setStrokes(prev => prev.slice(0, -1));
  };

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    clearCanvas,
    undo
  };
}
