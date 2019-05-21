package project.model.entities;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "initialReports")
public class InitialReport {
	@Id
	private String id;
	private String userId;
	private String submissionId;
	private ArrayList<String> bids;
	private ArrayList<String> assignedReaders;
	private ArrayList<String> assignedOpponents;
	private ArrayList<String> feedBackIds;
	private String grade;
	private String deadLine;
	
	
	
	public InitialReport(String userId, String submissionId, ArrayList<String> bids, ArrayList<String> assignedReaders, ArrayList<String> assignedOpponents, 
			ArrayList<String> feedBackIds, String grade, String deadLine) {
		this.userId = userId;
		this.submissionId = submissionId;
		this.feedBackIds = feedBackIds;
		this.bids = bids;
		this.assignedReaders= assignedReaders;
		this.assignedOpponents = assignedOpponents;
		this.grade = grade;
		this.deadLine = deadLine;
	}
}

