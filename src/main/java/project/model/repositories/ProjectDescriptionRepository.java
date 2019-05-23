package project.model.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import project.model.entities.ProjectDescription;

public interface ProjectDescriptionRepository extends MongoRepository<ProjectDescription, String> {
	
	ProjectDescription findFirstByuserId(String id);
}
