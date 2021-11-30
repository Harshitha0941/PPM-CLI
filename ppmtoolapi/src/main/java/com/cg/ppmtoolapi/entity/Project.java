package com.cg.ppmtoolapi.entity;

import javax.persistence.PreUpdate;
import javax.persistence.PrePersist;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.OneToOne;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;
import javax.persistence.Column;
import javax.validation.constraints.Size;
import javax.validation.constraints.NotBlank;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Entity;

@Entity
public class Project {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@NotBlank(message = "Project name is required")
	private String projectName;
	@NotBlank(message = "projectIdentifier is required")
	@Size(min = 4, max = 5, message = "Size must be between 4 to 5 character")
	@Column(unique = true, updatable = false)
	private String projectIdentifier;
	@NotBlank(message = "description is required")
	private String description;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date start_date;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date end_date;
	@OneToOne(fetch = FetchType.EAGER, cascade = { CascadeType.ALL }, mappedBy = "project")
	@JsonIgnore
	private Backlog backlog;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date created_At;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date updated_At;

	public Long getId() {
		return this.id;
	}

	public void setId(final Long id) {
		this.id = id;
	}

	public String getProjectName() {
		return this.projectName;
	}

	public void setProjectName(final String projectName) {
		this.projectName = projectName;
	}

	public String getProjectIdentifier() {
		return this.projectIdentifier;
	}

	public void setProjectIdentifier(final String projectIdentifier) {
		this.projectIdentifier = projectIdentifier;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(final String description) {
		this.description = description;
	}

	public Date getStart_date() {
		return this.start_date;
	}

	public void setStart_date(final Date start_date) {
		this.start_date = start_date;
	}

	public Date getEnd_date() {
		return this.end_date;
	}

	public void setEnd_date(final Date end_date) {
		this.end_date = end_date;
	}

	public Date getCreated_At() {
		return this.created_At;
	}

	public void setCreated_At(final Date created_At) {
		this.created_At = created_At;
	}

	public Date getUpdated_At() {
		return this.updated_At;
	}

	public void setUpdated_At(final Date updated_At) {
		this.updated_At = updated_At;
	}

	public Backlog getBacklog() {
		return this.backlog;
	}

	public void setBacklog(final Backlog backlog) {
		this.backlog = backlog;
	}

	@Override
	public String toString() {
		return "Project [id=" + this.id + ", projectName=" + this.projectName + ", projectIdentifier="
				+ this.projectIdentifier + ", description=" + this.description + "]";
	}

	@PrePersist
	public void onCreate() {
		this.created_At = new Date();
	}

	@PreUpdate
	public void onUpdate() {
		this.updated_At = new Date();
	}
}