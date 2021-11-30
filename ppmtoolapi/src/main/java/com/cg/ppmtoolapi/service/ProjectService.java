/* Decompiler 0ms, total 647ms, lines 14 */
package com.cg.ppmtoolapi.service;

import com.cg.ppmtoolapi.entity.Project;

public interface ProjectService {
   Project saveOrUpdate(Project project);

   Project findProjectByProjectIdentifier(String projectIdentifier);

   Iterable<Project> findAllProjects();

   void deleteProjectByProjectIdentifier(String projectIdentifier);
}