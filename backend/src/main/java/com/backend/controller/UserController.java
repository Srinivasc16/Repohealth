package com.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@RestController
public class UserController {

    private final OAuth2AuthorizedClientService authorizedClientService;
    private final WebClient webClient = WebClient.create();
    private final RepoHealthService repoHealthService;

    @Autowired
    public UserController(OAuth2AuthorizedClientService authorizedClientService,
                          RepoHealthService repoHealthService) {
        this.authorizedClientService = authorizedClientService;
        this.repoHealthService = repoHealthService;
    }

    @GetMapping("/user")
    public Map<String, Object> getUser(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return Map.of();
        }
        return principal.getAttributes();
    }

    @GetMapping("/user/repos")
    public List<Map<String, Object>> getUserRepos(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return List.of();
        }

        OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(
                "github",  // GitHub client registration ID
                principal.getName()
        );

        if (client == null) {
            return List.of();
        }

        String accessToken = client.getAccessToken().getTokenValue();

        List<Map<String, Object>> repos = webClient.get()
                .uri("https://api.github.com/user/repos")
                .headers(headers -> headers.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(List.class)
                .block();

        return repos;
    }

    // NEW endpoint for a single repo's health
    @GetMapping("/user/repos/{repo}/health")
    public Map<String, Object> getSingleRepoHealth(
            @AuthenticationPrincipal OAuth2User principal,
            @PathVariable String repo) {

        if (principal == null) {
            return Map.of();
        }

        OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(
                "github",
                principal.getName()
        );

        if (client == null) {
            return Map.of();
        }

        String accessToken = client.getAccessToken().getTokenValue();
        String owner = principal.getAttribute("login"); // GitHub username from OAuth

        Map<String, Object> health = repoHealthService.getRepoHealth(accessToken, owner, repo);
        Map<String, Integer> history = repoHealthService.getCommitHistory(accessToken, owner, repo);

        return Map.of(
                "health", health,
                "history", history
        );
    }
}
