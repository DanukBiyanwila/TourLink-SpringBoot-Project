package com.hm.hotel_management.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hm.hotel_management.dao.UserAccountDao;
import com.hm.hotel_management.model.UserAccount;
import com.hm.hotel_management.service.UserAccountService;
import com.hm.serviceImpl.GenericServiceImpl;

@Service
public class UserAccountServiceImpl extends GenericServiceImpl<UserAccount> implements UserAccountService{
	
	private UserAccountDao<UserAccount> accountDao;
	
	@Autowired
	public UserAccountServiceImpl(UserAccountDao<UserAccount> accountDao) {
		super(accountDao);
		this.accountDao = accountDao;
	}
	

}
