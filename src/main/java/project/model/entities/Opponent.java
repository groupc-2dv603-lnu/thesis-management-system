package project.model.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@Document(collection = "opponents")
public class Opponent {
	@NotNull
	@Id
	private String id;
	@NotNull
	private String userId;
	@NotNull
	private String initialReportId;
	
	
	public Opponent(String userId, String initialReportId) {

		this.userId = userId;
		this.initialReportId = initialReportId;
	}
}
