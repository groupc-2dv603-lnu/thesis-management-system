package project.model.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import project.model.entities.InitialReport;


public interface InitialReportRepository extends MongoRepository<InitialReport, String> {
	InitialReport findFirstByuserId(String id);
	InitialReport findFirstById(String id);
}
