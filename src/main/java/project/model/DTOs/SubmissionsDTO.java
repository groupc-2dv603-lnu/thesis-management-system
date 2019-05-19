package project.model.DTOs;

import lombok.Data;
import project.model.entities.ProjectPlan;

import java.util.List;

@Data
public class SubmissionsDTO {
    List<ProjectPlan> projectPlans;

    public SubmissionsDTO(List<ProjectPlan> projectPlans) {
        this.projectPlans = projectPlans;
    }
}
