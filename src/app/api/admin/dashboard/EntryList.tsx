"use client";

type Score = {
    id: number;
    tag: string;
    score: number;
};

type Props = {
    scores: Score[];
};

const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this score?")) {
        await fetch(`/api/admin/score/${id}`, {
            method: "DELETE",
        });
        location.reload();
    }
}

const handleWipe = async () => {
    if (confirm("Are you sure you want to wipe all scores?")) {
        await fetch(`/api/admin/score/wipe`, {
            method: "DELETE",
        });
        location.reload();
    }
}

export default function EntryList({ scores }: Props) {
    return <main className="flex flex-col items-center justify-center min-h-screen gap-8">
        <h1 className="text-center text-lg">ADMIN DASHBOARD</h1>
        <div className="flex justify-between gap-8 w-full max-w-md">
            <span className="w-12">RANK</span>
            <span className="w-50">TAG</span>
            <span className="w-20">SCORE</span>
        </div>    
        {scores.map((score, index) => (
            <div key={score.id} className="flex justify-between gap-8 w-full max-w-md">
                <span className="w-12">{index + 1}</span>
                <span className="w-50">{score.tag.slice(0, 12)}</span>
                <span className="w-20">{score.score}</span>
                <button className="text-red-500" onClick={() => handleDelete(score.id)}>DELETE</button>
            </div>
        ))}
        <button className="text-red-500" onClick={handleWipe}> WIPE ALL SCORES</button>
    </main>;
}
