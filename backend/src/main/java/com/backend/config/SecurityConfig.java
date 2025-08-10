package com.backend.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/public/**", "/user","/logout").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("http://localhost:5173/", true)
                )
                .logout(logout -> logout
                        .logoutSuccessHandler((request, response, authentication) -> {
                            request.getSession().invalidate();
                            response.setStatus(HttpServletResponse.SC_OK);
                        })
                )
                .cors() // enable CORS support
                .and()
                .csrf().disable(); // disable CSRF for local dev so fetch works

        return http.build();
    }
}
