
package com.cg.ppmtoolapi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.cg.ppmtoolapi.entity.Backlog;

@Repository
public interface BacklogRepository extends CrudRepository<Backlog, Long> {
   Backlog findByProjectIdentifier(String projectIdentifier);
}