"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const [mode, setMode] = useState("study") // study | break
  const [cycles, setCycles] = useState(0)

  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(s => s - 1)
      } else if (minutes > 0) {
        setMinutes(m => m - 1)
        setSeconds(59)
      } else {
        // Timer done
        if (mode === "study") {
          setCycles(c => c + 1)
          setMode("break")
          setMinutes(5)
          setSeconds(0)
        } else {
          setMode("study")
          setMinutes(25)
          setSeconds(0)
        }
        setRunning(false)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [running, minutes, seconds, mode])

  function reset() {
    setRunning(false)
    setMode("study")
    setMinutes(25)
    setSeconds(0)
  }

  const total = mode === "study" ? 25 * 60 : 5 * 60
  const elapsed = total - (minutes * 60 + seconds)
  const progress = (elapsed / total) * 100

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-purple-400">🔭 CampusLens</Link>
        <span className="text-gray-400 text-sm">Pomodoro Timer</span>
      </nav>

      <section className="max-w-lg mx-auto mt-16 px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-2">⏱️ Pomodoro Timer</h2>
        <p className="text-gray-400 mb-12">Stay focused. Study 25 mins, break 5 mins.</p>

        {/* Mode Toggle */}
        <div className="flex justify-center gap-3 mb-12">
          <button onClick={() => { setMode("study"); setMinutes(25); setSeconds(0); setRunning(false) }}
            className={`px-6 py-2 rounded-full font-semibold text-sm ${mode === "study" ? "bg-purple-600" : "bg-gray-800 text-gray-400"}`}>
            Study
          </button>
          <button onClick={() => { setMode("break"); setMinutes(5); setSeconds(0); setRunning(false) }}
            className={`px-6 py-2 rounded-full font-semibold text-sm ${mode === "break" ? "bg-green-600" : "bg-gray-800 text-gray-400"}`}>
            Break
          </button>
        </div>

        {/* Circle */}
        <div className="relative w-64 h-64 mx-auto mb-12">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#1f2937" strokeWidth="8" />
            <circle cx="50" cy="50" r="45" fill="none"
              stroke={mode === "study" ? "#9333ea" : "#22c55e"}
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s linear" }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl font-extrabold">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
            <span className="text-gray-400 text-sm mt-1">{mode === "study" ? "Focus Time" : "Break Time"}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button onClick={() => setRunning(r => !r)}
            className={`px-10 py-3 rounded-xl font-bold text-lg ${running ? "bg-yellow-600 hover:bg-yellow-700" : "bg-purple-600 hover:bg-purple-700"}`}>
            {running ? "Pause" : "Start"}
          </button>
          <button onClick={reset} className="px-6 py-3 rounded-xl font-bold text-lg bg-gray-800 hover:bg-gray-700">
            Reset
          </button>
        </div>

        {/* Cycles */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl px-8 py-4 inline-block">
          <p className="text-gray-400 text-sm">Completed Cycles</p>
          <p className="text-4xl font-extrabold text-purple-400">{cycles}</p>
        </div>
      </section>
    </main>
  )
}