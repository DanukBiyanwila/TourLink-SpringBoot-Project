package com.hm.hotel_management.serviceImpl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hm.hotel_management.dao.UserDao;
import com.hm.hotel_management.model.User;
import com.hm.hotel_management.service.UserLoginService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserLoginServiceImpl implements UserLoginService {

	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	UserDao userDao;
	private final UserDetailsServiceImpl userDetailsService;

	public UserLoginServiceImpl(UserDetailsServiceImpl userDetailsService) {
		this.userDetailsService = userDetailsService;
	}

	@Override
	public ResponseEntity<Object> login(Map<String, String> requestMap) {
		String username = requestMap.get("userName");
		String password = requestMap.get("password");

		try {
			UserDetails userDetails = userDetailsService.loadUserByUsername(username);
			User ua = userDao.findByEmailId(userDetails.getUsername());

			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(username, password));

			SecurityContextHolder.getContext().setAuthentication(authentication);

			// Redirect based on user role
			if (authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
				return ResponseEntity.ok()
						.body(Map.of("message", "Redirect to admin ROLE_ADMIN!", "userDetails", userDetails ,"userData", ua));
			} else if (authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_DRIVER"))) {
				return ResponseEntity.ok()
						.body(Map.of("message", "Redirect to admin ROLE_ADMIN!", "userDetails", userDetails,"userData", ua));
			} else if (authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_TOURIST"))) {
				return ResponseEntity.ok()
						.body(Map.of("message", "Redirect to admin ROLE_ADMIN!", "userDetails", userDetails,"userData", ua));
			} else if (authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_GUIDE"))) {
				return ResponseEntity.ok()
						.body(Map.of("message", "Redirect to admin ROLE_ADMIN!", "userDetails", userDetails,"userData", ua));
			} else {
				log.error("Login failed: {}");
				return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Login failed!");
			}

		} catch (UsernameNotFoundException | BadCredentialsException e) {
			log.error("Login failed: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed! Check Password or UserName");
		}
	}
}
