package com.abuzar.resource;

import com.abuzar.model.Skill;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import java.util.List;

@Path("/api/skills")
@Produces(MediaType.APPLICATION_JSON)
@Tag(name = "Skills")
public class SkillResource {

    @GET
    public List<Skill> getAll() {
        return Skill.findAllOrdered();
    }
}
