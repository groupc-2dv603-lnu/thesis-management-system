package project.model.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import project.model.entities.FinalReport;


public interface FinalReportRepository extends MongoRepository<FinalReport, String> {

}
