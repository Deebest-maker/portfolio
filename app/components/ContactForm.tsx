"use client";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: "debede49-c172-4b5f-82af-776dcdcf589c",
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        from_name: "Portfolio Contact Form",
        to_email: "thmsharuna@gmail.com",
      }),
    });

    if (response.ok) {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-dark-bg/50 border border-electric-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-toxic-green transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Your Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-3 bg-dark-bg/50 border border-electric-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-toxic-green transition-colors"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Subject *
        </label>
        <input
          type="text"
          required
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          className="w-full px-4 py-3 bg-dark-bg/50 border border-electric-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-toxic-green transition-colors"
          placeholder="Project Inquiry / Collaboration / etc."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Message *
        </label>
        <textarea
          required
          rows={6}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full px-4 py-3 bg-dark-bg/50 border border-electric-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-toxic-green transition-colors resize-none"
          placeholder="Tell me about your project or inquiry..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full px-8 py-4 bg-toxic-green text-white font-bold rounded-xl hover:bg-toxic-green/90 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
      >
        {status === "sending" && (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Sending...
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle className="w-5 h-5" />
            Message Sent! ✓
          </>
        )}
        {status === "error" && <>Failed to Send. Try Again</>}
        {status === "idle" && (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </button>

      {status === "success" && (
        <p className="text-center text-toxic-green font-semibold">
          Thanks! I'll get back to you soon! 🚀
        </p>
      )}
    </form>
  );
}
