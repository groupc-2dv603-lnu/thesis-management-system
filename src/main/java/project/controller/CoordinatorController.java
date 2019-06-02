package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import project.model.entities.*;
import project.model.DTOs.SubmissionsDTO;

import project.model.enums.Role;

import project.model.repositories.*;

import javax.validation.Valid;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@RestController
public class CoordinatorController {
    @Autowired
    private InitialReportRepository initialReportRepository;

    @Autowired
    private FinalReportRepository finalReportRepository;

    @Autowired
    private ProjectDescriptionRepository projectDescriptionRepository;

    @Autowired
    private OpponentRepository opponentRepository;

    @Autowired
    private ReaderRepository readerRepository;

    @Autowired
    private ProjectPlanRepository projectPlanRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private SubmissionRepository submissionRepository;
    
    @Autowired
    private UserRepository repository;
    
    @Autowired
    private FeedbackRepository feedbackRepository;

    
	@PostMapping("/coordinator/feedback")
	Feedback newFeedback(@RequestParam String text, @RequestParam String FinalReportId) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName();
		User user = repository.findFirstByEmailAdress(name);
		
		Date date = new Date();
		Feedback feedback = new Feedback(user.getId(), FinalReportId, text, Role.COORDINATOR, date);
		FinalReport report = finalReportRepository.findFirstById(feedback.getDocumentId());

		feedbackRepository.save(feedback);
		report.getFeedBackIds().add(feedback.getId());
		finalReportRepository.save(report);
		return feedback;
	}
    @PutMapping(value = "/coordinator/updateProjectPlan", consumes = {"application/json"})
    void updateProjectPlan(@Valid @RequestBody ProjectPlan projectPlan) {
        if (projectPlanRepository.findById(projectPlan.getId()).isPresent()) {
            projectPlanRepository.save(projectPlan);
        }
    }

    @PutMapping(value = "/coordinator/updateProjectDescription", consumes = {"application/json"})
    void updateProjectDescription(@Valid @RequestBody ProjectDescription projectDescription) {
        if (projectDescriptionRepository.findById(projectDescription.getId()).isPresent()) {
            projectDescriptionRepository.save(projectDescription);
        }
    }

    @PutMapping(value = "/coordinator/updateFinalReport", consumes = {"application/json"})
    void updateFinalReport(@RequestBody FinalReport finalReport) {
        if (finalReportRepository.findById(finalReport.getId()).isPresent()) {
            finalReportRepository.save(finalReport);
        }
    }

    @PutMapping(value = "/coordinator/updateInitialReport", consumes = {"application/json"})
    void updateInitialReport(@Valid @RequestBody InitialReport initialReport) {
        if (initialReportRepository.findById(initialReport.getId()).isPresent()) {
    		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    		String name = auth.getName();
    		User user = repository.findFirstByEmailAdress(name);
    		Opponent opponent = opponentRepository.findFirstByuserId(user.getId());
    		opponent.setInitialReportId(initialReport.getId());
        	opponentRepository.save(opponent);
        	
    		Reader reader = readerRepository.findFirstByuserId(user.getId());
    		reader.setInitialReportId(initialReport.getId());
        	readerRepository.save(reader);
        	
            initialReportRepository.save(initialReport);
        }
    }

    @GetMapping("/coordinator/getAllStudents")
    List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/coordinator/getAllReports")
    List<InitialReport> getAllReports() {
        return initialReportRepository.findAll();
    }

    @GetMapping("/coordinator/getAllReaders")
    List<Reader> getAllReaders() {
        return readerRepository.findAll();
    }

    @GetMapping("/coordinator/getAllOpponents")
    List<Opponent> getAllOpponents() {
        return opponentRepository.findAll();
    }

    @GetMapping("/coordinator/getAllSubmissionsByUserID")
    SubmissionsDTO getAllSubmisssionsByUserID(@RequestParam String userId) {
        List<ProjectPlan> plans = projectPlanRepository.findAllByuserId(userId);
        List<ProjectDescription> projectDescriptions = projectDescriptionRepository.findAllByuserId(userId);
        List<InitialReport> initialReports = initialReportRepository.findAllByuserId(userId);
        List<FinalReport> finalReports = finalReportRepository.findAllByuserId(userId);

        return new SubmissionsDTO(plans, projectDescriptions, finalReports, initialReports);
    }

    /* Get specific submission based on id */
    @GetMapping(value = "/coordinator/submissions/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    Resource<Submission> getSubmission(@PathVariable String id) {
        Submission submission = submissionRepository.findFirstById(id);

        return new Resource<>(submission,
                linkTo(methodOn(CoordinatorController.class).getSubmission(id)).withSelfRel(),
                linkTo(methodOn(CoordinatorController.class).getAllSubmissions()).withRel("submissions"));

    }

    /* Get all submissions */
    @GetMapping(value = "/coordinator/submissions", produces = MediaType.APPLICATION_JSON_VALUE)
    Resources<Resource<Submission>> getAllSubmissions() {
        List<Resource<Submission>> submissions = submissionRepository.findAll().stream()
                .map(submission -> new Resource<>(submission,
                        linkTo(methodOn(CoordinatorController.class).getSubmission(submission.getId())).withSelfRel(),
                        linkTo(methodOn(CoordinatorController.class).getAllSubmissions()).withRel("submissions")))
                .collect(Collectors.toList());

        return new Resources<>(submissions,
                linkTo(methodOn(CoordinatorController.class).getAllSubmissions()).withSelfRel());
    }
    
}
