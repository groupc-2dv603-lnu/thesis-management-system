package project.model.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import lombok.Data;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import org.bson.types.Binary;


@Data
@Document(collection = "submissions")
public class Submission {

    @Id
    private String id;
    private String studentId;
    private SubmissionStatus submissionStatus;
    private String fileName;
    public Binary file;
    private String filePath;                //Used for creating binary file and will then be set to null and not stored in mongodb



    public Submission() {}

    public Submission(String title, String filePath) {
        this.fileName = title;
        this.filePath = filePath;


        //TODO: might be redundant. Remove?
        try {
            byte[] bytes = Files.readAllBytes(new File(filePath).toPath());
            this.file = new Binary(bytes);

        } catch (IOException e) {
            e.printStackTrace();
        }
        this.filePath = null;
    }

    public void setFile(String filePath) {
        System.out.println("YAO");
        try {
            byte[] bytes = Files.readAllBytes(new File(filePath).toPath());
            this.file = new Binary(bytes);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}