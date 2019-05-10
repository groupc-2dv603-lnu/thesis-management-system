package project.model.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import project.model.repositories.UserRepository;

import java.util.Collections;
import java.util.List;

// UserDetailsService denotes that this is a class for finding and authenticating users
@Component // Indicates that this class can be injected into another file
public class MongoUserDetailsService implements UserDetailsService {

    @Autowired // Injects an instance of UserRepository upon construction of the class
    UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        project.model.entities.User user = repository.findByName(name);
        if(user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("user"));

        // Returns a spring user object with name, password and the role of the user
        return new User(user.getName(), user.getPassword(), authorities);
    }
}
