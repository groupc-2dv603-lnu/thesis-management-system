package project.model.entities;

import lombok.Data;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;

@Data
@Document(collection = "dataFiles")
public class DataFile {

    @Id
    private String id;
    private Binary binaryData;

    public DataFile() {}

    public DataFile(String filePath) throws FileNotFoundException{

        File newFile = new File(filePath);
        if(!newFile.exists()){
            throw new FileNotFoundException("File not found: " + filePath);         //TODO: maybe move to subController?
        }

        try {
            byte[] bytes = Files.readAllBytes(new File(filePath).toPath());
            this.binaryData = new Binary(bytes);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public DataFile(byte[] bytes){
        this.binaryData = new Binary(bytes);
    }

}
