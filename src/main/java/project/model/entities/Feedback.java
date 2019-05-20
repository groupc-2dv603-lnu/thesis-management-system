package project.model.entities;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
@Data
@Document(collection = "feedback")
public class Feedback {
	@Id
	private String id;
	private String userId;
	private String submissionId;
	private String text;
	
	
	public Feedback(String userId, String submissionId, String text) {
		this.userId = userId;
		this.submissionId = submissionId;
		this.text = text;
		
	}
}
