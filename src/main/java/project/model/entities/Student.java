package project.model.entities;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import project.model.enums.PendingSupervisor;

import javax.validation.constraints.NotNull;

@Data
@Document(collection = "students")
public class Student {
	@NotNull
	@Id
	private String id;
	@NotNull
	private String userId;
	@NotNull
	private String assignedSupervisorId;
	@NotNull
	private String pendingSupervisor;
	
	
	public Student(String userId, String assignedSupervisorId, String pendingSupervisor) {
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
