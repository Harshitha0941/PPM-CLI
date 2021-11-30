/* Decompiler 2ms, total 252ms, lines 30 */
package com.cg.ppmtoolapi.service;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

@Service
public class MapValidationErrorService {
   public ResponseEntity<?> mapValidationError(BindingResult result) {
      if (!result.hasErrors()) {
         return null;
      } else {
         Map<String, String> errorMap = new HashMap();
         Iterator var3 = result.getFieldErrors().iterator();

         while(var3.hasNext()) {
            FieldError fieldError = (FieldError)var3.next();
            errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
         }

         return new ResponseEntity(errorMap, HttpStatus.BAD_REQUEST);
      }
   }
}