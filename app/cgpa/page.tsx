"use client"
import { useState } from "react"
import Link from "next/link"

export default function CGPA() {
  const [courses, setCourses] = useState([
    { id: 1, name: "Mathematics", credits: 4, grade: "A" },
    { id: 2, name: "Physics", credits: 3, grade: "B+" },
    { id: 3, name: "Programming", credits: 4, grade: "A+" },
  ])
  const [cgpa, setCgpa] = useState(null)

  const gradePoints = { "A+": 10, "A": 10, "A-": 9, "B+": 8, "B": 7, "B-": 6, "C+": 5, "C": 4, "F": 0 }

  function addCourse() {
    setCourses([...courses, { id: Date.now(), name: "", credits: 3, grade: "B" }])
  }

  function update(id, field, value) {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c))
  }

  function deleteCourse(id) {
    setCourses(courses.filter(c => c.id !== id))
  }

  function calculate() {
    const totalCredits = courses.reduce((s, c) => s + Number(c.credits), 0)
    const totalPoints = courses.reduce((s, c) => s + (gradePoints[c.grade] || 0) * Number(c.credits), 0)
    setCgpa((totalPoints / totalCredits).toFixed(2))
  }

  function cgpaColor(val) {
    if (val >= 9) return "text-green-400"
    if (val >= 7) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-purple-400">🔭 CampusLens</Link>
        <span className="text-gray-400 text-sm">CGPA Calculator</span>
      </nav>

      <section className="max-w-3xl mx-auto mt-12 px-4">
        <h2 className="text-4xl font-extrabold mb-2">🎯 CGPA Calculator</h2>
        <p className="text-gray-400 mb-8">Add your courses and calculate your semester CGPA instantly.</p>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-12 gap-3 mb-3 text-gray-400 text-sm px-1">
            <span className="col-span-5">Course Name</span>
            <span className="col-span-3">Credits</span>
            <span className="col-span-3">Grade</span>
            <span className="col-span-1"></span>
          </div>
          {courses.map(c => (
            <div key={c.id} className="grid grid-cols-12 gap-3 mb-3">
              <input value={c.name} onChange={e => update(c.id, "name", e.target.value)}
                placeholder="e.g. Mathematics"
                className="col-span-5 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500 text-sm" />
              <input type="number" value={c.credits} onChange={e => update(c.id, "credits", e.target.value)}
                className="col-span-3 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500 text-sm" />
              <select value={c.grade} onChange={e => update(c.id, "grade", e.target.value)}
                className="col-span-3 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500 text-sm">
                {Object.keys(gradePoints).map(g => <option key={g}>{g}</option>)}
              </select>
              <button onClick={() => deleteCourse(c.id)} className="col-span-1 text-gray-600 hover:text-red-400 text-lg">✕</button>
            </div>
          ))}
          <div className="flex gap-3 mt-4">
            <button onClick={addCourse} className="border border-purple-600 hover:bg-purple-900 px-4 py-2 rounded-lg text-sm font-semibold">+ Add Course</button>
            <button onClick={calculate} className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg text-sm font-semibold">Calculate CGPA</button>
          </div>
        </div>

        {cgpa && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
            <p className="text-gray-400 mb-2">Your Semester CGPA</p>
            <p className={`text-7xl font-extrabold mb-4 ${cgpaColor(cgpa)}`}>{cgpa}</p>
            <p className="text-gray-400">
              {cgpa >= 9 ? "🔥 Exceptional! You're crushing it!" : cgpa >= 7 ? "👍 Good job! Keep pushing!" : "💪 Time to grind harder!"}
            </p>
          </div>
        )}
      </section>
    </main>
  )
}
