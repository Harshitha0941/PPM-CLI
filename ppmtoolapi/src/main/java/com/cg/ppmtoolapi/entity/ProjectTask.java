
package com.cg.ppmtoolapi.entity;

import javax.persistence.PreUpdate;
import javax.persistence.PrePersist;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.JoinColumn;
import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;
import javax.validation.constraints.NotBlank;
import javax.persistence.Column;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Entity;

@Entity
public class ProjectTask {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(updatable = false, unique = true)
	private String projectSequence;
	@NotBlank(message = "Please include project summary")
	private String summary;
	private String acceptanceCriteria;
	private String status;
	private Integer priority;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date dueDate;
	@ManyToOne(fetch = FetchType.EAGER, cascade = { CascadeType.REFRESH })
	@JoinColumn(name = "backlog_id", updatable = false, nullable = false)
	@JsonIgnore
	private Backlog backlog;
	private String projectIdentifier;
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

	public String getProjectSequence() {
		return this.projectSequence;
	}

	public void setProjectSequence(final String projectSequence) {
		this.projectSequence = projectSequence;
	}

	public String getSummary() {
		return this.summary;
	}

	public void setSummary(final String summary) {
		this.summary = summary;
	}

	public String getAcceptanceCriteria() {
		return this.acceptanceCriteria;
	}

	public void setAcceptanceCriteria(final String acceptanceCriteria) {
		this.acceptanceCriteria = acceptanceCriteria;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(final String status) {
		this.status = status;
	}

	public Integer getPriority() {
		return this.priority;
	}

	public void setPriority(final Integer priority) {
		this.priority = priority;
	}

	public Date getDueDate() {
		return this.dueDate;
	}

	public void setDueDate(final Date dueDate) {
		this.dueDate = dueDate;
	}

	public String getProjectIdentifier() {
		return this.projectIdentifier;
	}

	public void setProjectIdentifier(final String projectIdentifier) {
		this.projectIdentifier = projectIdentifier;
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

	@PrePersist
	public void onCreate() {
		this.created_At = new Date();
	}

	@PreUpdate
	public void onUpdate() {
		this.updated_At = new Date();
	}

	@Override
	public String toString() {
		return "ProjectTask [id=" + this.id + ", projectSequence=" + this.projectSequence + ", summary=" + this.summary
				+ ", acceptanceCriteria=" + this.acceptanceCriteria + ", status=" + this.status + ", priority="
				+ this.priority + ", dueDate=" + this.dueDate + ", projectIdentifier=" + this.projectIdentifier + "]";
	}
}