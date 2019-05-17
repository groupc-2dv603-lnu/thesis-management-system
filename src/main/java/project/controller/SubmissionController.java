package project.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

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
import org.springframework.web.bind.annotation.*;

import project.model.entities.DemoFile;
import project.model.entities.Submission;
import project.model.repositories.DemoFileRepository;
import project.model.repositories.SubmissionRepository;

@RestController
public class SubmissionController {

    private final SubmissionRepository subRepository;
    private final DemoFileRepository demoFileRepository = new DemoFileRepository() {
        @Override
        public DemoFile findFirstById(String id) {
            return null;
        }

        @Override
        public DemoFile findFirstBySubmissionId(String studentId) {
            return null;
        }

        @Override
        public <S extends DemoFile> List<S> saveAll(Iterable<S> iterable) {
            return null;
        }

        @Override
        public List<DemoFile> findAll() {
            return null;
        }

        @Override
        public List<DemoFile> findAll(Sort sort) {
            return null;
        }

        @Override
        public <S extends DemoFile> S insert(S s) {
            return null;
        }

        @Override
        public <S extends DemoFile> List<S> insert(Iterable<S> iterable) {
            return null;
        }

        @Override
        public <S extends DemoFile> List<S> findAll(Example<S> example) {
            return null;
        }

        @Override
        public <S extends DemoFile> List<S> findAll(Example<S> example, Sort sort) {
            return null;
        }

        @Override
        public Page<DemoFile> findAll(Pageable pageable) {
            return null;
        }

        @Override
        public <S extends DemoFile> S save(S entity) {
            return null;
        }

        @Override
        public Optional<DemoFile> findById(String s) {
            return Optional.empty();
        }

        @Override
        public boolean existsById(String s) {
            return false;
        }

        @Override
        public Iterable<DemoFile> findAllById(Iterable<String> strings) {
            return null;
        }

        @Override
        public long count() {
            return 0;
        }

        @Override
        public void deleteById(String s) {

        }

        @Override
        public void delete(DemoFile entity) {

        }

        @Override
        public void deleteAll(Iterable<? extends DemoFile> entities) {

        }

        @Override
        public void deleteAll() {

        }

        @Override
        public <S extends DemoFile> Optional<S> findOne(Example<S> example) {
            return Optional.empty();
        }

        @Override
        public <S extends DemoFile> Page<S> findAll(Example<S> example, Pageable pageable) {
            return null;
        }

        @Override
        public <S extends DemoFile> long count(Example<S> example) {
            return 0;
        }

        @Override
        public <S extends DemoFile> boolean exists(Example<S> example) {
            return false;
        }
    };

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
//        newSubmission.setFile("C:\\Users\\Timme\\Downloads\\02 Architecting and Designing Software - Reading.pdf");  //TODO: hardcoded to test larger files. remove
//        newSubmission.setFilePath(null);

        DemoFile df = new DemoFile(newSubmission.getId(), "C:\\Users\\Timme\\Downloads\\02 Architecting and Designing Software - Reading.pdf");
        DemoFileController dfc = new DemoFileController(demoFileRepository);
        dfc.uploadFile(df);

        newSubmission.setFileUrl(df.getId());
        subRepository.save(newSubmission);
        return "Successfully uploaded file: " + newSubmission.getFileName();
    }



    @DeleteMapping("/submissions/{id}")
    String deleteSubmission(@PathVariable String id) {
        subRepository.deleteById(id);

        return "File deleted";
    }

}
