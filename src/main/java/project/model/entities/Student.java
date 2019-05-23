package project.model.entities;




import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;


@Document(collection = "students")
public class Student {

	private String UserId;
	private String AssignedSupervisorId;
	
	
	public Student(String UserId, String AssignedSupervisorId) {
		this.UserId = UserId;
		this.AssignedSupervisorId = AssignedSupervisorId;

		
	}
}
