package com.cg.ppmtoolapi.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler
{
    @ExceptionHandler
    public final ResponseEntity<Object> handleProjectIdException(final ProjectIdException ex, final WebRequest request) {
        final ProjectIdExceptionResponse exceptionResponse = new ProjectIdExceptionResponse(ex.getMessage());
        return (ResponseEntity<Object>)new ResponseEntity((Object)exceptionResponse, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler
    public final ResponseEntity<Object> handleProjectNotFoundException(final ProjectNotFoundException ex, final WebRequest request) {
        final ProjectNotFoundExceptionResponse exceptionResponse = new ProjectNotFoundExceptionResponse(ex.getMessage());
        return (ResponseEntity<Object>)new ResponseEntity((Object)exceptionResponse, HttpStatus.BAD_REQUEST);
    }
}