package com.abuzar.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "projects")
public class Project extends PanacheEntityBase {

    @Id
    @GeneratedValue
    public UUID id;

    @Column(nullable = false, length = 200)
    public String title;

    @Column(unique = true, length = 200)
    public String slug;

    @Column(columnDefinition = "TEXT")
    public String description;

    @Column(name = "long_description", columnDefinition = "TEXT")
    public String longDescription;

    @Column(name = "tech_stack", columnDefinition = "TEXT[]")
    public String[] techStack;

    @Column(name = "github_url", length = 500)
    public String githubUrl;

    @Column(name = "live_url", length = 500)
    public String liveUrl;

    @Column(name = "image_url", length = 500)
    public String imageUrl;

    public boolean featured;

    @Column(name = "sort_order")
    public int sortOrder;

    @CreationTimestamp
    @Column(name = "created_at")
    public OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    public OffsetDateTime updatedAt;

    // --- Queries ---

    public static List<Project> findFeatured() {
        return find("featured = true ORDER BY sortOrder ASC").list();
    }

    public static List<Project> findAllOrdered() {
        return find("ORDER BY sortOrder ASC").list();
    }

    public static Project findBySlug(String slug) {
        return find("slug", slug).firstResult();
    }
}
