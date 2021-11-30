/* Decompiler 26ms, total 715ms, lines 70 */
package com.cg.ppmtoolapi.service;
import java.util.*;

import com.cg.ppmtoolapi.entity.Backlog;
import com.cg.ppmtoolapi.entity.ProjectTask;
import com.cg.ppmtoolapi.exception.ProjectNotFoundException;
import com.cg.ppmtoolapi.repository.BacklogRepository;
import com.cg.ppmtoolapi.repository.ProjectTaskRepository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskServiceImpl implements ProjectTaskService {
	@Autowired
	private BacklogRepository backlogRepository;
	@Autowired
	private ProjectTaskRepository projectTaskRepository;

	public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
		try {
			Backlog backlog = this.backlogRepository.findByProjectIdentifier(projectIdentifier);
			projectTask.setBacklog(backlog);
			Integer backlogSequence = backlog.getPTSequence();
			backlogSequence = backlogSequence + 1;
			backlog.setPTSequence(backlogSequence);
			this.backlogRepository.save(backlog);
			projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);
			if (projectTask.getPriority() == 0 || projectTask.getPriority() == null) {
				projectTask.setPriority(ProjectTaskService.PRIORITY_LOW);
			}

			if (projectTask.getStatus() == "" || projectTask.getStatus() == null) {
				projectTask.setStatus("TO_DO");
			}

			return (ProjectTask) this.projectTaskRepository.save(projectTask);
		} catch (Exception var6) {
			throw new ProjectNotFoundException("Project Not Found");
		}
	}

	public ProjectTask findPTByProjectSequence(String backlog_id, String sequence) {
		Backlog backlog = this.backlogRepository.findByProjectIdentifier(backlog_id);
		if (backlog == null) {
			throw new ProjectNotFoundException("Project with id : '" + backlog_id + "' does not exist");
		} else {
			ProjectTask projectTask = this.projectTaskRepository.findByProjectSequence(sequence);
			if (projectTask == null) {
				throw new ProjectNotFoundException("ProjectTask with id : '" + sequence + "' does not exist");
			} else {
				return projectTask;
			}
		}
	}

	public ProjectTask updateByProjectSequence(ProjectTask updatedProjectTask, String backlog_id, String sequence) {
		this.findPTByProjectSequence(backlog_id, sequence);
		return (ProjectTask) this.projectTaskRepository.save(updatedProjectTask);
	}

	public void deletePTByProjectSequence(String backlog_id, String sequence) {
		ProjectTask projectTask = this.findPTByProjectSequence(backlog_id, sequence);
		Backlog backlog = projectTask.getBacklog();
		List<ProjectTask> projectTasks = backlog.getProjectTasks();
		projectTasks.remove(projectTask);
		this.backlogRepository.save(backlog);
		this.projectTaskRepository.delete(projectTask);
	}

	@Override
	public List<ProjectTask> getAllProjectTasks(String backlog_id) {
		 List<ProjectTask> projectTaskList = new ArrayList<ProjectTask>();
		Iterable<ProjectTask> projectTasksItr = this.projectTaskRepository.findByProjectIdentifier(backlog_id);
		for (ProjectTask str : projectTasksItr) {
			projectTaskList.add(str);
	    }
		return projectTaskList;
	}
}




