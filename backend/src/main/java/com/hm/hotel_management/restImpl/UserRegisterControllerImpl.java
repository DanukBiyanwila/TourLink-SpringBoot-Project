package com.hm.hotel_management.restImpl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.hm.hotel_management.model.User;
import com.hm.hotel_management.model.UserAccount;
import com.hm.hotel_management.rest.UserRegisterController;
import com.hm.hotel_management.service.UserAccountService;
import com.hm.hotel_management.service.UserRegisterService;
import com.hm.hotel_management.util.HotelMangUtils;
import com.hm.type.Status;

@RestController
public class UserRegisterControllerImpl implements UserRegisterController {

	@Autowired
	UserRegisterService userRegisterService;
	
	@Autowired
	UserAccountService accountService;

	@Override
	public ResponseEntity<String> signUp(Map<String, String> requestMap) {
		try {
			return userRegisterService.signUp(requestMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return HotelMangUtils.getResponseEntityString("Something went wrong 500", HttpStatus.INTERNAL_SERVER_ERROR);

	}

	@Override
	public ResponseEntity<?> deleteUser(String id) {
		
		User user = userRegisterService.findById(id);
		UserAccount account = accountService.findById(user.getAccount().getId());
		
		user.setStatus(Status.DELETED.getDbValue().byteValue());
		account.setStatus(Status.DELETED.getDbValue().byteValue());
		
		userRegisterService.update(user);
		accountService.update(account);
		
		return ResponseEntity.status(200).body(HttpStatus.OK);
	}

}
