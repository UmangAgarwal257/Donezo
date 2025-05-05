import React, { useState } from "react";
import { recipientApi } from "@/services/api";

export default function OptOutForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOptOut = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await recipientApi.optOut(email);
      setMessage(res.data.message);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleOptOut} className="flex flex-col gap-2 max-w-xs">
      <input
        type="email"
        placeholder="Your email"
        value={email}
        required
        onChange={e => setEmail(e.target.value)}
        className="p-2 border rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="p-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Unsubscribing..." : "Unsubscribe"}
      </button>
      {message && <div className="mt-2 text-sm">{message}</div>}
    </form>
  );
}