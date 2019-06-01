package project.model.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import project.model.enums.Role;
import project.model.services.MongoUserDetailsService;

// WebSecurityConfigurerAdapter contains everything needed for authentication in spring
@Configuration // Indicates that the class will contain Java beans
@EnableConfigurationProperties // Indicates that the class will contain a special kind of configuration bean
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Autowired // Injects an instance of MongoUserDetailsService upon construction of the class
    MongoUserDetailsService userDetailsService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .sessionManagement().disable() // Disables Session Management (unnecessary)
            .csrf().disable() // Disables CSRF protection (unnecessary)
            .authorizeRequests()
            .anyRequest().authenticated()
            .and()
            .formLogin();
//            .antMatchers("/admin/**").hasAuthority(String.valueOf(Role.ADMIN))
//            .antMatchers("/student/**").hasAuthority(String.valueOf(Role.STUDENT))
//            .antMatchers("/opponent/**").hasAuthority(String.valueOf(Role.OPPONENT))
//            .antMatchers("/reader/**").hasAuthority(String.valueOf(Role.READER))
//            .antMatchers("/supervisor/**").hasAuthority(String.valueOf(Role.SUPERVISOR))
//            .antMatchers("/coordinator/**").hasAuthority(String.valueOf(Role.COORDINATOR))
//        	.invalidateHttpSession(true)
//        	.deleteCookies("JSESSIONID");

    }

    @Override // This method overrides the default AuthenticationManagerBuilder to make use of the custom MongoUserDetailsService
    protected void configure(AuthenticationManagerBuilder builder) throws Exception {
        builder.userDetailsService(userDetailsService);
    }

    @Bean // This bean tells spring what password encoder should be used
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
