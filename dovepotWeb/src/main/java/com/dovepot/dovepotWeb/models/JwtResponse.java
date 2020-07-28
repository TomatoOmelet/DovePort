package com.dovepot.dovepotWeb.models;

import java.io.Serializable;

public class JwtResponse implements Serializable {

	private static final long serialVersionUID = 8317676219297719109L;
  
	private final String token;
	private final UserInfo user;
  
	public JwtResponse(String token, UserInfo user) {
		this.token = token;
		this.user = user;
	}

	public String getToken() {
		return this.token;
	}

	public UserInfo getUser()
	{
		return this.user;
	}
}