package com.hm.hotel_management.util;

import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class HotelMangUtils {

	private HotelMangUtils() {
		
	}
	
	
	public static ResponseEntity<Object> getResponseEntity(String responseMsg , HttpStatus httpStatus){
		return new ResponseEntity<Object>("{\"message\":\"" + responseMsg + "\"}", HttpStatus.INTERNAL_SERVER_ERROR);	
	}
	
	public static ResponseEntity<String> getResponseEntityString(String responseMsg , HttpStatus httpStatus){
		return new ResponseEntity<String>("{\"message\":\"" + responseMsg + "\"}", HttpStatus.INTERNAL_SERVER_ERROR);	
	}
}
