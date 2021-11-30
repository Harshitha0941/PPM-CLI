
package com.cg.ppmtoolapi.controller;
import java.util.*;

import com.cg.ppmtoolapi.entity.ProjectTask;
import com.cg.ppmtoolapi.service.MapValidationErrorService;
import com.cg.ppmtoolapi.service.ProjectTaskService;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({ "/api/backlog" })
@CrossOrigin("http://localhost:3000")
public class BacklogController {
	@Autowired
	private ProjectTaskService projectTaskService;
	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@PostMapping({ "/{backlog_id}" })
	public ResponseEntity<?> addPTtoBacklog(@Valid @RequestBody ProjectTask projectTask, BindingResult result,
			@PathVariable String backlog_id) {
		ResponseEntity<?> errorMap = this.mapValidationErrorService.mapValidationError(result);
		if (errorMap != null) {
			return errorMap;
		} else {
			ProjectTask createdProjectTask = this.projectTaskService.addProjectTask(backlog_id, projectTask);
			return new ResponseEntity(createdProjectTask, HttpStatus.CREATED);
		}
	}

	@GetMapping({ "/{backlog_id}/{sequence}" })
	public ResponseEntity<?> getProjectTask(@PathVariable String backlog_id, @PathVariable String sequence) {
		ProjectTask projectTask = this.projectTaskService.findPTByProjectSequence(backlog_id, sequence);
		return new ResponseEntity(projectTask, HttpStatus.OK);
	}

	@PatchMapping({ "/{backlog_id}/{sequence}" })
	public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask,
			@PathVariable String backlog_id, @PathVariable String sequence, BindingResult result) {
		ResponseEntity<?> errorMap = this.mapValidationErrorService.mapValidationError(result);
		if (errorMap != null) {
			return errorMap;
		} else {
			ProjectTask updatedProjectTask = this.projectTaskService.updateByProjectSequence(projectTask, backlog_id,
					sequence);
			return new ResponseEntity(updatedProjectTask, HttpStatus.OK);
		}
	}

	@DeleteMapping({ "/{backlog_id}/{sequence}" })
	public ResponseEntity<?> deleteProjectTask(@PathVariable String backlog_id, @PathVariable String sequence) {
		this.projectTaskService.deletePTByProjectSequence(backlog_id, sequence);
		return new ResponseEntity("Project Task '" + sequence + "' is deleted successfully ", HttpStatus.OK);
	}
	
	
	@GetMapping({ "/{backlog_id}" })
	public ResponseEntity<?> getProjectTask(@PathVariable String backlog_id) {
		List<ProjectTask> projectTasksList = this.projectTaskService.getAllProjectTasks(backlog_id);
		return new ResponseEntity(projectTasksList, HttpStatus.OK);
	}
}