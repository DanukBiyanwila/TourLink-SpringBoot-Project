package com.hm.hotel_management.restImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.hm.hotel_management.dao.UserAccountDao;
import com.hm.hotel_management.dao.UserDao;
import com.hm.hotel_management.model.DriverGuidePackage;
import com.hm.hotel_management.model.HotelPackage;
import com.hm.hotel_management.model.User;
import com.hm.hotel_management.model.UserAccount;
import com.hm.hotel_management.model.UserPackage;
import com.hm.hotel_management.rest.CartController;
import com.hm.hotel_management.service.CartService;
import com.hm.hotel_management.service.DriverGuidePackageService;
import com.hm.hotel_management.service.HotelPackageService;
import com.hm.hotel_management.util.HotelMangUtils;

@RestController
public class CartControllerImpl implements CartController {

    @Autowired
    CartService cartService;
    @Autowired
	UserDao userDao;
    @Autowired
    HotelPackageService hotelPackageService;
    @Autowired
    DriverGuidePackageService driverGuidePackageService;
    

	@Override
	public ResponseEntity<Object> add(Map<String, String> requestMap, String id) {
		
        try {
            return cartService.add(requestMap,id);
        } catch (Exception e) {
            e.printStackTrace();
            return HotelMangUtils.getResponseEntity("Something went wrong 500", HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}


	@Override
	public ResponseEntity<?> getAllCartDetail(String id) {
		 try {
			 List<UserPackage> all = cartService.getAllCartDetail(id);			 
			 List<UserPackage>Hall= new ArrayList<UserPackage>(); 
			 List<UserPackage>Dall= new ArrayList<UserPackage>();
			 List<UserPackage>Gall= new ArrayList<UserPackage>();
			 
					 
			 for(UserPackage a:all) {
				 if (a.getType().equals("Hotel")) {
					 HotelPackage temp=hotelPackageService.getAllPackageById(a.getPackageid()); 
					 a.setPName(temp.getName());
					 a.setPrice(temp.getPrice());
					 a.setRmType(temp.getRoomType());
					 a.setBdtype(temp.getBedType());
					 a.setMaxAdult(temp.getMaxAdults());
					 a.setMaxChild(temp.getMaxChildren());
					 a.setDescription(temp.getDescription());
					 Hall.add(a);
				 }else if (a.getType().equals("Guide")) {
					 DriverGuidePackage temp = driverGuidePackageService.getAllByPackageId(a.getPackageid());
					 a.setDGName(temp.getName());
					 a.setPrice(temp.getPrice());
					 a.setDescription(temp.getDescription());
					 a.setNoOfPep(temp.getNoOfPeoples());
					 Gall.add(a);
				}else if (a.getType().equals("Driver")) {
					 DriverGuidePackage temp = driverGuidePackageService.getAllByPackageId(a.getPackageid());
					 a.setDGName(temp.getName());
					 a.setPrice(temp.getPrice());
					 a.setDescription(temp.getDescription());
					 a.setNoOfPep(temp.getNoOfPeoples());
					 Dall.add(a);
				}
			 }
			 
			 return ResponseEntity.ok().body(Map.of("message", "my cart","hotel", Hall,"driver", Dall,"guide", Gall));
		 }
		 catch (Exception e) {
			 e.printStackTrace();
	         return HotelMangUtils.getResponseEntity("Something went wrong 500", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	
	}
}
