package project.model.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import project.model.enums.GradeAF;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.ArrayList;

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
	private GradeAF grade;
	private String deadLine;
	private ArrayList<String> feedBackIds;
	@NotNull
	private List<Opponent> opponents;
	@NotNull
	private List<Reader> readers;
	
	
	
	public FinalReport(String userId, String submissionId, GradeAF grade, String deadLine, ArrayList<String> feedBackIds) {
		this.userId = userId;
		this.submissionId = submissionId;
		this.grade = grade;
		this.deadLine = deadLine;
		this.feedBackIds = feedBackIds;
	}
}
