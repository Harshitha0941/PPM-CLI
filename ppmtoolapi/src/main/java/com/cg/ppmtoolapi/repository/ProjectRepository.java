/* Decompiler 0ms, total 255ms, lines 11 */
package com.cg.ppmtoolapi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cg.ppmtoolapi.entity.Project;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {
   Project findByProjectIdentifier(String projectIdentifier);
}