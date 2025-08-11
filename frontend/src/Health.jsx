import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";

export default function RepoDetailsPage() {
    const { repoName } = useParams();
    const [details, setDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch(`http://localhost:8080/user/repos/${repoName}/health`, {
                    credentials: "include", // send session cookies
                    headers: { Accept: "application/json" }
                });

                // If backend returned HTML (login page), this will catch it
                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error(`Expected JSON, got: ${contentType}`);
                }

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                setDetails(data);
            } catch (err) {
                console.error("Failed to load repo details", err);
                setError(err.message);
            }
        };

        fetchDetails();
    }, [repoName]);

    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!details) return <p>Loading...</p>;

    const { health, history } = details;

    return (
        <div style={{ padding: "20px" }}>
            <h1>{health.repo} – Score: {health.totalScore}</h1>
            <ul>
                <li>Activity Score: {health.activityScore}</li>
                <li>Issue Score: {health.issueScore}</li>
                <li>Docs Score: {health.docsScore}</li>
                <li>Commits (Last 30 Days): {health.commitCountLast30Days}</li>
                <li>Open Issues: {health.openIssues}</li>
            </ul>

            <h3>Commit History (Last 30 Days)</h3>
            <Line
                data={{
                    labels: Object.keys(history),
                    datasets: [
                        {
                            label: "Commits per Day",
                            data: Object.values(history),
                            borderColor: "#4f46e5",
                            backgroundColor: "rgba(79, 70, 229, 0.3)",
                            fill: true
                        }
                    ]
                }}
            />
        </div>
    );
}
