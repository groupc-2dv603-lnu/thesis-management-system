package project.model.entities;

import java.util.List;

public class SubmissionsDTO {
    List<ProjectPlan> projectPlans;

    public SubmissionsDTO(List<ProjectPlan> projectPlans) {
        this.projectPlans = projectPlans;
    }
}
