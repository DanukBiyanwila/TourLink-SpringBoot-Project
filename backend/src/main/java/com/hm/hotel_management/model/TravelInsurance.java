package com.hm.hotel_management.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
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
@Table(name = "tbl_travel_insurance")
public class TravelInsurance extends GenericModel<TravelInsurance>{
	
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	@Column(name = "id", unique = true, nullable = false)
	private String id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "coverage_type")
	private String coverageType;
	
	@Column(name = "price")
	private String price;
	
	@Column(name = "coverage_limit")
	private String coverageLimit;
	
	@Column(name = "deductible")
	private String deductible;
	
	@Column(name = "coverage_period")
	private String coveragePeriod;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "restrictions")
	private String restriction;
	
	@Column(name = "additional_info")
	private String additionalInfo;
	
	@Column(name = "age_limit")
	private String ageLimit;
	
	@Column(name = "adventure_sports_coverage")
	private String sportCoverage;
	
	@Column(name = "pre_existing_condition_coverage")
	private String preExistingConditionCoverage;
	
	@Column(name = "region_coverage")
	private String regionCoverage;

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
	
	@Column(name = "sort_order")
	@ColumnDefault(value = "0")
	@Value(value = "0")
	private Integer sortOrder;
	
}
