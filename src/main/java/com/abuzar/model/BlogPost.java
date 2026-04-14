package com.abuzar.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "blog_posts")
public class BlogPost extends PanacheEntityBase {

    @Id
    @GeneratedValue
    public UUID id;

    @Column(nullable = false, length = 300)
    public String title;

    @Column(unique = true, length = 300)
    public String slug;

    @Column(columnDefinition = "TEXT")
    public String excerpt;

    @Column(columnDefinition = "TEXT")
    public String content;

    @Column(columnDefinition = "TEXT[]")
    public String[] tags;

    public boolean published;

    @Column(name = "reading_time_minutes")
    public int readingTimeMinutes;

    @CreationTimestamp
    @Column(name = "created_at")
    public OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    public OffsetDateTime updatedAt;

    // --- Queries ---

    public static List<BlogPost> findPublished() {
        return find("published = true ORDER BY createdAt DESC").list();
    }

    public static BlogPost findBySlug(String slug) {
        return find("slug = ?1 AND published = true", slug).firstResult();
    }
}
