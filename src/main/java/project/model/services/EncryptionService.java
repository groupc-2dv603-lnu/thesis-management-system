package project.model.services;


import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Component;

@Component
public class EncryptionService {
    public String hash(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }
}
