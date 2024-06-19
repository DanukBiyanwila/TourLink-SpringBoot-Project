package com.hm.hotel_management.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/hotel-rating")
public interface HotelRatingController {
	
	@GetMapping(path = "/{id}")
	public ResponseEntity<?> getAllHotelRatingsById(@PathVariable("id") String id);

}
