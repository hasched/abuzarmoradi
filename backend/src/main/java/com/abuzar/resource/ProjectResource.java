package com.abuzar.resource;

import com.abuzar.model.Project;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import java.util.List;

@Path("/api/projects")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Projects", description = "Portfolio project endpoints")
public class ProjectResource {

    @GET
    @Operation(summary = "Get all projects ordered by sort_order")
    public List<Project> getAll(@QueryParam("featured") Boolean featured) {
        if (Boolean.TRUE.equals(featured)) {
            return Project.findFeatured();
        }
        return Project.findAllOrdered();
    }

    @GET
    @Path("/{slug}")
    @Operation(summary = "Get a single project by slug")
    public Response getBySlug(@PathParam("slug") String slug) {
        Project p = Project.findBySlug(slug);
        if (p == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\":\"Project not found\"}")
                    .build();
        }
        return Response.ok(p).build();
    }
}
