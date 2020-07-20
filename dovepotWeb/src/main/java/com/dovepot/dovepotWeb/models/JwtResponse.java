package com.dovepot.dovepotWeb.models;

import java.io.Serializable;

import com.dovepot.dovepotWeb.utils.JwtTokenUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

public class JwtResponse implements Serializable {

	private static final long serialVersionUID = 8317676219297719109L;
  
	private final String token;
	private final String username;

	private JwtTokenUtil jwtTokenUtil;
  
	public JwtResponse(String token) {
		this.token = token;
		jwtTokenUtil = new JwtTokenUtil();
		
		this.username = jwtTokenUtil.getUsernameFromToken(token);
	}

	public String getToken() {
		return this.token;
	}

	public String getUsername()
	{
		return this.username;
	}
}