package com.hm.hotel_management.restImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.hm.hotel_management.dto.DriverGuideRatingDTO;
import com.hm.hotel_management.model.DriverGuideRating;
import com.hm.hotel_management.model.Hotel;
import com.hm.hotel_management.model.HotelRating;
import com.hm.hotel_management.model.User;
import com.hm.hotel_management.model.UserAccount;
import com.hm.hotel_management.rest.DriverGuideRatingController;
import com.hm.hotel_management.service.DriverGuideRatingService;
import com.hm.hotel_management.service.HotelRatingService;
import com.hm.hotel_management.service.HotelService;
import com.hm.hotel_management.service.UserAccountService;
import com.hm.hotel_management.service.UserRegisterService;
import com.hm.type.Status;

@RestController
public class DriverGuideRatingControllerImpl implements DriverGuideRatingController{
	
	@Autowired
	DriverGuideRatingService ratingService;
	
	@Autowired
	UserRegisterService userRegisterService;
	
    @Autowired
    UserAccountService accountService;
    
    @Autowired
    DriverGuideRatingService guideRatingService;
    
    @Autowired
    HotelRatingService hotelRatingService;
    
    @Autowired
    HotelService hotelService;

	@Override
	public ResponseEntity<?> getAllDriverGuideRatingById(String id) {
		
		User u = userRegisterService.findById(id);
		
		List<DriverGuideRating> all = ratingService.getAllDriverGuideRatingById(u.getAccount().getId());
		
		List<DriverGuideRatingDTO> ratingDTOs = new ArrayList<>();
		
		for(DriverGuideRating rating : all) {
			
			User user = userRegisterService.getUserByUserAccountId(rating.getTouristId().getId());
			
			String userName = user.getFirstName() + " " + user.getLastName();
			
			DriverGuideRatingDTO driverGuideRatingDTO = new DriverGuideRatingDTO();
			
			driverGuideRatingDTO.setRatingId(rating.getId());
			driverGuideRatingDTO.setRating(rating.getRating());
			driverGuideRatingDTO.setComment(rating.getComment());
			
			driverGuideRatingDTO.setTouristID(user.getId());
			driverGuideRatingDTO.setUserName(userName);
			
			ratingDTOs.add(driverGuideRatingDTO);
			
		}
		
		return ResponseEntity.ok(ratingDTOs);
	}

	@Override
	public ResponseEntity<?> getAllDriverGuideRatingBySession() {
		
		
		List<DriverGuideRating> all = ratingService.getAllDriverGuideRatingById("4");
		
		List<DriverGuideRatingDTO> ratingDTOs = new ArrayList<>();
		
		for(DriverGuideRating rating : all) {
			
			User user = userRegisterService.getUserByUserAccountId(rating.getTouristId().getId());
			
			String userName = user.getFirstName() + " " + user.getLastName();
			
			DriverGuideRatingDTO driverGuideRatingDTO = new DriverGuideRatingDTO();
			
			driverGuideRatingDTO.setRatingId(rating.getId());
			driverGuideRatingDTO.setRating(rating.getRating());
			driverGuideRatingDTO.setComment(rating.getComment());
			
			driverGuideRatingDTO.setTouristID(user.getId());
			driverGuideRatingDTO.setUserName(userName);
			
			ratingDTOs.add(driverGuideRatingDTO);
			
		}
		
		return ResponseEntity.ok(ratingDTOs);
	}

	@Override
	public ResponseEntity<?> saveRate(DriverGuideRatingDTO driverGuideRatingDTO) {
		
		if(driverGuideRatingDTO.getUserName().equals("user")) {
			
			UserAccount tourist = accountService.findById(driverGuideRatingDTO.getTouristID());
			User user = userRegisterService.findById(driverGuideRatingDTO.getRatingId());
			UserAccount a =  accountService.findById(user.getAccount().getId());
			
			DriverGuideRating driverGuideRating = new DriverGuideRating();
			
			driverGuideRating.setTouristId(tourist);
			driverGuideRating.setUserId(a);
			driverGuideRating.setRating(driverGuideRatingDTO.getRating());
			driverGuideRating.setComment(driverGuideRatingDTO.getComment());
			driverGuideRating.setStatus(0);

			guideRatingService.save(driverGuideRating);
			
		}
		
		
		if(driverGuideRatingDTO.getUserName().equals("hotel")) {
			
			UserAccount tourist = accountService.findById(driverGuideRatingDTO.getTouristID());
			Hotel hotel = hotelService.findById(driverGuideRatingDTO.getRatingId());
			

			HotelRating hotelRating = new HotelRating();
			
			hotelRating.setAccount(tourist);
			hotelRating.setHotel(hotel);
			hotelRating.setRating(driverGuideRatingDTO.getRating());
			hotelRating.setComment(driverGuideRatingDTO.getComment());
			hotelRating.setStatus(Status.ACTIVE.getDbValue().byteValue());

			hotelRatingService.save(hotelRating);
			
		}
		return null;
	}



}
