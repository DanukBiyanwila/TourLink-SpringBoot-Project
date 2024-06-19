package com.hm.hotel_management.rest;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RequestMapping(path = "/auth")
public interface UserLoginController {
	
	@PostMapping(path = "/login")
	public ResponseEntity<Object> login(@RequestBody(required = true) Map<String, String> requestMap);
}
