package com.hm.hotel_management.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.hm.hotel_management.model.HotelPackage;
import com.hm.hotel_management.model.UserPackage;

public interface CartService {
	ResponseEntity<Object> add(Map<String, String> requestMap, String id);

	List<UserPackage> getAllCartDetail(String id);
}
