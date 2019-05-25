package project.model.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import project.model.entities.ProjectPlan;


public interface ProjectPlanRepository extends MongoRepository<ProjectPlan, String>  {
	ProjectPlan findFirstByuserId(String id);
}