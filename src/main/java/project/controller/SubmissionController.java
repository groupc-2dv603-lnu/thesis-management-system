package project.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.MediaType;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import project.model.entities.DemoFile;
import project.model.entities.Submission;
import project.model.repositories.DemoFileRepository;
import project.model.repositories.SubmissionRepository;

import javax.servlet.http.HttpServletResponse;

@RestController
public class SubmissionController {

    private final SubmissionRepository subRepository;
    private final DemoFileRepository demoFileRepository;

    public SubmissionController(SubmissionRepository subRepository, DemoFileRepository demoFileRepository){
        this.subRepository = subRepository;
        this.demoFileRepository = demoFileRepository;
    }



    @GetMapping(value = "/submissions/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    Resource<Submission> getSubmission(@PathVariable String id) {
        Submission submission = subRepository.findFirstById(id);

        //TODO: OLD CODE BELOW
//        try {
//            //TODO: new File below should not be static
//            FileCopyUtils.copy(submission.getFile().getData(), new File("C:\\Users\\Timme\\Documents\\Skola\\2DV603 - Software Design\\Assignment4_Project\\test.pdf"));
//        } catch (IOException e) {
//            e.printStackTrace();
//        }

        //Code to save file in "uploads" folder
//        try {
//            /*Path bytes =*/ Files.copy(
//                    new File(".\\src\\main\\resources\\uploads\\" + submission.getId() + ".pdf").toPath(),
//                    new File("C:\\Users\\Timme\\Documents\\Skola\\2DV603 - Software Design\\Assignment4_Project\\test.pdf").toPath(), //Destination dir
//                    StandardCopyOption.REPLACE_EXISTING,
//                    StandardCopyOption.COPY_ATTRIBUTES,
//                    LinkOption.NOFOLLOW_LINKS);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }

        return new Resource<>(submission,
                linkTo(methodOn(SubmissionController.class).getSubmission(id)).withSelfRel(),
                linkTo(methodOn(SubmissionController.class).all()).withRel("submissions"));

    }

    @GetMapping(value = "/submissions/datafiles/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    /*Resource<DemoFile>*/void downloadFile(@PathVariable String id, HttpServletResponse response){
        DemoFile demoFile = demoFileRepository.findFirstById(id);

//        try {
//            //TODO: new File below should not be static
//            FileCopyUtils.copy(demoFile.getBinaryData().getData(), new File("C:\\Users\\Timme\\Documents\\Skola\\2DV603 - Software Design\\Assignment4_Project\\test.pdf"));
//        } catch (IOException e) {
//            e.printStackTrace();
//        }

        response.setContentType("application/octet-stream");
        response.addHeader("Content-Disposition", "attachment; filename="+ "DownloadTest.pdf"); //TODO: maybe add filename to submissions
        try {
            FileCopyUtils.copy(demoFile.getBinaryData().getData(), response.getOutputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }

//        return new Resource<>(demoFile,
//                linkTo(methodOn(SubmissionController.class).one(id)).withSelfRel(),
//                linkTo(methodOn(SubmissionController.class).all()).withRel("dataFiles"));
    }

    @GetMapping(value = "/submissions", produces = MediaType.APPLICATION_JSON_VALUE)
    Resources<Resource<Submission>> all() {
        List<Resource<Submission>> submissions = subRepository.findAll().stream()
                .map(submission -> new Resource<>(submission,
                        linkTo(methodOn(SubmissionController.class).getSubmission(submission.getId())).withSelfRel(),
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
//        try {
//            newSubmission.setFile(newSubmission.getFilePath());       //TODO: uncomment and remove line below
//        } catch (FileNotFoundException e) {
//            return e.getMessage();
//        }
        DemoFile df = null;
        try {
            df = new DemoFile(newSubmission.getFilePath());
        } catch (FileNotFoundException e) {
            return e.getMessage();
        }
        demoFileRepository.save(df);
//        newSubmission.setFile("C:\\Users\\Timme\\Downloads\\04 Re-engineering Legacy Software - Reading 1.pdf");  //TODO: hardcoded to test larger files. remove
        newSubmission.setFileUrl("/submissions/datafiles/" + df.getId());
        newSubmission.setFilePath(null);
        subRepository.save(newSubmission);
//        System.out.println("NAME: " + newSubmission.getFileName());

//        newSubmission.setFileUrl("/submissions/" + newSubmission.getId());

//        subRepository.save(newSubmission);
//        newSubmission.setFileUrl("/submissions/" + newSubmission.getId());      //TODO: this line and line below should be implemented better.
//        subRepository.save(newSubmission);

        return "Successfully uploaded submission with ID: " + newSubmission.getId() + " and datafile ID: " + df.getId();

//        OLD CODE ABOVE


/*
        subRepository.save(newSubmission);
        File src = new File(newSubmission.getFilePath());
        try {
            Path bytes = Files.copy(
                    new File(newSubmission.getFilePath()).toPath(), //src folder
                    new File(".\\src\\main\\resources\\uploads\\" + newSubmission.getId() + ".pdf").toPath(), //TODO:uploads folder
                    StandardCopyOption.REPLACE_EXISTING,
                    StandardCopyOption.COPY_ATTRIBUTES,
                    LinkOption.NOFOLLOW_LINKS);
        } catch (IOException e) {
            System.out.println("AIDS");
            e.printStackTrace();
        }

        Submission updated = subRepository.findFirstById(newSubmission.getId());
        updated.setFileUrl("/submissions/" + updated.getId());
        updated.setFilePath(null);
        subRepository.save(updated);

        return "Successfully uploaded file: \"" + src.getName() + "\" with ID: " + updated.getId() + "\n";

 */
    }



    @DeleteMapping("/submissions/{id}")
    String deleteSubmission(@PathVariable String id) {
//        File storedFile = new File(".\\src\\main\\resources\\uploads\\" + id + ".pdf");
//        subRepository.deleteById(id);
        Submission submission = subRepository.findFirstById(id);
        String[] parts = submission.getFileUrl().split("/");
        String fileId = parts[3];                                       //get id out of string "/submissions/datafiles/id"

        demoFileRepository.delete(demoFileRepository.findFirstById(fileId));
        subRepository.delete(subRepository.findFirstById(id));

//        return "File deleted: " + storedFile.delete();
        return "Submission deleted: " + submission.getId()
                + "\nDatafile deleted: " + fileId;
    }






    /* DEVELOP METHODS TO CLEAR ENTIRE SUBMISSION COLLECTION INSTANTLY */
    @DeleteMapping("/submissions")
    String deleteAllSubmissions() {

        demoFileRepository.deleteAll();
        subRepository.deleteAll();
//        List<Submission> submissions = subRepository.findAll();
//        for (Submission sub : submissions){
//            deleteSubmissionById(sub.getId());
//        }

        return "All documents in collection \"submissions\" and \"dataFiles\" deleted.";
    }

//    void deleteSubmissionById(String id) {
//        File storedFile = new File(".\\src\\main\\resources\\uploads\\" + id + ".pdf");
//
//        subRepository.deleteById(id);
//        storedFile.delete();
//    }

}
