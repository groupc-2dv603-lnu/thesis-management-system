package project.model.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import project.model.enums.Grade;

import java.util.List;

@Data
@Document(collection = "finalReports")
public class FinalReport {
	@Id
	private String id;
	private String userId;
	private String submissionId;
	private Grade grade;
	private String deadLine;
	private List<Opponent> opponents;
	private List<Reader> readers;
	
	
	
	public FinalReport(String userId, String submissionId, Grade grade, String deadLine) {
		this.userId = userId;
		this.submissionId = submissionId;
		this.grade = grade;
		this.deadLine = deadLine;
	}
}
