package com.abuzar.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ContactRequest {

    @NotBlank(message = "Name is required")
    @Size(max = 200)
    public String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Valid email required")
    @Size(max = 300)
    public String email;

    @Size(max = 300)
    public String subject;

    @NotBlank(message = "Message is required")
    @Size(max = 5000)
    public String message;
}
