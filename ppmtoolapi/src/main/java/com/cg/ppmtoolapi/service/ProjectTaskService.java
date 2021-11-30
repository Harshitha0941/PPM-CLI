 

package com.cg.ppmtoolapi.service;

import java.util.List;

import com.cg.ppmtoolapi.entity.ProjectTask;

public interface ProjectTaskService
{
    public static final Integer PRIORITY_HIGH = 1;
    public static final Integer PRIORITY_MEDIUM = 2;
    public static final Integer PRIORITY_LOW = 3;
    public static final String TO_DO = "TO_DO";
    public static final String IN_PROGRESS = "IN_PROGRESS";
    public static final String DONE = "DONE";
    
    ProjectTask addProjectTask(final String projectIdentifier, final ProjectTask projectTask);
    
    ProjectTask findPTByProjectSequence(final String backlog_id, final String sequence);
    
    ProjectTask updateByProjectSequence(final ProjectTask updatedProjectTask, final String backlog_id, final String sequence);
    
    void deletePTByProjectSequence(final String backlog_id, final String sequence);
    
    List<ProjectTask> getAllProjectTasks(final String backlog_id);
    
    
}
