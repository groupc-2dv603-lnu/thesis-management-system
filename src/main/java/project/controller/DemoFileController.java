package project.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import project.model.entities.DataFile;
import project.model.repositories.DataFileRepository;

@RestController
public class DemoFileController {

    private final DataFileRepository dataFileRepository;

    public DemoFileController(DataFileRepository dataFileRepository) {
        this.dataFileRepository = dataFileRepository;
    }

    @PostMapping("/dataFiles")
    String uploadFile(DataFile dataFile){
        dataFileRepository.save(dataFile);

        return "File uploaded";
    }
}
