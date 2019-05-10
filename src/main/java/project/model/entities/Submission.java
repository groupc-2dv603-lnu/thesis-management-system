package project.model.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import lombok.Data;

@Data
@Document(collection = "submissions")
public class Submission {

    @Id
    private String id;
    private String title;

    public Submission() {}

    public Submission(String title) {
        this.title = title;
    }
}