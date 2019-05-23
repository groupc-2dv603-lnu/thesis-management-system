package project.model.entities;

import java.util.ArrayList;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "supervisors")
public class Supervisor {
	private String userId;
	private Boolean availableForSupervisor;
	private ArrayList<String> assignedStudents;
	private ArrayList<String> awaitingResponse;
	
	
	public Supervisor(String userId, Boolean availableForSupervisor, ArrayList<String> assignedStudents,ArrayList<String> awaitingResponse) {
		this.userId = userId;
		this.availableForSupervisor = availableForSupervisor;
		this.assignedStudents = assignedStudents;
		this.awaitingResponse = awaitingResponse;
		
	}
}
