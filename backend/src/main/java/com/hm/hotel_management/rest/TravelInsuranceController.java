package com.hm.hotel_management.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hm.hotel_management.model.TravelInsurance;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/travel-insurance")
public interface TravelInsuranceController {
	
	@GetMapping(path = "")
	public ResponseEntity<?> gelAllTravelInsurance();
	
	@PostMapping(path = "")
	public ResponseEntity<?> saveTravelInsurance(@RequestBody TravelInsurance travelInsurance);
	
	@GetMapping(path = "/{id}")
	public ResponseEntity<?> getTravelInsuranceById(@PathVariable("id") String id);
	
	@DeleteMapping(path = "/{id}")
	public ResponseEntity<?> deleteTravelInsurance(@PathVariable("id") String id);

}
