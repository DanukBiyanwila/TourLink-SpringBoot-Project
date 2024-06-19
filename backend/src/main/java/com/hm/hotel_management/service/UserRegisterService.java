package com.hm.hotel_management.service;

import org.springframework.http.ResponseEntity;

import com.hm.hotel_management.model.User;
import com.hm.service.GenericService;

import java.util.List;
import java.util.Map;

public interface UserRegisterService extends GenericService<User>{
	ResponseEntity<String> signUp(Map<String, String> requestMap);
	User getUserByUserAccountId(final String id);
	
	List<User> getAllUsersByUserRole(final String id);

}
