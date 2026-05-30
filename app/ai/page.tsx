"use client"
import { useState } from "react"
import Link from "next/link"

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hey! I'm your AI study assistant. Ask me anything about your subjects, concepts, or exams! 🎓" }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  async function sendMessage() {
    if (!input.trim() || loading) return
    const userMsg = { role: "user", content: input }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })
      })
      const data = await res.json()
      setMessages([...newMessages, { role: "assistant", content: data.reply }])
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Something went wrong. Try again!" }])
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col">
      <nav className="border-b border-gray-800 px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-purple-400">🔭 CampusLens</Link>
        <span className="text-gray-400 text-sm">AI Study Assistant</span>
      </nav>

      <section className="max-w-3xl mx-auto w-full flex flex-col flex-1 px-4 py-8">
        <h2 className="text-4xl font-extrabold mb-2">🤖 AI Study Assistant</h2>
        <p className="text-gray-400 mb-6">Powered by Claude AI. Ask anything.</p>

        <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col gap-4 overflow-y-auto min-h-96 mb-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-lg px-4 py-3 rounded-xl text-sm leading-relaxed ${m.role === "user" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-200"}`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 px-4 py-3 rounded-xl text-gray-400 text-sm">Thinking...</div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Ask anything... e.g. Explain Dijkstra's algorithm"
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
          <button onClick={sendMessage} disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 px-6 py-3 rounded-lg font-semibold">
            Send
          </button>
        </div>
      </section>
    </main>
  )
}