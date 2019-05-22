package project.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.MediaType;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import project.model.entities.DemoFile;
import project.model.entities.Submission;
import project.model.repositories.DemoFileRepository;
import project.model.repositories.SubmissionRepository;

@RestController
public class SubmissionController {

    private final SubmissionRepository subRepository;

    public SubmissionController(SubmissionRepository subRepository){
        this.subRepository = subRepository;
    }



    @GetMapping(value = "/submissions/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    Resource<Submission> one(@PathVariable String id) {
        Submission submission = subRepository.findFirstById(id);

        try {
            //TODO: new File below should not be static
            FileCopyUtils.copy(submission.getFile().getData(), new File("C:\\Users\\Timme\\Documents\\Skola\\2DV603 - Software Design\\Assignment4_Project\\test.pdf"));
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new Resource<>(submission,
                linkTo(methodOn(SubmissionController.class).one(id)).withSelfRel(),
                linkTo(methodOn(SubmissionController.class).all()).withRel("submissions"));

    }

    @GetMapping(value = "/submissions", produces = MediaType.APPLICATION_JSON_VALUE)
    Resources<Resource<Submission>> all() {
        List<Resource<Submission>> submissions = subRepository.findAll().stream()
                .map(submission -> new Resource<>(submission,
                        linkTo(methodOn(SubmissionController.class).one(submission.getId())).withSelfRel(),
                        linkTo(methodOn(SubmissionController.class).all()).withRel("submissions")))
                .collect(Collectors.toList());

        return new Resources<>(submissions,
                linkTo(methodOn(SubmissionController.class).all()).withSelfRel());
    }


    /* Example POST through curl:
        $curl -X POST localhost:8080/submissions -H "Content-type:application/json" -d "{\"title\": \"FILENAME\", \"filePath\": \"C:\\Users\\USERNAME\\Desktop\\FILE.PDF\"}"
     */
    @PostMapping(value = "/submissions", produces = MediaType.APPLICATION_JSON_VALUE)        //TODO: should check if file exist
    String newSubmission(@RequestBody Submission newSubmission) {
/*
//        System.out.println("FILEPATH: " + newSubmission.getFilePath());         //TODO:remove
        try {
            newSubmission.setFile(newSubmission.getFilePath());       //TODO: uncomment and remove line below
        } catch (FileNotFoundException e) {
            return e.getMessage();
        }
//        newSubmission.setFile("C:\\Users\\Timme\\Downloads\\04 Re-engineering Legacy Software - Reading 1.pdf");  //TODO: hardcoded to test larger files. remove
        newSubmission.setFilePath(null);
//        System.out.println("NAME: " + newSubmission.getFileName());

//        newSubmission.setFileUrl("/submissions/" + newSubmission.getId());

        subRepository.save(newSubmission);
        newSubmission.setFileUrl("/submissions/" + newSubmission.getId());      //TODO: this line and line below should be implemented better.
        subRepository.save(newSubmission);
        OLD CODE ABOVE
        */

        Files.copy(newSubmission.getFilePath(), "../resources/uploads/" + newSubmission.getId() );
        

        return "Successfully uploaded file: " + newSubmission.getId();
    }



    @DeleteMapping("/submissions/{id}")
    String deleteSubmission(@PathVariable String id) {
        subRepository.deleteById(id);

        return "File deleted";
    }

}
