"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setError("");
        const response = await fetch("/api/admin/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });
        if (response.ok) {
            router.push("/admin/dashboard");
        } else {
            setError("Invalid password");
        }
    }
    
    return (
        <main className="flex flex-col items-center justify-center min-h-screen gap-8">
            <h1 className="text-center text-lg">ADMIN LOGIN</h1>
            <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
                <input 
                    className="text-center"
                    placeholder="ENTER PASSWORD"
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">LOGIN</button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
        </main>
    );
}