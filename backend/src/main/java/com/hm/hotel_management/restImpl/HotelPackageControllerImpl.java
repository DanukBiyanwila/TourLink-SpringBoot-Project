package com.hm.hotel_management.restImpl;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.hm.hotel_management.model.Hotel;
import com.hm.hotel_management.model.HotelPackage;
import com.hm.hotel_management.rest.HotelPackageController;
import com.hm.hotel_management.service.HotelPackageService;
import com.hm.hotel_management.service.HotelService;
import com.hm.type.Status;

@RestController
public class HotelPackageControllerImpl implements HotelPackageController{
	
	@Autowired
	HotelPackageService hotelPackageService;
	
	@Autowired
	HotelService hotelService;

	@Override
	public ResponseEntity<?> getAllPackagesByHotelId(String id) {
		List<HotelPackage> all = hotelPackageService.getAllPackageByHotelId(id);
		return ResponseEntity.ok(all);
	}

	@Override
	public ResponseEntity<?> saveHotelPackage(Map<String, String> requestMap) {
		
		HotelPackage hotelPackage = getDataFromMap(requestMap);
		
		if(hotelPackageValidation(hotelPackage)) {
			
			hotelPackageService.save(getDataFromMap(requestMap));
			return ResponseEntity.status(200).body(HttpStatus.OK);
		}
		return ResponseEntity.status(400).body(HttpStatus.BAD_REQUEST);
		
	}
	
	
	private Boolean hotelPackageValidation(HotelPackage hotelPackage) {
		
		if(!Objects.requireNonNullElse(hotelPackage.getName(), "").isEmpty() &&
			hotelPackage.getHotel() != null && 
			hotelPackage.getPrice() != null &&
			!Objects.requireNonNullElse(hotelPackage.getRoomType(), "").isEmpty() &&
			!Objects.requireNonNullElse(hotelPackage.getBedType(), "").isEmpty() &&
			!Objects.requireNonNullElse(hotelPackage.getInsertUserId(), "").isEmpty() &&
			!Objects.requireNonNullElse(hotelPackage.getMaxAdults(), "").isEmpty() &&
			!Objects.requireNonNullElse(hotelPackage.getMaxChildren(), "").isEmpty()) {
			
			return true;
			
		}
		
		return false;
	}
	
	
	private HotelPackage getDataFromMap(Map<String, String> requestMap) {
		
		HotelPackage hotelPackage = new HotelPackage();
		
//		conver price from string to double
		String price = requestMap.get("price");
		double value = Double.parseDouble(price);
		
		String hotelId = requestMap.get("hotelId");
		Hotel hotel = hotelService.findById(hotelId);
		
		hotelPackage.setHotel(hotel);
		hotelPackage.setName(requestMap.get("name"));
		hotelPackage.setDescription(requestMap.get("description"));
		hotelPackage.setPrice(value);
		hotelPackage.setBedType(requestMap.get("bedType"));
		hotelPackage.setRoomType(requestMap.get("roomType"));
		hotelPackage.setMaxAdults(requestMap.get("maxAdults"));
		hotelPackage.setMaxChildren(requestMap.get("maxChildren"));
		hotelPackage.setInsertUserId(requestMap.get("insertUserId"));
		
		return hotelPackage;
	}

	@Override
	public ResponseEntity<?> getPackageById(String id) {
		HotelPackage hotelPackage = hotelPackageService.findById(id);
		return ResponseEntity.ok(hotelPackage);
	}

	@Override
	public ResponseEntity<?> deleteHotelPackage(String id) {
		HotelPackage hotelPackage = hotelPackageService.findById(id);
		
	    if (hotelPackage == null) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hotel Package not found");
	    }
	    
	    hotelPackage.setStatus(Status.DELETED.getDbValue().byteValue());
	    hotelPackageService.save(hotelPackage);
		
		ResponseEntity.status(200).body("Hotel Package delete");
		return ResponseEntity.ok(hotelPackage);
	}

}
