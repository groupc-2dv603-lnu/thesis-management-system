package project.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import project.model.entities.User;
import project.model.repositories.UserRepository;

@RestController
class UserController {
	
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
			    .map(user -> new Resource<>(user,
			    		linkTo(methodOn(UserController.class).one(user.getId())).withSelfRel(),
			    		linkTo(methodOn(UserController.class).all()).withRel("users")))
			    	    .collect(Collectors.toList());

		return new Resources<>(users,
				linkTo(methodOn(UserController.class).all()).withSelfRel());
	}
	@PutMapping("/users/{id}")
	User updateUser(@RequestBody User newUser, @PathVariable String id) {
		
		return repository.findById(id)
			.map(user -> {
				user.setName(newUser.getName());
				return repository.save(user);
			})
			.orElseGet(() -> {
				newUser.setId(id);
				return repository.save(newUser());
			});
	}
	@PostMapping("/users")
	User newUser() {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
		String result = encoder.encode("myPassword");

		ArrayList<String> roles = new ArrayList<String>();
		roles.add("Student");
		roles.add("Reader");
		return repository.save(new User("Karl", result, "Karl@hotmail.com", roles));
	}
	
}
