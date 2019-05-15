package project.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import project.model.entities.Submission;
import project.model.repositories.SubmissionRepository;

@RestController
public class SubmissionController {

    private final SubmissionRepository subRepository;

    public SubmissionController(SubmissionRepository subRepository){
        this.subRepository = subRepository;
    }



    @GetMapping("/submissions/{id}")
    Resource<Submission> one(@PathVariable String id) {
        Submission submission = subRepository.findFirstById(id);

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
//        System.out.println("FILEPATH: " + newSubmission.getFilePath());         //TODO:remove
//        newSubmission.setFile(newSubmission.getFilePath());       //TODO: uncomment and remove line below
        newSubmission.setFile("C:\\Users\\Timme\\Downloads\\02 Architecting and Designing Software - Handouts (1).pdf");  //TODO: hardcoded to test larger files. remove
        newSubmission.setFilePath(null);

        subRepository.save(newSubmission);
        return "Successfully uploaded file: " + newSubmission.getFileName();
    }

    @DeleteMapping("/submissions/{id}")
    String deleteSubmission(@PathVariable String id) {
        subRepository.deleteById(id);

        return "File deleted";
    }

}
