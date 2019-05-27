package project.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import project.model.entities.DemoFile;
import project.model.repositories.DemoFileRepository;

@RestController
public class DemoFileController {

    private final DemoFileRepository demoFileRepository;

    public DemoFileController(DemoFileRepository demoFileRepository) {
        this.demoFileRepository = demoFileRepository;
    }

    @PostMapping("/dataFiles")
    String uploadFile(DemoFile demoFile){
        demoFileRepository.save(demoFile);

        return "File uploaded";
    }
}
