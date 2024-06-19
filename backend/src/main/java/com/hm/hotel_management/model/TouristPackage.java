package com.hm.hotel_management.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.format.annotation.DateTimeFormat;

import com.hm.model.GenericModel;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "tbl_tourist_package")
public class TouristPackage extends GenericModel<TouristPackage>{
	
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	@Column(name = "id", unique = true, nullable = false)
	private String id;
    
	@ManyToOne
	@JoinColumn(name = "tourist_id")
	private UserAccount touristId;
    
	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserAccount driverGuideId;

    @ManyToOne
    @JoinColumn(name = "driver_guide_package_id")
    private DriverGuidePackage driverGuidePackageId;

    @Column(name = "STATUS", nullable = false)
    private Integer status;

    @Column(name = "SORT_ORDER")
    private Integer sortOrder;
    
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "start_datetime")
	private Date startDatetime;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "end_datetime")
	private Date endDatetime;

}
