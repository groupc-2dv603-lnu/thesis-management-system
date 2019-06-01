package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import project.model.entities.*;
import project.model.DTOs.SubmissionsDTO;
import project.model.repositories.*;

import javax.validation.Valid;
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


    @PutMapping(value = "/coordinator/updateProjectPlan", consumes = {"application/json"})
    void updateProjectPlan(@Valid @RequestBody ProjectPlan projectPlan) {
        if (projectPlanRepository.findById(projectPlan.getId()).isPresent()) {
            projectPlanRepository.save(projectPlan);
        }
    }

    @PutMapping(value = "/coordinator/updateProjectDescription", consumes = {"application/json"})
    void updateProjectDescription(@RequestBody ProjectDescription projectDescription) {
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
    void updateInitialReport(@RequestBody InitialReport initialReport) {
        if (initialReportRepository.findById(initialReport.getId()).isPresent()) {
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
