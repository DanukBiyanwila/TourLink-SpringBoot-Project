package com.hm.hotel_management.restImpl;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hm.hotel_management.model.Hotel;
import com.hm.hotel_management.rest.HotelController;
import com.hm.hotel_management.service.HotelService;
import com.hm.hotel_management.util.HotelMangUtils;
import com.hm.type.Status;

@RestController
public class HotelControllerImpl implements HotelController{
	
	@Autowired
	HotelService hotelService;
	

	@Override
	public ResponseEntity<?> getAllHotels() {
		List<Hotel> getAllHotels = hotelService.findAllByStatus(Status.ACTIVE.getDbValue().byteValue());
		return ResponseEntity.ok(getAllHotels);
	}

	@Override
	public ResponseEntity<?> getHotelById(String id) {
		Hotel getHotelById = hotelService.findById(id);
		return ResponseEntity.ok(getHotelById);
	}

	@Override
	public ResponseEntity<?> saveHotel(Hotel hotel) {
		
		if(hotelSaveValidation(hotel)) {
			
			hotelService.save(hotel);
			
			return ResponseEntity.status(200).body(HttpStatus.OK);
		}
		return ResponseEntity.status(400).body(HttpStatus.BAD_REQUEST);
	}
	
	
	private boolean hotelSaveValidation(Hotel hotel) {
		
		if(!Objects.requireNonNullElse(hotel.getName(), "").isEmpty() && 
			!Objects.requireNonNullElse(hotel.getAddress(), "").isEmpty() &&
			!Objects.requireNonNullElse(hotel.getCity(), "").isEmpty() &&
			!Objects.requireNonNullElse(hotel.getCountry(), "").isEmpty() &&
			!Objects.requireNonNullElse(hotel.getInsertUserId(), "").isEmpty()) {
			
			return true;
		}
		return false;
	}

	@Override
	public ResponseEntity<?> deleteHotel(String id) {
		Hotel hotel = hotelService.findById(id);
		
	    if (hotel == null) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hotel not found");
	    }
		
		hotel.setStatus(Status.DELETED.getDbValue().byteValue());
		hotelService.save(hotel);
		
		ResponseEntity.status(200).body("hotel delete");
		return ResponseEntity.ok(hotel);
	}


}
