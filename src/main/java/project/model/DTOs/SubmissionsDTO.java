package project.model.DTOs;

import lombok.Data;
import project.model.entities.FinalReport;
import project.model.entities.InitialReport;
import project.model.entities.ProjectDescription;
import project.model.entities.ProjectPlan;

import java.util.List;

@Data
public class SubmissionsDTO {
    List<ProjectPlan> projectPlans;
    List<ProjectDescription> projectDescriptions;
    List<FinalReport> finalReports;
    List<InitialReport> initialReports;


    public SubmissionsDTO(List<ProjectPlan> projectPlans,
                          List<ProjectDescription> projectDescriptions,
                          List<FinalReport> finalReports,
                          List<InitialReport> initialReports)  {
        this.projectPlans = projectPlans;
        this.projectDescriptions = projectDescriptions;
        this.finalReports = finalReports;
        this.initialReports = initialReports;
    }
}
