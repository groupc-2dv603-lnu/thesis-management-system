package project.model.entities;


import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import project.model.enums.Role;

import javax.validation.constraints.NotNull;

@Data
@Document(collection = "feedback")
public class Feedback {
	@NotNull
	@Id
	private String id;
	@NotNull
	private String userId;
	@NotNull
	private String documentId;
	@NotNull
	private String text;
	@NotNull
	private Role role;
	@NotNull
	private Date submittedDate;
	
	
	public Feedback(String userId, String documentId , String text, Role role, Date submittedDate) {
		this.userId = userId;
		this.documentId = documentId;
		this.text = text;
		this.role = role;
		this.submittedDate = submittedDate;
		
	}
}
