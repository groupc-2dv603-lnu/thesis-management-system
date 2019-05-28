package project.model.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import project.model.entities.Submission;

public interface SubmissionRepository extends MongoRepository<Submission, String> {
    Submission findFirstById(String id);
//    Submission findFirstByFileName(String title);
}

