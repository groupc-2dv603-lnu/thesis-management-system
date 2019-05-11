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
    private String title;
    public File filetest /*= new File("C:\\Users\\Timme\\Desktop\\512byte.txt")*/;
    public Binary file;



    public Submission() {}

    public Submission(String title, String filePath) {
        this.title = title;

        try {
            byte[] bytes = Files.readAllBytes(new File(filePath).toPath());
            this.file = new Binary(bytes);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void setFile(String filePath) {
        System.out.println("YAO");
        try {
            byte[] bytes = Files.readAllBytes(new File(filePath).toPath());
            this.file = new Binary(bytes);
            System.out.println(this.file.length());

        } catch (IOException e) {
            System.out.println("FUCK");
            e.printStackTrace();
        }
    }
}