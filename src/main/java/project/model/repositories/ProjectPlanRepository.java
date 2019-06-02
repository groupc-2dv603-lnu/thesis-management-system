package project.model.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import project.model.entities.ProjectPlan;

import java.util.List;


public interface ProjectPlanRepository extends MongoRepository<ProjectPlan, String>  {
	ProjectPlan findFirstByuserId(String id);
	ProjectPlan findFirstById(String id);
	ProjectPlan findFirstBySubmissionId(String id);
	List<ProjectPlan> findAllByuserId(String id);
}
