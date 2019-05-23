package project.model.entities;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "students")
public class Student {
	@Id
	private String id;
	private String userId;
	private String assignedSupervisorId;
	
	
	public Student(String userId, String assignedSupervisorId) {
		this.userId = userId;
		this.assignedSupervisorId = assignedSupervisorId;

		
	}
}
