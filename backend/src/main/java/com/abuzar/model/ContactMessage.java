package com.abuzar.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "contact_messages")
public class ContactMessage extends PanacheEntityBase {

    @Id
    @GeneratedValue
    public UUID id;

    @NotBlank
    @Size(max = 200)
    @Column(nullable = false, length = 200)
    public String name;

    @NotBlank
    @Email
    @Size(max = 300)
    @Column(nullable = false, length = 300)
    public String email;

    @Size(max = 300)
    @Column(length = 300)
    public String subject;

    @NotBlank
    @Column(columnDefinition = "TEXT", nullable = false)
    public String message;

    public boolean read = false;

    @CreationTimestamp
    @Column(name = "created_at")
    public OffsetDateTime createdAt;
}
