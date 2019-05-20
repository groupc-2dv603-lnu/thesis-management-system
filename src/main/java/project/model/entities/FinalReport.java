package project.model.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "finalReports")
public class FinalReport {
	@Id
	private String id;
	private String studentId;
	private String submissionId;
	private String grade;
	private String deadLine;
	private String submissionDate;
	
	
	
	public FinalReport(String studentId, String submissionId, String grade, String deadLine, String submissionDate) {
		this.studentId = studentId;
		this.submissionId = submissionId;
		this.grade = grade;
		this.deadLine = deadLine;
		this.submissionDate = submissionDate;
	}
}
