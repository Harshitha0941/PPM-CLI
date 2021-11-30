/* Decompiler 1ms, total 238ms, lines 11 */
package com.cg.ppmtoolapi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cg.ppmtoolapi.entity.ProjectTask;

@Repository
public interface ProjectTaskRepository extends CrudRepository<ProjectTask, Long> {
   ProjectTask findByProjectSequence(String projectSequence);
   Iterable<ProjectTask> findByProjectIdentifier(String projectIdentifier);
}