package project.model.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@Document(collection = "readers")
public class Reader {
	@NotNull
	@Id
	private String id;
	@NotNull
	private String userId;
	@NotNull
	private String initialReportId;
	@NotNull
	private String finalReportId;
	
	
	public Reader(String userId, String initialReportId, String finalReportId) {

		this.userId = userId;
		this.initialReportId = initialReportId;
		this.finalReportId = finalReportId;
	}
}
