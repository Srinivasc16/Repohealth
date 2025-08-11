package com.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@RestController
public class UserController {

    private final OAuth2AuthorizedClientService authorizedClientService;

    private final WebClient webClient = WebClient.create();

    @Autowired
    public UserController(OAuth2AuthorizedClientService authorizedClientService) {
        this.authorizedClientService = authorizedClientService;
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
}
