package com.hm.hotel_management.model;

import java.math.BigDecimal;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;

import com.hm.model.GenericModel;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "tbl_other_facilities")
public class OtherFacilities extends GenericModel<OtherFacilities>{
	
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	@Column(name = "id", unique = true, nullable = false)
    private String id;

	@ManyToOne
	@JoinColumn(name = "user_account_id")
    private UserAccount account;

    @Column(name = "service_type")
    private String serviceType;

    @Column(name = "service_description")
    private String serviceDescription;

    @Column(name = "service_location")
    private String serviceLocation;

    @Column(name = "price")
    private String price;

    @Column(name = "availability")
    private Integer availability;

	@Column(name = "insert_user_id")
	private String insertUserId;
	
	@Column(name = "update_user_id")
	private String updateUserId;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "insert_date")
	private Date insertDateTime;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "update_date")
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
