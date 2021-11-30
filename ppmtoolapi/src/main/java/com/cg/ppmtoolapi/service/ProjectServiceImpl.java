/* Decompiler 16ms, total 269ms, lines 61 */
package com.cg.ppmtoolapi.service;

import com.cg.ppmtoolapi.entity.Backlog;
import com.cg.ppmtoolapi.entity.Project;
import com.cg.ppmtoolapi.exception.ProjectIdException;
import com.cg.ppmtoolapi.repository.BacklogRepository;
import com.cg.ppmtoolapi.repository.ProjectRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectServiceImpl implements ProjectService {
	Logger logger = LoggerFactory.getLogger(ProjectServiceImpl.class);
	@Autowired
	private ProjectRepository projectRepository;
	@Autowired
	private BacklogRepository backlogRepository;

	public Project saveOrUpdate(Project project) {
		try {
			project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
			if (project.getId() == null) {
				Backlog backlog = new Backlog();
				project.setBacklog(backlog);
				backlog.setProject(project);
				backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
			}

			if (project.getId() != null) {
				project.setBacklog(
						this.backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
			}

			return (Project) this.projectRepository.save(project);
		} catch (Exception var3) {
			this.logger.info("--ERROR:503--" + var3.getMessage());
			throw new ProjectIdException("project id " + project.getProjectIdentifier() + " is already available");
		}
	}

	public Project findProjectByProjectIdentifier(String projectIdentifier) {
		Project project = this.projectRepository.findByProjectIdentifier(projectIdentifier);
		return project;
	}

	public Iterable<Project> findAllProjects() {
		return this.projectRepository.findAll();
	}

	public void deleteProjectByProjectIdentifier(String projectIdentifier) {
		Project project = this.projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
		if (project == null) {
			throw new ProjectIdException("Can not delete project with project id " + projectIdentifier.toUpperCase()
					+ ". This id does not exist");
		} else {
			this.projectRepository.delete(project);
		}
	}
}