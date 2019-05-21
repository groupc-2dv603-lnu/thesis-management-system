package project.model.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import project.model.entities.InitialReport;
import project.model.entities.ProjectPlan;


public interface InitialReportRepository extends MongoRepository<InitialReport, String> {
	InitialReport findFirstByuserId(String id);
}
