package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.model.entities.ProjectPlan;
import project.model.DTOs.SubmissionsDTO;
import project.model.repositories.ProjectPlanRepository;
import project.model.repositories.StudentRepository;
import project.model.repositories.SupervisorRepository;

import java.util.List;

@RestController
public class CoordinatorController {
    @Autowired
    private SupervisorRepository supervisorRepository;

    @Autowired
    private ProjectPlanRepository projectPlanRepository;

    @Autowired
    private StudentRepository studentRepository;

    @PutMapping("/coordinator/updateProjectPlan")
    void updateProjectPlan(@RequestParam String projectPlanId,
                           @RequestParam String grade,
                           @RequestParam String deadLine) {
        ProjectPlan plan = projectPlanRepository.findFirstById(projectPlanId);

        if (deadLine != null) {
            plan.setDeadLine(deadLine);
        }

        if (grade != null) {
            plan.setGrade(grade);
        }

        projectPlanRepository.save(plan);
    }

    @GetMapping("/coordinator/getAllSubmissionsByUserID")
    SubmissionsDTO getAllSubmisssionsByUserID(@RequestParam String userId) {
        List<ProjectPlan> planList = projectPlanRepository.findAllByStudentId(userId);

        return new SubmissionsDTO(planList);
    }
}
