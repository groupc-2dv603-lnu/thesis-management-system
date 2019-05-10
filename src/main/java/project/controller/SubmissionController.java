package project.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.util.List;
import java.util.stream.Collectors;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;
import project.model.DemoDocument;
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

    @GetMapping("/submissions")
    Resources<Resource<Submission>> all() {
        List<Resource<Submission>> submissions = subRepository.findAll().stream()
                .map(employee -> new Resource<>(employee,
                        linkTo(methodOn(SubmissionController.class).one(employee.getId())).withSelfRel(),
                        linkTo(methodOn(SubmissionController.class).all()).withRel("submissions")))
                .collect(Collectors.toList());

        return new Resources<>(submissions,
                linkTo(methodOn(SubmissionController.class).all()).withSelfRel());
    }

//    @PostMapping("/submissions")
//    Submission newSubmission(@RequestBody Submission newSubmission) {
//        return subRepository.save(newSubmission);
//    }


    //Test
    @PostMapping("/submissions")
    public String singleFileUpload(@RequestParam("file") MultipartFile multipart, @RequestParam("email") String email) {
        try {
            DemoDocument demoDocument = new DemoDocument();
            demoDocument.setEmailId(email);
            demoDocument.setDocType("pictures");
            demoDocument.setFile(new Binary(BsonBinarySubType.BINARY, multipart.getBytes()));
            mongoTemplate.insert(demoDocument);
            System.out.println(demoDocument);
        } catch (Exception e) {
            e.printStackTrace();
            return "failure";
        }
        return "success";
    }
}
