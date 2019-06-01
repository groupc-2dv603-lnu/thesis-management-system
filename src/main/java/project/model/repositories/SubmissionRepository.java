package project.model.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import project.model.entities.Submission;

import java.util.List;

public interface SubmissionRepository extends MongoRepository<Submission, String> {
    Submission findFirstById(String id);
    List<Submission> findAllByUserId(String id);
}

