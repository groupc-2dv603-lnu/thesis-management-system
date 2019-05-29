package project.model.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import project.model.enums.Role;

@Data
@Document(collection = "users")
public class User {

	@Id
	private String id;
	private String name;
	
	@JsonIgnore
	private String password;
	@JsonIgnore
	private String emailAdress;
	private Role[] roles;
	
	
	public User(String name, String password, String emailAdress, Role[] roles) {

		this.name = name;
		this.password = password;
		this.emailAdress = emailAdress;
		this.roles = roles;
	}
}
