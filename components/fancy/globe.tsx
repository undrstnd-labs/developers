"use client"

import { useCallback, useEffect, useRef } from "react"
import createGlobe, { COBEOptions } from "cobe"
import { useTheme } from "next-themes"
import { useSpring } from "react-spring"

import { cn } from "@/lib/utils"

const LIGHT_GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  scale: 1.5,
  offset: [10, 700],
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
  baseColor: [1, 1, 1],
  markerColor: [21 / 255, 182 / 255, 251 / 255],
}

const DARK_GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  scale: 1.5,
  offset: [10, 700],
  theta: 0.3,
  dark: 1,
  baseColor: [1, 1, 1],
  markerColor: [21 / 255, 182 / 255, 251 / 255],
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
}

export function Globe({
  className,
  config = LIGHT_GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  let phi = 0
  let width = 0
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef(null)
  const pointerInteractionMovement = useRef(0)
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }))

  const updatePointerInteraction = (value: any) => {
    pointerInteracting.current = value
    canvasRef.current!.style.cursor = value ? "grabbing" : "grab"
  }

  const updateMovement = (clientX: any) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      api.start({ r: delta / 200 })
    }
  }

  const onRender = useCallback(
    (state: Record<string, any>) => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (!pointerInteracting.current) phi += 0.005
      state.phi = phi + r.get()
      state.width = width * 2
      state.height = width * 2
    },
    [pointerInteracting, phi, r]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth
    }
  }

  useEffect(() => {
    window.addEventListener("resize", onResize)
    onResize()

    const globeConfig =
      theme === "dark" ? DARK_GLOBE_CONFIG : LIGHT_GLOBE_CONFIG

    const globe = createGlobe(canvasRef.current!, {
      ...globeConfig,
      width: width * 2,
      height: width * 2,
      onRender,
    })

    setTimeout(() => (canvasRef.current!.style.opacity = "1"))
    return () => globe.destroy()
  }, [onRender, onResize, theme, width])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-[800px] max-w-[800px]",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent dark:from-black/80" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent dark:from-black/80" />
    </div>
  )
}
