package com.hm.hotel_management.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hm.hotel_management.dao.UserAccountDao;
import com.hm.hotel_management.model.UserAccount;
import com.hm.hotel_management.model.UserRole;

import lombok.extern.slf4j.Slf4j;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Slf4j
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final JdbcTemplate jdbcTemplate;
    @Autowired
	UserAccountDao userAccountDao;

    public UserDetailsServiceImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	UserAccount u = userAccountDao.findByEmailId(username);
    	if (u == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    	
    	 UserRole role = u.getRole();
    	 if (role == null) {
    	        throw new IllegalStateException("User does not have a role assigned.");
    	    }

    	    Set<GrantedAuthority> authorities = new HashSet<>();
    	    authorities.add(new SimpleGrantedAuthority(role.getName()));
    	
        return new org.springframework.security.core.userdetails.User(
                u.getUserName(), u.getPassword(), u.getStatus() == 0,true, true, true,
                authorities
        );
    }

   
}
