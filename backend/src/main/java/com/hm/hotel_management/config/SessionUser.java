package com.hm.hotel_management.config;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SessionUser extends org.springframework.security.core.userdetails.User{
	private static final long serialVersionUID = 1L;
	
	private String id;

	public SessionUser(String id,String userName, String password, Collection<? extends GrantedAuthority> authorities) {
		super(userName, password, authorities);
		this.id=id;
	}

}
