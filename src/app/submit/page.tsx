"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";

import { Press_Start_2P } from "next/font/google";
const pixelFont = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export function SubmitPage() {
  const params = useSearchParams();
  const router = useRouter();
  const score = params.get("score");
  const sig = params.get("sig");

  // form state and submit handler go here
  const [tag, setTag] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
        
        const response = await fetch("/api/scores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tag, score, signature: sig, nonce: params.get("nonce") }),
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            router.push("/");
        }
  };

  return (
    <main className={`${pixelFont.className} flex flex-col items-center justify-center min-h-screen gap-8`}>
        <h1 className="text-center text-lg">THE LAST CHECKPOINT</h1>
        <h1 className="text-1xl">SUBMIT YOUR SCORE</h1>
        <p>{score}</p>
        <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
            <input 
                placeholder="ENTER YOUR TAG"
                maxLength={10}
                type="text" 
                value={tag} 
                onChange={(e) => setTag(e.target.value)} 
            />
            <button type="submit">SUBMIT</button>
        </form>
    </main>
  );
}

export default function Page() {
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <SubmitPage />
        </Suspense>
    );
}