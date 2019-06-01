package project.model.entities;


import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import project.model.enums.Role;
@Data
@Document(collection = "feedback")
public class Feedback {
	@Id
	private String id;
	private String userId;
	private String documentId;
	private String text;
	private Role role;
	private String submittedDate;
	
	
	public Feedback(String userId, String documentId , String text, Role role, String string) {
		this.userId = userId;
		this.documentId = documentId;
		this.text = text;
		this.role = role;
		this.submittedDate = string;
		
	}
}
