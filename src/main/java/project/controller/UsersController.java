package project.controller;

import org.springframework.web.bind.annotation.GetMapping;
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
	
	@GetMapping("/users")
	public void getUsers() {
		Users u = repository.findFirstByName("Calle Johansson");
		System.out.println(u);
	}
	
	@PostMapping("/users")
	public void postUsers() {
		repository.save(new Users("Calle Johansson", "hejsan123"));
	}
}
