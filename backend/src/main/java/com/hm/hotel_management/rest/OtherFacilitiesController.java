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

import com.hm.hotel_management.model.OtherFacilities;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/other-facilities")
public interface OtherFacilitiesController {

	@GetMapping(path = "")
	public ResponseEntity<?> getAllOtherFacilities();
	
	
	@PostMapping(path = "")
	public ResponseEntity<?> saveOtherFacilities(@RequestBody OtherFacilities otherFacilities);
	
	@GetMapping(path = "/{id}")
	public ResponseEntity<?> getOtherFacilitiesById(@PathVariable("id") String id);
	
	@DeleteMapping(path = "/{id}")
	public ResponseEntity<?> deleteOtherFacilities(@PathVariable("id") String id);

	
}
