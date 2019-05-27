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
    private String fileUrl;         //TODO: do something with this
//    private String fileName;        //TODO: redundant?

//    private Binary file;
    private String filePath;                //Used for creating binary file and will then be set to null and not stored in mongodb



    public Submission() {}

    public Submission(String filePath) {
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

    public void setFile(String filePath) throws FileNotFoundException {
        System.out.println("YAO");
        File newFile = new File(filePath);
        if(!newFile.exists()){
            throw new FileNotFoundException("File not found: " + filePath);
        }


//        try {
//            byte[] bytes = Files.readAllBytes(newFile.toPath());
//            this.file = new Binary(bytes);
//
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
    }
}