package project.model.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import project.model.entities.FinalReport;
import project.model.entities.InitialReport;

@SuppressWarnings("deprecation")
@Configuration
public class RepositoryConfig extends RepositoryRestConfigurerAdapter {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(InitialReport.class);
        config.exposeIdsFor(FinalReport.class);
    }
}
