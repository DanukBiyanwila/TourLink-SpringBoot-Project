package com.hm.hotel_management.restImpl;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.hm.hotel_management.dao.UserAccountDao;
import com.hm.hotel_management.model.DriverGuidePackage;
import com.hm.hotel_management.model.User;
import com.hm.hotel_management.model.UserAccount;
import com.hm.hotel_management.rest.GuideController;
import com.hm.hotel_management.service.DriverGuidePackageService;
import com.hm.hotel_management.service.UserAccountService;
import com.hm.hotel_management.service.UserRegisterService;
import com.hm.type.Status;
import com.hm.type.UserRoleType;

@RestController
public class GuideControllerImpl implements GuideController{
	
	@Autowired
	UserRegisterService userRegisterService;
	
	@Autowired
	DriverGuidePackageService driverGuidePackageService;
	
    @Autowired
	UserAccountService accountService;

	@Override
	public ResponseEntity<?> getAllGuides() {
		List<User> all = userRegisterService.getAllUsersByUserRole(UserRoleType.GUIDE.getDbValue());
		return ResponseEntity.ok(all);
	}

	@Override
	public ResponseEntity<?> getGuidePackagesById(String id) {
		User u = userRegisterService.findById(id);
		List<DriverGuidePackage> getAll = driverGuidePackageService.getAllPackgesByUserAccountId(u.getAccount().getId());
		return ResponseEntity.ok(getAll);
	}

	@Override
	public ResponseEntity<?> getGuideById(String id) {
		User user = userRegisterService.findById(id);
		return ResponseEntity.ok(user);
	}

	@Override
	public ResponseEntity<?> getGuidePackagesBySession() {
		List<DriverGuidePackage> getAll = driverGuidePackageService.getAllPackgesByUserAccountId("3");
		return ResponseEntity.ok(getAll);
	}

	@Override
	public ResponseEntity<?> saveGuidePackage(DriverGuidePackage driverGuidePackage) {
		
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

	@Override
	public ResponseEntity<?> getSinglePackageById(String id) {
		DriverGuidePackage driverGuidePackage = driverGuidePackageService.findById(id);
		return ResponseEntity.ok(driverGuidePackage);
	}

	@Override
	public ResponseEntity<?> deletePackage(String id) {
		DriverGuidePackage driverGuidePackage = driverGuidePackageService.findById(id);
		
	    if (driverGuidePackage == null) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Package not found");
	    }
		
	    driverGuidePackage.setStatus(Status.DELETED.getDbValue().byteValue());
	    driverGuidePackageService.save(driverGuidePackage);
	    
		ResponseEntity.status(200).body("hotel delete");
		return ResponseEntity.ok(driverGuidePackage);
	}

	

}
