"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";


export function SubmitPage() {
  const params = useSearchParams();
  const score = params.get("score");
  const sig = params.get("sig");

  // form state and submit handler go here
  const [tag, setTag] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
        await fetch("/api/scores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tag, score, signature: sig }),
        });
  };

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} />
        <button type="submit">Submit</button>
    </form>
  );
}

export default function Page() {
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <SubmitPage />
        </Suspense>
    );
}