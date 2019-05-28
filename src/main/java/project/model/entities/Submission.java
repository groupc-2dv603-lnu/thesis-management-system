package project.model.entities;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import lombok.Data;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Date;

import org.bson.types.Binary;


@Data
@Document(collection = "submissions")
public class Submission {

    @Id
    private String id;
    @CreatedDate
    private Date submissionDate;
    private String userId;
    private SubmissionStatus submissionStatus;
    private String fileUrl;         
//    private String fileName;        //TODO: redundant?

//    private Binary file;
    private String filePath;                //Used for creating binary file and will then be set to null and not stored in mongodb



    public Submission() {}

    public Submission(String filePath) { //TODO: remove constructor?
//        this.fileName = fileName;
        this.filePath = filePath;


        //TODO: might be redundant. Remove?
//        try {
//            byte[] bytes = Files.readAllBytes(new File(filePath).toPath());
//            this.file = new Binary(bytes);
//
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        this.filePath = null;
    }

//
}