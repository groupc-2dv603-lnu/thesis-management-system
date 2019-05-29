package project.model.entities;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

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
	
	
	public Feedback(String userId, String documentId , String text) {
		this.userId = userId;
		this.documentId = documentId;
		this.text = text;
		
	}
}
