"use client"
import { useState } from "react"
import Link from "next/link"

export default function Assignments() {
  const [assignments, setAssignments] = useState([
    { id: 1, title: "DSA Lab Report", subject: "CS-201", deadline: "2025-06-05", priority: "High", done: false },
    { id: 2, title: "Physics Assignment", subject: "PHY-101", deadline: "2025-06-07", priority: "Medium", done: false },
  ])
  const [title, setTitle] = useState("")
  const [subject, setSubject] = useState("")
  const [deadline, setDeadline] = useState("")
  const [priority, setPriority] = useState("Medium")

  function addAssignment() {
    if (!title || !subject || !deadline) return
    setAssignments([...assignments, { id: Date.now(), title, subject, deadline, priority, done: false }])
    setTitle(""); setSubject(""); setDeadline(""); setPriority("Medium")
  }

  function toggleDone(id) {
    setAssignments(assignments.map(a => a.id === id ? { ...a, done: !a.done } : a))
  }

  function deleteAssignment(id) {
    setAssignments(assignments.filter(a => a.id !== id))
  }

  const priorityColor = { High: "text-red-400", Medium: "text-yellow-400", Low: "text-green-400" }

  function daysLeft(deadline) {
    const diff = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24))
    if (diff < 0) return <span className="text-red-500">Overdue</span>
    if (diff === 0) return <span className="text-red-400">Due Today</span>
    return <span className="text-gray-400">{diff} days left</span>
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-purple-400">🔭 CampusLens</Link>
        <span className="text-gray-400 text-sm">Assignment Tracker</span>
      </nav>

      <section className="max-w-3xl mx-auto mt-12 px-4">
        <h2 className="text-4xl font-extrabold mb-2">📝 Assignment Tracker</h2>
        <p className="text-gray-400 mb-8">Never miss a deadline again.</p>

        {/* Add Form */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8 grid grid-cols-2 gap-4">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Assignment Title"
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 col-span-2" />
          <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject (e.g. CS-201)"
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
          <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
          <select value={priority} onChange={e => setPriority(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500">
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <button onClick={addAssignment}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold">
            + Add Assignment
          </button>
        </div>

        {/* List */}
        <div className="flex flex-col gap-4">
          {assignments.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)).map(a => (
            <div key={a.id} className={`bg-gray-900 border rounded-xl px-6 py-4 flex items-center justify-between gap-4 ${a.done ? "border-gray-700 opacity-50" : "border-gray-800"}`}>
              <div className="flex items-center gap-4">
                <input type="checkbox" checked={a.done} onChange={() => toggleDone(a.id)} className="w-5 h-5 accent-purple-500" />
                <div>
                  <p className={`font-semibold text-lg ${a.done ? "line-through text-gray-500" : ""}`}>{a.title}</p>
                  <p className="text-gray-400 text-sm">{a.subject} · {daysLeft(a.deadline)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-sm font-semibold ${priorityColor[a.priority]}`}>{a.priority}</span>
                <button onClick={() => deleteAssignment(a.id)} className="text-gray-600 hover:text-red-400 text-xl">✕</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}