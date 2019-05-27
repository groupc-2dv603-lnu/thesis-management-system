package project.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import project.model.entities.Feedback;
import project.model.entities.FinalReport;
import project.model.entities.InitialReport;
import project.model.entities.ProjectDescription;
import project.model.entities.ProjectPlan;
import project.model.entities.Role;
import project.model.entities.Student;
import project.model.entities.Supervisor;
import project.model.entities.User;
import project.model.repositories.FeedbackRepository;
import project.model.repositories.FinalReportRepository;
import project.model.repositories.InitialReportRepository;
import project.model.repositories.ProjectDescriptionRepository;
import project.model.repositories.ProjectPlanRepository;
import project.model.repositories.StudentRepository;
import project.model.repositories.SupervisorRepository;
import project.model.repositories.UserRepository;

@RestController
public class StudentController {
	private final UserRepository repository;
	private final SupervisorRepository supervisorRepository;
	private final ProjectPlanRepository projectPlanRepository;
	private final FeedbackRepository feedbackRepository;
	private final InitialReportRepository initialReportRepository;
	private final FinalReportRepository finalReportRepository;
	private final ProjectDescriptionRepository projectDescriptionRepository;
	private final StudentRepository studentRepository;
	
	StudentController(UserRepository repository,SupervisorRepository supervisorRepository, ProjectPlanRepository projectPlanRepository, FeedbackRepository feebackRepository,
			InitialReportRepository initialReportRepository, FinalReportRepository finalReportRepository, ProjectDescriptionRepository projectDescriptionRepository,
			StudentRepository studentRepository) {
		this.repository = repository;
		this.supervisorRepository = supervisorRepository;
		this.projectPlanRepository = projectPlanRepository;
		this.feedbackRepository = feebackRepository;
		this.initialReportRepository = initialReportRepository;
		this.finalReportRepository = finalReportRepository;
		this.projectDescriptionRepository = projectDescriptionRepository;
		this.studentRepository = studentRepository;
	}
	
//	@GetMapping(value = "/supervisors/{id}", produces = "application/json; charset=UTF-8")
//	Resource<Supervisor> one(@PathVariable String id) {
//		Supervisor supervisor = supervisorRepository.findFirstById(id);
//		return new Resource<>(supervisor,
//				linkTo(methodOn(StudentController.class).one(id)).withSelfRel(),
//				linkTo(methodOn(StudentController.class).all()).withRel("supervisors"));
//	}
	
	@GetMapping(value = "/student/getAvailableSupervisors", produces = "application/json; charset=UTF-8")
	Resources<Resource<Supervisor>> all() {
		List<Resource<Supervisor>> supervisors = supervisorRepository.findByAvailableForSupervisorTrue().stream()
			    .map(supervisor -> new Resource<>(supervisor,
			    		
//			    		linkTo(methodOn(StudentController.class).one(supervisor.getId())).withSelfRel(),
//			    		linkTo(methodOn(UserController.class).one(supervisor.getUserId())).withRel("userUrl"),
			    		linkTo(methodOn(StudentController.class).all()).withRel("getAvailableSupervisors")))
			    	    .collect(Collectors.toList());
//		ArrayList<User> user = new ArrayList<User>();
//		for(int i=0; i < supervisors.size(); i++){
//			User findUser = repository.findFirstById(supervisors.get(i).getContent().getId());
//			user.add(findUser);
//			supervisors.get(i).getContent()
//		}
		return new Resources<>(supervisors,
				linkTo(methodOn(StudentController.class).all()).withSelfRel());
	}
	@PutMapping("/student/requestSupervisor")
	Supervisor updateSupervisor(@RequestParam String supervisorUserId) {
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		
		User user = repository.findFirstByEmailAdress(name);
		Student student = studentRepository.findFirstByuserId(user.getId());
		Supervisor supervisor = supervisorRepository.findFirstByuserId(supervisorUserId);
		
		if("awaiting".equals(student.getPendingSupervisor()) || "accepted".equals(student.getPendingSupervisor())) {
			return supervisor;
		} else {
			supervisor.getAwaitingResponse().add(user.getId());
			student.setPendingSupervisor("awaiting");
			
			studentRepository.save(student);
			return supervisorRepository.save(supervisor);
		}

	}
	@GetMapping(value = "/student/projectPlan", produces = "application/json; charset=UTF-8")
	Resource<ProjectPlan> one1() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = repository.findFirstByEmailAdress(name);
		ProjectPlan projectplan = projectPlanRepository.findFirstByuserId(user.getId());
		return new Resource<>(projectplan,
				linkTo(methodOn(StudentController.class).one1()).withSelfRel());
	}
	@GetMapping(value = "/student/initialReport", produces = "application/json; charset=UTF-8")
	Resource<InitialReport> one3() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = repository.findFirstByEmailAdress(name);
		InitialReport initialReport = initialReportRepository.findFirstByuserId(user.getId());
		return new Resource<>(initialReport,
				linkTo(methodOn(StudentController.class).one3()).withSelfRel());
	}
	
	@GetMapping(value = "/student/finalReport", produces = "application/json; charset=UTF-8")
	Resource<FinalReport> one4() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = repository.findFirstByEmailAdress(name);
		FinalReport finalReport = finalReportRepository.findFirstByuserId(user.getId());
		return new Resource<>(finalReport,
				linkTo(methodOn(StudentController.class).one4()).withSelfRel());
	}
	@GetMapping(value = "/student/projectDescription", produces = "application/json; charset=UTF-8")
	Resource<ProjectDescription> one5() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = repository.findFirstByEmailAdress(name);
		ProjectDescription projectDescription = projectDescriptionRepository.findFirstByuserId(user.getId());
		return new Resource<>(projectDescription,
				linkTo(methodOn(StudentController.class).one5()).withSelfRel());
	}
	
	@GetMapping(value = "/student/feedback/{id}", produces = "application/json; charset=UTF-8")
	Resource<Feedback> one2(@PathVariable String id) {
		Feedback feedback = feedbackRepository.findFirstById(id);
		return new Resource<>(feedback,
				linkTo(methodOn(StudentController.class).one2(id)).withSelfRel(),
				linkTo(methodOn(StudentController.class).all2(id)).withRel("feedback"));
	}
	
	@GetMapping(value = "/student/feedback", produces = "application/json; charset=UTF-8")
	Resources<Resource<Feedback>> all2(@RequestParam String documentId) {
		List<Resource<Feedback>> feedbacks = feedbackRepository.findBydocumentId(documentId).stream()
			    .map(feedback -> new Resource<>(feedback,
			    		linkTo(methodOn(StudentController.class).one2(feedback.getId())).withSelfRel(),
			    		linkTo(methodOn(StudentController.class).all2(documentId)).withRel("feedback")))
			    	    .collect(Collectors.toList());
						
		return new Resources<>(feedbacks,
				linkTo(methodOn(StudentController.class).all2(documentId)).withSelfRel());
	}

}
