package project.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import project.model.entities.Users;
import project.model.repositories.UserRepository;

@RestController
class UsersController {
	
	private final UserRepository repository;
	
	UsersController(UserRepository repository) {
		this.repository = repository;
	}
	
	@GetMapping("/users/{id}")
	Resource<Users> one(@PathVariable String id) {
		Users user = repository.findFirstById(id);
		
		return new Resource<>(user,
			    linkTo(methodOn(UsersController.class).one(id)).withSelfRel(),
			    linkTo(methodOn(UsersController.class).all()).withRel("employees"));
		
	}
	
	@GetMapping("/users")
	Resources<Resource<Users>> all() {
		List<Resource<Users>> users = repository.findAll().stream()
			    .map(employee -> new Resource<>(employee,
			    		linkTo(methodOn(UsersController.class).one(employee.getId())).withSelfRel(),
			    		linkTo(methodOn(UsersController.class).all()).withRel("users")))
			    	    .collect(Collectors.toList());

		return new Resources<>(users,
				linkTo(methodOn(UsersController.class).all()).withSelfRel());
	}
	@PostMapping("/users")
	public void postUsers() {
		repository.save(new Users("Calle Johansson", "hejsan123"));
	}
}
