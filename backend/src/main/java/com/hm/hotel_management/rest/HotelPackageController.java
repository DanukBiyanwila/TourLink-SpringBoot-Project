package com.hm.hotel_management.rest;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hm.hotel_management.model.HotelPackage;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/hotel-package")
public interface HotelPackageController {

	@GetMapping(path = "/{id}")
	public ResponseEntity<?> getAllPackagesByHotelId(@PathVariable("id") String id);
	
	@PostMapping(path = "")
	public ResponseEntity<?> saveHotelPackage(@RequestBody Map<String, String> requestMap);
	
	@GetMapping(path = "one/{id}")
	public ResponseEntity<?> getPackageById(@PathVariable("id") String id);
	
	@DeleteMapping(path = "/{id}")
	public ResponseEntity<?> deleteHotelPackage(@PathVariable("id") String id);
	
}
