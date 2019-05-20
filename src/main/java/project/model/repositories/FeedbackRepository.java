package project.model.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import project.model.entities.Feedback;


public interface FeedbackRepository extends MongoRepository<Feedback, String> {
	Feedback findFirstById(String id);
	Feedback findFirstBysubmissionId(String submissionId);
	List<Feedback> findBysubmissionId(String submissionId);
}
