package com.hm.hotel_management.restImpl;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.hm.hotel_management.model.OtherFacilities;
import com.hm.hotel_management.model.TravelInsurance;
import com.hm.hotel_management.rest.TravelInsuranceController;
import com.hm.hotel_management.service.TravelInsuranceService;
import com.hm.type.Status;

@RestController
public class TravelInsuranceControllerImpl implements TravelInsuranceController{
	
	@Autowired
	TravelInsuranceService insuranceService;

	@Override
	public ResponseEntity<?> gelAllTravelInsurance() {
		List<TravelInsurance> getAll = insuranceService.findAllByStatus(Status.ACTIVE.getDbValue().byteValue());
		return ResponseEntity.ok(getAll);
	}

	@Override
	public ResponseEntity<?> saveTravelInsurance(TravelInsurance travelInsurance) {
		
		if(hotelSaveValidation(travelInsurance)) {
			
			insuranceService.save(travelInsurance);
			return ResponseEntity.status(200).body(HttpStatus.OK);
		}
		
		return ResponseEntity.status(400).body(HttpStatus.BAD_REQUEST);
	}
	
	
	private boolean hotelSaveValidation(TravelInsurance travelInsurance) {
		
		if(!Objects.requireNonNullElse(travelInsurance.getName(), "").isEmpty() && 
			!Objects.requireNonNullElse(travelInsurance.getCoverageType(), "").isEmpty() &&
			!Objects.requireNonNullElse(travelInsurance.getCoverageLimit(), "").isEmpty() &&
			!Objects.requireNonNullElse(travelInsurance.getCoveragePeriod(), "").isEmpty() &&
			!Objects.requireNonNullElse(travelInsurance.getPrice(), "").isEmpty() &&
			!Objects.requireNonNullElse(travelInsurance.getInsertUserId(), "").isEmpty()) {
			
			return true;
		}
		return false;
	}

	@Override
	public ResponseEntity<?> getTravelInsuranceById(String id) {
		TravelInsurance travelInsurance = insuranceService.findById(id);
		return ResponseEntity.ok(travelInsurance);
	}

	@Override
	public ResponseEntity<?> deleteTravelInsurance(String id) {
		TravelInsurance insurance = insuranceService.findById(id);
		
		if(insurance == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Insurance not found");
		}
		
		insurance.setStatus(Status.DELETED.getDbValue().byteValue());
		insuranceService.save(insurance);
		
		ResponseEntity.status(200).body("Insurance delete");
		return ResponseEntity.ok(insurance);
	} 

}
