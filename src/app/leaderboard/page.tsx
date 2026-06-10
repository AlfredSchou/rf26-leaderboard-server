"use client";

import { useSearchParams } from "next/navigation";
import { useState} from "react";


export default function LeaderboardPage() {
  const params = useSearchParams();
  const score = params.get("score");
  const sig = params.get("sig");

  // form state and submit handler go here
  const [tag, setTag] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // submit logic goes here
  };

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} />
        <button type="submit">Submit</button>
    </form>
  );
}