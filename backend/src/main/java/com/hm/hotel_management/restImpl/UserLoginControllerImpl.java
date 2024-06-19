package com.hm.hotel_management.restImpl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.hm.hotel_management.rest.UserLoginController;
import com.hm.hotel_management.service.UserLoginService;

import com.hm.hotel_management.util.HotelMangUtils;

@RestController
public class UserLoginControllerImpl implements UserLoginController{
	
	@Autowired
	UserLoginService userLoginService;

	@Override
	public ResponseEntity<Object> login(Map<String, String> requestMap) {
		try {
			return userLoginService.login(requestMap);
		} catch (Exception e) {
 			e.printStackTrace();
		}
		return HotelMangUtils.getResponseEntity("Something went wrong 500", HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
