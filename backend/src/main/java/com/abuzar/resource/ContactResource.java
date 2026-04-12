package com.abuzar.resource;

import com.abuzar.dto.ContactRequest;
import com.abuzar.model.ContactMessage;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/api/contact")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Contact")
public class ContactResource {

    @POST
    @Transactional
    @Operation(summary = "Send a contact message")
    public Response send(@Valid ContactRequest req) {
        ContactMessage msg = new ContactMessage();
        msg.name = req.name;
        msg.email = req.email;
        msg.subject = req.subject;
        msg.message = req.message;
        msg.persist();

        return Response.status(Response.Status.CREATED)
                .entity("{\"message\":\"Thank you! I'll be in touch soon.\"}")
                .build();
    }
}
