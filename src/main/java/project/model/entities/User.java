package project.model.entities;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "users")
public class User {

	@Id
	private String id;
	private String name;
	private String password;
	private Role[] roles;
	
	public User(String name, String password, Role[] roles) {
		this.name = name;
		this.password = password;
		this.roles = roles;
	}
}
