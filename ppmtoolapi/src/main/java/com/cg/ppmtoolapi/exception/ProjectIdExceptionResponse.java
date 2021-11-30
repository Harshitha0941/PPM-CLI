package com.cg.ppmtoolapi.exception;

public class ProjectIdExceptionResponse {
	private String projectIdentifier;

	public ProjectIdExceptionResponse(String projectIdentifier) {
		this.projectIdentifier = projectIdentifier;
	}

	public String getProjectIdentifier() {
		return this.projectIdentifier;
	}

	public void setProjectIdentifier(String projectIdentifier) {
		this.projectIdentifier = projectIdentifier;
	}
}