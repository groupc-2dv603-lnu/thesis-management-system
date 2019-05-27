package project.model.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import project.model.entities.DemoFile;

public interface DemoFileRepository extends MongoRepository<DemoFile, String> {

    DemoFile findFirstById(String id);
    DemoFile findFirstBySubmissionId(String studentId);
}


