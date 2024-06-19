package com.hm.hotel_management.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

public interface UserLoginService {
	ResponseEntity<Object> login(Map<String, String> requestMap);
}
