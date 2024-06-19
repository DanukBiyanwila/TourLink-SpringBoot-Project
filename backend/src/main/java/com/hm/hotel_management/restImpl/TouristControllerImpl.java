package com.hm.hotel_management.restImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.hm.hotel_management.model.User;
import com.hm.hotel_management.rest.TouristController;
import com.hm.hotel_management.service.UserRegisterService;
import com.hm.type.UserRoleType;

@RestController
public class TouristControllerImpl implements TouristController{
	
	@Autowired
	UserRegisterService userRegisterService;

	@Override
	public ResponseEntity<?> getAllTourist() {
		List<User> all = userRegisterService.getAllUsersByUserRole(UserRoleType.TOURIST.getDbValue());
		return ResponseEntity.ok(all);
	}

}
