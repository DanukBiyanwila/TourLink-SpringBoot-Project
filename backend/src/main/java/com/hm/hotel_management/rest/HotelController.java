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

import com.hm.hotel_management.model.Hotel;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/hotel")
public interface HotelController {
	
	@GetMapping(path = "")
	public ResponseEntity<?> getAllHotels();
	
	@GetMapping(path = "/{id}")
	public ResponseEntity<?> getHotelById(@PathVariable("id")String id);
	
	@PostMapping(path = "")
	public ResponseEntity<?> saveHotel(@RequestBody Hotel hotel);
	
	@DeleteMapping(path = "/{id}")
	public ResponseEntity<?> deleteHotel(@PathVariable("id") String id);

}
