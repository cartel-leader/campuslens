"use client"
import { useState, useEffect, useRef } from "react"

export default function Home() {
  const canvasRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random()
    }))

    let animId
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(star => {
        star.opacity += (Math.random() - 0.5) * 0.02
        star.opacity = Math.max(0.1, Math.min(1, star.opacity))
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(167, 139, 250, ${star.opacity})`
        ctx.fill()
        star.y += star.speed
        if (star.y > canvas.height) star.y = 0
      })
      animId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animId)
  }, [])

  const features = [
    { icon: "📊", title: "Attendance Tracker", desc: "Never fall below 75%. Know exactly how many classes you can skip — or how many you need to attend.", href: "/attendance", grad: "from-violet-500 to-purple-700" },
    { icon: "📝", title: "Assignment Manager", desc: "Deadlines, priorities, subjects — all organized. Never miss a submission again.", href: "/assignments", grad: "from-blue-500 to-cyan-700" },
    { icon: "🎯", title: "CGPA Calculator", desc: "IIT-R grade point system. Instant semester CGPA with course-wise breakdown.", href: "/cgpa", grad: "from-emerald-500 to-green-700" },
    { icon: "⏱️", title: "Pomodoro Timer", desc: "25 minutes focus. 5 minutes break. Track your study cycles and build consistency.", href: "/pomodoro", grad: "from-orange-500 to-red-700" },
    { icon: "📅", title: "Timetable Manager", desc: "Your weekly class schedule in a beautiful visual grid. Built for IIT-R students.", href: "/timetable", grad: "from-pink-500 to-rose-700" },
    { icon: "🤖", title: "AI Study Assistant", desc: "Powered by Claude AI. Ask anything about your subjects and get instant answers.", href: "/ai", grad: "from-indigo-500 to-purple-700" },
  ]

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated starfield */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-10 py-4 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔭</span>
          <span className="text-lg font-black tracking-tight bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">CampusLens</span>
        </div>
        <div className="flex items-center gap-8 text-sm text-gray-400">
          {[["Attendance", "/attendance"], ["Assignments", "/assignments"], ["CGPA", "/cgpa"], ["Pomodoro", "/pomodoro"], ["Timetable", "/timetable"]].map(([label, href]) => (
            <a key={href} href={href} className="hover:text-white transition-colors">{label}</a>
          ))}
        </div>
        <a href="/attendance" className="bg-white text-black text-sm font-bold px-5 py-2 rounded-full hover:bg-gray-200 transition-all">
          Get Started
        </a>
      </nav>

      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-gradient-radial from-violet-900/30 via-transparent to-transparent pointer-events-none" />
        
        <div
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-gray-300 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
            Built exclusively for IIT Roorkee students
          </div>

          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-6 leading-none">
            <span className="block text-white">Campus.</span>
            <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Reimagined.
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-xl mx-auto mb-12 leading-relaxed">
            One platform for attendance, assignments, CGPA, focus, and AI-powered study help. Built for the IIT-R grind.
          </p>

          <div className="flex justify-center gap-4">
            <a href="/attendance"
              className="group bg-white text-black font-bold px-8 py-4 rounded-full text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl shadow-white/10">
              Start Now →
            </a>
            <a href="/cgpa"
              className="bg-white/5 border border-white/10 backdrop-blur-sm font-bold px-8 py-4 rounded-full text-lg hover:bg-white/10 transition-all hover:scale-105">
              Calculate CGPA
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 text-xs animate-bounce">
          <span>Scroll</span>
          <span>↓</span>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 border-y border-white/5 bg-white/2 backdrop-blur-sm px-8 py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-4 gap-8 text-center">
          {[
            { val: "2,400+", label: "Students", icon: "👥" },
            { val: "12K+", label: "Assignments Tracked", icon: "📝" },
            { val: "50K+", label: "Study Hours", icon: "⏱️" },
            { val: "8K+", label: "CGPAs Calculated", icon: "🎯" },
          ].map((s, i) => (
            <div key={i} className="group">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-4xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">{s.val}</div>
              <div className="text-gray-500 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-6xl mx-auto px-8 py-32">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black tracking-tight mb-4">Everything you need.</h2>
          <p className="text-gray-500 text-xl">Six tools. One platform. Zero excuses.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <a key={i} href={f.href}
              className="group relative overflow-hidden rounded-3xl bg-white/3 border border-white/8 p-8 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:bg-white/5">
              <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${f.grad} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />
              <div className="text-5xl mb-6">{f.icon}</div>
              <h3 className="text-2xl font-black mb-3">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              <div className="mt-6 text-sm font-semibold text-violet-400 group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center gap-1">
                Open <span>→</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 text-center px-8 py-32">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 to-transparent pointer-events-none" />
        <h2 className="text-6xl font-black tracking-tight mb-6 relative z-10">
          Ready to ace<br />
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">this semester?</span>
        </h2>
        <p className="text-gray-400 text-xl mb-10 relative z-10">Join thousands of IIT-R students already using CampusLens.</p>
        <a href="/attendance"
          className="relative z-10 inline-block bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 font-black px-12 py-5 rounded-full text-xl transition-all hover:scale-105 shadow-2xl shadow-violet-900/50">
          Launch CampusLens 🚀
        </a>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 text-center py-8 text-gray-600 text-sm">
        Built with ❤️ for IIT Roorkee · CampusLens 2025
      </footer>
    </main>
  )
}