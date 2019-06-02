package project.model.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import project.model.entities.InitialReport;

import java.util.List;


public interface InitialReportRepository extends MongoRepository<InitialReport, String> {
	InitialReport findFirstByuserId(String id);
	InitialReport findFirstBySubmissionId(String id);
	InitialReport findFirstById(String id);
	List<InitialReport> findAllByuserId(String id);
}
