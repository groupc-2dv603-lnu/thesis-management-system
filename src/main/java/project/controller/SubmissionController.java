package project.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.MediaType;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import project.model.entities.DataFile;
import project.model.entities.Submission;
import project.model.repositories.DataFileRepository;
import project.model.repositories.SubmissionRepository;

import javax.servlet.http.HttpServletResponse;

@RestController
public class SubmissionController {

    private final SubmissionRepository subRepository;
    private final DataFileRepository dataFileRepository;

    public SubmissionController(SubmissionRepository subRepository, DataFileRepository dataFileRepository){
        this.subRepository = subRepository;
        this.dataFileRepository = dataFileRepository;
    }


    /* Get specific submission based on id */
    @GetMapping(value = "/submissions/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    Resource<Submission> getSubmission(@PathVariable String id) {
        Submission submission = subRepository.findFirstById(id);

        return new Resource<>(submission,
                linkTo(methodOn(SubmissionController.class).getSubmission(id)).withSelfRel(),
                linkTo(methodOn(SubmissionController.class).getAllSubmissions()).withRel("submissions"));

    }

    @GetMapping(value = "/submissions/datafiles/{subId}+{dataFileId}")
    void downloadFile(@PathVariable String subId, @PathVariable String dataFileId, HttpServletResponse response){
        DataFile dataFile = dataFileRepository.findFirstById(dataFileId);
        String filename = subRepository.findFirstById(subId).getFilename();

        response.setContentType("application/octet-stream");
        response.addHeader("Content-Disposition", "attachment; filename="+ filename);

        try {
            FileCopyUtils.copy(dataFile.getBinaryData().getData(), response.getOutputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /* Get all submissions */
    @GetMapping(value = "/submissions", produces = MediaType.APPLICATION_JSON_VALUE)
    Resources<Resource<Submission>> getAllSubmissions() {
        List<Resource<Submission>> submissions = subRepository.findAll().stream()
                .map(submission -> new Resource<>(submission,
                        linkTo(methodOn(SubmissionController.class).getSubmission(submission.getId())).withSelfRel(),
                        linkTo(methodOn(SubmissionController.class).getAllSubmissions()).withRel("submissions")))
                .collect(Collectors.toList());

        return new Resources<>(submissions,
                linkTo(methodOn(SubmissionController.class).getAllSubmissions()).withSelfRel());
    }

    @DeleteMapping("/submissions/{id}")
    String deleteSubmission(@PathVariable String id) {
        Submission submission = subRepository.findFirstById(id);
        String[] parts = submission.getFileUrl().split("\\+");
        String fileId = parts[1];                                       //get id out of string "/submissions/datafiles/{subId}+{dataFileId}"

        dataFileRepository.delete(dataFileRepository.findFirstById(fileId));
        subRepository.delete(subRepository.findFirstById(id));

        return "\nSubmission deleted: " + submission.getId()
                + "\nDatafile deleted: " + fileId + "\n";
    }






    /* DEVELOP METHODS TO CLEAR ENTIRE SUBMISSION AND DATAFILES COLLECTION INSTANTLY */
//    @DeleteMapping("/submissions")
//    String deleteAllSubmissions() {
//
//        dataFileRepository.deleteAll();
//        subRepository.deleteAll();
//
//        return "All documents in collection \"submissions\" and \"dataFiles\" deleted.";
//    }

}
