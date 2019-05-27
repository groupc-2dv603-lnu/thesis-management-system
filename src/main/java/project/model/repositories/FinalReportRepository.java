package project.model.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import project.model.entities.FinalReport;

import java.util.List;


public interface FinalReportRepository extends MongoRepository<FinalReport, String> {
	List<FinalReport> findAllByuserId(String id);
	FinalReport findFirstByuserId(String id);
}
