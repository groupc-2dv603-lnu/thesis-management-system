package project.model.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "submissions")
public class Submission {
    @Id
    private String id;
    private String userID;
}
