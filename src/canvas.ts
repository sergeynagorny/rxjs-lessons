import { fromEvent } from "rxjs";
import { map, pairwise, switchMap, takeUntil } from "rxjs/operators";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const cx = canvas.getContext('2d')!

cx.lineWidth = 4;

interface Position {
  x: number;
  y: number;
}

function drawLine([prev, next]: Position[]) {
  const { top, left } = canvas.getBoundingClientRect()

  cx.beginPath()

  cx.moveTo(prev.x - left, prev.y - top)
  cx.lineTo(next.x - left, next.y - top)
  cx.stroke()
}

const mousemove$ = fromEvent<MouseEvent>(canvas, 'mousemove')
const mousedown$ = fromEvent<MouseEvent>(canvas, 'mousedown')
const mouseup$ = fromEvent<MouseEvent>(canvas, 'mouseup')
const mouseout$ = fromEvent<MouseEvent>(canvas, 'mouseout')


const points$ = mousemove$.pipe(
    map<MouseEvent, Position>((evt) => ({ x: evt.clientX, y: evt.clientY })),
    pairwise<Position>()
  )

mousedown$.pipe(
  switchMap(() => points$.pipe(takeUntil(mouseup$), takeUntil(mouseout$))),
).subscribe(drawLine)

