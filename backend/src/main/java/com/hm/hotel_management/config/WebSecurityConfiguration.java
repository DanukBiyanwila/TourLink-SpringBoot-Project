package com.hm.hotel_management.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;



@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    
  
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
  

    private void configureRoleBasedAccess(HttpSecurity http, String role, String... antPatterns) throws Exception {
        http.authorizeRequests()
            .antMatchers(antPatterns).hasRole(role);
    }
    
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:4200");
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
        	.addFilterBefore(corsFilter(), CorsFilter.class)// Disable CSRF protection for testing purposes
            .authorizeRequests()
            .antMatchers("/").permitAll()
            .antMatchers(HttpMethod.POST, "/auth/signup").permitAll()
            .antMatchers(HttpMethod.POST, "/auth/login").permitAll()
            
            .antMatchers("/auth/{id}").permitAll()

            .antMatchers("/hotel").permitAll() // Allow access to the logout URL
            .antMatchers("/hotel/{id}").permitAll()
        	.antMatchers("/hotel-package").permitAll()
        	.antMatchers("/hotel-package/{id}").permitAll()
        	.antMatchers("/hotel-package/one/{id}").permitAll()
        	.antMatchers("/hotel-rating/{id}").permitAll()
        	
        	.antMatchers("/driver").permitAll()
        	.antMatchers("/driver/package/{id}").permitAll()
        	.antMatchers("/driver/package/single").permitAll()
        	
        	.antMatchers("/guide").permitAll()
        	.antMatchers("/guide/{id}").permitAll()
        	.antMatchers("/guide/package/{id}").permitAll()
        	.antMatchers("/guide/package/single").permitAll()
        	.antMatchers("/guide/pack/{id}").permitAll()
        	
        	.antMatchers("/travel-insurance").permitAll()
        	.antMatchers("/travel-insurance/{id}").permitAll()
        	
        	.antMatchers("/other-facilities").permitAll()
        	.antMatchers("/other-facilities/{id}").permitAll()
        	
        	.antMatchers("/tourist-package").permitAll()
        	.antMatchers("/tourist-package/{id}").permitAll()

        

        	.antMatchers("/admin-dashboard").permitAll()



        	.antMatchers("/tourist").permitAll()
        	
        
        	.antMatchers("/driver-guide-rating").permitAll()
        	.antMatchers("/driver-guide-rating/{id}").permitAll()
        	
        	.antMatchers("/cart/{id}").permitAll()
        	.antMatchers("/cart/view/{id}").permitAll()
        

       
        

            .antMatchers("/hotel").permitAll() // Allow access to the logout URL
            .antMatchers("/hotel/{id}").permitAll()
        	.antMatchers("/hotel-package").permitAll()
        	.antMatchers("/hotel-package/{id}").permitAll()
        	.antMatchers("/hotel-package/one/{id}").permitAll()
        	.antMatchers("/hotel-rating/{id}").permitAll()
        	
        	.antMatchers("/driver").permitAll()
        	.antMatchers("/driver/package/{id}").permitAll()
        	.antMatchers("/driver/package/single").permitAll()
        	
        	.antMatchers("/guide").permitAll()
        	.antMatchers("/guide/{id}").permitAll()
        	.antMatchers("/guide/package/{id}").permitAll()
        	.antMatchers("/guide/package/single").permitAll()
        	.antMatchers("/guide/pack/{id}").permitAll()
        	
        	.antMatchers("/travel-insurance").permitAll()
        	.antMatchers("/travel-insurance/{id}").permitAll()
        	
        	.antMatchers("/other-facilities").permitAll()
        	.antMatchers("/other-facilities/{id}").permitAll()
        	
        	.antMatchers("/tourist-package").permitAll()
        	.antMatchers("/tourist-package/{id}").permitAll()

        	.antMatchers("/cart/{id}").permitAll()

        	.antMatchers("/admin-dashboard").permitAll()
        	.antMatchers("/tourist").permitAll()
        	.antMatchers("/driver-guide-rating").permitAll()
        	.antMatchers("/driver-guide-rating/{id}").permitAll()
        	.antMatchers("/cart/{id}").permitAll();
        

       
        

        configureRoleBasedAccess(http, "ADMIN", "/admin/**");
        configureRoleBasedAccess(http, "TOURIST", "/tourist/**");
        configureRoleBasedAccess(http, "GUIDE", "/guide/**");
        configureRoleBasedAccess(http, "DRIVER", "/driver/**");

        http.authorizeRequests()
            .anyRequest().authenticated();
        
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS);
    }
    

}
