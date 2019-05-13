package project.model.entities;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "students")
public class Student {
	@Id
	private String id;
	private String UserId;
	private String AssignedSupervisorId;
	
	
	public Student(String UserId, String AssignedSupervisorId) {
		this.UserId = UserId;
		this.AssignedSupervisorId = AssignedSupervisorId;

		
	}
}
