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
	private String pendingSupervisor;


	public Student(String userId, String assignedSupervisorId, String pendingSupervisor) {
		this.userId = userId;
		this.assignedSupervisorId = assignedSupervisorId;
		this.pendingSupervisor = pendingSupervisor;


	}

	public void setSupervisor(Boolean state)
	{
		if(state) {this.pendingSupervisor = "accepted";}
		else{this.pendingSupervisor = "denied";}
	}
}
