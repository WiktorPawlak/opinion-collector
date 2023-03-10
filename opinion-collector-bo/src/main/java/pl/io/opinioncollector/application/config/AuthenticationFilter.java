package pl.io.opinioncollector.application.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtValidationException;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class AuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtDecoder jwtDecoder;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        Cookie cookie = WebUtils.getCookie(request, "opinionCollector");
        if (!request.getRequestURI().equals("/login") ) {
            try {
                if (cookie != null) {
                    String jwtString = cookie.getValue();

                    Jwt jwt = jwtDecoder.decode(jwtString);

                    UserDetails userDetails = userDetailsService.loadUserByUsername(jwt.getClaim("sub"));

                    Authentication authentication =
                        authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(userDetails.getUsername(), jwt.getClaim("pas"), userDetails.getAuthorities()));

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (JwtValidationException e) {
                log.info("Token expired, generating new");
            }

        }

        filterChain.doFilter(request, response);
    }
}
