/* Decompiler 6ms, total 701ms, lines 17 */
package com.cg.ppmtoolapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ProjectNotFoundException extends RuntimeException {
   private static final long serialVersionUID = 1L;

   public ProjectNotFoundException() {
   }

   public ProjectNotFoundException(String errMsg) {
      super(errMsg);
   }
}