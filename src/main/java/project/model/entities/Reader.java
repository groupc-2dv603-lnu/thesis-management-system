package project.model.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "readers")
public class Reader {
	@Id
	private String id;
	private String userId;
	private String initialReportId;
	private String finalReportId;
	
	
	public Reader(String userId, String initialReportId, String finalReportId) {

		this.userId = userId;
		this.initialReportId = initialReportId;
		this.finalReportId = finalReportId;
	}
}
