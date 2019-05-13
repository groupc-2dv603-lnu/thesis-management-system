package project.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import project.model.entities.User;
import project.model.repositories.StudentRepository;
import project.model.repositories.UserRepository;

@RestController
public class StudentController {
	private final UserRepository repository;
	private final StudentRepository studentRepository;
	
	
	StudentController(UserRepository repository,StudentRepository studentRepository) {
		this.repository = repository;
		this.studentRepository = studentRepository;
	}
	

}
