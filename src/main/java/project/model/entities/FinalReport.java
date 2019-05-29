package project.model.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Document(collection = "finalReports")
public class FinalReport {
	@NotNull
	@Id
	private String id;
	@NotNull
	private String userId;
	@NotNull
	private String submissionId;
	@NotNull
	private String grade;
	@NotNull
	private String deadLine;
	@NotNull
	private List<Opponent> opponents;
	@NotNull
	private List<Reader> readers;
	
	
	
	public FinalReport(String userId, String submissionId, String grade, String deadLine) {
		this.userId = userId;
		this.submissionId = submissionId;
		this.grade = grade;
		this.deadLine = deadLine;
	}
}
