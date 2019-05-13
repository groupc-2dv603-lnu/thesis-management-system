package project.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import project.model.entities.Role;
import project.model.entities.User;
import project.model.repositories.UserRepository;
import project.model.services.EncryptionService;

@RestController
class UserController {
	
	@Autowired
	private EncryptionService enrypt;

	private final UserRepository repository;
	
	
	UserController(UserRepository repository) {
		this.repository = repository;
	}
	
	@GetMapping("/users/{id}")
	Resource<User> one(@PathVariable String id) {
		User user = repository.findFirstById(id);
		
		return new Resource<>(user,
			    linkTo(methodOn(UserController.class).one(id)).withSelfRel(),
			    linkTo(methodOn(UserController.class).all()).withRel("employees"));
		
	}
	
	@GetMapping("/users")
	Resources<Resource<User>> all() {
		List<Resource<User>> users = repository.findAll().stream()
			    .map(employee -> new Resource<>(employee,
			    		linkTo(methodOn(UserController.class).one(employee.getId())).withSelfRel(),
			    		linkTo(methodOn(UserController.class).all()).withRel("users")))
			    	    .collect(Collectors.toList());

		return new Resources<>(users,
				linkTo(methodOn(UserController.class).all()).withSelfRel());
	}

	@PostMapping("/users")
	void newUser() {
		repository.save(new User("Test_Auth", enrypt.hash("password"), new Role[] { Role.STUDENT } ));
	}
	
}
