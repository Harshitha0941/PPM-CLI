/* Decompiler 6ms, total 680ms, lines 18 */
package com.cg.ppmtoolapi.exception;

public class ProjectNotFoundExceptionResponse {
   private String projectNotFound;

   public ProjectNotFoundExceptionResponse(String projectNotFound) {
      this.projectNotFound = projectNotFound;
   }

   public String getProjectNotFound() {
      return this.projectNotFound;
   }

   public void setProjectNotFound(String projectNotFound) {
      this.projectNotFound = projectNotFound;
   }
}