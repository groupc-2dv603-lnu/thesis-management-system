package project.model.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import project.model.enums.Grade;

@Data
@Document(collection = "projectDescriptions")
public class ProjectDescription {
	@Id
	private String id;
	private String userId;
	private String submissionId;
	private Grade grade;
	private String deadLine;
	
	
	
	public ProjectDescription(String userId, String submissionId, Grade grade, String deadLine) {
		this.userId = userId;
		this.submissionId = submissionId;
		this.grade = grade;
		this.deadLine = deadLine;
	}
}
