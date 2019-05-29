package project.model.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import project.model.entities.Feedback;


public interface FeedbackRepository extends MongoRepository<Feedback, String> {
	Feedback findFirstById(String id);
	Feedback findFirstBydocumentId(String documentId);
	Feedback findFirstByuserId(String userId);

	List<Feedback> findBydocumentId(String documentId);
}
