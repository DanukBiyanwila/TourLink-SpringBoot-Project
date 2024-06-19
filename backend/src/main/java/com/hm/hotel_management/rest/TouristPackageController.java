package com.hm.hotel_management.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/tourist-package")
public interface TouristPackageController {

	@GetMapping(path = "")
	public ResponseEntity<?> getAllTouristPackages();
	
	@GetMapping(path = "/{id}")
	public ResponseEntity<?> getAlltouristPackesById(@PathVariable("id") String id);
}
