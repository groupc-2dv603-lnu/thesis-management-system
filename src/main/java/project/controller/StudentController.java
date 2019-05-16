package project.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import project.model.entities.ProjectPlan;
import project.model.entities.Supervisor;
import project.model.entities.User;
import project.model.repositories.ProjectPlanRepository;
import project.model.repositories.StudentRepository;
import project.model.repositories.SupervisorRepository;
import project.model.repositories.UserRepository;

@RestController
public class StudentController {
	private final UserRepository repository;
	private final SupervisorRepository supervisorRepository;
	private final ProjectPlanRepository projectPlanRepository;
	
	
	StudentController(UserRepository repository,SupervisorRepository supervisorRepository, ProjectPlanRepository projectPlanRepository) {
		this.repository = repository;
		this.supervisorRepository = supervisorRepository;
		this.projectPlanRepository = projectPlanRepository;
	}
	
	@GetMapping(value = "/supervisors/{id}", produces = "application/json; charset=UTF-8")
	Resource<Supervisor> one(@PathVariable String id) {
		Supervisor supervisor = supervisorRepository.findFirstById(id);
		return new Resource<>(supervisor,
				linkTo(methodOn(StudentController.class).one(id)).withSelfRel(),
				linkTo(methodOn(StudentController.class).all()).withRel("supervisors"));
	}
	
	@GetMapping(value = "/getAvailableSupervisors", produces = "application/json; charset=UTF-8")
	Resources<Resource<Supervisor>> all() {
		List<Resource<Supervisor>> supervisors = supervisorRepository.findByAvailableForSupervisorTrue().stream()
			    .map(supervisor -> new Resource<>(supervisor,
			    		
			    		linkTo(methodOn(StudentController.class).one(supervisor.getId())).withSelfRel(),
			    		linkTo(methodOn(UserController.class).one(supervisor.getUserId())).withRel("userUrl"),
			    		linkTo(methodOn(StudentController.class).all()).withRel("getAvailableSupervisors")))
			    	    .collect(Collectors.toList());
						
		return new Resources<>(supervisors,
				linkTo(methodOn(StudentController.class).all()).withSelfRel());
	}
	@PutMapping("/requestSupervisor")
	void updateSupervisor(@RequestParam String studentId, @RequestParam String id) {
		
		supervisorRepository.findById(id)
			.map(supervisor -> {
				supervisor.getAwaitingResponse().add(studentId);
				return supervisorRepository.save(supervisor);
			});
			
	}
	@GetMapping(value = "/projectPlan", produces = "application/json; charset=UTF-8")
	Resource<ProjectPlan> one1() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = repository.findFirstByEmailAdress(name);
		ProjectPlan projectplan = projectPlanRepository.findFirstBystudentId(user.getId());
		return new Resource<>(projectplan,
				linkTo(methodOn(StudentController.class).one(user.getId())).withSelfRel());
	}
//	@GetMapping(value = "/GetAvailableSupervisors", produces = "application/json; charset=UTF-8")
//	Resources<Resource<User>> all() {
//		List<Supervisor> supervisors = supervisorRepository.findByAvailable("yess");
//		List<Resource<User>> users = repository.findAll().stream()
//			    .map(user -> new Resource<>(user,
//			    		linkTo(methodOn(UserController.class).one(user.getId())).withSelfRel(),
//			    		linkTo(methodOn(UserController.class).all()).withRel("users")))
//			    	    .collect(Collectors.toList());
//
//		return new Resources<>(users,
//				linkTo(methodOn(UserController.class).all()).withSelfRel());
//	}
}
