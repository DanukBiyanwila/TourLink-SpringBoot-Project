package com.hm.hotel_management.model;

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

import com.hm.model.GenericModel;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "tbl_driver_guide_ratings")
public class DriverGuideRating extends GenericModel<DriverGuideRating>{
	
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
	private UserAccount userId;

	@Column(name = "rating")
    private Double rating;

    @Column(name = "comment")
    private String comment;

	@Column(name = "rating_date")
    private Date ratingDate;

    @Column(name = "STATUS")
	@ColumnDefault(value = "0")
	@Value(value = "0")
    private Integer status;

    @Column(name = "SORT_ORDER")
	@ColumnDefault(value = "0")
	@Value(value = "0")
    private Integer sortOrder;

}
