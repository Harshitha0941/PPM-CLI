package com.cg.ppmtoolapi.entity;

import java.util.ArrayList;
import javax.persistence.CascadeType;
import javax.persistence.OneToMany;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.JoinColumn;
import javax.persistence.FetchType;
import javax.persistence.OneToOne;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Entity;

@Entity
public class Backlog {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Integer PTSequence;
	private String projectIdentifier;
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "project_id", nullable = false)
	@JsonIgnore
	private Project project;
	@OneToMany(cascade = { CascadeType.ALL }, fetch = FetchType.EAGER, mappedBy = "backlog")
	private List<ProjectTask> projectTasks;

	public Backlog() {
		this.PTSequence = 0;
		this.projectTasks = new ArrayList<ProjectTask>();
	}

	public Long getId() {
		return this.id;
	}

	public void setId(final Long id) {
		this.id = id;
	}

	public Integer getPTSequence() {
		return this.PTSequence;
	}

	public void setPTSequence(final Integer pTSequence) {
		this.PTSequence = pTSequence;
	}

	public String getProjectIdentifier() {
		return this.projectIdentifier;
	}

	public void setProjectIdentifier(final String projectIdentifier) {
		this.projectIdentifier = projectIdentifier;
	}

	public Project getProject() {
		return this.project;
	}

	public void setProject(final Project project) {
		this.project = project;
	}

	public List<ProjectTask> getProjectTasks() {
		return this.projectTasks;
	}

	public void setProjectTasks(final List<ProjectTask> projectTasks) {
		this.projectTasks = projectTasks;
	}
}