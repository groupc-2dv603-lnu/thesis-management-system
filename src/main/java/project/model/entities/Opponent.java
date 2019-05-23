package project.model.entities;


import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "opponents")
public class Opponent {
	private String userId;
	private String initialReportId;
	
	
	public Opponent(String userId, String initialReportId) {

		this.userId = userId;
		this.initialReportId = initialReportId;
	}
}
