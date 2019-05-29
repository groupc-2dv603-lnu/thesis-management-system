package project.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import project.model.entities.FinalReport;
import project.model.entities.InitialReport;
import project.model.entities.Opponent;
import project.model.entities.ProjectDescription;
import project.model.entities.ProjectPlan;
import project.model.entities.Reader;

//import project.model.entities.Student;

import project.model.enums.Role;
import project.model.entities.Student;
import project.model.entities.Supervisor;
import project.model.entities.User;
import project.model.repositories.FinalReportRepository;
import project.model.repositories.InitialReportRepository;
import project.model.repositories.OpponentRepository;
import project.model.repositories.ProjectDescriptionRepository;
import project.model.repositories.ProjectPlanRepository;
import project.model.repositories.ReaderRepository;
import project.model.repositories.StudentRepository;
import project.model.repositories.SupervisorRepository;
import project.model.repositories.UserRepository;
import project.model.services.EncryptionService;

import javax.validation.Valid;

@RestController
class UserController {
	
	@Autowired
	private EncryptionService enrypt;

	private final UserRepository repository;
	private final StudentRepository studentRepository;
	private final SupervisorRepository supervisorRepository;
	private final OpponentRepository opponentRepository;
	private final ReaderRepository readerRepository;
	
	private final ProjectDescriptionRepository projectDescriptionRepository;
	private final ProjectPlanRepository projectPlanRepository;
	private final InitialReportRepository initialReportRepository;
	private final FinalReportRepository finalReportRepository;
	
	
	UserController(UserRepository repository,StudentRepository studentRepository, SupervisorRepository supervisorRepository, OpponentRepository opponentRepository,
			ReaderRepository readerRepository, ProjectDescriptionRepository projectDescriptionRepository, ProjectPlanRepository projectPlanRepository,InitialReportRepository initialReportRepository,
			FinalReportRepository finalReportRepository) {
		this.repository = repository;
		this.studentRepository = studentRepository;
		this.supervisorRepository = supervisorRepository;
		this.opponentRepository = opponentRepository;
		this.readerRepository = readerRepository;
		
		this.projectDescriptionRepository = projectDescriptionRepository;
		this.projectPlanRepository = projectPlanRepository;
		this.initialReportRepository = initialReportRepository;
		this.finalReportRepository = finalReportRepository;
	}
	
	@GetMapping(value = "/users/{id}", produces = "application/json; charset=UTF-8")
	Resource<User> one(@PathVariable String id) {
		User user = repository.findFirstById(id);
		return new Resource<>(user,
			    linkTo(methodOn(UserController.class).one(id)).withSelfRel(),
			    linkTo(methodOn(UserController.class).all()).withRel("users"));
		
	}
	
	@GetMapping(value = "/users", produces = "application/json; charset=UTF-8")
	Resources<Resource<User>> all() {
		List<Resource<User>> users = repository.findAll().stream()
			    .map(user -> new Resource<>(user,
			    		linkTo(methodOn(UserController.class).one(user.getId())).withSelfRel(),
			    		linkTo(methodOn(UserController.class).all()).withRel("users")))
			    	    .collect(Collectors.toList());

		return new Resources<>(users,
				linkTo(methodOn(UserController.class).all()).withSelfRel());
	}
	@GetMapping(value = "/loginUser", produces = "application/json; charset=UTF-8")
	Resource<User> one1() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = repository.findFirstByEmailAdress(name);
		return new Resource<>(user,
				linkTo(methodOn(UserController.class).one1()).withSelfRel());
	}
	
	@PostMapping("/admin/createUser")
	User newUser2(@Valid @RequestBody User user) {
		User findUser = repository.findFirstByEmailAdress(user.getEmailAdress());
		if(findUser == null) {
			user.setPassword(enrypt.hash(user.getPassword()));
			repository.save(user);
			for(int i=0; i < user.getRoles().length; i++){
				if(user.getRoles()[i].equals(Role.STUDENT)) {
					studentRepository.save(new Student(user.getId(), "", null));
					projectDescriptionRepository.save(new ProjectDescription(user.getId(), null, null, null));
					projectPlanRepository.save(new ProjectPlan(user.getId(), null, null, null, null));
					initialReportRepository.save(new InitialReport(user.getId(), null, null, null, null, null, null, null));
					finalReportRepository.save(new FinalReport(user.getId(), null, null, null));
					
				} else if(user.getRoles()[i].equals(Role.SUPERVISOR)) {
					supervisorRepository.save(new Supervisor(user.getId(), false, new ArrayList<String>(), new ArrayList<String>()));
				} else if(user.getRoles()[i].equals(Role.OPPONENT)) {
					opponentRepository.save(new Opponent(user.getId(), ""));
				}else if(user.getRoles()[i].equals(Role.READER)) {
					readerRepository.save(new Reader(user.getId(), "", ""));
				}
			}
			//return repository.save(user);
			return user;
		} else  {
			return findUser;
			//return repository.save(new User("Test_Auth", enrypt.hash("password"), "Jtest@hotmail.com", new Role[] { Role.STUDENT } ));
		}
		
	}
	@PutMapping("/admin/assignRoles")
	User updateUser(@Valid @RequestBody User updateUser) {
		User finduser = repository.findFirstByEmailAdress(updateUser.getEmailAdress());
		Boolean oldRoleStudent = false;
		Boolean newRoleStudent = false;
		if(finduser != null) {
			for(int i=0; i < finduser.getRoles().length; i++) {
				if(finduser.getRoles()[i].equals(Role.STUDENT)) {
					oldRoleStudent = true;
				}
			}
			
			for(int i=0; i < updateUser.getRoles().length; i++) {
				if(updateUser.getRoles()[i].equals(Role.STUDENT)) {
					newRoleStudent = true;
				}
			}
			
			if(oldRoleStudent.equals(false) && newRoleStudent.equals(true)) {
				projectDescriptionRepository.save(new ProjectDescription(finduser.getId(), null, null, null));
				projectPlanRepository.save(new ProjectPlan(finduser.getId(), null, null, null, null));
				initialReportRepository.save(new InitialReport(finduser.getId(), null, null, null, null, null, null, null));
				finalReportRepository.save(new FinalReport(finduser.getId(), null, null, null));

			} else if(oldRoleStudent.equals(true) && newRoleStudent.equals(false)) {
				ProjectDescription projectDescription = projectDescriptionRepository.findFirstByuserId(finduser.getId());
				projectDescriptionRepository.deleteById(projectDescription.getId());
				
				ProjectPlan projectPlan = projectPlanRepository.findFirstByuserId(finduser.getId());
				projectPlanRepository.deleteById(projectPlan.getId());
				
				InitialReport initialReport = initialReportRepository.findFirstByuserId(finduser.getId());
				initialReportRepository.deleteById(initialReport.getId());
				
				FinalReport finalReport = finalReportRepository.findFirstByuserId(finduser.getId());
				finalReportRepository.deleteById(finalReport.getId());
			}
			finduser.setRoles(updateUser.getRoles());
			return repository.save(finduser);
		} else {
			return finduser;
		}

	}
	@DeleteMapping("/admin/deleteUser")
	void deleteUser(@RequestParam String userId) {
		User user = repository.findFirstById(userId);
		for(int i=0; i < user.getRoles().length; i++){
			if(user.getRoles()[i].equals(Role.STUDENT)) {
				Student student = studentRepository.findFirstByuserId(user.getId());
				studentRepository.deleteById(student.getId());
				
				ProjectDescription projectDescription = projectDescriptionRepository.findFirstByuserId(user.getId());
				projectDescriptionRepository.deleteById(projectDescription.getId());
				
				ProjectPlan projectPlan = projectPlanRepository.findFirstByuserId(user.getId());
				projectPlanRepository.deleteById(projectPlan.getId());
				
				InitialReport initialReport = initialReportRepository.findFirstByuserId(user.getId());
				initialReportRepository.deleteById(initialReport.getId());
				
				FinalReport finalReport = finalReportRepository.findFirstByuserId(user.getId());
				finalReportRepository.deleteById(finalReport.getId());
			} else if(user.getRoles()[i].equals(Role.SUPERVISOR)) {
				Supervisor supervisor = supervisorRepository.findFirstByuserId(user.getId());
				supervisorRepository.deleteById(supervisor.getId());
			} else if(user.getRoles()[i].equals(Role.OPPONENT)) {
				Opponent opponent = opponentRepository.findFirstByuserId(user.getId());
				opponentRepository.deleteById(opponent.getId());
			}else if(user.getRoles()[i].equals(Role.READER)) {
				Reader reader = readerRepository.findFirstByuserId(user.getId());
				readerRepository.deleteById(reader.getId());
			}
		}
		repository.deleteById(userId);
	}
	
}
