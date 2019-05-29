package project.model.entities;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import project.model.enums.PendingSupervisor;

@Data
@Document(collection = "students")
public class Student {
	@Id
	private String id;
	private String userId;
	private String assignedSupervisorId;
	private PendingSupervisor pendingSupervisor;


	public Student(String userId, String assignedSupervisorId, PendingSupervisor pendingSupervisor) {
		this.userId = userId;
		this.assignedSupervisorId = assignedSupervisorId;
		this.pendingSupervisor = pendingSupervisor;


	}

	public void setSupervisor(Boolean state)
	{
		if(state) {this.pendingSupervisor = PendingSupervisor.ACCEPTED;}
		else{this.pendingSupervisor = PendingSupervisor.DENIED;}
	}
}
