package com.cg.ppmtoolapi.config;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@Configuration
public class SwagerConfig {
	@Bean
	public Docket productApi() {
		return new Docket(DocumentationType.SWAGGER_2).select()
				.apis(RequestHandlerSelectors.basePackage("com.cg.ppmtoolapi.controller")).paths(PathSelectors.regex("/api.*"))
				.build().apiInfo(this.metoInfo());
	}

	private ApiInfo metoInfo() {
		final ApiInfo apiInfo = new ApiInfo("Personal Project Management API", "PPM API Created by Codegram", "1.0",
				"Terms of Service", new Contact("Pankaj Sharma", "https://www.codegram.in/", "pankajsimmc@gmail.com"),
				"CODEGRAM Licence v.1.0", "https://www.codegram.in/", (Collection) new ArrayList());
		return apiInfo;
	}
}