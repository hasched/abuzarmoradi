package com.abuzar.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "skills")
public class Skill extends PanacheEntityBase {

    @Id
    @GeneratedValue
    public UUID id;

    @Column(nullable = false, length = 100)
    public String name;

    @Column(length = 100)
    public String category;

    public int proficiency;

    @Column(name = "icon_key", length = 100)
    public String iconKey;

    @Column(name = "sort_order")
    public int sortOrder;

    // --- Queries ---

    public static List<Skill> findAllOrdered() {
        return find("ORDER BY category ASC, sortOrder ASC").list();
    }
}
