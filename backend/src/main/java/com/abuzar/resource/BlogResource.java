package com.abuzar.resource;

import com.abuzar.model.BlogPost;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import java.util.List;

@Path("/api/blog")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Blog", description = "Blog post endpoints")
public class BlogResource {

    @GET
    @Operation(summary = "Get all published posts")
    public List<BlogPost> getAll() {
        return BlogPost.findPublished();
    }

    @GET
    @Path("/{slug}")
    @Operation(summary = "Get a single blog post by slug")
    public Response getBySlug(@PathParam("slug") String slug) {
        BlogPost post = BlogPost.findBySlug(slug);
        if (post == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\":\"Post not found\"}")
                    .build();
        }
        return Response.ok(post).build();
    }
}
