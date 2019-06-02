package project.model.entities;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import project.model.enums.Grade;

import javax.validation.constraints.NotNull;

@Data
@Document(collection = "initialReports")
public class InitialReport {
	@NotNull
	@Id
	private String id;
	@NotNull
	private String userId;
	@NotNull
	private String submissionId;
	@NotNull
	private ArrayList<String> bids;
	@NotNull
	private ArrayList<String> assignedReaders;
	@NotNull
	private ArrayList<String> assignedOpponents;
	@NotNull
	private ArrayList<String> feedBackIds;
	@NotNull
	private Grade grade;
	@NotNull
	private String deadLine;

	private String supervisorId;
	
	
	
	public InitialReport(String userId, String submissionId, ArrayList<String> bids, ArrayList<String> assignedReaders, ArrayList<String> assignedOpponents, 
			ArrayList<String> feedBackIds, Grade grade, String deadLine, String supervisorId) {
		this.userId = userId;
		this.submissionId = submissionId;
		this.feedBackIds = feedBackIds;
		this.bids = bids;
		this.assignedReaders= assignedReaders;
		this.assignedOpponents = assignedOpponents;
		this.grade = grade;
		this.deadLine = deadLine;
		this.supervisorId = supervisorId;
	}

	public int getOpponentsSize()
	{
		return assignedOpponents.size();
	}

	public int getReadersSize()
	{
		return assignedReaders.size();
	}


}

