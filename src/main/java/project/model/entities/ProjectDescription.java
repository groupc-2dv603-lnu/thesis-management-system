package project.model.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "projectDescriptions")
public class ProjectDescription {
	@Id
	private String id;
	private String userId;
	private String submissionId;
	private String grade;
	private String deadLine;
	
	
	
	public ProjectDescription(String userId, String submissionId, String grade, String deadLine) {
		this.userId = userId;
		this.submissionId = submissionId;
		this.grade = grade;
		this.deadLine = deadLine;
	}
}
