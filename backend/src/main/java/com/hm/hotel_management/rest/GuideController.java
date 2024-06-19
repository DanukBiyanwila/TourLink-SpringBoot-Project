package com.hm.hotel_management.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hm.hotel_management.model.DriverGuidePackage;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/guide")
public interface GuideController {

	@GetMapping(path = "")
	public ResponseEntity<?> getAllGuides();
	
	@GetMapping(path = "/package/{id}")
	public ResponseEntity<?> getGuidePackagesById(@PathVariable("id") String id);
	
	@GetMapping(path = "/{id}")
	public ResponseEntity<?> getGuideById(@PathVariable("id") String id);
	
	@GetMapping(path = "/package/single")
	public ResponseEntity<?> getGuidePackagesBySession();
	
	@PostMapping(path = "")
	public ResponseEntity<?> saveGuidePackage(@RequestBody DriverGuidePackage driverGuidePackage);
	
	@GetMapping(path = "/pack/{id}")
	public ResponseEntity<?> getSinglePackageById(@PathVariable("id") String id);
	
	@DeleteMapping(path = "/{id}")
	public ResponseEntity<?> deletePackage(@PathVariable("id") String id);
	
}
