package project.model.entities;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import lombok.Data;

import java.util.Date;

import project.model.enums.SubmissionType;

import javax.validation.constraints.NotNull;


@Data
@Document(collection = "submissions")
public class Submission {

    @NotNull
    @Id
    private String id;
    @NotNull
    @CreatedDate
    private Date submissionDate;
    @NotNull
    private String userId;
    @NotNull
    private SubmissionType submissionType;
    @NotNull
    private String fileUrl;
    @NotNull
    private String filename;

    public Submission() {}

}