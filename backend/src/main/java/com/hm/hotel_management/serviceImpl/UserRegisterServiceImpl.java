package com.hm.hotel_management.serviceImpl;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.hm.hotel_management.dao.UserAccountDao;
import com.hm.hotel_management.dao.UserDao;
import com.hm.hotel_management.model.User;
import com.hm.hotel_management.model.UserAccount;
import com.hm.hotel_management.model.UserRole;
import com.hm.hotel_management.service.UserRegisterService;
import com.hm.hotel_management.util.HotelMangUtils;
import com.hm.serviceImpl.GenericServiceImpl;
import com.hm.type.UserRoleType;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserRegisterServiceImpl extends GenericServiceImpl<User> implements UserRegisterService {


	private UserDao<User> userDao;
	private final BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	public UserRegisterServiceImpl(UserDao<User> userDao, BCryptPasswordEncoder passwordEncoder) {
		super(userDao);
		this.userDao = userDao;
		this.passwordEncoder = passwordEncoder;
	}
	
	@Autowired
	UserAccountDao userAccountDao;

	
	@Override
	public ResponseEntity<String> signUp(Map<String, String> requestMap) {
		log.info("inside SignUp{}", requestMap);// log on console
		try {
			if (validateSignUpMap(requestMap)) {
				UserAccount ua = userAccountDao.findByEmailId(requestMap.get("email"));

				if (Objects.isNull(ua)) {
					userAccountDao.save(getUserAccouontForMap(requestMap));
					userDao.save(getUserForMap(requestMap));

					return HotelMangUtils.getResponseEntityString("Succsesfully Registerd", HttpStatus.OK);
				} else {
					return HotelMangUtils.getResponseEntityString("Email already exist", HttpStatus.BAD_REQUEST);
				}
			} else {
				return HotelMangUtils.getResponseEntityString("400", HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return HotelMangUtils.getResponseEntityString("Something went wrong 500", HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	
	private boolean validateSignUpMap(Map<String, String> requestMap) {
		if (requestMap.containsKey("firstName") && requestMap.containsKey("lastName") && requestMap.containsKey("email")
				&& requestMap.containsKey("password") && requestMap.containsKey("phone")) {
			return true;
		}
		return false;
	}

	// set data to USER
	private User getUserForMap(Map<String, String> requestMap) {
		User user = new User();
		UserRole role = new UserRole();

		role.setId(requestMap.get("roleId"));
		user.setRole(role);
		
		UserAccount ua = userAccountDao.findByEmailId(requestMap.get("email"));
		user.setAccount(ua);

		user.setFirstName(requestMap.get("firstName"));
		user.setLastName(requestMap.get("lastName"));
		user.setAge(requestMap.get("age"));
		user.setCountry(requestMap.get("country"));
		user.setPhone(requestMap.get("phone"));
		user.setEmail(requestMap.get("email"));
		return user;
	}

	// new account create
	private UserAccount getUserAccouontForMap(Map<String, String> requestMap) {
		UserAccount userAccount = new UserAccount();
		UserRole role = new UserRole();

		role.setId(requestMap.get("roleId"));
		userAccount.setRole(role);
		
		userAccount.setUserName(requestMap.get("email"));
		String rawPassword = requestMap.get("password");
        String encodedPassword = passwordEncoder.encode(rawPassword);
        userAccount.setPassword(encodedPassword);
		
		return userAccount;
	}

	@Override
	public User getUserByUserAccountId(String id) {
		User user = userDao.getUserByUserAccountId(id);
		return user;
	}

	@Override
	public List<User> getAllUsersByUserRole(String id) {
		List<User> all = userDao.getAllUsersByUserRole(id);
		return all;
	}

}
