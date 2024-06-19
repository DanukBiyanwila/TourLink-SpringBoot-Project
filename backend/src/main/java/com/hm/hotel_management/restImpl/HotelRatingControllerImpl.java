package com.hm.hotel_management.restImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.hm.hotel_management.dto.HotelUserRatingDTO;
import com.hm.hotel_management.model.HotelRating;
import com.hm.hotel_management.model.User;
import com.hm.hotel_management.rest.HotelRatingController;
import com.hm.hotel_management.service.HotelRatingService;
import com.hm.hotel_management.service.UserRegisterService;

@RestController
public class HotelRatingControllerImpl implements HotelRatingController{
	
	@Autowired
	HotelRatingService hotelRatingService;
	
	@Autowired
	UserRegisterService userRegisterService;

	@Override
	public ResponseEntity<?> getAllHotelRatingsById(String id) {
		
		List<HotelRating> all = hotelRatingService.getAllHotelRatingsById(id);
		
	    List<HotelUserRatingDTO> userRatingDTOs = new ArrayList<>();
	    
	    for (HotelRating rating : all) {
	    	
	    	User user = userRegisterService.getUserByUserAccountId(rating.getAccount().getId());
	    	
	    	String userName = user.getFirstName() + " " + user.getLastName();
	    	
	        HotelUserRatingDTO userRatingDTO = new HotelUserRatingDTO();
	        
	        userRatingDTO.setRatingId(rating.getId());
	        userRatingDTO.setRating(rating.getRating());
	        userRatingDTO.setComment(rating.getComment());
	        
	        userRatingDTO.setUserID(user.getId());
	        userRatingDTO.setUserName(userName);
	        
	        userRatingDTOs.add(userRatingDTO);
	        
	    }
		
		return ResponseEntity.ok(userRatingDTOs);
	}

}
