"use client"
import { useState } from "react"
import Link from "next/link"

export default function Attendance() {
  const [total, setTotal] = useState("")
  const [attended, setAttended] = useState("")
  const [result, setResult] = useState(null)

  function calculate() {
    const t = parseInt(total)
    const a = parseInt(attended)
    if (!t || !a || a > t) return
    const percent = ((a / t) * 100).toFixed(1)
    const canSkip = Math.floor(a - 0.75 * t)
    const needToAttend = Math.ceil((0.75 * t - a) / 0.25)
    setResult({ percent, canSkip: canSkip > 0 ? canSkip : 0, needToAttend: canSkip >= 0 ? 0 : needToAttend })
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-purple-400">🔭 CampusLens</Link>
        <span className="text-gray-400 text-sm">Attendance Calculator</span>
      </nav>

      <section className="max-w-lg mx-auto mt-20 px-4">
        <h2 className="text-4xl font-extrabold mb-2">📊 Attendance Calculator</h2>
        <p className="text-gray-400 mb-8">Find out if you can bunk — or need to grind.</p>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Total Classes Held</label>
            <input type="number" value={total} onChange={e => setTotal(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="e.g. 40" />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Classes Attended</label>
            <input type="number" value={attended} onChange={e => setAttended(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="e.g. 32" />
          </div>
          <button onClick={calculate}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold mt-2">
            Calculate
          </button>

          {result && (
            <div className="mt-4 rounded-xl border border-gray-700 p-6 text-center">
              <p className="text-5xl font-extrabold text-purple-400 mb-2">{result.percent}%</p>
              <p className="text-gray-400 mb-4">Current Attendance</p>
              {result.canSkip > 0 ? (
                <p className="text-green-400 text-lg font-semibold">✅ You can skip <span className="text-white">{result.canSkip}</span> more classes safely</p>
              ) : (
                <p className="text-red-400 text-lg font-semibold">⚠️ Attend <span className="text-white">{result.needToAttend}</span> consecutive classes to reach 75%</p>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}