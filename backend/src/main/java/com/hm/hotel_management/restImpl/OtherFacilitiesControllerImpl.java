package com.hm.hotel_management.restImpl;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.hm.hotel_management.dao.UserAccountDao;
import com.hm.hotel_management.model.Hotel;
import com.hm.hotel_management.model.OtherFacilities;
import com.hm.hotel_management.model.UserAccount;
import com.hm.hotel_management.rest.OtherFacilitiesController;
import com.hm.hotel_management.service.OtherFacilitiesService;
import com.hm.hotel_management.service.UserAccountService;
import com.hm.type.Status;

@RestController
public class OtherFacilitiesControllerImpl implements OtherFacilitiesController{
	
	@Autowired
	OtherFacilitiesService otherFacilitiesService;
	
    @Autowired
	UserAccountDao userAccountDao;
    
    @Autowired
    UserAccountService accountService;

	@Override
	public ResponseEntity<?> getAllOtherFacilities() {
		List<OtherFacilities> getAll = otherFacilitiesService.findAllByStatus(Status.ACTIVE.getDbValue().byteValue());
		return ResponseEntity.ok(getAll);
	}


	@Override
	public ResponseEntity<?> saveOtherFacilities(OtherFacilities otherFacilities) {
		
		UserAccount u = accountService.findById(otherFacilities.getInsertUserId());
		otherFacilities.setAccount(u);
		
		if(hotelSaveValidation(otherFacilities)) {
			
			otherFacilitiesService.save(otherFacilities);
			return ResponseEntity.status(200).body(HttpStatus.OK);
		}
		return ResponseEntity.status(400).body(HttpStatus.BAD_REQUEST);
	}
	
	private boolean hotelSaveValidation(OtherFacilities otherFacilities) {
		
		if(!Objects.requireNonNullElse(otherFacilities.getServiceType(), "").isEmpty() && 
			!Objects.requireNonNullElse(otherFacilities.getServiceLocation(), "").isEmpty() &&
			!Objects.requireNonNullElse(otherFacilities.getPrice(), "").isEmpty()) {
			
			return true;
		}
		return false;
	}


	@Override
	public ResponseEntity<?> getOtherFacilitiesById(String id) {
		OtherFacilities otherFacilities = otherFacilitiesService.findById(id);
		return ResponseEntity.ok(otherFacilities);
	}


	@Override
	public ResponseEntity<?> deleteOtherFacilities(String id) {
		OtherFacilities facilities = otherFacilitiesService.findById(id);
		
	    if (facilities == null) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Other Facilities not found");
	    }
	    
	    facilities.setStatus(Status.DELETED.getDbValue().byteValue());
	    otherFacilitiesService.save(facilities);
		
		ResponseEntity.status(200).body("Other Facilities delete");
		return ResponseEntity.ok(facilities);
	} 

}
