package project.model.entities;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import lombok.Data;

import java.util.Date;

import project.model.enums.SubmissionType;


@Data
@Document(collection = "submissions")
public class Submission {

    @Id
    private String id;
    @CreatedDate
    private Date submissionDate;
    private String userId;
    private SubmissionType submissionType;
    private String fileUrl;
    private String filename;

    public Submission() {}

}