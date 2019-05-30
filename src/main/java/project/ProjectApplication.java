package project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import project.property.FileStorageProperties;

@SpringBootApplication
@EnableMongoAuditing                    //Enables use of @CreatedDate annotation in Submission class
@EnableConfigurationProperties(FileStorageProperties.class)
public class ProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjectApplication.class, args);
    }

}
