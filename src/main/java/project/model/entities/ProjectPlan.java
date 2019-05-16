package project.model.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "projectPlans")
public class ProjectPlan {
	@Id
	private String id;
	private String studentId;
	private String submissionId;
	private String feedBackId;
	private String grade;
	private String deadLine;
	private String submissionDate;
	
	
	
	public ProjectPlan(String studentId, String submissionId, String feedBackId, String grade, String deadLine, String submissionDate) {
		this.studentId = studentId;
		this.submissionId = submissionId;
		this.feedBackId = feedBackId;
		this.grade = grade;
		this.deadLine = deadLine;
		this.submissionDate = submissionDate;
	}
}

