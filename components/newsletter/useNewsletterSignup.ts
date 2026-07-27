"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Shared submit logic for the two newsletter forms (NewsletterCTA, FinalCTA)
// so retry/announcement/timeout behavior can't drift between them.
export function useNewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear the "Subscribed!" reset timer if the component unmounts first.
  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      setError("");

      try {
        const res = await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Something went wrong");
          return;
        }

        setEmail("");
        setSubmitted(true);
        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
        resetTimerRef.current = setTimeout(() => setSubmitted(false), 3000);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
    [email]
  );

  return { email, setEmail, submitted, submitting, error, handleSubmit };
}
