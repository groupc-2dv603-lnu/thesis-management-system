package project.model.entities;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "supervisors")
public class Supervisor {
	@Id
	private String id;
	private String userId;
	private String availableForSupervisor;
	private ArrayList<String> studentsId;
	
	
	public Supervisor(String userId, String availableForSupervisor, ArrayList<String> studentsId) {
		this.userId = userId;
		this.availableForSupervisor = availableForSupervisor;
		this.studentsId = studentsId;
		
	}
}
