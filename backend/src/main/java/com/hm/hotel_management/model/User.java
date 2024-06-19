package com.hm.hotel_management.model;
import java.io.Serializable;
import java.sql.Date;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;

import com.hm.model.GenericModel;

import lombok.Getter;
import lombok.Setter;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.Table;



@Entity
@Getter
@Setter
@Table(name = "tbl_user")
public class User extends GenericModel<User> implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	@Column(name = "id", unique = true, nullable = false)
	private String id;
	
	@ManyToOne
	@JoinColumn(name = "role_id")
	private UserRole role;
	
	@ManyToOne
	@JoinColumn(name = "user_account_id")
	private UserAccount account;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "age")
	private String age;
	
	@Column(unique = true, name = "email")
	private String email;
	
	@Column(name = "password")
	private String password;
	
	@Column(unique = true, name = "phone")
	private String phone;
	
	@Column(name = "country")
	private String country;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "insert_datetime")
	private Date insertDateTime;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "update_datetime")
	private Date updateDateTime;
	
	@Column(name = "status")
	@ColumnDefault(value = "0")
	@Value(value = "0")
	private byte status;
	
	@Column(name = "sortOrder")
	@ColumnDefault(value = "0")
	@Value(value = "0")
	private Integer sortOrder;

	
}
