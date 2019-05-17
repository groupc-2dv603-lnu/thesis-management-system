package project.model.entities;

import lombok.Data;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Data
@Document(collection = "dataFiles")
public class DemoFile {

    @Id
    private String id;
    private String submissionId;
    private Binary fileData;

    public DemoFile () {}

    public DemoFile(String submissionId, String filePath) {
        this.submissionId = submissionId;

        try {
            byte[] bytes = Files.readAllBytes(new File(filePath).toPath());
            this.fileData = new Binary(bytes);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
