package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resource;
import org.springframework.web.bind.annotation.*;
import project.model.entities.ProjectPlan;
import project.model.entities.Student;
import project.model.repositories.ProjectPlanRepository;
import project.model.repositories.StudentRepository;
import project.model.repositories.SupervisorRepository;

@RestController
public class CoordinatorController {
    @Autowired
    private SupervisorRepository supervisorRepository;

    @Autowired
    private ProjectPlanRepository projectPlanRepository;

    @Autowired
    private StudentRepository studentRepository;

    @PutMapping("/coordinator/updateProjectPlan")
    void updateProjectPlan(@RequestParam String projectPlanID,
                           @RequestParam String grade,
                           @RequestParam String deadLine) {
        ProjectPlan plan = projectPlanRepository.findFirstById(projectPlanID);

        if (deadLine != null) {
            plan.setDeadLine(deadLine);
        }

        if (grade != null) {
            plan.setGrade(grade);
        }

        projectPlanRepository.save(plan);
    }

}
