package com.hm.hotel_management.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hm.hotel_management.model.DriverGuidePackage;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/driver")
public interface DriverController {

	@GetMapping(path = "")
	public ResponseEntity<?> getAllDrivers();
	
	@GetMapping(path = "/package/{id}")
	public ResponseEntity<?> getDriverPackagesById(@PathVariable("id") String id);
	
	@GetMapping(path = "/package/single")
	public ResponseEntity<?> getDriverPackagesBySession();
	
	@PostMapping(path = "")
	public ResponseEntity<?> saveDriverPackage(@RequestBody DriverGuidePackage driverGuidePackage);
	
}
