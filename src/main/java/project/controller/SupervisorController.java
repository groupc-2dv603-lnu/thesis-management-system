package project.controller;

import org.springframework.web.bind.annotation.*;
import project.model.entities.*;
import project.model.repositories.*;

@RestController
public class SupervisorController {

	private final UserRepository repository;
	private final SupervisorRepository supervisorRepository;
	private final FeedbackRepository feedbackRepository;
	private final StudentRepository studentRepository;
	private final ProjectPlanRepository projectPlanRepository;


	public SupervisorController(UserRepository rep, SupervisorRepository sup, FeedbackRepository fed, StudentRepository stu,
								ProjectPlanRepository plan){
		this.repository = rep;
		this.supervisorRepository = sup;
		this.feedbackRepository = fed;
		this.studentRepository = stu;
		this.projectPlanRepository = plan;
	}



	@PostMapping("/supervisor/feedback")
	Feedback newFeedback(@RequestBody Feedback feedback) {
		return feedbackRepository.save(feedback);
	}

	@PutMapping("/supervisor/{supervisorId}")
	Supervisor updateSupervisor(@PathVariable String supervisorId) {

		Supervisor supervisor = supervisorRepository.findFirstByuserId(supervisorId);

		return supervisorRepository.save(supervisor);
	}

	//Add denied list or something for students.
	@PutMapping("/supervisor/assignStudent/{supervisorId}/{studentId}")
	Student assignStudent(@PathVariable String supervisorId, @PathVariable String studentId, @RequestParam("state") Boolean state) {


		Student student = studentRepository.findFirstByuserId(studentId);
		Supervisor supervisor = supervisorRepository.findFirstByuserId(supervisorId);
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

	@PutMapping("/supervisor/approvePlan/{supervisorId}/{planId}")
	ProjectPlan approvePlan(@PathVariable String supervisorId, @PathVariable String planId, @RequestParam("state") Boolean state) {


		ProjectPlan plan = projectPlanRepository.findFirstById(planId);


		System.out.println(plan.getUserId());

		Supervisor supervisor = supervisorRepository.findFirstByuserId(supervisorId);

		Student student = studentRepository.findFirstByuserId(plan.getUserId());


		if(supervisor.isAssignedStudent(student.getUserId())) {
			plan.setApproved(state);
			projectPlanRepository.save(plan);
		}
		return null;
	}
}