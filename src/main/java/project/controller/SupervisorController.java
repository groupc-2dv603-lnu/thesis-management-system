package project.controller;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import project.model.entities.*;
import project.model.repositories.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@RestController
public class SupervisorController {

	private final UserRepository repository;
	private final SupervisorRepository supervisorRepository;
	private final FeedbackRepository feedbackRepository;
	private final StudentRepository studentRepository;
	private final ProjectPlanRepository projectPlanRepository;
	private final InitialReportRepository initialReportRepository;
	private final FinalReportRepository finalReportRepository;
	private final SubmissionRepository submissionRepository;


	public SupervisorController(UserRepository rep, SupervisorRepository sup, FeedbackRepository fed, StudentRepository stu,
								ProjectPlanRepository plan,InitialReportRepository initial, FinalReportRepository finala, SubmissionRepository sub){
		this.repository = rep;
		this.supervisorRepository = sup;
		this.feedbackRepository = fed;
		this.studentRepository = stu;
		this.projectPlanRepository = plan;
		this.initialReportRepository = initial;
		this.finalReportRepository = finala;
		this.submissionRepository = sub;
	}



	@PostMapping("/supervisor/feedback")
	Feedback newFeedback(@RequestBody Feedback feedback) {
		Submission submission = submissionRepository.findFirstById(feedback.getDocumentId());
		Supervisor supervisor = getLoggedInSupervisor();
		if(supervisor.isAssignedStudent(submission.getUserId())) {
			return feedbackRepository.save(feedback);
		}
		return null;
	}
	//Returns all feedbacks beloning to the document id.
	@GetMapping(value = "/supervisor/feedback", produces = "application/json; charset=UTF-8")
	Resources<Resource<Feedback>> all2(@RequestParam String documentId) {
		List<Resource<Feedback>> feedbacks = null;
		Submission submission = submissionRepository.findFirstById(documentId);
		Supervisor supervisor = getLoggedInSupervisor();

		if(supervisor.isAssignedStudent(submission.getUserId())) {
			feedbacks = feedbackRepository.findBydocumentId(documentId).stream()
					.map(feedback -> new Resource<>(feedback,
							linkTo(methodOn(SupervisorController.class).all2(documentId)).withRel("feedback")))
					.collect(Collectors.toList());
		}
		return new Resources<>(feedbacks,
				linkTo(methodOn(SupervisorController.class).all2(documentId)).withSelfRel());
	}

	@PutMapping("/supervisor/update")
	Supervisor updateSupervisor(@RequestBody Supervisor supervisor) {

		return supervisorRepository.save(supervisor);
	}

	//Add denied list or something for students.
	@PutMapping("/supervisor/assignStudent/{studentId}")
	Student assignStudent(@PathVariable String studentId, @RequestParam("state") Boolean state) {

		Supervisor supervisor = getLoggedInSupervisor();

		Student student = studentRepository.findFirstByuserId(studentId);
		if(student != null && supervisor != null) {
			if (supervisor.isAvailable()) {
				if (state) {
					supervisor.assignStudent(studentId);
				} else {
					supervisor.denyStudent(studentId);
				}
				student.setSupervisor(state);
				supervisorRepository.save(supervisor);
				studentRepository.save(student);
			}
		}
		return null;

	}

	@PutMapping("/supervisor/approvePlan/{planId}")
	ProjectPlan approvePlan(@PathVariable String planId, @RequestParam("state") Boolean state) {

		Supervisor supervisor = getLoggedInSupervisor();

		ProjectPlan plan = projectPlanRepository.findFirstById(planId);

		Student student = studentRepository.findFirstByuserId(plan.getUserId());


		if(supervisor.isAssignedStudent(student.getUserId())) {
			plan.setApproved(state);
			projectPlanRepository.save(plan);
		}
		return null;
	}



	@GetMapping(value = "/supervisor/assignedStudents", produces = "application/json; charset=UTF-8")
	Resources<Resource<Student>> assignedStudents() {

		Supervisor supervisor = getLoggedInSupervisor();
		List<Resource<Student>> students = new ArrayList<>();

		if(supervisor != null) {
			for (String userId : supervisor.getAssignedStudents()) {
				Student student = studentRepository.findFirstByuserId(userId);
				if (student != null) {
					students.add(new Resource<>(student,
							linkTo(methodOn(SupervisorController.class).assignedStudents()).withRel("appliedStudents")));
				}

			}
		}
		return new Resources<>(students,
				linkTo(methodOn(SupervisorController.class).assignedStudents()).withSelfRel());
	}

	@GetMapping(value = "/supervisor/appliedStudents", produces = "application/json; charset=UTF-8")
	Resources<Resource<Student>> appliedStudents() {

		Supervisor supervisor = getLoggedInSupervisor();
		List<Resource<Student>> students = new ArrayList<>();

		if(supervisor != null) {
			for (String userId : supervisor.getAwaitingResponse()) {
				Student student = studentRepository.findFirstByuserId(userId);
				if (student != null) {
					students.add(new Resource<>(student,
							linkTo(methodOn(SupervisorController.class).appliedStudents()).withRel("appliedStudents")));
				}
			}
		}
		return new Resources<>(students,
				linkTo(methodOn(SupervisorController.class).appliedStudents()).withSelfRel());
	}

	@GetMapping(value = "/supervisor/initialReport/{userId}", produces = "application/json; charset=UTF-8")
	Resource<InitialReport> specificInitialReport(@PathVariable String userId) {
		Supervisor supervisor = getLoggedInSupervisor();
		InitialReport initialReport = null;
		if(supervisor.isAssignedStudent(userId)) {
			initialReport = initialReportRepository.findFirstByuserId(userId);
		}
		return new Resource<>(initialReport,
				linkTo(methodOn(SupervisorController.class).specificInitialReport(userId)).withSelfRel());
	}

	@GetMapping(value = "/supervisor/projectPlan/{userId}", produces = "application/json; charset=UTF-8")
	Resource<ProjectPlan> specificProjectPlan(@PathVariable String userId) {
		Supervisor supervisor = getLoggedInSupervisor();
		ProjectPlan projectplan = null;
		if(supervisor.isAssignedStudent(userId)) {
			projectplan = projectPlanRepository.findFirstByuserId(userId);
		}
		return new Resource<>(projectplan,
				linkTo(methodOn(SupervisorController.class).specificProjectPlan(userId)).withSelfRel());
	}



	private Supervisor getLoggedInSupervisor()
	{
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = repository.findFirstByEmailAdress(name);
		Supervisor supervisor = supervisorRepository.findFirstByuserId(user.getId());

		if(supervisor != null)
		{
			return supervisor;
		}
		return null;
	}
}