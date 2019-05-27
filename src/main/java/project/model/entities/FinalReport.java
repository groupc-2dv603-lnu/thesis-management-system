package project.model.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "finalReports")
public class FinalReport {
	@Id
	private String id;
	private String userId;
	private String submissionId;
	private String grade;
	private String deadLine;
	
	
	
	public FinalReport(String userId, String submissionId, String grade, String deadLine) {
		this.userId = userId;
		this.submissionId = submissionId;
		this.grade = grade;
		this.deadLine = deadLine;
	}
}
