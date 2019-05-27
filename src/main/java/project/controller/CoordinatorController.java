package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.model.entities.*;
import project.model.DTOs.SubmissionsDTO;
import project.model.enums.Grade;
import project.model.repositories.*;

import java.util.List;

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


    @PutMapping(value = "/coordinator/updateProjectPlan", consumes = {"application/json"})
    void updateProjectPlan(@RequestBody ProjectPlan projectPlan) {
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
        if (initialReportRepository.findById(finalReport.getId()).isPresent()) {
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
    List<FinalReport> getAllReports() {
        return finalReportRepository.findAll();
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
}
