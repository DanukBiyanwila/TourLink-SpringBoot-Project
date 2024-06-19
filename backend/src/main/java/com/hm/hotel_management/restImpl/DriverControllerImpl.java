package com.hm.hotel_management.restImpl;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.hm.hotel_management.dao.UserDao;
import com.hm.hotel_management.model.DriverGuidePackage;
import com.hm.hotel_management.model.User;
import com.hm.hotel_management.model.UserAccount;
import com.hm.hotel_management.rest.DriverController;
import com.hm.hotel_management.rest.GuideController;
import com.hm.hotel_management.service.DriverGuidePackageService;
import com.hm.hotel_management.service.UserAccountService;
import com.hm.hotel_management.service.UserRegisterService;
import com.hm.type.UserRoleType;

@RestController
public class DriverControllerImpl implements DriverController{
	
	@Autowired
	UserRegisterService userRegisterService;
	
	@Autowired
	DriverGuidePackageService driverGuidePackageService;
	
    @Autowired
	UserAccountService accountService;
    
   

	@Override
	public ResponseEntity<?> getAllDrivers() {
		List<User> all = userRegisterService.getAllUsersByUserRole(UserRoleType.DRIVER.getDbValue());
		return ResponseEntity.ok(all);
	}

	@Override
	public ResponseEntity<?> getDriverPackagesById(String id) {
		User u = userRegisterService.findById(id);
		List<DriverGuidePackage> getAll = driverGuidePackageService.getAllPackgesByUserAccountId(u.getAccount().getId());
		return ResponseEntity.ok(getAll);
	}

	@Override
	public ResponseEntity<?> getDriverPackagesBySession() {
		List<DriverGuidePackage> getAll = driverGuidePackageService.getAllPackgesByUserAccountId("6415c426-5a92-47e0-9673-3c3fde09e460");
		return ResponseEntity.ok(getAll);
	}

	@Override
	public ResponseEntity<?> saveDriverPackage(DriverGuidePackage driverGuidePackage) {
		System.out.println(driverGuidePackage.getPrice());
		
		UserAccount u = accountService.findById(driverGuidePackage.getInsertUserId());
		driverGuidePackage.setAccount(u);
		
		if(guidePackageValidation(driverGuidePackage)) {
			
			driverGuidePackageService.save(driverGuidePackage);
			return ResponseEntity.status(200).body(HttpStatus.OK);
		}
		return ResponseEntity.status(400).body(HttpStatus.BAD_REQUEST);
	}
	
	public boolean guidePackageValidation(DriverGuidePackage driverGuidePackage) {
		
		if(!Objects.requireNonNullElse(driverGuidePackage.getName(), "").isEmpty() && 
			driverGuidePackage.getPrice() != null
			) {
			
			return true;
		}
		return false;
	}

}
