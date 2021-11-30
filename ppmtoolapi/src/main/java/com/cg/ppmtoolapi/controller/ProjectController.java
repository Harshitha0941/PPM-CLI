/* Decompiler 3ms, total 252ms, lines 69 */
package com.cg.ppmtoolapi.controller;

import com.cg.ppmtoolapi.entity.Project;
import com.cg.ppmtoolapi.exception.ProjectIdException;
import com.cg.ppmtoolapi.service.MapValidationErrorService;
import com.cg.ppmtoolapi.service.ProjectService;

import io.swagger.annotations.ApiOperation;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/api/projects"})
@CrossOrigin("http://localhost:3000")
public class ProjectController {
   Logger logger = LoggerFactory.getLogger(ProjectController.class);
   @Autowired
   private ProjectService projectService;
   @Autowired
   private MapValidationErrorService mapValidationErrorService;

   @ApiOperation("Create new Project based of provided json")
   @PostMapping
   public ResponseEntity<?> createProject(@Valid @RequestBody Project project, BindingResult result) {
      ResponseEntity<?> errorMap = this.mapValidationErrorService.mapValidationError(result);
      if (errorMap != null) {
         return errorMap;
      } else {
         Project createdProject = this.projectService.saveOrUpdate(project);
         return new ResponseEntity(createdProject, HttpStatus.CREATED);
      }
   }

   @ApiOperation("Get Project By Project Identifier")
   @GetMapping({"/{projectIdentifier}"})
   public ResponseEntity<Project> getProjectByProjectIdentifier(@PathVariable String projectIdentifier) {
      Project project = this.projectService.findProjectByProjectIdentifier(projectIdentifier);
      this.logger.info("--PROJECT--" + project);
      if (project == null) {
         throw new ProjectIdException("Project Id " + projectIdentifier.toUpperCase() + " does not exist");
      } else {
         return new ResponseEntity(project, HttpStatus.OK);
      }
   }

   @GetMapping({"/all"})
   public Iterable<Project> getAllProjects() {
      return this.projectService.findAllProjects();
   }

   @DeleteMapping({"/{projectIdentifier}"})
   public ResponseEntity<?> deleteProject(@PathVariable String projectIdentifier) {
      this.projectService.deleteProjectByProjectIdentifier(projectIdentifier);
      return new ResponseEntity("Project With id : " + projectIdentifier.toUpperCase() + " is deleted successfully", HttpStatus.OK);
   }
}