package com.backend.controller;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDate;
import java.util.*;

@Service
public class RepoHealthService {

    private final WebClient webClient;

    public RepoHealthService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.github.com").build();
    }

    public Map<String, Object> getRepoHealth(String accessToken, String owner, String repo) {
        Map<String, Object> healthData = new LinkedHashMap<>();

        // Basic repo info
        Map<String, Object> repoInfo = webClient.get()
                .uri("/repos/{owner}/{repo}", owner, repo)
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        // Commits in last 30 days
        List<Map<String, Object>> commits = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/repos/{owner}/{repo}/commits")
                        .queryParam("since", java.time.LocalDate.now().minusDays(30))
                        .build(owner, repo))
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(List.class)
                .block();

        int commitCount = commits != null ? commits.size() : 0;

        // Open vs closed issues
        List<Map<String, Object>> openIssues = webClient.get()
                .uri("/repos/{owner}/{repo}/issues?state=open", owner, repo)
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(List.class)
                .block();
        int openIssueCount = openIssues != null ? openIssues.size() : 0;

        // Simple scoring
        double activityScore = Math.min(commitCount / 10.0, 1.0) * 25;
        double issueScore = openIssueCount < 10 ? 25 : 10; // crude example
        double docsScore = repoInfo.get("description") != null ? 20 : 10;

        double totalScore = activityScore + issueScore + docsScore;

        healthData.put("repo", repo);
        healthData.put("activityScore", activityScore);
        healthData.put("issueScore", issueScore);
        healthData.put("docsScore", docsScore);
        healthData.put("totalScore", totalScore);
        healthData.put("commitCountLast30Days", commitCount);
        healthData.put("openIssues", openIssueCount);

        return healthData;
    }
    public Map<String, Integer> getCommitHistory(String accessToken, String owner, String repo) {
        LocalDate sinceDate = LocalDate.now().minusDays(30);

        List<Map<String, Object>> commits = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/repos/{owner}/{repo}/commits")
                        .queryParam("since", sinceDate)
                        .build(owner, repo))
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(List.class)
                .block();

        Map<String, Integer> history = new TreeMap<>();
        if (commits != null) {
            for (Map<String, Object> commit : commits) {
                Map<String, Object> commitData = (Map<String, Object>) commit.get("commit");
                Map<String, Object> committerData = (Map<String, Object>) commitData.get("committer");
                String date = ((String) committerData.get("date")).substring(0, 10); // yyyy-MM-dd
                history.merge(date, 1, Integer::sum);
            }
        }
        return history;
    }
}
